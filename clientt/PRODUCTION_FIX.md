// Quick fix for production warranty API endpoint
// Change from /api/warranty to /warranty (because base URL already has /api)

// File: src/components/AdminCustomerWarranties.js, line 30:
// OLD: const { data } = await api.get(`/api/warranty`);
// NEW: const { data } = await api.get(`/warranty`);

// File: src/pages/AdminKontratat.jsx, line ~35:
// OLD: const { data } = await api.get("/api/contracts/softsave");  
// NEW: const { data } = await api.get("/contracts/softsave");

// File: src/pages/Mirembajtja.js:
// OLD: const { data: json } = await api.post("/api/contracts/softsave", payload);
// NEW: const { data: json } = await api.post("/contracts/softsave", payload);

// REASON: api instance already has baseURL with /api prefix, so adding /api creates /api/api/...