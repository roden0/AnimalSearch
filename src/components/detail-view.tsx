import { IoCloseSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Portal } from "./portal.tsx";
import "./detail.css";

interface DetailViewProps {
  readonly result: {
    readonly id: number;
    readonly title: string;
    readonly url: string;
    readonly description: string;
    readonly image: string;
  } | null;
  readonly onClose: () => void;
}

export function DetailView({ result, onClose }: DetailViewProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!result) return null;

  const content = (
    <div className="detail-content">
      <picture>
        <img
          className="detail-image"
          src={result.image || "/placeholder.svg"}
          alt={result.title}
        />
      </picture>
      <div className="detail-info">
        <div className="detail-url">{result.url}</div>
        <h2 className="detail-title">{result.title}</h2>
        <p className="detail-description">{result.description}</p>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Portal>
        <aside
          role="dialog"
          aria-modal="true"
          className="modal-overlay"
          onClick={onClose}
        >
          <div
            tabIndex={-1}
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              aria-label="Cerrar"
              className="modal-close"
              onClick={onClose}
            >
              <IoCloseSharp size={24} />
            </button>
            {content}
          </div>
        </aside>
      </Portal>
    );
  }

  return <div className="detail-sidebar">{content}</div>;
}
