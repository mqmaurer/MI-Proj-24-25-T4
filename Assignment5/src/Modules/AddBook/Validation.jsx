import { toast } from "react-toastify";

const validateInput = (formData) => {
  if (
    !formData.author ||
    !formData.title ||
    !formData.isbn ||
    !formData.description
  ) {
    toast.warning("Please fill in all fields");
    return false;
  }

  if (!/^(?=[-0-9X ]{13}$)(?:[0-9]+[- ]){3}[0-9]*[X0-9]$/.test(formData.isbn)) {
    toast.error("ISBN must have 10 digits");
    return false;
  }

  return true;
};

export default validateInput;
