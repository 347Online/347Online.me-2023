import Link from "./common/Link";

const Social = () => (
  <>
    <h1>Social</h1>
    <p>
      GitHub: <Link to="https://github.com/347Online">347Online</Link>
    </p>
    <p>
      itch.io: <Link to="https://konundream.itch.io">Konundream</Link>
    </p>
    <p>
      Mastodon:&nbsp;
      <Link to="https://tech.lgbt/@347online">@347Online@tech.lgbt</Link>,&nbsp;
      <Link to="https://mastodon.gamedev.place/@Konundream">
        @Konundream@mastodon.gamedev.place
      </Link>
    </p>

    <footer>
      <Link to="/">Home</Link>
    </footer>
  </>
);

export default Social;
