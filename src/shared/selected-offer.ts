export const SELECTED_OFFER_SESSION_KEY = "selectedOffer";

export type SelectedOfferContext = {
  version: 1;
  gameSlug: string;
  gameName: string;
  currency: string;
  kind: "top-up" | "voucher";
  offerId: number;
  offerLabel: string;
  price: number;
};
