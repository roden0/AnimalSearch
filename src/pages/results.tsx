import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ResultItem from "../components/result-item.tsx";
import data from "../data/fakeDataSource.ts";
import { DetailView } from "../components/detail-view.tsx";
import Skeleton from "../components/skeleton.tsx";

interface SearchResult {
  id: number;
  title: string;
  url: string;
  description: string;
  image: string;
}

export default function Results() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(
    null
  );

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    setTimeout(() => {
      const mockResults: SearchResult[] = data;
      setResults(mockResults);
      setLoading(false);
    }, 1000);
  }, [query]);

  if (!query) {
    return (
      <div className="results-container">
        <div className="no-search">
          <p>
            Try searching for{" "}
            <span className="bold">
              insect, fish, horse, bear, cow, lion, rabbit, cat, snake, dog,
              bird
            </span>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="results-layout">
      <div className="results-container">
        {loading && <Skeleton />}
        {!loading && results.length > 0 && (
          <div className="results-list">
            {results.map((result) => (
              <ResultItem
                key={`result-${result.id}`}
                result={result}
                selectedResult={selectedResult}
                callback={setSelectedResult}
              />
            ))}
          </div>
        )}
        {!loading && results.length === 0 && (
          <div className="no-results">
            <p>No results found for "{query}"</p>
            <p>
              Try searching for{" "}
              <span className="bold">
                insect, fish, horse, bear, cow, lion, rabbit, cat, snake, dog,
                bird
              </span>
              .
            </p>
          </div>
        )}
      </div>

      <DetailView
        result={selectedResult}
        onClose={() => setSelectedResult(null)}
      />
    </div>
  );
}
