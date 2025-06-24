

import React, { useEffect, useState } from "react";
import axios from "axios";

const Subdomains = ({ apiKey, queryValue, setResult }) => {
  const [subdomains, setSubdomains] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!apiKey || !queryValue) return;

    const fetchSubdomains = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`/api/domain/${queryValue}/subdomains`, {
          headers: { apikey: apiKey }
        });
        setSubdomains(res.data.subdomains || []);
        setResult(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubdomains();
  }, [apiKey, queryValue]);

  if (loading) return <p className="text-sm text-gray-600">Loading subdomains...</p>;
  if (error) return <p className="text-sm text-red-600">Error: {error}</p>;

  return (
    <div className="mt-4 bg-white p-4 border rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Subdomains</h2>
      {subdomains.length === 0 ? (
        <p className="text-sm text-gray-600">No subdomains found.</p>
      ) : (
        <ul className="columns-2 sm:columns-3 md:columns-4 gap-2 list-disc list-inside text-sm">
          {subdomains.map((sub, i) => (
            <li key={i}>{sub}.{queryValue}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Subdomains;