import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix Typing Demo</h1>
      <p>
        Look in{" "}
        <pre style={{ display: "inline" }}>/app/routes/inferred.tsx</pre> for an
        example of inferred types.
      </p>
      <p>
        Look in{" "}
        <pre style={{ display: "inline" }}>/app/routes/explicit.tsx</pre> for an
        example of explicit types.
      </p>
      <ul>
        <li>
          <Link to="/inferred">Inferred Types</Link>
        </li>
        <li>
          <Link to="/explicit">Explicit Types </Link>
        </li>
      </ul>
    </div>
  );
}
