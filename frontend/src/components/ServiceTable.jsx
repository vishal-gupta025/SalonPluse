function ServiceTable({
  services
}) {

  return (
    <div className="dashboard-table-shell">

      <div className="border-b border-slate-200 px-6 py-5">

        <h2 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
        Services
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
              Price
            </th>

            <th className="dashboard-th">
              Description
            </th>

          </tr>

        </thead>

        <tbody>

          {services.map((service) => (

            <tr
              key={service.id}
              className="group hover:bg-slate-50/80"
            >

              <td className="dashboard-td font-medium text-slate-900">
                {service.name}
              </td>

              <td className="dashboard-td whitespace-nowrap">
                ₹{service.price}
              </td>

              <td className="dashboard-td text-slate-500">
                {service.description}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

      </div>

    </div>
  );
}

export default ServiceTable;