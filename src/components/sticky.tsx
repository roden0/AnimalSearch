import { useEffect, useState, ReactNode } from "react";
import "./sticky.css";

interface StickyProps {
  readonly children?: ReactNode;
}

export default function Sticky({ children }: StickyProps) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 100;
      setIsSticky(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`sticky-item ${isSticky ? "sticky" : ""}`}>{children}</div>
  );
}
