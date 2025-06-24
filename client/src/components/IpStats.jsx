

import React, { useEffect, useState } from "react";
import axios from "axios";

const IpStats = ({ apiKey, queryValue, setResult }) => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!apiKey || !queryValue) return;

    const fetchIpStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.post(
          "/api/ips/stats",
          { query: `ip = '${queryValue}'` },
          { headers: { apikey: apiKey } }
        );
        setStats(res.data);
        setResult(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIpStats();
  }, [apiKey, queryValue]);

  if (loading) return <p className="text-sm text-gray-600">Loading IP stats...</p>;
  if (error) return <p className="text-sm text-red-600">Error: {error}</p>;

  return (
    <div className="mt-4 bg-white p-4 border rounded shadow">
      <h2 className="text-lg font-semibold mb-4">IP Stats</h2>

      {stats?.ports?.length > 0 && (
        <>
          <h3 className="font-medium mb-2">Top Open Ports</h3>
          <ul className="list-disc list-inside text-sm mb-4">
            {stats.ports.map((port, i) => (
              <li key={i}>Port {port.key}: {port.count} hosts</li>
            ))}
          </ul>
        </>
      )}

      {stats?.top_ptr_patterns?.length > 0 && (
        <>
          <h3 className="font-medium mb-2">Top PTR Patterns</h3>
          <ul className="list-disc list-inside text-sm">
            {stats.top_ptr_patterns.map((ptr, i) => (
              <li key={i}>{ptr.key}: {ptr.count}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default IpStats;