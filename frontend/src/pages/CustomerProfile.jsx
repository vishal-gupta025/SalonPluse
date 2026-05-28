import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  getCustomerVisits
} from "../api/customerApi";

import NotFound from "./NotFound";

function CustomerProfile() {

  const { id } = useParams();

  const [visits, setVisits] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {

    fetchVisits();

  }, [id]);

  const fetchVisits =
    async () => {

      setLoading(true);
      setError("");
      setVisits([]);

      try {

        const data =
          await getCustomerVisits(id);

        setVisits(data);

      } catch (error) {

        console.error(error);

        setError(
          error.response?.data?.detail
          || "Failed to load customer"
        );

        toast.error(
          error.response?.data?.detail
          || "Failed to load customer"
        );

      } finally {

        setLoading(false);
      }
    };

  // Analytics

  const totalSpent =
    visits.reduce(
      (sum, visit) =>
        sum + visit.total_amount,
      0
    );

  const lastVisit =
    visits.length > 0
      ? visits[0]?.visit_date
      : null;

  // Error UI

  if (error) {

    return <NotFound />;
  }

  return (

    <div className="p-4 md:p-6">

      {/* Heading */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold">

          Customer History

        </h1>

      </div>

      {/* Loading */}

      {loading ? (

        <div className="text-lg">

          Loading...

        </div>

      ) : (

        <>
          {/* Analytics Cards */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

            {/* Total Visits */}

            <div className="bg-white p-6 rounded-2xl shadow">

              <p className="text-gray-500 mb-2">

                Total Visits

              </p>

              <h2 className="text-4xl font-bold">

                {visits.length}

              </h2>

            </div>

            {/* Total Spent */}

            <div className="bg-white p-6 rounded-2xl shadow">

              <p className="text-gray-500 mb-2">

                Total Spent

              </p>

              <h2 className="text-4xl font-bold">

                ₹{totalSpent}

              </h2>

            </div>

            {/* Last Visit */}

            <div className="bg-white p-6 rounded-2xl shadow">

              <p className="text-gray-500 mb-2">

                Last Visit

              </p>

              <h2 className="text-2xl font-bold">

                {
                  lastVisit
                  ? lastVisit.split("T")[0]
                  : "No Visits"
                }

              </h2>

            </div>

          </div>

          {/* Empty State */}

          {visits.length === 0 ? (

            <div className="bg-white rounded-2xl shadow p-10 text-center">

              <h2 className="text-2xl font-semibold mb-2">

                No Visits Yet

              </h2>

              <p className="text-gray-500">

                This customer has no visit history.

              </p>

            </div>

          ) : (

            /* Visit History Table */

            <div className="bg-white rounded-2xl shadow overflow-x-auto">

              <table className="w-full min-w-[700px]">

                <thead>

                  <tr className="border-b">

                    <th className="text-left p-4">

                      Date

                    </th>

                    <th className="text-left p-4">

                      Services

                    </th>

                    <th className="text-left p-4">

                      Payment

                    </th>

                    <th className="text-left p-4">

                      Amount

                    </th>

                  </tr>

                </thead>

                <tbody>

                  {visits.map(
                    (visit) => (

                      <tr
                        key={visit.id}
                        className="border-b hover:bg-gray-50 transition"
                      >

                        {/* Date */}

                        <td className="p-4">

                          {
                            visit.visit_date
                            ?.split("T")[0]
                          }

                        </td>

                        {/* Services */}

                        <td className="p-4">

                          <div className="flex flex-wrap gap-2">

                            {visit.services?.map(
                              (
                                service,
                                index
                              ) => (

                                <span
                                  key={index}
                                  className="bg-gray-200 px-3 py-1 rounded-full text-sm"
                                >

                                  {service}

                                </span>
                              )
                            )}

                          </div>

                        </td>

                        {/* Payment */}

                        <td className="p-4">

                          {visit.payment_method}

                        </td>

                        {/* Amount */}

                        <td className="p-4 font-semibold">

                          ₹{visit.total_amount}

                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CustomerProfile;