import { describe, expect, it } from "vitest";
import { estimate } from "../estimator";

const samplePkg = {
  pricePerGuest: 1000,
  minGuests: 50,
  maxGuests: 300,
  serviceStyles: ["buffet", "family"] as ("buffet" | "family")[],
};

describe("estimate()", () => {
  it("calculates food, add-ons, logistics, service charge and range", () => {
    const res = estimate({
      guests: 100,
      pkg: samplePkg,
      style: "buffet",
      addOns: ["liveStation", "welcomeDrinks"], // 25000 + 120*100 = 37000
      zone: { fee: 3000 },
      serviceChargePercent: 10,
    });

    expect(res.food).toBe(100000);
    expect(res.addOns).toBe(37000);
    expect(res.logistics).toBe(3000);
    expect(res.serviceCharge).toBe(13700);
    expect(res.total).toBe(153700);
    expect(res.low).toBeLessThan(res.total);
    expect(res.high).toBeGreaterThan(res.total);
    expect(res.servers).toBe(4);
    expect(res.chefs).toBe(2);
    expect(res.warnings).toEqual([]);
  });

  it("flags belowMin, aboveMax, styleNotOffered and logisticsTbc warnings", () => {
    const low = estimate({
      guests: 20,
      pkg: samplePkg,
      style: "plated",
      addOns: [],
      zone: { fee: null },
      serviceChargePercent: 10,
    });

    expect(low.warnings).toContain("belowMin");
    expect(low.warnings).toContain("styleNotOffered");
    expect(low.warnings).toContain("logisticsTbc");
    expect(low.logistics).toBe(0);

    const high = estimate({
      guests: 500,
      pkg: samplePkg,
      style: "buffet",
      addOns: [],
      serviceChargePercent: 10,
    });
    expect(high.warnings).toContain("aboveMax");
  });
});
