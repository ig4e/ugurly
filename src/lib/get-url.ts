export function getUrl({
  id,
  slug,
  addHostname = true,
}: {
  id: string;
  slug?: string | null;
  addHostname?: boolean;
}) {
  const url = (process.env.NEXT_PUBLIC_VERCEL_URL ?? "http://localhost:3000") + "/r/";
  return `${addHostname ? url : ""}${slug ? slug : id}`;
}
