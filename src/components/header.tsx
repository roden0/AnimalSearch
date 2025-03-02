import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { RiLayoutGrid2Fill } from "react-icons/ri";
import logo from "../assets/logo.svg";
import "./header.css";

interface HeaderProps {
  readonly children?: ReactNode;
  readonly isResultsPage?: boolean;
}

export function Header({ children, isResultsPage = false }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          {isResultsPage ? (
            <Link to="/" className="header-logo">
              <img src={logo} alt="logo" width={92} height={30} />
            </Link>
          ) : (
            <p className="header-title">
              <span className="bold">Agile Content</span> Frontend test
            </p>
          )}
          {children}
        </div>

        <div className="header-right">
          <button className="icon-button" aria-label="Apps">
            <RiLayoutGrid2Fill />
          </button>
          <button className="avatar-button" aria-label="User menu">
            <img
              src="/avatar-placeholder.jpg"
              alt=""
              className="avatar-image"
              width={32}
              height={32}
            />
          </button>
        </div>
      </div>
    </header>
  );
}
