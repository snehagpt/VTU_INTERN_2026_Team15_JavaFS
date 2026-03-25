import { useTheme } from "./ThemeContext";
import { body } from "./theme";

export default function ThemeToggle() {
  const { isDark, toggleTheme, theme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 14px",
        borderRadius: 9,
        border: `1px solid ${theme.border}`,
        background: isDark ? theme.surface2 : theme.surface2,
        color: theme.textMuted,
        fontFamily: body,
        fontSize: 13,
        fontWeight: 500,
        cursor: "pointer",
        transition: "all 0.3s",
        userSelect: "none",
      }}
    >
      {/* Animated toggle track */}
      <div style={{
        width: 36,
        height: 20,
        borderRadius: 10,
        background: isDark ? "#1e2535" : "#e8e4de",
        border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
        position: "relative",
        transition: "background 0.3s",
        flexShrink: 0,
      }}>
        {/* Toggle knob */}
        <div style={{
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: isDark ? theme.gold : "#f59e0b",
          position: "absolute",
          top: 2,
          left: isDark ? 2 : 18,
          transition: "left 0.3s, background 0.3s",
          boxShadow: isDark ? "0 0 6px rgba(232,185,106,0.6)" : "0 0 6px rgba(245,158,11,0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 8,
        }}>
          {isDark ? "🌙" : "☀️"}
        </div>
      </div>
      <span>{isDark ? "Night" : "Day"}</span>
    </button>
  );
}
