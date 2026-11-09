import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";

export default function CommandBlock({ command, label = "Terminal" }: { command: string; label?: string }) {
  const [feedback, setFeedback] = useState("");
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timeout.current) clearTimeout(timeout.current); }, []);
  async function copy() {
    if (timeout.current) clearTimeout(timeout.current);
    try {
      await navigator.clipboard.writeText(command);
      setFeedback("Copied");
    } catch {
      setFeedback("Copy unavailable. Select the text to copy it.");
    }
    timeout.current = setTimeout(() => setFeedback(""), 4500);
  }
  return <div className="command-block">
    <div className="command-heading"><span>{label}</span><button type="button" onClick={copy} aria-label={`Copy ${label === "Terminal" ? "command" : label}`}><Icon name={feedback === "Copied" ? "check" : "copy"} size={15} />{feedback === "Copied" ? "Copied" : "Copy"}</button></div>
    <pre tabIndex={0} aria-label={label}><code>{command}</code></pre>
    <span className={feedback.startsWith("Copy unavailable") ? "copy-feedback" : "sr-only"} role="status">{feedback}</span>
  </div>;
}
