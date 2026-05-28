import { useState } from "react";

import {
  searchCustomers
} from "../api/customerApi";

function AddVisitForm({
  services,
  onAdd
}) {

  const [search,
    setSearch] = useState("");

  const [results,
    setResults] = useState([]);

  const [selectedCustomer,
    setSelectedCustomer] = useState(null);

  const [newCustomerName,
    setNewCustomerName] = useState("");

  const [newCustomerPhone,
    setNewCustomerPhone] = useState("");

  const [newCustomerGender,
    setNewCustomerGender] = useState("");

  const [selectedServices,
    setSelectedServices] = useState([]);

  const [paymentMethod,
    setPaymentMethod] = useState("CASH");

  const handleSearch =
    async (value) => {

      setSearch(value);

      if (!value) {

        setResults([]);

        return;
      }

      try {

        const data =
          await searchCustomers(value);

        setResults(data);

      } catch (error) {

        console.log(error);
      }
    };

  const handleServiceChange = (
    serviceId
  ) => {

    if (
      selectedServices.includes(
        serviceId
      )
    ) {

      setSelectedServices(
        selectedServices.filter(
          (id) => id !== serviceId
        )
      );

    } else {

      setSelectedServices([
        ...selectedServices,
        serviceId
      ]);
    }
  };

  const totalAmount =
    services
      .filter((service) =>
        selectedServices.includes(
          service.id
        )
      )
      .reduce(
        (sum, service) =>
          sum + service.price,
        0
      );

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      const payload = {
        service_ids:
          selectedServices,
        payment_method:
          paymentMethod
      };

      if (selectedCustomer) {

        payload.customer_id =
          selectedCustomer.id;

      } else {

        payload.new_customer = {
          name: newCustomerName,
          phone: newCustomerPhone,
          gender: newCustomerGender
        };
      }

      await onAdd(payload);

      setSearch("");

      setResults([]);

      setSelectedCustomer(null);

      setNewCustomerName("");

      setNewCustomerPhone("");

      setNewCustomerGender("");

      setSelectedServices([]);

      setPaymentMethod("CASH");
    };

  return (
    <form
      onSubmit={handleSubmit}
      className="dashboard-card mb-6"
    >

      <h2 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
        Create Visit
      </h2>

      {/* Search Customer */}

      <div className="mt-5 mb-5 space-y-4">

        <label className="block mb-2 font-medium">
          Search Customer
        </label>

        <input
          type="text"
          placeholder="Search by name or phone"
          className="dashboard-input"
          value={search}
          onChange={(e) =>
            handleSearch(
              e.target.value
            )
          }
        />

        {results.length > 0 && (

          <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-2 shadow-sm">

            {results.map(
              (customer) => (

                <div
                  key={customer.id}
                  className="cursor-pointer rounded-xl px-3 py-3 transition hover:bg-white"
                  onClick={() => {

                    setSelectedCustomer(
                      customer
                    );

                    setSearch(
                      customer.name
                    );

                    setResults([]);
                  }}
                >

                  {customer.name}
                  {" - "}
                  {customer.phone}

                </div>
              )
            )}

          </div>
        )}

      </div>

      {/* Selected Customer */}

      {selectedCustomer && (

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-900">

          Selected:
          {" "}
          {selectedCustomer.name}

        </div>
      )}

      {/* New Customer */}

      {!selectedCustomer &&
       search &&
       results.length === 0 && (

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">

          <h3 className="font-semibold mb-3">
            Create New Customer
          </h3>

          <input
            type="text"
            placeholder="Customer Name"
            className="dashboard-input mb-2"
            value={newCustomerName}
            onChange={(e) =>
              setNewCustomerName(
                e.target.value
              )
            }
          />

          <input
            type="text"
            placeholder="Phone Number"
            className="dashboard-input mb-2"
            value={newCustomerPhone}
            onChange={(e) =>
              setNewCustomerPhone(
                e.target.value
              )
            }
          />

          <input
            type="text"
            placeholder="Gender"
            className="dashboard-input"
            value={newCustomerGender}
            onChange={(e) =>
              setNewCustomerGender(
                e.target.value
              )
            }
          />

        </div>
      )}

      {/* Services */}

      <div className="mb-5">

        <label className="block mb-2 font-medium">
          Select Services
        </label>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">

          {services.map(
            (service) => (

              <label
                key={service.id}
                className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm"
              >

                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-950 focus:ring-slate-500"
                  checked={selectedServices.includes(
                    service.id
                  )}
                  onChange={() =>
                    handleServiceChange(
                      service.id
                    )
                  }
                />

                {service.name}
                {" "}
                (₹{service.price})

              </label>
            )
          )}

        </div>

      </div>

      {/* Payment */}

      <div className="mb-4">

        <label className="block mb-2 font-medium">
          Payment Method
        </label>

        <select
          className="dashboard-select"
          value={paymentMethod}
          onChange={(e) =>
            setPaymentMethod(
              e.target.value
            )
          }
        >

          <option value="CASH">
            CASH
          </option>

          <option value="UPI">
            UPI
          </option>

          <option value="CARD">
            CARD
          </option>

        </select>

      </div>

      {/* Total */}

      <div className="mb-5">

        <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
          Total: ₹{totalAmount}
        </h3>

      </div>

      <button
        type="submit"
        className="dashboard-button-primary w-full sm:w-auto"
      >
        Create Visit
      </button>

    </form>
  );
}

export default AddVisitForm;