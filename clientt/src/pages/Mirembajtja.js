import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, MenuItem, Paper, Alert } from "@mui/material";
import jsPDF from "jspdf";
import emailjs from 'emailjs-com'; // import EmailJS for email notifications
import autoTable from "jspdf-autotable";
import logo from "../assets/PFP-01__5_-removebg-preview.png";

const Mirembajtja = () => {
  const [form, setForm] = useState({
    emri: "",
    imei: "",
    llojiPageses: "",
    data: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    const generateRandomIMEI = () => '35' + Math.floor(1e12 + Math.random() * 9e12);
    setForm(prev => ({ ...prev, imei: generateRandomIMEI() }));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
    setIsPaid(false);
  };

  const handleSubmit = () => {
    if (!form.emri || !form.data || !form.llojiPageses) {
      return setError("Ju lutem plotësoni të gjitha fushat para ruajtjes.");
    }
    if (form.llojiPageses === "Cash" && !isPaid) {
      return setError("Ju lutem kryeni pagesën para se të ruani draftin.");
    }
    setSuccess("Draft u ruajt me sukses.");
  };

  const createPDF = doc => {
    // Header
    doc.addImage(logo, "PNG", 20, 15, 40, 20);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("KONTRATË MIRËMBAJTJE SOFTUER", 105, 25, { align: 'center' });
    doc.setLineWidth(0.5);
    doc.line(20, 40, 190, 40);

    // Company Info
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Top Mobile Shop & Service L.L.C.", 20, 45);
    doc.text("Adresa: Bulevardi Dëshmorët e Kombit, Ulpianë, Prishtinë", 20, 50);
    doc.text("Tel: +383 49 123 456 | Email: topmobileshopservice@gmail.com", 20, 55);

    // Contract Details
    autoTable(doc, {
      startY: 60,
      theme: 'grid',
      head: [["Fusha", "Detajet"]],
      body: [
        ["Emri i klientit", form.emri],
        ["IMEI pajisjes", form.imei],
        ["Lloji i pagesës", form.llojiPageses],
        ["Data kontratës", form.data]
      ],
      styles: { fontSize: 10, cellPadding: 3 }
    });

    // Services
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Shërbimet e përfshira:", 20, doc.lastAutoTable.finalY + 15);
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 20,
      margin: { left: 20 },
      head: [["Nr.", "Përshkrimi i shërbimit"]],
      body: [
        [1, "Instalimi i Sistemit Operativ"],
        [2, "Përditësimet e softuerit"],
        [3, "Heqja e viruseve/maluerit"],
        [4, "Transferimi i të dhënave"],
        [5, "Konsulta teknike"]
      ],
      styles: { fontSize: 10, cellPadding: 3 }
    });

    // Footer clauses
    let footerY = doc.lastAutoTable.finalY + 15;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Klauzola:", 20, footerY);
    doc.text("1. Politika 'No fix, no fee' zbatohet në këtë kontratë.", 25, footerY + 6);
    doc.text("2. Niveli i shërbimit dhe afatet specifikohen më tej sipas nevojës.", 25, footerY + 12);
    doc.text("3. Top Mobile garanton konfidencialitetin dhe ruajtjen e të dhënave.", 25, footerY + 18);

    // Signatures
    const signY = footerY + 30;
    doc.setLineWidth(0.3);
    doc.line(20, signY, 85, signY);
    doc.text("Nënshkrimi Klientit", 20, signY + 5);
    doc.line(125, signY, 190, signY);
    doc.text("Përfaqësuesi i Top Mobile", 125, signY + 5);
    doc.text(`Data: ${form.data}`, 20, signY + 15);

    return doc;
  };

  const handlePrint = () => {
    if (!form.emri || !form.data || !form.llojiPageses) {
      return setError("Ju lutem plotësoni të gjitha fushat para gjenerimit.");
    }
    if (!isPaid && ["Transfer Bankar", "POS"].includes(form.llojiPageses)) {
      return setError("Ju lutem konfirmoni pagesën para printimit.");
    }

    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    createPDF(doc).save(`Kontrata_${form.emri}_${form.imei}.pdf`);
    setSuccess("Kontrata u gjenerua me sukses.");
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 6, p: 4 }}>
      <Typography variant="h5" fontWeight={700} mb={3}>
        Kontratë Mirëmbajtjeje Softuerësh
      </Typography>

      <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <TextField label="Emri i klientit" name="emri" value={form.emri} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
        <TextField label="IMEI (auto-gjenerohet)" name="imei" value={form.imei} disabled fullWidth sx={{ mb: 2 }} />
        <TextField select label="Lloji i pagesës" name="llojiPageses" value={form.llojiPageses} onChange={handleChange} fullWidth sx={{ mb: 2 }}>
          <MenuItem value="Cash">Cash</MenuItem>
          <MenuItem value="Transfer Bankar">Transfer Bankar</MenuItem>
          <MenuItem value="POS">POS</MenuItem>
        </TextField>
        <TextField label="Data" name="data" type="date" value={form.data} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} sx={{ mb: 3 }} />

        <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" color="warning" fullWidth onClick={handleSubmit} disabled={form.llojiPageses === "Cash" && !isPaid}>
              Ruaj Draft
            </Button>
            <Button variant="outlined" color="success" fullWidth onClick={handlePrint} disabled={form.llojiPageses === "Cash" && !isPaid}>
              Printo Kontratën
            </Button>
          </Box>

          {["POS", "Transfer Bankar", "Cash"].includes(form.llojiPageses) && (
            <Alert severity="info" sx={{ mt: 2 }}>
              <Typography fontWeight={600}>Hapat për përfundimin e pagesës:</Typography>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {form.llojiPageses === "POS" ? (
                  <> <li>Paraqit kartelën në terminal.</li><li>Konfirmo shumën.</li> </>
                ) : (
                  <> <li>Bëj transfer në IBAN: XK05 0000 0000 0000 000</li><li>Qëllim: Mirëmbajtje Softuer IMEI {form.imei}</li> </>
                )}
              </ul>
              <Box textAlign="right" mt={2}>
                <Button variant="contained" size="small" sx={{ backgroundColor: "#023047", '&:hover': { backgroundColor: '#012c3a' } }} onClick={() => { setIsPaid(true); handleSubmit(); // Send draft PDF data via email
                emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
                  to_email: 'topmobileshopservice@gmail.com',
                  client_name: form.emri,
                  imei: form.imei,
                  payment_type: form.llojiPageses,
                  contract_date: form.data
                }, 'YOUR_USER_ID')
                .then(() => {
                  console.log('Email successfully sent!');
                }, (err) => {
                  console.error('Email send error:', err);
                }); }}>
                  Konfirmo Pagesën
                </Button>
              </Box>
            </Alert>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Mirembajtja;
