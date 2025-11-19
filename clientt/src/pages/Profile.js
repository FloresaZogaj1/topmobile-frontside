import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

function Profile() {
  const { token, logout } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetch(`${API_URL}/api/protected`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: "include"   // KJO ESHTE E RENDESISHME!
    })
      .then((res) => res.json())
      .then(setData)
      .catch(() => setData(null));
  }, [token, navigate]);

  if (!token) return null;

  return (
    <div>
      <h2>Profili juaj</h2>
      <button onClick={logout}>Dil</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default Profile;
