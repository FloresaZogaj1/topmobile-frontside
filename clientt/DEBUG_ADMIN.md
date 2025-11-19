<!-- Debug Admin Authentication -->
<!-- Hap browser Console (F12) dhe shtyp: -->

// 1. Kontrollo nëse ke token
console.log("Token:", localStorage.getItem("tm_token") || localStorage.getItem("token"));

// 2. Kontrollo base URL
console.log("API Base URL:", process.env.REACT_APP_API_URL || (window.location.origin.replace(/\/$/, '') + '/api'));

// 3. Test një API call direkt
fetch('/api/warranty', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem("tm_token") || localStorage.getItem("token")}`,
    'Content-Type': 'application/json'
  }
})
.then(response => {
  console.log("API Response Status:", response.status);
  return response.text();
})
.then(text => console.log("API Response:", text))
.catch(error => console.log("API Error:", error));

// 4. Nëse s'ke token, logohu si admin:
// https://www.topmobile.store/login