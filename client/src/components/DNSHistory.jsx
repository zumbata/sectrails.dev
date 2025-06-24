

import React, { useEffect, useState } from "react";
import axios from "axios";

const DNSHistory = ({ apiKey, queryValue, setResult }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!apiKey || !queryValue) return;

    const fetchDNSHistory = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`/api/history/${queryValue}/dns/a`, {
          headers: { apikey: apiKey }
        });
        setRecords(res.data.records || []);
        setResult(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDNSHistory();
  }, [apiKey, queryValue]);

  if (loading) return <p className="text-sm text-gray-600">Loading DNS history...</p>;
  if (error) return <p className="text-sm text-red-600">Error: {error}</p>;

  return (
    <div className="mt-4 bg-white p-4 border rounded shadow">
      <h2 className="text-lg font-semibold mb-4">DNS A Record History</h2>
      <table className="w-full table-auto text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-2">First Seen</th>
            <th className="text-left p-2">Last Seen</th>
            <th className="text-left p-2">Organizations</th>
            <th className="text-left p-2">IP Addresses</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, i) => (
            <tr key={i} className="border-t">
              <td className="p-2">{record.first_seen || "—"}</td>
              <td className="p-2">{record.last_seen || "—"}</td>
              <td className="p-2">{(record.organizations || []).join(", ")}</td>
              <td className="p-2">
                {(record.values || []).map((v) => `${v.ip} (${v.ip_count})`).join(", ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DNSHistory;