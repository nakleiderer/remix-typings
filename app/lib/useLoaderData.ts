import { useLoaderData as useRemixLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/server-runtime";
import type { InferLoaderData } from "./server-runtime.server";

export function useLoaderData<Loader extends LoaderFunction>() {
  return useRemixLoaderData() as InferLoaderData<Loader>;
}
