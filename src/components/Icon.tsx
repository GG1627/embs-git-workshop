type Name =
  | "file"
  | "terminal"
  | "book"
  | "left"
  | "right"
  | "close"
  | "check"
  | "branch"
  | "copy"
  | "expand"
  | "reset";
const paths: Record<Name, string> = {
  file: "M9 2H4v16h12V9L9 2Zm0 0v7h7M7 12h6M7 15h6",
  terminal: "m3 5 5 5-5 5m7 0h7",
  book: "M10 4C7 2 3 2 1 3v13c3-1 6-1 9 1m0-13c3-2 7-2 9-1v13c-3-1-6-1-9 1V4Z",
  left: "m12 4-6 6 6 6",
  right: "m8 4 6 6-6 6",
  close: "m5 5 10 10M15 5 5 15",
  check: "m3 10 5 5 9-10",
  branch:
    "M6 6v8m8-8v2c0 4-8 2-8 6M6 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8-12a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z",
  copy: "M7 7h10v11H7V7ZM3 13V2h10v2",
  expand: "M7 3H3v4m10-4h4v4M3 13v4h4m10-4v4h-4",
  reset: "M3 9a7 7 0 1 1 1 6M3 3v6h6",
};
export default function Icon({
  name,
  size = 18,
}: {
  name: Name;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
