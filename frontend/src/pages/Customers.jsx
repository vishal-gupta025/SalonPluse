import {
  useEffect,
  useState,
  useRef
} from "react";

import toast from "react-hot-toast";

import DashboardLayout from "../layouts/DashboardLayout";

import CustomerTable from "../components/CustomerTable";
import {
  InlineErrorState,
  TableSkeleton
} from "../components/StateScreens";

import {
  getCustomersByDate,
  getCustomers,
  searchCustomers
} from "../api/customerApi";

function Customers() {

  const [customers, setCustomers] =
    useState([]);

  const getLocalToday = () => {
    const t = new Date();
    const yyyy = t.getFullYear();
    const mm = String(t.getMonth() + 1).padStart(2, "0");
    const dd = String(t.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const [selectedDate, setSelectedDate] =
    useState(getLocalToday());
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const suggestionsRef = useRef(null);
  const debounceRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    fetchCustomersByDate();

  }, []);
  const fetchCustomersByDate = async (dateParam) => {

    setLoading(true);
    setError("");

    try {

      const dateToUse = dateParam || selectedDate;

      const data = await getCustomersByDate(dateToUse);

      setCustomers(data);

    } catch (error) {
      const message =
        error.response?.data?.detail ||
        error.response?.data ||
        error.message ||
        "Failed to load customers. Please try again.";

      setError(message);
      toast.error(message);
      console.error("getCustomersByDate error:", error.response || error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (q) => {

    if (!q) {
      // if empty, fallback to date view
      setQuery("");
      setSuggestions([]);
      await fetchCustomersByDate();
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await searchCustomers(q);
      setCustomers(data);
      setQuery(q);

    } catch (error) {
      const message =
        error.response?.data?.detail ||
        error.response?.data ||
        error.message ||
        "Search failed";

      setError(message);
      toast.error(message);
      console.error("searchCustomers error:", error.response || error);

    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = async (e) => {
    const val = e.target.value;
    setSelectedDate(val);
    await fetchCustomersByDate(val);
  };

  // Debounced suggestions for typeahead
  useEffect(() => {
    if (!query || query.trim().length === 0) {
      setSuggestions([]);
      setActiveSuggestion(-1);
      return;
    }

    // debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      try {
        const data = await searchCustomers(query);
        // map unique names, keep id
        const seen = new Set();
        const items = (data || [])
          .map((c) => ({ id: c.id, name: c.name }))
          .filter((c) => {
            if (!c.name) return false;
            const key = c.name.toLowerCase();
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
          })
          .slice(0, 6);

        setSuggestions(items);
        setActiveSuggestion(-1);
      } catch (err) {
        // ignore suggestion errors silently
        console.error("suggestions error", err);
        setSuggestions([]);
      }
    }, 250);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  const handleSuggestionClick = async (item) => {
    if (!item) return;
    setQuery(item.name);
    setSuggestions([]);
    await handleSearch(item.name);
  };

  const handleInputKeyDown = (e) => {
    if (!suggestions || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveSuggestion((s) => Math.min(s + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveSuggestion((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter") {
      if (activeSuggestion >= 0 && suggestions[activeSuggestion]) {
        e.preventDefault();
        handleSuggestionClick(suggestions[activeSuggestion]);
      } else {
        // submit current query
        handleSearch(query);
      }
    } else if (e.key === "Escape") {
      setSuggestions([]);
      setActiveSuggestion(-1);
    }
  };

  return (
    <DashboardLayout>

      <div className="mb-8">
        <h1 className="dashboard-page-title">Customers</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
          Track daily customer visits and view customer history.
        </p>
      </div>

      <div className="mb-6 flex items-center gap-4">
        <div className="flex items-center gap-3">
          <label className="font-medium">Select Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="border rounded px-3 py-2"
          />
          <button
            onClick={async () => { setQuery(""); await fetchCustomersByDate(); }}
            className="dashboard-button-primary"
          >
            By Date
          </button>
        </div>

        <div className="ml-6 flex items-center gap-2">
          <div className="relative" style={{ minWidth: 260 }}>
            <input
              type="text"
              placeholder="Search customers..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleInputKeyDown}
              aria-autocomplete="list"
              className="border rounded px-3 py-2 w-full"
            />

            {suggestions && suggestions.length > 0 && (
              <div
                ref={suggestionsRef}
                className="absolute z-20 mt-1 w-full bg-white border rounded shadow divide-y"
              >
                {suggestions.map((s, idx) => (
                  <div
                    key={s.id || s.name}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleSuggestionClick(s)}
                    className={`px-3 py-2 cursor-pointer hover:bg-slate-100 ${idx === activeSuggestion ? 'bg-slate-100' : ''}`}
                  >
                    {s.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => handleSearch(query)}
            className="dashboard-button-primary"
          >
            Search
          </button>
        </div>

        <div className="ml-auto bg-white rounded-2xl px-4 py-3 shadow">
          <div className="text-sm text-slate-500">Customers Visited</div>
          <div className="text-2xl font-semibold">{customers.length}</div>
        </div>
      </div>

      {loading ? (
        <TableSkeleton rows={5} columns={4} />
      ) : error ? (
        <InlineErrorState
          title="Customers unavailable"
          message={error}
          onRetry={() => fetchCustomersByDate()}
        />
      ) : customers.length === 0 ? (
        <div className="dashboard-card text-center py-10">
          <h3 className="text-lg font-semibold">No customers visited on this date.</h3>
          <p className="mt-2 text-sm text-slate-500">Try a different date.</p>
        </div>
      ) : (
        <CustomerTable customers={customers} />
      )}

    </DashboardLayout>
  );
}

export default Customers;