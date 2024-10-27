import * as React from "react";
import { useEffect } from "react";

export function useIsMobile() {
  const [value, setValue] = React.useState(false);

  useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches);
    }

    const result = matchMedia("(max-width: 768px)");
    result.addEventListener("change", onChange);
    setValue(result.matches);

    return () => result.removeEventListener("change", onChange);
  }, []);

  return value;
}
