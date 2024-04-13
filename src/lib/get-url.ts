import { env } from "~/env";

export function getUrl({
  id,
  slug,
  addHostname = true,
}: {
  id: string;
  slug?: string | null;
  addHostname?: boolean;
}) {
  const url =
    (process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : env.NEXT_PUBLIC_REDIRECT_URL) + "/r/";
  return `${addHostname ? url : ""}${slug ? slug : id}`;
}
