// Simple warranty print component - clean approach
import React, { useState } from "react";
import {
  Box, Typography, TextField, Button, MenuItem, Paper, Alert, Select, FormControl, InputLabel
} from "@mui/material";
import logo from "../assets/PFP-01__5_-removebg-preview.png";
import { api } from "../api";
import { useAuth } from "../AuthContext";

// Marrim datën në format DD.MM.YYYY
const getTodayDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  return `${day}.${month}.${year}`;
};

// Simple print CSS
const printCSS = `
  .warranty-print-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .warranty-print-content {
    background: white;
    color: black;
    width: 90%;
    max-width: 800px;
    max-height: 90%;
    overflow: auto;
    padding: 20px;
    position: relative;
  }
  
  .warranty-close {
    position: absolute;
    top: 10px;
    right: 15px;
    background: #f44336;
    color: white;
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
  
  @media print {
    .warranty-print-modal {
      background: white !important;
      position: static !important;
    }
    
    .warranty-close {
      display: none !important;
    }
    
    body * {
      visibility: hidden;
    }
    
    .warranty-print-modal, .warranty-print-modal * {
      visibility: visible;
    }
  }
`;

const SimpleWarrantyPrint = ({ printData, onClose }) => {
  if (!printData) return null;
  
  return (
    <>
      <style>{printCSS}</style>
      <div className="warranty-print-modal">
        <div className="warranty-print-content">
          <button className="warranty-close" onClick={onClose}>×</button>
          
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <img src={logo} alt="Top Mobile" style={{ width: '80px', marginBottom: '10px' }} />
            <h2>FLETË GARANCIONI</h2>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <p><strong>Klienti:</strong> {printData.emri} {printData.mbiemri}</p>
            <p><strong>Telefoni:</strong> {printData.telefoni}</p>
            <p><strong>Email:</strong> {printData.email}</p>
            <p><strong>Data e fillimit:</strong> {printData.data}</p>
            <p><strong>Çmimi:</strong> {printData.cmimi}€</p>
          </div>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
            <thead>
              <tr style={{ background: '#f0f0f0' }}>
                <th style={{ border: '1px solid black', padding: '8px' }}>Modeli</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>IMEI</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Software</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Garancioni</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: '1px solid black', padding: '8px' }}>{printData.modeli}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{printData.imei}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{printData.softInfo}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{printData.kohezgjatja}</td>
              </tr>
            </tbody>
          </table>
          
          <div style={{ fontSize: '12px', lineHeight: '1.4' }}>
            <h3>Kushtet e Garancionit</h3>
            <p>Periudha e Garancionit fillon nga data e blerjes dhe perfundon ne afatin e shprehur ne Fletë Garancion...</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SimpleWarrantyPrint;