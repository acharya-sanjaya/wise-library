import {ReactNode} from "react";

interface IconProps {
  className?: string;
  thickness?: number;
}
interface SVGWrapperProps extends IconProps {
  children: ReactNode;
}

const SVGWrapper = ({children, className, thickness = 2}: SVGWrapperProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={thickness > 4 ? 4 : thickness}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {children}
  </svg>
);

export const ChevronLeft = ({...props}: IconProps) => {
  return (
    <SVGWrapper {...props}>
      <path d="m15 18-6-6 6-6" />
    </SVGWrapper>
  );
};

export const Dashboard = ({...props}: IconProps) => {
  return (
    <SVGWrapper {...props}>
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </SVGWrapper>
  );
};

export const Book = ({...props}: IconProps) => (
  <SVGWrapper {...props}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    <path d="M6 8h2" />
    <path d="M6 12h2" />
    <path d="M16 8h2" />
    <path d="M16 12h2" />
  </SVGWrapper>
);

export const Users = ({...props}: IconProps) => (
  <SVGWrapper {...props}>
    <path d="M18 21a8 8 0 0 0-16 0" />
    <circle cx="10" cy="8" r="5" />
    <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" />
  </SVGWrapper>
);

export const Reservations = ({...props}: IconProps) => (
  <SVGWrapper {...props}>
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <path d="M21 14V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8" />
    <path d="M3 10h18" />
    <path d="m16 20 2 2 4-4" />
  </SVGWrapper>
);

export const Notifications = ({...props}: IconProps) => (
  <SVGWrapper {...props}>
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </SVGWrapper>
);

export const Fine = ({...props}: IconProps) => (
  <SVGWrapper {...props}>
    <rect width="20" height="12" x="2" y="6" rx="2" />
    <circle cx="12" cy="12" r="2" />
    <path d="M6 12h.01M18 12h.01" />
  </SVGWrapper>
);

export const Add = ({...props}: IconProps) => (
  <SVGWrapper {...props}>
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </SVGWrapper>
);

export const Search = ({...props}: IconProps) => (
  <SVGWrapper {...props}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </SVGWrapper>
);

export const Close = ({...props}: IconProps) => (
  <SVGWrapper {...props}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </SVGWrapper>
);
