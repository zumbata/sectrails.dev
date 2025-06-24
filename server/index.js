// server/index.js

import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const API_KEY = process.env.SECURITYTRAILS_API_KEY;

app.use(cors());
app.use(express.json());


// Add these for resolving __dirname with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from Vite build
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

const BASE_URL = "https://api.securitytrails.com/v1";

const makeRequest = async (endpoint, res) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      headers: { apikey: API_KEY },
    });
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: err.message });
  }
};

app.get("/api/ip/:ip", (req, res) => {
  makeRequest(`/ip/${req.params.ip}`, res);
});

app.get("/api/domain/:domain", (req, res) => {
  makeRequest(`/domain/${req.params.domain}`, res);
});

app.get("/api/domain/:domain/whois", (req, res) => {
  makeRequest(`/domain/${req.params.domain}/whois`, res);
});

app.get("/api/domain/:domain/subdomains", (req, res) => {
  makeRequest(`/domain/${req.params.domain}/subdomains`, res);
});

app.get("/api/domain/:domain/tags", (req, res) => {
  makeRequest(`/domain/${req.params.domain}/tags`, res);
});

app.get("/api/history/:domain/dns/a", (req, res) => {
  makeRequest(`/history/${req.params.domain}/dns/a`, res);
});

app.get("/api/domain/:domain/associated", (req, res) => {
  makeRequest(`/domain/${req.params.domain}/associated`, res);
});

app.post("/api/ips/stats", async (req, res) => {
  try {
    const response = await axios.post(`${BASE_URL}/ips/stats`, req.body, {
      headers: {
        apikey: API_KEY,
        "Content-Type": "application/json",
      },
    });
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));