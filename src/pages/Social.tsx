import Link from "@/components/Link";

export const Social = () => (
  <>
    <h1>Social</h1>
    <p>
      Blog: <Link to="https://blog.347online.me">blog.347online.me</Link> 
    </p>
    <p>
      GitHub: <Link to="https://github.com/347Online">347Online</Link>
    </p>
    <p>
      itch.io: <Link to="https://konundream.itch.io">Konundream</Link>
    </p>
    <p>
      Mastodon:&nbsp;
      <Link to="https://hachyderm.io/@347Online">@347Online@tech.lgbt</Link>
    </p>

    <footer>
      <Link to="/">Home</Link>
    </footer>
  </>
);
