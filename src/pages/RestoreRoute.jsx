import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RestoreRoute() {
  const navigate = useNavigate();

  useEffect(() => {
    const lastRoute = localStorage.getItem("lastRoute");
    if (lastRoute) {
      navigate(lastRoute);
    }
  }, []);

  return null;
}
