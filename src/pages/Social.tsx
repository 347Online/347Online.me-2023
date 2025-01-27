import Link from "@/components/Link";

export const Social = () => (
  <>
    <h1>Links</h1>
    <p>
      Blog: <Link to="https://blog.347online.me">blog.347online.me</Link>
    </p>
    <p>
      GitHub: <Link to="https://github.com/347Online">347Online</Link>
    </p>
    <p>
      Buy my games on <Link to="https://347online.itch.io">Itch.io</Link>
    </p>
    <p>
      Mastodon:&nbsp;
      <Link to="https://hachyderm.io/@347Online">@347Online@hachyderm.io</Link>
    </p>

    <footer>
      <Link to="/">Home</Link>
    </footer>
  </>
);
