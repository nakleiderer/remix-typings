import { redirect } from "@remix-run/node";
import { json } from "~/lib/server-runtime.server";
import { useLoaderData } from "~/lib/useLoaderData";

export const loader = () => {
  const random = Math.random();

  if (random > 0.5) {
    return json({
      type: "greater" as const,
      hello: "world",
      age: 4,
      day: new Date(),
      nested: {
        hello: "world",
        age: 4,
        day: new Date(),
      },
    });
  }

  if (random > 0.01 && random < 0.02) {
    // Anything thrown will not interfere with the types
    throw redirect("/");
  }

  // But all return paths must return from the json helper, or inference will revert to any type
  return json({ type: "lesser" as const, inferred: "yup!" as const });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  if (data.type === "greater") {
    // x is inferred as a string, despite being defined as Date.
    const x = data.nested.day;
    return (
      <div>
        <pre>{JSON.stringify({ data, x }, null, 2)}</pre>
      </div>
    );
  } else {
    // y is inferred as a string literal of "yup!"
    const y = data.inferred;
    return (
      <div>
        <pre>{JSON.stringify({ data, y }, null, 2)}</pre>
      </div>
    );
  }
}
