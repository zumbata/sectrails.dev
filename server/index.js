import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());

const KEY = process.env.SECURITYTRAILS_API_KEY;
const root = fileURLToPath(new URL(".", import.meta.url));

// Serve frontend
app.use(express.static(path.join(root, "../client/dist")));
app.get("/", (req, res) => res.sendFile(path.join(root, "../client/dist/index.html")));
app.get("*", (req, res) => res.sendFile(path.join(root, "../client/dist/index.html")));

// ----------- SecurityTrails API proxy routes -----------

async function proxyRequest(res, url, options = {}) {
  try {
    const resp = await fetch(url, {
      ...options,
      headers: {
        APIKEY: KEY,
        ...(options.headers || {}),
      },
    });
    const data = await resp.json();
    res.status(resp.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Domain details
app.get("/api/domain_details/:domain", (req, res) => {
  const url = `https://api.securitytrails.com/v1/domain/${req.params.domain}`;
  proxyRequest(res, url);
});

// Domain WHOIS
app.get("/api/domain_whois/:domain", (req, res) => {
  const url = `https://api.securitytrails.com/v1/domain/${req.params.domain}/whois`;
  proxyRequest(res, url);
});

// WHOIS history
app.get("/api/domain_whois_history/:domain", (req, res) => {
  const q = req.query.page ? `?page=${req.query.page}` : "";
  const url = `https://api.securitytrails.com/v1/history/${req.params.domain}/whois${q}`;
  proxyRequest(res, url);
});

// DNS history
app.get("/api/dns_history/:domain/:type", (req, res) => {
  const { domain, type } = req.params;
  const q = req.query.page ? `?page=${req.query.page}` : "";
  const url = `https://api.securitytrails.com/v1/history/${domain}/dns/${type}${q}`;
  proxyRequest(res, url);
});

// Subdomains
app.get("/api/subdomains/:domain", (req, res) => {
  const url = `https://api.securitytrails.com/v1/domain/${req.params.domain}/subdomains`;
  proxyRequest(res, url);
});

// Tags
app.get("/api/domain_tags/:domain", (req, res) => {
  const url = `https://api.securitytrails.com/v1/domain/${req.params.domain}/tags`;
  proxyRequest(res, url);
});

// Associated domains
app.get("/api/associated_domains/:domain", (req, res) => {
  const url = `https://api.securitytrails.com/v1/domain/${req.params.domain}/associated`;
  proxyRequest(res, url);
});

// Domain SSL
app.get("/api/domain_ssl/:domain", (req, res) => {
  const include = req.query.include_subdomains === "true" ? "?include_subdomains=true" : "";
  const url = `https://api.securitytrails.com/v1/domain/${req.params.domain}/ssl${include}`;
  proxyRequest(res, url);
});

// IP details (domains + whois)
app.get("/api/ip_details/:ip", async (req, res) => {
  const { ip } = req.params;
  try {
    const domainsList = await fetch(
      "https://api.securitytrails.com/v1/domains/list",
      {
        method: "POST",
        headers: { APIKEY: KEY, "Content-Type": "application/json" },
        body: JSON.stringify({ filter: { ipv4: ip } }),
      }
    );
    const domains = await domainsList.json();

    const ipWhois = await fetch(
      `https://api.securitytrails.com/v1/ips/${ip}/whois`,
      { headers: { APIKEY: KEY } }
    );
    const whois = await ipWhois.json();

    res.json({ ip, domains, whois });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// IP neighbors
app.get("/api/ip_neighbors/:ip", (req, res) => {
  const url = `https://api.securitytrails.com/v1/ips/nearby/${req.params.ip}`;
  proxyRequest(res, url);
});

// IP WHOIS (auxiliary)
app.get("/api/ip_whois/:ip", (req, res) => {
  const url = `https://api.securitytrails.com/v1/ips/${req.params.ip}/whois`;
  proxyRequest(res, url);
});

// IP useragents
app.get("/api/ip_useragents/:ip", (req, res) => {
  const url = `https://api.securitytrails.com/v1/ips/${req.params.ip}/useragents`;
  proxyRequest(res, url);
});

// Search domains (filter or DSL)
app.post("/api/search_domains", (req, res) => {
  const url = "https://api.securitytrails.com/v1/domains/list";
  proxyRequest(res, url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req.body),
  });
});

// Domain search stats
app.post("/api/search_domains_stats", (req, res) => {
  const url = "https://api.securitytrails.com/v1/domains/stats";
  proxyRequest(res, url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req.body),
  });
});

// Scroll
app.get("/api/scroll/:id", (req, res) => {
  const url = `https://api.securitytrails.com/v1/scroll/${req.params.id}`;
  proxyRequest(res, url);
});

// IP search (DSL)
app.post("/api/search_ips", (req, res) => {
  const url = "https://api.securitytrails.com/v1/ips/list";
  proxyRequest(res, url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req.body),
  });
});

// IP stats (DSL)
app.post("/api/search_ips_stats", (req, res) => {
  const url = "https://api.securitytrails.com/v1/ips/stats";
  proxyRequest(res, url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req.body),
  });
});

// Ping & usage
app.get("/api/ping", (req, res) => {
  const url = "https://api.securitytrails.com/v1/ping";
  proxyRequest(res, url);
});
app.get("/api/usage", (req, res) => {
  const url = "https://api.securitytrails.com/v1/account/usage";
  proxyRequest(res, url);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API listening at http://localhost:${PORT}`));