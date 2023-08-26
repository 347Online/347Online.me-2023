import { Link as RouterLink } from "react-router-dom";

interface LinkProps {
  to: string | URL;
  children?: React.ReactNode;
}

const Link = ({ to, children }: LinkProps) => {
  try {
    return <a href={new URL(to).href}>{children}</a>;
  } catch (e) {
    return <RouterLink to={to}>{children}</RouterLink>;
  }
};

export default Link;
