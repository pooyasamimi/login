import { useEffect } from "react";
import toast from "react-hot-toast";

export default function PersonalErrToast({ children }) {
  useEffect(() => {
    toast(children + '😁', {
      icon: "",
    });
  });
}
