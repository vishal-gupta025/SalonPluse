import { useState } from "react";

function AddServiceForm({
  onAdd
}) {

  const [name, setName] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [description,
    setDescription] = useState("");

  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    await onAdd({
      name,
      price: Number(price),
      description
    });

    setName("");
    setPrice("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="dashboard-card mb-6"
    >

      <h2 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
        Add Service
      </h2>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">

        <input
          type="text"
          placeholder="Service Name"
          className="dashboard-input"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Price"
          className="dashboard-input"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Description"
          className="dashboard-input"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

      </div>

      <button
        type="submit"
        className="dashboard-button-primary mt-5 w-full md:w-auto"
      >
        Add Service
      </button>

    </form>
  );
}

export default AddServiceForm;