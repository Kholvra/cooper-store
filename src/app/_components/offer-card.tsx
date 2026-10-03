"use client";

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export interface OfferCardProps {
  label: string;
  currency: string;
  price: number;
  selected: boolean;
  onSelect: () => void;
}

export function OfferCard({
  label,
  currency,
  price,
  selected,
  onSelect,
}: OfferCardProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={`offer-choice${selected ? " is-selected" : ""}`}
    >
      <span className="offer-label">
        {label} <span className="offer-currency font-normal">({currency})</span>
      </span>
      <span className="offer-price">{currencyFormatter.format(price)}</span>
      {selected && <span className="selected-label">Terpilih</span>}
    </button>
  );
}
