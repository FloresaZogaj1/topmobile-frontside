import "./Legal.css";

export default function Warranties() {
  return (
    <main className="legal-page">
      <h1 className="legal-title">Garancia &amp; Servisi</h1>
      <p className="legal-updated"><em>Përditësuar: 25 Gusht 2025</em></p>

      <p className="legal-lead">
        Faleminderit që zgjodhët <strong>Top Mobile</strong>. Kjo faqe shpjegon kushtet e garancisë për pajisjet dhe
        shërbimet tona. Për çdo paqartësi, na shkruani: <a href="mailto:info@topmobile.store" className="legal-link">info@topmobile.store</a>.
      </p>

      <section className="legal-section">
        <h2>1. Kohëzgjatja e garancisë</h2>
        <ul>
        <li><strong>Pajisje të reja</strong>: 12 muaj garanci standarde.</li>
        <li><strong>Pajisje të rinovuara (refurbished)</strong>: 6 muaj garanci.</li>
        <li><strong>Aksesorë</strong> (karikues, kabllo, kufje, etj.): 6 muaj garanci (për defekte prodhimi).</li>
        <li><strong>Shërbime riparimi</strong> (servis): 3 muaj garanci për pjesën/punën e zëvendësuar.</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>2. Çfarë mbulon garancia</h2>
        <ul>
        <li>Defekte prodhimi dhe dështime funksionale jo-të shkaktuara nga përdoruesi.</li>
        <li>Riparim ose zëvendësim i pjesëve sipas vlerësimit të servis-it.</li>
        <li>DOA (Dead On Arrival): nëse pajisja rezulton me defekt brenda 72 orëve nga pranimi, ofrohet zëvendësim i shpejtë ose rimbursim.</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>3. Çfarë <u>nuk</u> mbulon garancia</h2>
        <ul>
        <li>Dëmtime fizike: ekran i thyer, goditje, gërvishtje, deformime, djegie.</li>
        <li>Dëmtime nga lëngjet/uje, oksidim, lagështi, pluhur i tepërt.</li>
        <li>Ndërhyrje jo-zyrtare, root/jailbreak, flash ROM, ndryshim IMEI, manipulime softuerike.</li>
        <li>Konsum natyral: bateri me ulje kapaciteti gjatë përdorimit, aksesorë të konsumueshëm.</li>
        <li>Humbje e të dhënave; ju lutemi bëni <strong>backup</strong> para dorëzimit.</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>4. Si të paraqisni garanci (RMA)</h2>
        <ol>
  <li>Na kontaktoni: <a href="mailto:info@topmobile.store" className="legal-link">info@topmobile.store</a> ose WhatsApp: +383 045 407 222</li>
        <li>Na dërgoni: numrin e porosisë/faturës, përshkrimin e defektit, foto/video.</li>
        <li>Dërgoni pajisjen me paketimin bazë dhe aksesorët përkatës; mos përfshini kartela SIM/SD.</li>
        </ol>
        <p>
        Vlerësimi paraprak zakonisht kryhet brenda 1–3 ditëve pune. Në varësi të rastit, koha e riparimit mund të ndryshojë
        (pjesë origjinale, furnizues, autorizime të prodhuesit).
        </p>
      </section>

      <section className="legal-section">
        <h2>5. Zgjidhjet e mundshme</h2>
        <ul>
        <li>Riparim pa kosto gjatë garancisë, nëse defekti mbulohet.</li>
        <li>Zëvendësim me produkt të njëjtë ose të ngjashëm (nëse riparimi nuk është i mundur brenda një periudhe të arsyeshme).</li>
        <li>Rimbursim proporcional në rast pamundësie riparimi/zëvendësimi.</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>6. Transporti &amp; kosto</h2>
        <ul>
        <li>Transporti i pajisjes drejt servis-it: zakonisht nga blerësi, përveç rasteve DOA ose gabim i dërgimit.</li>
        <li>Transporti kthim pas riparimit: zakonisht nga ne (sipash rastit/garancisë).</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>7. Garancia e prodhuesit</h2>
        <p>
        Disa marka ofrojnë garanci ndërkombëtare/rajonale. Nëse pajisja juaj mbulohen nga prodhuesi, mund të orientohemi
        për procedurat e tyre zyrtare.
        </p>
      </section>

      <section className="legal-section">
        <h2>8. Pas-garancisë</h2>
        <p>Ofronim servis të paguar (pjesë origjinale, transparencë çmimesh) edhe pas skadimit të garancisë.</p>
      </section>

      <section className="legal-section">
        <h2>Kontakt</h2>
        <p>
          Servis &amp; garanci: <a href="mailto:info@topmobile.store" className="legal-link">info@topmobile.store</a> · +383 048 723 720
        </p>
      </section>

      <p className="legal-note">
        <strong>Shënim:</strong> Politikat janë orientuese dhe mund të përshtaten sipas legjislacionit në fuqi dhe
        kushteve të furnitorëve/prodhuesve. Për këshillë ligjore specifike, konsultohuni me jurist.
      </p>
    </main>
  );
}
