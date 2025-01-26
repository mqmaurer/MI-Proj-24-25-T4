import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={true}
      theme="light" // Grundlegendes Toastify-Thema
      toastClassName="bg-primary text-white rounded shadow p-3 mb-3" // Bootstrap-Klassen
      bodyClassName="p-2" // Textbereich-Styling
    />
  );
};

export default Toast;
