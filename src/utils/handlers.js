import toast from "react-hot-toast";

export const errorHandler = (error, message = "") => {
  if (message !== "") {
    toast.error(message);
    console.error(error);
    return;
  }
  toast.error(
    error.response?.data?.message ||
      error.response?.data?.message ||
      error.message ||
      "An error occurred"
  );
  console.error(error);
};
