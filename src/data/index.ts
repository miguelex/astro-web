import profileData from "./profile.json";
import skillsData from "./skills.json";
import experienceData from "./experience.json";
import educationData from "./education.json";
import projectsData from "./projects.json";
import certificationsData from "./certifications.json";
import type {
  Profile,
  SkillGroup,
  ExperienceItem,
  EducationItem,
  Project,
  Certification,
} from "../types";

export const profile = profileData as Profile;
export const skills = skillsData as SkillGroup[];
export const experience = experienceData as ExperienceItem[];
export const education = educationData as EducationItem[];
export const projects = projectsData as Project[];
export const certifications = certificationsData as Certification[];

export const featuredProjects = projects.filter((p) => p.featured);

/** Ordena certificaciones de más reciente a más antigua. */
export const sortedCertifications = [...certifications].sort((a, b) =>
  b.date.localeCompare(a.date),
);
