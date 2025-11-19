import React from "react";
import "./Legal.css"; // ⬅️ shtoje këtë file (shih poshtë CSS)

export default function Term() {
  return (
    <main className="legal-page">
      <h1 className="legal-title">Kushtet e Përdorimit &amp; Shitjes</h1>
      <p className="legal-updated"><em>Përditësuar: 25 Gusht 2025</em></p>

      <p className="legal-lead">
        Duke përdorur këtë faqe dhe duke kryer porosi, pajtoheni me këto kushte. Ju lutemi lexoni me kujdes.
        Këto kushte vlejnë për blerjet online në <strong>Top Mobile</strong>.
      </p>

      <section className="legal-section">
        <h2>1. Llogaria dhe Përdorimi</h2>
        <ul>
          <li>Jeni përgjegjës për saktësinë e të dhënave dhe ruajtjen e kredencialeve.</li>
          <li>Ne rezervojmë të drejtën të pezullojmë llogaritë që shkelin politikat tona.</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>2. Produkte &amp; Çmime</h2>
        <ul>
          <li>Fotot shërbejnë për ilustrim; specifikat mund të kenë ndryshime minimale.</li>
          <li>Çmimet mund të ndryshojnë pa paralajmërim. Çmimi i vlefshëm është ai në momentin e porosisë.</li>
          <li>Disponueshmëria aktualizohet rregullisht, por mund të ketë vonesa sinkronizimi.</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>3. Porosi &amp; Pagesa</h2>
        <ul>
          <li>Konfirmimi i porosisë dërgohet me email / llogari. Porosia mund të refuzohet nëse ka gabime të qarta çmimi.</li>
          <li>Mënyrat e pagesës: pagesë me kartelë (nëse aktivizohet), bankë, ose para/kartë në dorëzim (COD) sipas disponueshmërisë.</li>
          <li>Faturimi bëhet sipas të dhënave që jepni; ju lutemi verifikoni saktësinë.</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>4. Dërgesa &amp; Afate</h2>
        <ul>
          <li>Dërgimi kryhet nga partnerë logjistike; afatet tipike 1–3 ditë pune brenda Kosovës.</li>
          <li>Kostoja e dërgesës shfaqet gjatë checkout-it ose komunikohet nga stafi.</li>
          <li>Në moment pranimi, ju lutemi kontrolloni paketimin dhe raportoni dëme të dukshme menjëherë.</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>5. E Drejta e Kthimit &amp; Rimbursimi</h2>
        <ul>
          <li>Kthim brenda <strong>14 ditëve</strong> nga pranimi (produkt i papërdorur, i pa-dëmtuar, me paketim origjinal dhe aksesorë).</li>
          <li>Artikujt e higjienës, softuerët e aktivizuar, kartelat “gift”, dhe pjesët e porositura posaçërisht nuk kthehen, përveç rasteve me defekt.</li>
          <li>Rimbursimi kryhet brenda 7–14 ditëve pune pasi pajisja të inspektohet në servis.</li>
          <li>Kostot e transportit të kthimit mbulohen nga blerësi, përveç rasteve të defektit në garanci/DOA.</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>6. Garancia &amp; Servisi</h2>
        <p>Garancia nuk vlen për dëmtime fizike, ujë, djegie, modifikime jo-zyrtare, apo përdorim të gabuar.</p>
      </section>

      <section className="legal-section">
        <h2>7. Përgjegjësia</h2>
        <p>
          Ne nuk mbajmë përgjegjësi për humbje indirekte (p.sh. humbje të të dhënave, të ardhurave) përtej vlerës së produktit.
          Force majeure (ngjarje jashtë kontrollit tonë) mund të ndikojë në afate/dërgesa.
        </p>
      </section>

      <section className="legal-section">
        <h2>8. Ndryshime</h2>
        <p>Kushtet mund të ndryshohen herë pas here; versioni i fundit publikohet këtu.</p>
      </section>

      <section className="legal-section">
        <h2>9. Ligji i zbatueshëm</h2>
        <p>Ky dokument rregullohet nga ligjet e Republikës së Kosovës. Çdo mosmarrëveshje zgjidhet në gjykatat kompetente në Prishtinë.</p>
      </section>

      <section className="legal-section">
        <h2>Kontakt</h2>
        <p>
          Pyetje?{" "}
          <a href="mailto:
info@topmobile.store" className="legal-link">
            
info@topmobile.store
          </a>{" "}
          · +383 048 723 720
        </p>
      </section>

      <p className="legal-note">
        <strong>Shënim:</strong> Këto kushte janë informuese dhe nuk përbëjnë këshillë juridike. Për raste specifike,
        konsultohuni me jurist.
      </p>
    </main>
  );
}
