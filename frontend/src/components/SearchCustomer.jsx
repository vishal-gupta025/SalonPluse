function SearchCustomer({
  query,
  setQuery,
  onSearch
}) {

  return (
    <div className="dashboard-card mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">

      <input
        type="text"
        placeholder="Search customer..."
        className="dashboard-input"
        value={query}
        onChange={(e) =>
          setQuery(e.target.value)
        }
      />

      <button
        onClick={onSearch}
        className="dashboard-button-primary w-full sm:w-auto"
      >
        Search
      </button>

    </div>
  );
}

export default SearchCustomer;