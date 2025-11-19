// WarrantyPrint.jsx (DARK + print full-bleed A4)
import React, { forwardRef } from "react";

const warrantyCSS = `
  :root{
    --bg:#0e0f12;
    --card:#16171c;
    --border:#2a2f3a;
    --text:#e9edf1;
    --muted:#b0b8c6;
    --accent:#ff8000;
    --accent-2:#e67300;
    --row:#0f1116;
    --row-alt:#12141a;
    --thead:#20232b;
  }

  /* ====== SCREEN ====== */
  .warranty-sheet {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: 'Arial', sans-serif;

    width: 670px;               /* ekran */
    margin: 0 auto;
    background: var(--card);
    color: var(--text);
    border-radius: 14px;
    border: 1px solid var(--border);
    box-shadow: 0 20px 50px rgba(0,0,0,.45);
    padding: 28px 38px;
  }

  .warranty-logo-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }
  .warranty-logo-row img {
    height: 52px;
    display:block;
  }
  .warranty-company {
    text-align:right;
    font-size: 0.97rem;
    line-height: 1.35;
    color: var(--muted);
  }
  .warranty-company b{
    color: var(--text);
  }

  .warranty-header {
    text-align: center;
    margin: 14px 0 18px 0;
    font-size: 1.2rem;
    font-weight: 800;
    letter-spacing: .5px;
    color: var(--text);
  }

  .warranty-grid {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 0 38px;
    margin-bottom: 12px;
  }
  .warranty-label {
    font-weight: 800;
    min-width: 100px;
    display: inline-block;
    margin-right: 6px;
    color: var(--muted);
  }
  .warranty-details-row {
    margin-bottom: 8px;
    font-size: 1rem;
    color: var(--text);
  }

  .warranty-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
    margin-bottom: 16px;
    font-size: 1rem;
    border: 1px solid var(--border);
    background: var(--row);
  }
  .warranty-table th, .warranty-table td {
    border: 1px solid var(--border);
    padding: 6px 8px;
    text-align: center;
  }
  .warranty-table thead th {
    background: var(--thead);
    color: var(--text);
    font-weight: 800;
  }
  .warranty-table tbody td {
    background: var(--row);
    color: var(--text);
  }
  .warranty-table tbody tr:nth-child(even) td{
    background: var(--row-alt);
  }

  .warranty-section-title {
    margin-top: 16px;
    font-size: 1.04rem;
    font-weight: 800;
    color: var(--accent);
    letter-spacing: .2px;
  }
  .warranty-kushtet {
    font-size: 0.98rem;
    line-height: 1.7;
    margin-bottom: 0;
    margin-top: 10px;
    color: var(--text);
  }
  .warranty-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 28px;
    align-items: flex-end;
    font-size: 0.96rem;
    color: var(--muted);
  }

  /* Badges / code look for IMEI (opsionale) */
  .warranty-code{
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
    background:#101217;
    border:1px dashed #323644;
    padding:3px 6px;
    border-radius:6px;
    display:inline-block;
  }

  /* ====== PRINT ====== */
  @page { size: A4; margin: 0; }

  @media print {
    /* 1) Full-bleed dark background, pa margjina të bardha */
    html, body {
      margin: 0 !important;
      padding: 0 !important;
      background: var(--bg) !important;
      -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
    }

    /* 2) Shfaq VETËM fletën e garancionit */
    body * { visibility: hidden; }
    .warranty-sheet, .warranty-sheet * { visibility: visible !important; }

    /* 3) Fletë fikse A4, pa border/shadow, një faqe */
    .warranty-sheet {
      position: absolute;
      left: 0; top: 0;
      width: 210mm !important;
      height: 297mm !important;
      min-height: 297mm !important;
      padding: 12mm !important;        /* rregulloje 8–14mm sipas qejfit */
      box-shadow: none !important;
      border: none !important;
      background: var(--bg) !important;
      color: var(--text) !important;
      overflow: hidden !important;      /* parandalon krijimin e faqes 2 */
    }

    /* 4) Tabela pa të bardha */
    .warranty-table { background: var(--row) !important; border-color: var(--border) !important; }
    .warranty-table th,
    .warranty-table td { border-color: var(--border) !important; }
    .warranty-table thead th { background: var(--thead) !important; color: var(--text) !important; }
    .warranty-table tbody td { background: var(--row) !important; color: var(--text) !important; }

    /* 5) Siguro ngjyrat e dark mode në print */
    .warranty-sheet *{
      -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
    }
  }
`;

const WarrantyPrint = forwardRef(({
  logo,
  company,
  address,
  phone,
  klienti,
  dataFillimit,
  cmimi,
  modeli,
  imei,
  software,
  kohezgjatja,
}, ref) => (
  <>
    <style>{warrantyCSS}</style>
    <div className="warranty-sheet" ref={ref}>
      <div className="warranty-logo-row">
        <img src={logo} alt="Logo" />
        <div className="warranty-company">
          <div><b>{company}</b></div>
          <div>{address}</div>
          <div>TEL: {phone}</div>
        </div>
      </div>

      <div className="warranty-header">Fletë Garancioni</div>

      <div className="warranty-grid">
        <div>
          <div className="warranty-details-row"><span className="warranty-label">Klienti:</span> {klienti}</div>
          <div className="warranty-details-row"><span className="warranty-label">Data e fillimit të garancionit:</span> {dataFillimit}</div>
        </div>
        <div>
          <div className="warranty-details-row"><span className="warranty-label">Detajet:</span> Çmimi: {cmimi}€</div>
        </div>
      </div>

      <table className="warranty-table">
        <thead>
          <tr>
            <th>Modeli</th>
            <th>IMEI</th>
            <th>Software Info</th>
            <th>Kohëzgjatja e garancionit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{modeli}</td>
            <td><span className="warranty-code">{imei}</span></td>
            <td>{software}</td>
            <td>{kohezgjatja}</td>
          </tr>
        </tbody>
      </table>

      <div className="warranty-section-title">Kushtet e Garancionit</div>
      <div className="warranty-kushtet">
        Periudha e Garancionit fillon nga data e blerjes dhe përfundon në afatin e shprehur në Fletë Garancion. Shërbimi i garancionit do të kryhet në ambientet e servisit të Top Mobile.<br /><br />
        <b>Garancioni mbulon riparimin (kthimin në gjendje pune) falas të produkteve të shitura nga Top Mobile, duke plotësuar njëkohësisht të gjitha kushtet e mëposhtme:</b><br />
        - Defekti i produktit është me origjinë prodhimi / nga fabrika<br />
        - Produkti shoqërohet me Faturën e blerjes dhe Fletën e Garancisë<br />
        - Produkti nuk është hapur nga persona të paautorizuar me shkrim nga Top Mobile<br />
        Top Mobile ka për obligim eliminimin e defektit sa më të shpejtë, në rastin më të keq për një periudhë 30 ditore.<br /><br />

        <b>Garancioni nuk vlen në këto raste:</b><br />
        - Dëmtime fizike nga keqpërdorimi, pakujdesia, etj.<br />
        - Përditësimi i software / sistemit operativ (update/downgrade), etj.<br />
        - Përdorimi i produktit në ambiente të papërshtatshme (lagështi, nxehtësi, etj.)<br />
        - Dëmtime nga tension i lartë/ulët i rrymës elektrike, dëmtime termike apo mekanike, rrufeja, etj.<br />
        - Dëmtime nga ekspozimi i pajisjes ndaj lagështisë, nxehtësisë, tymit, dridhjeve, papastërtive, apo kushteve të jashtëzakonshme.<br />
        - Nëse numri në fletë-garancion nuk përputhet me IMEI numrin në aparat.<br />
        - Nëse blerësi nuk e ka fletë-garancionin.<br />
        - Nëse pajisja është hapur/tentuar të riparohet nga person pa autorizim nga servisi i Top Mobile.<br />
      </div>

      <div className="warranty-footer">
        <div><b>Top Mobile</b></div>
        <div>Klienti</div>
      </div>
    </div>
  </>
));
export default WarrantyPrint;
