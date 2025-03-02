import { SearchBar } from "../components/search-bar";
import logo from "../assets/logo.svg";

export default function Home() {
  return (
    <div className="home-container">
      <div className="search-container">
        <img
          src={logo}
          alt="logo"
          className="home-logo"
          width={250}
          height={70}
        />
        <SearchBar className="home-search" />
      </div>
    </div>
  );
}
