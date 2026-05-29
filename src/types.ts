import type { I18nField } from "./i18n/utils";

export interface Profile {
  name: string;
  initials: string;
  role: I18nField;
  tagline: I18nField;
  summary: I18nField;
  location: I18nField;
  email: string;
  cvFile: { es: string; en: string };
  social: {
    linkedin: string;
    github: string;
  };
}

export interface SkillGroup {
  /** una de: tech | tools | databases | soft */
  category: "tech" | "tools" | "databases" | "soft";
  items: string[];
}

export interface ExperienceItem {
  company: string;
  role: I18nField;
  start: string; // "2015-03" o "2015"
  end: string | null; // null = actualidad
  location: I18nField;
  description: I18nField;
  highlights: I18nField<string[]>;
  tech: string[];
}

export interface EducationItem {
  institution: string;
  degree: I18nField;
  start: string;
  end: string;
  description?: I18nField;
}

export interface Project {
  slug: string;
  title: I18nField;
  description: I18nField;
  image: string;
  tech: string[];
  repo?: string | null;
  demo?: string | null;
  featured: boolean;
  year: string;
}

export interface Certification {
  title: string;
  issuer: string;
  date: string; // "2024-06"
  url?: string | null;
  tech?: string[];
}
