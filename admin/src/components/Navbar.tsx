import React, {ReactNode} from "react";
interface NavbarProps {
  anchor?: ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({anchor}) => {
  return (
    <div className="fixed inset-0 w-dvw bg-background/30 backdrop-blur-sm h-16 border-b-2 border-muted-foreground/50 px-2 gap-4 flex items-center">
      <img className="size-10" src="https://i.ibb.co/jbGYPpF/logo-lms-dark.png" alt="Logo" />
      <div>Wise Library</div>
      {anchor}
    </div>
  );
};

export default Navbar;
