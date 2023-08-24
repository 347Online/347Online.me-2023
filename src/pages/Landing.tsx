import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <div>
      <h1>Katie Janzen</h1>
      <h2>Software Engineer | Game Developer</h2>
      Hiya! I'm Katie, nice to meetcha!
      <footer>
        <Link to="/social">Social</Link>
      </footer>
    </div>
  );
};