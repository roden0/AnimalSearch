interface Result {
  id: string;
  url: string;
  title: string;
  description: string;
}

interface ResultItemProps {
  readonly result?: Result | null;
  readonly selectedResult: Result | null;
  readonly callback: (result: Result) => void;
}

export default function ResultItem({
  result,
  selectedResult,
  callback,
}: ResultItemProps) {
  if (!result) return null; // Guard clause for undefined or null result

  const { id, url, title, description } = result;

  return (
    <div
      className={`result-item ${
        selectedResult && selectedResult.id === id ? "selected" : ""
      }`}
      onClick={() => callback(result)}
    >
      <div>{url}</div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
