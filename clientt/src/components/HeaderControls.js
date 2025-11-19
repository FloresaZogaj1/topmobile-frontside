import { useThemePhase } from "../theme/ThemeProvider";

export default function HeaderControls() {
  const { phase, setManualPhase, enableAuto, auto } = useThemePhase();

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <button
        className="btn-primary"
        onClick={enableAuto}
        title="Aktivo modalitetin automatik sipas orës"
        style={{ padding: "8px 12px" }}
      >
        {auto ? "Auto" : "Auto (OFF)"}
      </button>

      <select
        value={phase}
        onChange={(e) => setManualPhase(e.target.value)}
        style={{
          padding: 8,
          borderRadius: 12,
          border: "1px solid rgba(0,0,0,0.1)",
          background: "var(--card)",
          color: "var(--text)",
        }}
      >
        <option value="night">Night</option>
        <option value="dawn">Dawn</option>
        <option value="day">Day</option>
        <option value="dusk">Dusk</option>
      </select>
    </div>
  );
}
