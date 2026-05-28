import {
  useEffect,
  useState
} from "react";

import toast from "react-hot-toast";

import DashboardLayout from "../layouts/DashboardLayout";

import AddExpenseForm from "../components/AddExpenseForm";

import ExpenseTable from "../components/ExpensesTable";
import {
  InlineErrorState,
  TableSkeleton
} from "../components/StateScreens";

import {
  getExpenses,
  createExpense
} from "../api/expenseApi";

function Expenses() {

  const [expenses, setExpenses] =
    useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    fetchExpenses();

  }, []);

  const fetchExpenses = async () => {

    setLoading(true);
    setError("");

    try {

      const data =
        await getExpenses();

      setExpenses(data);

    } catch (error) {
      setError("Failed to load expenses. Please try again.");
      toast.error("Failed to load expenses");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense =
    async (payload) => {

      try {

        await createExpense(
          payload
        );

        fetchExpenses();
        toast.success("Expense Added");

      } catch (error) {

          toast.error(error.response?.data?.detail || "Failed to create expense");
          console.log(error);
      }
    };

  return (
    <DashboardLayout>

      <div className="mb-8">
        <h1 className="dashboard-page-title">Expenses</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
          Track salon costs with a tidy, responsive expense management view.
        </p>
      </div>

      <AddExpenseForm
        onAdd={handleAddExpense}
      />

      {loading ? (
        <TableSkeleton rows={5} columns={2} />
      ) : error ? (
        <InlineErrorState
          title="Expenses unavailable"
          message={error}
          onRetry={fetchExpenses}
        />
      ) : (
        <ExpenseTable expenses={expenses} />
      )}

    </DashboardLayout>
  );
}

export default Expenses;