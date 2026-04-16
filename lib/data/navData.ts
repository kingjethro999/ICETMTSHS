export interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
  isDownload?: boolean;
  subItems?: { label: string; href: string; isDownload?: boolean }[];
}

export interface NavData {
  logo: string;
  navItems: NavItem[];
  ctaButton: {
    label: string;
    href: string;
  };
}

export const navData: NavData = {
  logo: "ICSHSM 2026",
  navItems: [
    { label: "Home", href: "/" },
    { 
      label: "Submissions", 
      href: "#",
      subItems: [
        { label: "Abstract Submission", href: "/abstracts-submission" },
        { label: "Abstract Book", href: "#", isDownload: false }
      ]
    },
    { label: "Programme", href: "#", isDownload: false },
    { label: "Call For Papers", href: "/call-for-papers" },
    { label: "Registration Fee", href: "/registration-fee" },
    { label: "Key Members", href: "/key-members" },
    { label: "Contact", href: "/contact" },
  ],
  ctaButton: {
    label: "REGISTRATION",
    href: "/registration-as-participant",
  },
};
