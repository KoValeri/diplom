import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const html = document.documentElement;

    html.style.scrollBehavior = "auto";

    window.scrollTo(0, 0);

    html.style.scrollBehavior = "";

  }, [pathname]);

  return null;
}