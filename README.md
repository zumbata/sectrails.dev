# SecurityTrails Explorer

A full-stack web app to explore SecurityTrails API data. Built with Vite + React on the frontend and Express on the backend.

---

## 🛠 Development Setup

```bash
# Frontend
cd client
npm install
npm run dev

# Backend
cd ../server
npm install
npm run dev
```

---

## 🚀 Deploy to Google Cloud Run (via GitHub Actions)

### Prerequisites

1. A Google Cloud project with Cloud Run, Cloud Build, Artifact Registry enabled.
2. A GitHub repository.
3. A service account key with permissions: `Cloud Run Admin`, `Storage Admin`, `Artifact Registry Writer`, `Cloud Build Editor`.

---

### 🔐 Setup GitHub Secrets

Add the following GitHub secrets:

| Key                    | Description                                      |
|------------------------|--------------------------------------------------|
| `GCLOUD_PROJECT`       | Your Google Cloud project ID                     |
| `GCLOUD_REGION`        | Region for deploying (e.g. `europe-west1`)       |
| `GCLOUD_SA_KEY`        | JSON key of your GCP service account             |
| `SECURITYTRAILS_API_KEY` | Your API key for SecurityTrails                |

---

## ✅ Result

The app will be accessible via a public Cloud Run HTTPS endpoint.

## ✅ ?

Yes.
