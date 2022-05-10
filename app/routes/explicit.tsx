import type { LoaderFunction } from "~/lib/server-runtime.server";
import { json } from "~/lib/server-runtime.server";
import { useLoaderData } from "~/lib/useLoaderData";

type LoaderData = { explicit: boolean; date: Date };
export const loader: LoaderFunction<LoaderData> = () => {
  return json({
    explicit: true,
    date: new Date(),
  });
};

export default function Index() {
  // date is inferred as a string, despite being defined as Date.
  // explicit is inferred as a boolean
  const { date, explicit } = useLoaderData<typeof loader>();

  return (
    <div>
      <pre>{JSON.stringify({ date, explicit }, null, 2)}</pre>
    </div>
  );
}
