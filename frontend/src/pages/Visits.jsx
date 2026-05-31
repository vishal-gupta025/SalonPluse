import {
  useEffect,
  useState
} from "react";

import toast from "react-hot-toast";

import DashboardLayout from "../layouts/DashboardLayout";

import AddVisitForm from "../components/AddVisitForm";

import VisitTable from "../components/VisitTable";

import {
  getVisits,
  createVisit
} from "../api/visitApi";

import {
  getCustomers
} from "../api/customerApi";

import {
  getServices
} from "../api/serviceApi";
import {
  InlineErrorState,
  TableSkeleton
} from "../components/StateScreens";

function Visits() {

  const [visits, setVisits] =
    useState([]);

  const [customers, setCustomers] =
    useState([]);

  const [services, setServices] =
    useState([]);

  const [loading, setLoading] =
   useState(true);

  const [error, setError] =
   useState("");

  const [selectedDate,setSelectedDate] =
    useState("");

  useEffect(() => {

    fetchData();

  }, [selectedDate]);

  const fetchData = async () => {

    setLoading(true);
    setError("");

    try {

      const visitsData =
        await getVisits(selectedDate);

      const customersData =
        await getCustomers();

      const servicesData =
        await getServices();

      setVisits(visitsData);

      setCustomers(customersData);

      setServices(servicesData);

    } catch (error) {
      setError("Failed to load visits. Please try again.");
      toast.error("Failed to load visits");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateVisit =
    async (payload) => {

      try {

        await createVisit(
          payload
        );

      fetchData();
      toast.success("Visit created");

      } catch (error) {

        toast.error(error.response?.data?.detail || "Failed to create visit");
        console.log(error);
      }
    };

  return (
    <DashboardLayout>

      <div className="mb-8">
        <h1 className="dashboard-page-title">Visits</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
          Create and review appointments in a streamlined, responsive visit board.
        </p>
      </div>

      <AddVisitForm
        services={services}
        onAdd={handleCreateVisit}
      />

      <div className="mb-4">

        <label className="block mb-2 font-medium">
          Filter by Date
        </label>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) =>
            setSelectedDate(
              e.target.value
            )
          }
          className="border rounded px-3 py-2"
        />

      </div>

      {loading ? (
        <TableSkeleton rows={5} columns={5} />
      ) : error ? (
        <InlineErrorState
          title="Visits unavailable"
          message={error}
          onRetry={fetchData}
        />
      ) : (
        <VisitTable
          visits={visits}
          customers={customers}
        />
      )}

    </DashboardLayout>
  );
}

export default Visits;