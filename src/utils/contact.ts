import { profile } from "./data";

export const contacts = [
  { label: "Email", value: profile.email, link: `mailto:${profile.email}` },
  { label: "LinkedIn", value: "linkedin.com/in/kunal-tyagi-b34537314", link: profile.linkedin },
  { label: "GitHub", value: "github.com/ktyagi-06", link: profile.github },
];
