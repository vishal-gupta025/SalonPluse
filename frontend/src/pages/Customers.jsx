import {
  useEffect,
  useState
} from "react";

import toast from "react-hot-toast";

import DashboardLayout from "../layouts/DashboardLayout";

import AddCustomerForm from "../components/AddCustomerForm";

import CustomerTable from "../components/CustomerTable";

import SearchCustomer from "../components/SearchCustomer";
import {
  InlineErrorState,
  TableSkeleton
} from "../components/StateScreens";

import {
  getCustomers,
  createCustomer,
  searchCustomers
} from "../api/customerApi";

function Customers() {

  const [customers, setCustomers] =
    useState([]);

  const [query, setQuery] =
    useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    fetchCustomers();

  }, []);

  const fetchCustomers = async () => {

    setLoading(true);
    setError("");

    try {

      const data =
        await getCustomers();

      setCustomers(data);

    } catch (error) {
      setError("Failed to load customers. Please try again.");
      toast.error("Failed to load customers");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCustomer = async (
    payload
  ) => {

    try {

      await createCustomer(payload);

      fetchCustomers();
      toast.success("Customer Added");

    } catch (error) {

      toast.error(error.response?.data?.detail || "Failed to add customer");
      console.log(error);
    }
  };

  const handleSearch = async () => {

    try {

      if (!query) {
        fetchCustomers();
        return;
      }

      const data =
        await searchCustomers(query);

      setCustomers(data);

    } catch (error) {
      toast.error("Search failed");
      console.log(error);
    }
  };

  return (
    <DashboardLayout>

      <div className="mb-8">
        <h1 className="dashboard-page-title">Customers</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
          Manage your client list with a clean, searchable customer workspace.
        </p>
      </div>

      <SearchCustomer
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
      />

      <AddCustomerForm
        onAdd={handleAddCustomer}
      />

      {loading ? (
        <TableSkeleton rows={5} columns={3} />
      ) : error ? (
        <InlineErrorState
          title="Customers unavailable"
          message={error}
          onRetry={fetchCustomers}
        />
      ) : (
        <CustomerTable customers={customers} />
      )}

    </DashboardLayout>
  );
}

export default Customers;