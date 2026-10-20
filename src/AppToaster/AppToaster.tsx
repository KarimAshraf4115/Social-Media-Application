import { ToastContainer } from "react-toastify";
import { FiCheck, FiAlertCircle, FiAlertTriangle, FiInfo } from "react-icons/fi";

const badge = "grid size-8 shrink-0 place-items-center rounded-full";

const icons = {
  success: <span className={`${badge} bg-sage/15 text-sage`}><FiCheck /></span>,
  error: <span className={`${badge} bg-clay/15 text-clay`}><FiAlertCircle /></span>,
  warning: <span className={`${badge} bg-clay/15 text-clay`}><FiAlertTriangle /></span>,
  info: <span className={`${badge} bg-ink/10 text-ink`}><FiInfo /></span>,
};

export default function AppToaster() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={2000}
      theme="dark"
      icon={({ type }) => icons[type as keyof typeof icons] ?? icons.info}
    />
  );
}