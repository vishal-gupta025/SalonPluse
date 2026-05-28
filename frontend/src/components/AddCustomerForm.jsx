import { useState } from "react";

function AddCustomerForm({
  onAdd
}) {

  const [name, setName] = useState("");

  const [phone, setPhone] =
    useState("");

  const [gender, setGender] =
    useState("");

  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    await onAdd({
      name,
      phone,
      gender
    });

    setName("");
    setPhone("");
    setGender("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="dashboard-card mb-6"
    >

      <h2 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
        Add Customer
      </h2>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">

        <input
          type="text"
          placeholder="Name"
          className="dashboard-input"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Phone"
          className="dashboard-input"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Gender"
          className="dashboard-input"
          value={gender}
          onChange={(e) =>
            setGender(e.target.value)
          }
        />

      </div>

      <button
        type="submit"
        className="dashboard-button-primary mt-5 w-full md:w-auto"
      >
        Add Customer
      </button>

    </form>
  );
}

export default AddCustomerForm;