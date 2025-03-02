import { render, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import ResultItem from "./result-item.tsx";

const mockCallback = vi.fn();

describe("Search Result Item", () => {
  // Component renders with all required props (id, url, title, description)
  it("should render with all required props correctly", () => {
    const mockResult = {
      id: "123",
      url: "https://example.com",
      title: "Test Title",
      description: "Test Description",
    };
    const mockCallback = vi.fn();

    const { getByText } = render(
      <ResultItem
        result={mockResult}
        selectedResult={null}
        callback={mockCallback}
      />
    );

    expect(getByText("https://example.com")).toBeInTheDocument();
    expect(getByText("Test Title")).toBeInTheDocument();
    expect(getByText("Test Description")).toBeInTheDocument();
  });

  // Clicking the item triggers callback function with result object
  it("should trigger callback with result object when item is clicked", () => {
    const mockResult = {
      id: "123",
      url: "https://example.com",
      title: "Test Title",
      description: "Test Description",
    };

    const { getByText } = render(
      <ResultItem
        result={mockResult}
        selectedResult={null}
        callback={mockCallback}
      />
    );

    fireEvent.click(getByText("Test Title"));

    expect(mockCallback).toHaveBeenCalledWith(mockResult);
  });

  // Component displays correct styling when not selected
  it('should not have "selected" class when result is not selected', () => {
    const mockResult = {
      id: "123",
      url: "https://example.com",
      title: "Test Title",
      description: "Test Description",
    };

    const { container } = render(
      <ResultItem
        result={mockResult}
        selectedResult={null}
        callback={mockCallback}
      />
    );

    const resultItem = container.querySelector(".result-item");
    expect(resultItem).not.toHaveClass("selected");
  });

  // Handle undefined/null result prop
  it("should not render when result prop is undefined", () => {
    const { container } = render(
      <ResultItem
        result={undefined}
        selectedResult={null}
        callback={mockCallback}
      />
    );

    expect(container.firstChild).toBeNull();
  });
});
