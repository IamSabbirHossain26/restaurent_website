import { describe, expect, it } from "vitest";
import {
  isoDatePlusDays,
  validateContact,
  validateQuote,
  type QuotePayload,
} from "../validation";

const baseDate = new Date(2026, 10, 17); // 2026-11-17

function makeValidQuote(): QuotePayload {
  return {
    eventType: "wedding",
    date: isoDatePlusDays(baseDate, 10),
    venue: "Gulshan Hall",
    area: "Gulshan",
    guests: 200,
    packageSlug: "heritage-bengali-feast",
    serviceStyle: "buffet",
    dietary: {
      vegetarian: 15,
      vegan: 0,
      glutenFree: 2,
      halal: 200,
      nutAllergy: 1,
      kids: 10,
    },
    dietaryNotes: "",
    budget: "",
    name: "Amina Rahman",
    phone: "+880 1711 000000",
    email: "amina@example.com",
    contactMethod: "whatsapp",
    consent: true,
  };
}

describe("validateQuote()", () => {
  it("accepts a valid payload", () => {
    const errors = validateQuote(makeValidQuote(), {
      minLeadDays: 3,
      maxGuests: 2000,
      now: baseDate,
    });
    expect(errors).toEqual({});
  });

  it("rejects dates earlier than minLeadDays and dietary counts above guests", () => {
    const bad = makeValidQuote();
    bad.date = isoDatePlusDays(baseDate, 1);
    bad.dietary.vegetarian = 250;

    const errors = validateQuote(bad, {
      minLeadDays: 3,
      maxGuests: 2000,
      now: baseDate,
    });
    expect(errors.date).toBe("dateTooSoon");
    expect(errors.dietary).toBe("dietaryExceeds");
  });

  it("requires email when preferred contact method is email", () => {
    const bad = makeValidQuote();
    bad.contactMethod = "email";
    bad.email = "";

    const errors = validateQuote(bad, {
      minLeadDays: 3,
      maxGuests: 2000,
      now: baseDate,
    });
    expect(errors.email).toBe("required");
  });
});

describe("validateContact()", () => {
  it("requires at least email or phone", () => {
    const errors = validateContact({
      name: "Tariq",
      email: "",
      phone: "",
      topic: "general",
      message: "Looking for a tasting next week.",
      consent: true,
    });
    expect(errors.email).toBe("contactMethod");
  });

  it("passes with valid phone and message", () => {
    const errors = validateContact({
      name: "Tariq",
      email: "",
      phone: "01711000000",
      topic: "general",
      message: "Looking for a tasting next week.",
      consent: true,
    });
    expect(errors).toEqual({});
  });
});
