export type Game = "Roblox" | "Mobile Legends" | "Free Fire" | "PUBG Mobile" | (string & {});

export type PaymentMethod = string;

export interface CheckoutChoices {
  game: Game;
  offerId: string;
  offerName: string;
  amount: number;
  accountValues: Readonly<Record<string, string>>;
  paymentMethod: PaymentMethod;
  choices: Readonly<Record<string, string>>;
}

export type SimulationProgressStatus =
  | "Pesanan dibuat"
  | "Simulasi berjalan"
  | "Hasil simulasi";

export interface SimulationProgress {
  status: SimulationProgressStatus;
  completedStatuses: readonly SimulationProgressStatus[];
  isSimulation: true;
}

export interface SuccessNota {
  invoiceNumber: string;
  transactionTime: string;
  game: Game;
  offerName: string;
  amount: number;
  accountValues: Readonly<Record<string, string>>;
  paymentMethod: PaymentMethod;
  total: number;
  status: "Berhasil (simulasi)";
}

export interface CheckoutFailure {
  message: string;
  reason?: string;
}

export interface RetryContext {
  checkout: CheckoutChoices;
}

export type CheckoutResultState =
  | { status: "progress"; progress: SimulationProgress; checkout: CheckoutChoices }
  | { status: "success"; progress: SimulationProgress; nota: SuccessNota }
  | { status: "failure"; progress: SimulationProgress; failure: CheckoutFailure; retry: RetryContext };



export type CheckoutResultAction =
  | { type: "advance" }
  | { type: "succeed"; nota: SuccessNota }
  | { type: "fail"; failure: CheckoutFailure }
  | { type: "retry" };

export function createCheckoutResultState(
  checkout: CheckoutChoices,
): CheckoutResultState {
  return {
    status: "progress",
    progress: {
      status: "Pesanan dibuat",
      completedStatuses: ["Pesanan dibuat"],
      isSimulation: true,
    },
    checkout,
  };
}

const progressSequence: readonly SimulationProgressStatus[] = [
  "Pesanan dibuat",
  "Simulasi berjalan",
  "Hasil simulasi",
];
const completedProgress: SimulationProgress = {
  status: "Hasil simulasi",
  completedStatuses: progressSequence,
  isSimulation: true,
};


export function checkoutResultReducer(
  state: CheckoutResultState,
  action: CheckoutResultAction,
  checkout: CheckoutChoices,
): CheckoutResultState {
  if (state.status === "failure" && action.type === "retry") {
    return createCheckoutResultState(checkout);
  }

  if (state.status !== "progress") return state;

  switch (action.type) {
    case "advance": {
      const nextIndex = state.progress.completedStatuses.length;
      const completedStatuses = progressSequence.slice(0, nextIndex + 1);
      const status = completedStatuses.at(-1)!;
      return {
        status: "progress",
        progress: { ...state.progress, status, completedStatuses },
        checkout,
      };
    }
    case "succeed":
      return { status: "success", progress: completedProgress, nota: action.nota };
    case "fail":
      return {
        status: "failure",
        progress: completedProgress,
        failure: action.failure,
        retry: { checkout },
      };
    case "retry":
      return state;
  }
}
