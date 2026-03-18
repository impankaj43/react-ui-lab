import React, { useCallback, useEffect, useRef } from "react";

function useThrottle(callBack, delay = 150) {
  const lastCallRef = useRef(0);
  const callBackRef = useRef(callBack);

  useEffect(() => {
    callBackRef.current = callBack;
  }, [callBack]);

  return useCallback(
    (...args) => {
      let now = Date.now();
      if (now - lastCallRef.current >= delay) {
        lastCallRef.current = now;
        callBackRef.current(...args);
      }
    },
    [delay],
  );
}

export default useThrottle;
