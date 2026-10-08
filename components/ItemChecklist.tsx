"use client";

interface ItemChecklistProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  categoria: string;
}

export default function ItemChecklist({
  label,
  checked,
  onChange,
  categoria,
}: ItemChecklistProps) {
  return (
    <label className={`check-item ${checked ? "checked" : ""}`}>
      <span className="check-item-copy">
        <strong>{label}</strong>
        <small>{categoria}</small>
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span className="custom-check" aria-hidden="true">
        ✓
      </span>
    </label>
  );
}