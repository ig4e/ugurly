export function getUrl({
  id,
  slug,
  addHostname = true,
}: {
  id: string;
  slug?: string | null;
  addHostname?: boolean;
}) {
  const url = (process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://ugurly.vercel.app") + "/r/";
  return `${addHostname ? url : ""}${slug ? slug : id}`;
}
