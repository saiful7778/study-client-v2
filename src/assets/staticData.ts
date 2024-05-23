import { ExtractPaths } from "@/hooks/useNavigatePage";
import { FileRoutesByPath } from "@tanstack/react-router";

type LinkTypes = {
  navName: string;
  path: ExtractPaths<FileRoutesByPath>;
};

type navLinkTypes = LinkTypes & {
  hasDropDown?: boolean | undefined;
  dropDown?: LinkTypes[] | undefined;
};

export const navLinks: navLinkTypes[] = [
  {
    navName: "home",
    path: "/",
  },
  {
    navName: "assignments",
    path: "/assignments",
    hasDropDown: true,
    dropDown: [
      {
        navName: "All assignment",
        path: "/assignments",
      },
      {
        navName: "submitted assignment",
        path: "/assignments/submitted",
      },
    ],
  },
];

type faqDataTypes = {
  header: string;
  content: string;
};

export const faqData: faqDataTypes[] = [
  {
    header: "How do I create a study group?",
    content:
      'To create a study group, log in to your account, go to your dashboard, and click on the "Create Group" button. Fill in the details, set the group\'s purpose, and invite your friends to join!',
  },
  {
    header: "Can I join multiple study groups?",
    content:
      "Absolutely! You can join multiple study groups to connect with students from different courses or interests.",
  },
  {
    header: "How do I submit an assignment?",
    content:
      'To submit an assignment, navigate to the assignment project, click on "Submit Assignment," and upload your file. You can also provide a description or notes for your submission.',
  },
  {
    header: 'Is "Study" free to use?',
    content:
      'Yes, "study" offers a free basic plan with essential features. We also provide premium plans with additional benefits for those seeking an enhanced experience.',
  },
  {
    header: "What if I encounter technical issues or have questions?",
    content:
      "Our dedicated support team is available 24/7 to assist you. Feel free to reach out to us via the Contact Us section, and we'll be happy to help!",
  },
];

export const footerNavLinks: LinkTypes[] = [
  { navName: "all assignment", path: "/assignments" },
  {
    navName: "submitted assignments",
    path: "/assignments/submitted",
  },
];

export const dashboardLinks: LinkTypes[] = [
  {
    navName: "Dashboard",
    path: "/dashboard",
  },
  {
    navName: "Profile",
    path: "/profile",
  },
];
