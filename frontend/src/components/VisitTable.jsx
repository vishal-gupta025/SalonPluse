function VisitTable({
  visits,
  customers = []
}) {

  const getCustomerName = (visit) => {
    if (visit.customer_name) {
      return visit.customer_name;
    }

    if (visit.customer && visit.customer.name) {
      return visit.customer.name;
    }

    const customer = customers.find(
      (item) => item.id === visit.customer_id
    );

    return customer ? customer.name : "Unknown Customer";
  };

  return (
    <div className="dashboard-table-shell">

      <div className="border-b border-slate-200 px-6 py-5">

        <h2 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
          Visits
        </h2>

      </div>

      <div className="overflow-x-auto">

        <table className="dashboard-table">

          <thead>

            <tr>

              <th className="dashboard-th">
                Customer
              </th>

              <th className="dashboard-th">
                Services
              </th>

              <th className="dashboard-th">
                Total
              </th>

              <th className="dashboard-th">
                Payment
              </th>

              <th className="dashboard-th">
                Date
              </th>

            </tr>

          </thead>

          <tbody>

            {visits.map((visit) => (

              <tr
                key={visit.id}
                className="group hover:bg-slate-50/80"
              >

                <td className="dashboard-td font-medium text-slate-900">
                  {getCustomerName(visit)}
                </td>

                <td className="dashboard-td">

                  <div className="flex flex-wrap gap-2">
                    {visit.services && visit.services.length > 0 ? (
                      visit.services.map((service, index) => (
                        <span
                          key={index}
                          className="dashboard-chip"
                        >
                          {service}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-slate-400">
                        No services
                      </span>
                    )}
                  </div>

                </td>

                <td className="dashboard-td whitespace-nowrap font-medium text-slate-900">
                  ₹{visit.total_amount}
                </td>

                <td className="dashboard-td whitespace-nowrap">
                  {visit.payment_method}
                </td>

                <td className="dashboard-td whitespace-nowrap text-slate-500">
                  {visit.visit_date}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default VisitTable;