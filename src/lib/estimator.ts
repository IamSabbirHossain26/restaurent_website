import type { CateringPackage, ServiceStyle, ServiceZone } from "@/content/types";

export const addOnIds = ["liveStation", "dessertTable", "welcomeDrinks", "premiumRentals"] as const;
export type AddOnId = (typeof addOnIds)[number];

/** DEMO add-on pricing. `perGuest` or `flat` in site currency. */
export const addOnPricing: Record<AddOnId, { perGuest?: number; flat?: number }> = {
  liveStation: { flat: 25000 },
  dessertTable: { perGuest: 250 },
  welcomeDrinks: { perGuest: 120 },
  premiumRentals: { perGuest: 300 },
};

/** Price multiplier per service style (plated needs more labour). */
export const styleMultiplier: Record<ServiceStyle, number> = {
  buffet: 1,
  family: 1.05,
  stations: 1.1,
  plated: 1.15,
  canapes: 1,
};

/** Guests per server, by service style — used for staffing guidance. */
export const guestsPerServer: Record<ServiceStyle, number> = {
  buffet: 25,
  family: 16,
  stations: 20,
  plated: 12,
  canapes: 20,
};

export const GUESTS_PER_CHEF = 80;

export type EstimateInput = {
  guests: number;
  pkg: Pick<CateringPackage, "pricePerGuest" | "minGuests" | "maxGuests" | "serviceStyles">;
  style: ServiceStyle;
  addOns: AddOnId[];
  zone?: Pick<ServiceZone, "fee">;
  serviceChargePercent: number;
};

export type EstimateWarning = "belowMin" | "aboveMax" | "styleNotOffered" | "logisticsTbc";

export type Estimate = {
  food: number;
  addOns: number;
  logistics: number;
  serviceCharge: number;
  total: number;
  low: number;
  high: number;
  perGuest: number;
  servers: number;
  chefs: number;
  warnings: EstimateWarning[];
};

const roundTo = (n: number, step: number) => Math.round(n / step) * step;

/**
 * Indicative catering estimate. All rates are demo values from content files;
 * the output is a planning range, never a binding quote.
 */
export function estimate(input: EstimateInput): Estimate {
  const guests = Math.max(0, Math.floor(input.guests || 0));
  const warnings: EstimateWarning[] = [];

  if (guests < input.pkg.minGuests) warnings.push("belowMin");
  if (input.pkg.maxGuests && guests > input.pkg.maxGuests) warnings.push("aboveMax");
  if (!input.pkg.serviceStyles.includes(input.style)) warnings.push("styleNotOffered");

  const food = Math.round(input.pkg.pricePerGuest * guests * styleMultiplier[input.style]);

  const addOns = input.addOns.reduce((sum, id) => {
    const p = addOnPricing[id];
    return sum + (p.flat ?? 0) + (p.perGuest ?? 0) * guests;
  }, 0);

  let logistics = 0;
  if (input.zone) {
    if (input.zone.fee === null) warnings.push("logisticsTbc");
    else logistics = input.zone.fee;
  }

  const serviceCharge = Math.round(((food + addOns) * input.serviceChargePercent) / 100);
  const total = food + addOns + logistics + serviceCharge;

  return {
    food,
    addOns,
    logistics,
    serviceCharge,
    total,
    low: roundTo(total * 0.92, 100),
    high: roundTo(total * 1.1, 100),
    perGuest: guests > 0 ? Math.round(total / guests) : 0,
    servers: guests > 0 ? Math.ceil(guests / guestsPerServer[input.style]) : 0,
    chefs: guests > 0 ? Math.ceil(guests / GUESTS_PER_CHEF) : 0,
    warnings,
  };
}
