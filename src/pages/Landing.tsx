import Link from "@/components/Link";

export const Landing = () => {
  return (
    <div>
      <h1>Katie Janzen</h1>
      <h2>Software Engineer | Game Developer</h2>
      Hiya! I'm Katie, nice to meetcha!
      <footer>
        <Link to="https://blog.347online.me/">Blog</Link>&nbsp;
        <Link to="/social">Links</Link>&nbsp; Resume:&nbsp;
        <a href="/resume.html">HTML</a>,<a href="/resume.txt">TXT</a>
      </footer>
    </div>
  );
};
