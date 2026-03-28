const stats = [
  { value: "5+", label: "Années d'expérience" },
  { value: "4", label: "Clients actifs" },
  { value: "BE / EU", label: "Zone d'intervention" },
];

export default function StatsSection() {
  return (
    <section
      style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        paddingLeft: 44,
        paddingRight: 44,
        paddingTop: 48,
        paddingBottom: 48,
      }}
    >
      <div className="grid grid-cols-3">
        {stats.map(({ value, label }, i) => (
          <div
            key={label}
            className="flex flex-col gap-2"
            style={{
              borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.05)" : undefined,
              paddingLeft: i > 0 ? 40 : 0,
            }}
          >
            <span
              className="font-syne font-extrabold leading-none"
              style={{ fontSize: 36, color: "#d4a843" }}
            >
              {value}
            </span>
            <span
              className="font-inter font-light uppercase tracking-widest"
              style={{ fontSize: 9, color: "rgba(221,226,236,0.16)" }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
