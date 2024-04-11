export function getUrl({
  id,
  slug,
  addHostname = true,
}: {
  id: string;
  slug?: string | null;
  addHostname?: boolean;
}) {
  const url = (process.env.VERCEL_URL ?? "http://localhost:3000") + "/r/";
  return `${addHostname ? url : ""}${slug ? slug : id}`;
}
