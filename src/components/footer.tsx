import "./footer.css";
export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="copyright">© Google {new Date().getFullYear()}</p>
        <p className="version">v1.0.0</p>
      </div>
    </footer>
  );
}
