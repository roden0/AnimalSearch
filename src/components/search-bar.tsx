"use client";

import type React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuSearch } from "react-icons/lu";

import "./search-bar.css";

interface SearchBarProps {
  readonly className?: string;
}

export function SearchBar({ className = "" }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/results?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`search-bar ${className}`}>
      <div className="search-input-wrapper">
        <LuSearch className="search-icon" size={20} />
        <input
          data-testid="searchbox"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
          autoFocus
        />
      </div>
      <div className="search-buttons">
        <button
          data-testid="search-button"
          type="submit"
          className="search-button"
          disabled={!query.trim()}
        >
          Buscar
        </button>
      </div>
    </form>
  );
}
