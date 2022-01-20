import { useState, useEffect } from "react";

function useWindowScroll() {
  const [scroll, setScroll] = useState(0);

  function handleWindowScroll(e: Event) {
    setScroll(window.scrollY);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleWindowScroll);

    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
    };
  }, []);

  return scroll;
}

export default useWindowScroll;
