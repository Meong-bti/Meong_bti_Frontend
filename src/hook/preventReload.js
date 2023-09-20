import { useEffect } from "react";

export const PreventReload = () => {
  const preventClose = (e) => {
    e.preventDefault();
    e.returnValue = ''; 
  };

  useEffect(() => {
    (() => {
      window.addEventListener('beforeunload', preventClose);
    })();

    return () => {
      window.removeEventListener('beforeunload', preventClose);
    };
  });
}
