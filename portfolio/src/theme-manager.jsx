import { useEffect } from "react";
export function ThemeManager({ href }) {
  useEffect(() => {
    let link = document.getElementById('theme-stylesheet');
    if (!link) {
      link = document.createElement('link');
      link.id = 'theme-stylesheet';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    link.href = href;
  }, [href]);

  return null;
}