

import React, { useEffect, useState } from "react";
import axios from "axios";

const ResultViewer = ({ apiKey, queryValue, endpoint, setResult }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!apiKey || !queryValue || !endpoint) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setResult(null);
      try {
        const res = await axios.get(`/api/${endpoint.replace(/_/g, "/")}/${queryValue}`, {
          headers: { apikey: apiKey }
        });
        setData(res.data);
        setResult(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiKey, queryValue, endpoint]);

  if (loading) return <p className="text-sm text-gray-600">Loading...</p>;
  if (error) return <p className="text-sm text-red-600">Error: {error}</p>;
  if (!data) return null;

  return (
    <div className="bg-white p-4 mt-4 border rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Raw Output</h2>
      <pre className="text-xs overflow-x-auto">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ResultViewer;