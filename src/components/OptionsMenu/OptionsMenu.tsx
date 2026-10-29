import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FiEdit2, FiMoreHorizontal, FiTrash2 } from "react-icons/fi";
import { useClickAway } from "react-use";

const menuItem =
  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink transition hover:bg-raised";

const MENU_HEIGHT = 120; // rough height, used to decide whether to flip upward

type Coords = { right: number; top?: number; bottom?: number };

type OptionsMenuProps = {
  ariaLabel: string;
  editLabel: string;
  deleteLabel: string;
  onEdit: () => void;
  onDelete: () => void;
  isDeleting?: boolean;
  size?: "sm" | "md";
};

export default function OptionsMenu({
  ariaLabel,
  editLabel,
  deleteLabel,
  onEdit,
  onDelete,
  isDeleting = false,
  size = "md",
}: OptionsMenuProps) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<Coords>({ right: 0, top: 0 });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // the dropdown lives in a portal, so it's "outside" wrapperRef:
  // ignore clicks that land inside it
  useClickAway(wrapperRef, (e) => {
    if (menuRef.current?.contains(e.target as Node)) return;
    setOpen(false);
  });

  // fixed-position menus don't follow their button, so close on scroll/resize
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("scroll", close, true); // capture: catches inner scroll containers
    window.addEventListener("resize", close);
    return () => {
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
    };
  }, [open]);

  function toggle() {
    if (!open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const right = document.documentElement.clientWidth - rect.right;
      const fitsBelow = rect.bottom + 4 + MENU_HEIGHT < window.innerHeight;
      setCoords(
        fitsBelow
          ? { right, top: rect.bottom + 4 }
          : { right, bottom: window.innerHeight - rect.top + 4 },
      );
    }
    setOpen((prev) => !prev);
  }

  return (
    <div ref={wrapperRef} className="relative shrink-0">
      <button
        ref={buttonRef}
        type="button"
        aria-label={ariaLabel}
        aria-expanded={open}
        onClick={toggle}
        className={`grid place-items-center rounded-full text-mute transition hover:bg-raised hover:text-ink focus:outline-none focus:ring-4 focus:ring-clay/15 ${
          size === "sm" ? "size-8" : "size-9"
        }`}
      >
        <FiMoreHorizontal className={size === "sm" ? "size-4.5" : "size-5"} />
      </button>

      {createPortal(
        <div
          ref={menuRef}
          style={coords}
          className={`fixed z-50 w-44 rounded-2xl border border-line bg-canvas p-2 transition ${
            open
              ? "visible translate-y-0 opacity-100"
              : "invisible translate-y-1 opacity-0"
          }`}
        >
          <button
            type="button"
            className={menuItem}
            onClick={() => {
              setOpen(false);
              onEdit();
            }}
          >
            <FiEdit2 className="text-mute" /> {editLabel}
          </button>
          <button
            type="button"
            disabled={isDeleting}
            className={`${menuItem} text-clay disabled:cursor-wait disabled:opacity-60`}
            onClick={() => {
              setOpen(false);
              onDelete();
            }}
          >
            <FiTrash2 /> {deleteLabel}
          </button>
        </div>,
        document.body,
      )}
    </div>
  );
}