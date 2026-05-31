import { useNavigate } from "react-router-dom";

function CustomerTable({ customers }) {

  const navigate = useNavigate();

  return (
    <div className="dashboard-table-shell">

      <div className="border-b border-slate-200 px-6 py-5">

        <h2 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
          Customers
        </h2>

      </div>

      <div className="overflow-x-auto">

        <table className="dashboard-table">

          <thead>

            <tr>

              <th className="dashboard-th">Name</th>

              <th className="dashboard-th">Phone</th>

              <th className="dashboard-th">Gender</th>

              <th className="dashboard-th">Actions</th>

            </tr>

          </thead>

          <tbody>

            {customers.map((customer) => (

              <tr
                key={customer.id}
                className="group hover:bg-slate-50/80 cursor-pointer"
                onClick={() => navigate(`/customers/${customer.id}`)}
              >

                <td className="dashboard-td font-medium text-slate-900">
                  {customer.name}
                </td>

                <td className="dashboard-td whitespace-nowrap">{customer.phone}</td>

                <td className="dashboard-td">{customer.gender}</td>

                <td className="dashboard-td whitespace-nowrap">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/customers/${customer.id}`);
                    }}
                    className="inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                  >
                    View History
                  </button>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default CustomerTable;