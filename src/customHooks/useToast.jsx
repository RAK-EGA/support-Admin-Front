// useToast.js
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useToast = () => {


  const showToast = (message, options = {}) => {
    toast(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      style: {
        width: '35vw',
      },
      ...options,
    });
  };

  const showSuccessToast = (message, options = {}) => {
    showToast(message, { type: "success", ...options });
  };

  const showErrorToast = (message, options = {}) => {
    showToast(message, { type: "error", ...options });
  };

  // You can add more custom toast functions based on your needs

  return {
    showSuccessToast,
    showErrorToast,
  };
};

export default useToast;