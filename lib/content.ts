import "server-only";
import { cache } from "react";
import fallback from "./content.json";
import { portfolioSchema, type Portfolio } from "./schema";

export const getPortfolio = cache(async (): Promise<Portfolio> => portfolioSchema.parse(fallback));
