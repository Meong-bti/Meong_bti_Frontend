import { useEffect } from "react";

export const preventReload = () => {
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
