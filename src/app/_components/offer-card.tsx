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
  itemIcon?: string;
  onSelect: () => void;
}
export function OfferCard({
  label,
  currency,
  price,
  selected,
  itemIcon,
  onSelect,
}: OfferCardProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={`offer-choice${selected ? " is-selected" : ""}`}
    >
      <div className="flex items-center gap-3 w-full">
        {itemIcon && (
          <div className="w-9 h-9 rounded-lg overflow-hidden bg-[var(--color-surface-raised)] border border-[var(--color-border)] shrink-0 flex items-center justify-center p-0.5">
            <img
              src={itemIcon}
              alt=""
              className="w-full h-full object-contain"
              aria-hidden="true"
            />
          </div>
        )}
        <div className="flex-1 min-w-0 text-left">
          <span className="offer-label block truncate font-medium">
            {label} <span className="offer-currency font-normal text-xs text-[var(--color-text-secondary)]">({currency})</span>
          </span>
          <span className="offer-price block font-bold text-sm text-[var(--color-accent)] mt-0.5">
            {currencyFormatter.format(price)}
          </span>
        </div>
      </div>
      {selected && <span className="selected-label">Terpilih</span>}
    </button>
  );
}
