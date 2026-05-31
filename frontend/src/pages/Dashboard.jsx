import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import SummaryCard from "../components/SummaryCard";
import RevenueChart from "../components/RevenueChart";
import PaymentChart from "../components/PaymentChart";
import TopServicesChart from "../components/TopServicesChart";
import {
  InlineErrorState,
  PageSkeleton
} from "../components/StateScreens";

import {
  getDashboardStats,
  getRevenueTrend,
  getTopServices,
  getPaymentBreakdown
} from "../api/dashboardApi";
import { getProfile } from "../api/authApi";
import { getServices } from "../api/serviceApi";

const MONTHS = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" }
];

const getMonthsForYear = (year, creationDate, currentYear, currentMonth) => {
  return MONTHS.filter((item) => {
    if (!creationDate) {
      return true;
    }

    if (year === creationDate.getFullYear() && item.value < creationDate.getMonth() + 1) {
      return false;
    }

    if (year === currentYear && item.value > currentMonth) {
      return false;
    }

    return true;
  });
};

function Dashboard() {

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [revenueTrend, setRevenueTrend] =
    useState([]);

  const [topServices, setTopServices] =
    useState([]);

  const [paymentBreakdown,
    setPaymentBreakdown] = useState({});

  const [profile, setProfile] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {

    fetchDashboard();

  }, []);

  const fetchDashboard = async () => {

    setLoading(true);
    setError("");

    try {
      // Profile is required (for creation date and ownership).
      const profileData = await getProfile();

      const createdAt = profileData.created_at
        ? new Date(profileData.created_at)
        : new Date();

      const initialMonth = new Date().getMonth() + 1;
      const initialYear = new Date().getFullYear();

      setProfile(profileData);
      setSelectedMonth(initialMonth);
      setSelectedYear(initialYear);

      // Fetch other dashboard pieces in parallel and tolerate partial failures.
      const [statsRes, topRes, paymentRes, revenueRes, servicesRes] = await Promise.allSettled([
        getDashboardStats(),
        getTopServices(),
        getPaymentBreakdown(),
        getRevenueTrend(initialMonth, initialYear),
        getServices()
      ]);

      if (statsRes.status === "fulfilled") {
        setStats(statsRes.value);
      } else {
        console.log("getDashboardStats failed:", statsRes.reason);
      }

      const topServicesData = topRes.status === "fulfilled" ? topRes.value : [];
      const servicesData = servicesRes.status === "fulfilled" ? servicesRes.value : [];

      const mergedTopServices = servicesData.length
        ? servicesData.map((service) => {
            const match = topServicesData.find((t) => t.service_name === service.name);
            return {
              service_name: service.name,
              count: Number(match?.count ?? 0)
            };
          })
        : topServicesData;

      setTopServices(mergedTopServices);

      if (paymentRes.status === "fulfilled") {
        setPaymentBreakdown(paymentRes.value);
      } else {
        console.log("getPaymentBreakdown failed:", paymentRes.reason);
        setPaymentBreakdown({});
      }

      if (revenueRes.status === "fulfilled") {
        setRevenueTrend(revenueRes.value);
      } else {
        console.log("getRevenueTrend failed:", revenueRes.reason);
        setRevenueTrend([]);
      }

    } catch (error) {
      // If profile or other unexpected error occurs, show blocking error.
      setError("Failed to load dashboard data. Please try again.");
      console.log(error);

    } finally {
      setLoading(false);
    }
  };

  const handleMonthChange = async (event) => {
    const nextMonth = Number(event.target.value);

    setSelectedMonth(nextMonth);

    try {
      const data = await getRevenueTrend(nextMonth, selectedYear);
      setRevenueTrend(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleYearChange = async (event) => {
    const nextYear = Number(event.target.value);
    const nextMonths = getMonthsForYear(nextYear, creationDate, currentYear, currentMonth);
    const nextMonth = nextMonths.find((item) => item.value === selectedMonth)?.value || nextMonths[0]?.value || selectedMonth;

    setSelectedYear(nextYear);
    setSelectedMonth(nextMonth);

    try {
      const data = await getRevenueTrend(nextMonth, nextYear);
      setRevenueTrend(data);
    } catch (error) {
      console.log(error);
    }
  };

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const creationDate = profile?.created_at ? new Date(profile.created_at) : null;

  const availableYears = creationDate
    ? Array.from(
        { length: currentYear - creationDate.getFullYear() + 1 },
        (_, index) => creationDate.getFullYear() + index
      )
    : [currentYear];

  const availableMonths = getMonthsForYear(selectedYear, creationDate, currentYear, currentMonth);

  return (
    <DashboardLayout>

      {loading ? (
        <PageSkeleton />
      ) : error ? (
        <InlineErrorState
          title="Dashboard unavailable"
          message={error}
          onRetry={fetchDashboard}
        />
      ) : (
        <>

          <div className="mb-8 overflow-hidden rounded-3xl border border-teal-100 bg-gradient-to-r from-teal-50 via-white to-slate-50 p-6 shadow-sm shadow-teal-100/40 sm:p-8">

            <div>
              <h1 className="dashboard-page-title">
                Dashboard
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
                See the numbers that matter most and keep daily operations moving from one responsive workspace.
              </p>
            </div>

          </div>

          {stats && (

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

              <SummaryCard
                title="Today's Revenue"
                value={`₹${stats.today_revenue}`}
              />

              <SummaryCard
                title="Today's Customers"
                value={stats.today_customers}
              />

              <SummaryCard
                title="Monthly Revenue"
                value={`₹${stats.monthly_revenue}`}
              />

              <SummaryCard
                title="Monthly Profit"
                value={`₹${stats.monthly_profit}`}
              />

            </div>
          )}

          <div className="mt-8">

            <RevenueChart
              data={revenueTrend}
              month={selectedMonth}
              year={selectedYear}
              months={availableMonths}
              years={availableYears}
              onMonthChange={handleMonthChange}
              onYearChange={handleYearChange}
            />

          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-2">

            <PaymentChart
              data={paymentBreakdown}
            />

            <TopServicesChart
              data={topServices}
            />

          </div>

        </>

      )}

    </DashboardLayout>
  );
}

export default Dashboard;