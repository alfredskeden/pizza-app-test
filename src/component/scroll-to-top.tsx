import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** ScrollToTop component so after we update a route we set the window to top position for accesability reasons. */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}