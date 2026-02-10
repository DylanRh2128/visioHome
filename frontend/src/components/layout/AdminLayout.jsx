import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function AdminLayout() {
  return (
    <div style={styles.wrapper}>
      <Sidebar />
      <main style={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
  },
  main: {
    flex: 1,
    marginLeft: "250px", // Mismo ancho que el sidebar fijo
    padding: "40px",
    background: "var(--bg-content)",
    minHeight: "100vh",
    boxSizing: "border-box",
  },
};
