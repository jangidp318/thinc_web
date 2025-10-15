import SystemHealth from "@/components/SystemHealth";

export default function AdminDashboard() {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Admin Dashboard 🧠</h2>
      <SystemHealth />
    </div>
  );
}
