import type {
  DataFunctionArgs,
  LoaderFunction as RemixLoaderFunction,
} from "@remix-run/server-runtime";
import { json as remixJson } from "@remix-run/server-runtime";

type JSON<T> = T extends { toJSON(): infer U }
  ? U
  : T extends object
  ? {
      [k in keyof T]: JSON<T[k]>;
    }
  : T;

type TypedResponse<T> = Omit<Response, "json"> & {
  json: () => Promise<JSON<T>>;
};

type ResponseJson<R> = R extends TypedResponse<infer T> ? JSON<T> : any;

export function json<T>(data?: T | null, init?: ResponseInit) {
  return remixJson(data, init) as TypedResponse<T>;
}

export type InferLoaderData<Loader> = Loader extends LoaderFunction<infer T>
  ? JSON<T>
  : Loader extends RemixLoaderFunction
  ? ResponseJson<ReturnType<Loader>>
  : never;

export type LoaderFunction<T> = (
  args: DataFunctionArgs
) => Promise<TypedResponse<T>> | TypedResponse<T> | Promise<T> | T;
