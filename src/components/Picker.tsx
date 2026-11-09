import { useEffect, useId, useRef } from "react";
import type { ReactNode } from "react";
import Icon from "./Icon";
export default function Picker({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const titleId = useId();
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current!;
    const returnTarget = document.activeElement;
    dialog.showModal();
    return () => {
      dialog.close();
      requestAnimationFrame(() => {
        // A chosen lesson may already have moved focus to its new heading.
        if (document.activeElement === document.body && returnTarget instanceof HTMLElement && returnTarget.isConnected) {
          returnTarget.focus({ preventScroll: true });
        }
      });
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="picker-dialog"
      aria-labelledby={titleId}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="dialog-header">
        <h2 id={titleId}>{title}</h2>
        <button className="icon-button" aria-label="Close" onClick={onClose}>
          <Icon name="close" />
        </button>
      </div>
      <div className="dialog-content">{children}</div>
    </dialog>
  );
}
