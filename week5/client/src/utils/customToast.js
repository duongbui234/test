import { toast } from "react-toastify";

const config = {
  position: "top-right",
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

/**
 * Hàm show toast
 * @param {string} type error || success || warning || info
 * @param {string} message thống báo
 */
const showToast = (type, message) => {
  console.log(type, message);
  return toast[type](message, config);
};

export default showToast;
