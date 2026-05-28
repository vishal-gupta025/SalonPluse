function CustomerTable({
  customers
}) {

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

            <th className="dashboard-th">
              Name
            </th>

            <th className="dashboard-th">
              Phone
            </th>

            <th className="dashboard-th">
              Gender
            </th>

          </tr>

        </thead>

        <tbody>

          {customers.map((customer) => (

            <tr
              key={customer.id}
              className="group hover:bg-slate-50/80"
            >

              <td className="dashboard-td font-medium text-slate-900">
                {customer.name}
              </td>

              <td className="dashboard-td whitespace-nowrap">
                {customer.phone}
              </td>

              <td className="dashboard-td">
                {customer.gender}
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