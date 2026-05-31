import { useState } from "react";

function AddExpenseForm({
  onAdd
}) {

  const [title, setTitle] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    if (!title.trim() || !amount.trim() || Number(amount) <= 0) {
      return;
    }

    await onAdd({
      title,
      amount: Number(amount)
    });

    setTitle("");
    setAmount("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="dashboard-card mb-6"
    >

      <h2 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
        Add Expense
      </h2>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">

        <input
          type="text"
          placeholder="Expense Title"
          className="dashboard-input"
          required
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Amount"
          className="dashboard-input"
          min="0.01"
          step="0.01"
          required
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
        />

      </div>

      <button
        type="submit"
        className="dashboard-button-primary mt-5 w-full md:w-auto"
      >
        Add Expense
      </button>

    </form>
  );
}

export default AddExpenseForm;