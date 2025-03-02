import { render, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { SearchBar } from "./search-bar.tsx";

const mockNavigate = vi.fn();
const mockPreventDefault = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

afterEach(() => {
  cleanup();
  mockNavigate.mockReset();
});

describe("SearchBar", () => {
  // Form submits and navigates to results page with trimmed query parameter
  it("should navigate to results page with trimmed query when form is submitted", () => {
    vi.mock("react-router-dom", () => ({
      useNavigate: () => mockNavigate,
    }));

    const { getByTestId } = render(<SearchBar />);

    const searchInput = getByTestId("searchbox");
    const searchButton = getByTestId("search-button");

    fireEvent.change(searchInput, { target: { value: "  test query  " } });
    fireEvent.click(searchButton);

    expect(mockNavigate).toHaveBeenCalledWith("/results?q=test%20query");
  });

  // Form prevents default submission behavior
  it("should prevent default form submission behavior", () => {
    const { getByTestId } = render(<SearchBar />);
    const form = getByTestId("searchbox").closest("form");

    // Spy on the event prototype's preventDefault method
    const preventDefaultSpy = vi.spyOn(Event.prototype, "preventDefault");

    fireEvent.change(getByTestId("searchbox"), { target: { value: "test" } });
    fireEvent.submit(form);

    expect(preventDefaultSpy).toHaveBeenCalled();
    preventDefaultSpy.mockRestore();
  });

  // Input value updates correctly when typing
  it("should update input value when typing", () => {
    const { getByTestId } = render(<SearchBar />);

    const searchInput = getByTestId("searchbox");

    fireEvent.change(searchInput, { target: { value: "new query" } });

    expect(searchInput.value).toBe("new query");
  });

  // Search button is enabled when query has non-whitespace characters
  it("should enable search button when query has non-whitespace characters", () => {
    const { getByTestId } = render(<SearchBar />);

    const searchInput = getByTestId("searchbox");
    const searchButton = getByTestId("search-button");

    fireEvent.change(searchInput, { target: { value: "test" } });

    expect(searchButton).not.toBeDisabled();
  });

  // URL-unsafe characters in query get properly encoded
  it("should encode URL-unsafe characters in query when form is submitted", () => {
    vi.mock("react-router-dom", () => ({
      useNavigate: () => mockNavigate,
    }));

    const { getByTestId } = render(<SearchBar />);

    const searchInput = getByTestId("searchbox");
    const searchButton = getByTestId("search-button");

    fireEvent.change(searchInput, {
      target: { value: "test query & special" },
    });
    fireEvent.click(searchButton);

    expect(mockNavigate).toHaveBeenCalledWith(
      "/results?q=test%20query%20%26%20special"
    );
  });
});
