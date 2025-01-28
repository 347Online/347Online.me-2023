import Link from "@/components/Link";

export const Landing = () => (
  <div>
    <h1>Katie Janzen</h1>
    <h2>Software Engineer, Game Developer</h2>
    <p>Hiya! I'm Katie, nice to meetcha!</p>
    <p>
      Resume: <a href="/resume.pdf">PDF</a>, <a href="/resume.html">HTML</a>,{" "}
      <a href="/resume.txt">TXT</a>
    </p>
    <footer>
      <Link to="https://blog.347online.me/">Blog</Link>&nbsp;
      <Link to="/social">Links</Link>
    </footer>
  </div>
);
