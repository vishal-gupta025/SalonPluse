
function ExpenseTable({
  expenses
}) {

  const formatDate = (value) => {
    if (!value) {
      return "-";
    }

    return new Date(value).toLocaleDateString("en-IN", {
      dateStyle: "medium"
    });
  };

  const formatTime = (value) => {

    if (!value) {
      return "-";
    }

    return new Date(value).toLocaleString("en-IN", {
      timeStyle: "short"
    });
  };

  return (
    <div className="dashboard-table-shell">

      <div className="border-b border-slate-200 px-6 py-5">

        <h2 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
        Expenses
        </h2>

      </div>

      <div className="overflow-x-auto">

      <table className="dashboard-table">

        <thead>

            <tr>

            <th className="dashboard-th">
              Title
            </th>

            <th className="dashboard-th">
              Amount
            </th>

            <th className="dashboard-th">
              Date
            </th>

            <th className="dashboard-th">
              Time
            </th>

          </tr>

        </thead>

        <tbody>

          {expenses.map((expense) => (

            <tr
              key={expense.id}
              className="group hover:bg-slate-50/80"
            >

              <td className="dashboard-td font-medium text-slate-900">
                {expense.title}
              </td>

              <td className="dashboard-td whitespace-nowrap">
                ₹{expense.amount}
              </td>

              <td className="dashboard-td whitespace-nowrap text-slate-500">
                {formatDate(expense.expense_date ?? expense.created_at)}
              </td>

              <td className="dashboard-td whitespace-nowrap text-slate-500">
                {formatTime(expense.expense_date ?? expense.created_at)}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

      </div>

    </div>
  );
}

export default ExpenseTable;
