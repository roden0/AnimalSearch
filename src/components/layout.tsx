import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./header";
import { Footer } from "./footer";
import { SearchBar } from "./search-bar";

interface LayoutProps {
  readonly children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isResultsPage = location.pathname === "/results";

  return (
    <div className="layout">
      <Header isResultsPage={isResultsPage}>
        {isResultsPage && <SearchBar className="header-search" />}
      </Header>

      <main className="main-content">{children}</main>

      <Footer />
    </div>
  );
}
