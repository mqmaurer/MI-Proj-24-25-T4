import { ToastContainer } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";
import "../assets/css/bootstrap.default.css";
/**
 * Toast component that displays toast notifications.
 * @returns {JSX.Element} The rendered Toast component.
 */
const Toast = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={true}
      //theme="light" // Grundlegendes Toastify-Thema
      toastClassName="bg-primary text-white rounded shadow p-3 mb-3" // Bootstrap-Klassen
      bodyClassName="p-2" // Textbereich-Styling
      icon={false}
    />
  );
};

export default Toast;
