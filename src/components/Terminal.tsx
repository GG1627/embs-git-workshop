import { useRef, useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";
export type Entry = { command: string; output: string; ok: boolean };
export default function Terminal({
  entries,
  onCommand,
  onReset,
}: {
  entries: Entry[];
  onCommand: (command: string) => void;
  onReset: () => void;
}) {
  const [input, setInput] = useState("");
  const [position, setPosition] = useState<number | null>(null);
  const tail = useRef<HTMLDivElement>(null);
  function submit(e: FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    onCommand(input.trim());
    setInput("");
    setPosition(null);
    requestAnimationFrame(() =>
      tail.current?.scrollIntoView({ block: "nearest" }),
    );
  }
  function key(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
    e.preventDefault();
    const commands = entries.map((x) => x.command);
    const next =
      e.key === "ArrowUp"
        ? Math.max(0, (position ?? commands.length) - 1)
        : Math.min(commands.length, (position ?? commands.length) + 1);
    setPosition(next);
    setInput(commands[next] ?? "");
  }
  return (
    <section className="terminal-panel" aria-label="Git practice terminal">
      <div className="panel-header">
        <span>Terminal</span>
        <button className="link-button" onClick={onReset}>
          Reset
        </button>
      </div>
      <div className="terminal-body">
        {!entries.length ? (
          <p className="terminal-welcome">
            You’re in embs-pulse. Let’s look around.
          </p>
        ) : null}
        <div
          className="terminal-transcript"
          role="log"
          aria-label="Command history"
          aria-live="polite"
        >
          {entries.map((entry, i) => (
            <div className="terminal-entry" key={i}>
              <div>
                <span className="prompt-short">$ </span>
                <span>{entry.command}</span>
              </div>
              {entry.output ? (
                <pre className={entry.ok ? "" : "terminal-error"}>
                  {entry.output}
                </pre>
              ) : null}
            </div>
          ))}
        </div>
        <form className="terminal-input" onSubmit={submit}>
          <label htmlFor="command-input">
            <span className="prompt-user">embs@workshop</span>
            <span className="prompt-path">:~/embs-pulse</span>
            <span className="prompt-dollar"> $</span>
            <span className="sr-only"> Command</span>
          </label>
          <input
            id="command-input"
            aria-label="Terminal command"
            placeholder="Type a command…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={key}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="none"
          />
          <button className="sr-only" type="submit">
            Run command
          </button>
        </form>
        <div ref={tail} />
      </div>
    </section>
  );
}
