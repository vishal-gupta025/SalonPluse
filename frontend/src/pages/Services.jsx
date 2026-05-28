import {
  useEffect,
  useState
} from "react";

import toast from "react-hot-toast";

import DashboardLayout from "../layouts/DashboardLayout";

import AddServiceForm from "../components/AddServiceForm";

import ServiceTable from "../components/ServiceTable";
import {
  InlineErrorState,
  TableSkeleton
} from "../components/StateScreens";

import {
  getServices,
  createService
} from "../api/serviceApi";

function Services() {

  const [services, setServices] =
    useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    fetchServices();

  }, []);

  const fetchServices = async () => {

    setLoading(true);
    setError("");

    try {

      const data =
        await getServices();

      setServices(data);

    } catch (error) {
      setError("Failed to load services. Please try again.");
      toast.error("Failed to load services");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddService = async (
    payload
  ) => {

    try {

      await createService(payload);

      fetchServices();
      toast.success("Service Added");

    } catch (error) {

      toast.error(error.response?.data?.detail || "Failed to add service");
      console.log(error);
    }
  };

  return (
    <DashboardLayout>

      <div className="mb-8">
        <h1 className="dashboard-page-title">Services</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
          Organize offerings in a clear, mobile-friendly catalog that keeps your team moving.
        </p>
      </div>

      <AddServiceForm
        onAdd={handleAddService}
      />

      {loading ? (
        <TableSkeleton rows={5} columns={3} />
      ) : error ? (
        <InlineErrorState
          title="Services unavailable"
          message={error}
          onRetry={fetchServices}
        />
      ) : (
        <ServiceTable services={services} />
      )}

    </DashboardLayout>
  );
}

export default Services;