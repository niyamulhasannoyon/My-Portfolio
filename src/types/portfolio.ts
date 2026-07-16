/**
 * Centralized portfolio data contracts.
 *
 * These immutable (readonly) type maps back every structural data model in the
 * app — projects, pricing tiers, and their derived views. Keeping them in one
 * declaration module guarantees compile-time safety across the data pipeline
 * and prevents accidental runtime mutation of control values.
 */

export interface ProjectItem {
  readonly title: string;
  readonly category: string;
  readonly problem: string;
  readonly solution: string;
  readonly tech: readonly string[];
  readonly outcome: string;
  readonly outcomeDescription: string;
  readonly demo: string;
  readonly github: string | null;
}

export type ProjectList = readonly ProjectItem[];

export interface PricingCta {
  readonly label: string;
  readonly href: string;
}

export interface PricingTier {
  readonly id: string;
  readonly name: string;
  readonly tagline: string;
  readonly priceFrom: number;
  readonly priceTo?: number;
  readonly priceNote?: string;
  readonly popular?: boolean;
  readonly cta: PricingCta;
  readonly features: readonly string[];
}

export type PricingList = readonly PricingTier[];
