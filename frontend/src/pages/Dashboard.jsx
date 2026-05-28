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

  useEffect(() => {

    fetchDashboard();

  }, []);

  const fetchDashboard = async () => {

    setLoading(true);
    setError("");

    try {

      const statsData =
        await getDashboardStats();

      const revenueData =
        await getRevenueTrend();

      const topServicesData =
        await getTopServices();

      const paymentData =
        await getPaymentBreakdown();

      setStats(statsData);

      setRevenueTrend(revenueData);

      setTopServices(topServicesData);

      setPaymentBreakdown(paymentData);

    } catch (error) {
      setError("Failed to load dashboard data. Please try again.");
      console.log(error);

    } finally {
      setLoading(false);
    }
  };

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

          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <h1 className="dashboard-page-title">
                Dashboard
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
                Track revenue, payments, and service performance from one responsive workspace.
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

          <div className="mt-8 grid gap-6 xl:grid-cols-2">

            <RevenueChart
              data={revenueTrend}
            />

            <PaymentChart
              data={paymentBreakdown}
            />

          </div>

          <TopServicesChart
            data={topServices}
            className="mt-8"
          />

        </>

      )}

    </DashboardLayout>
  );
}

export default Dashboard;