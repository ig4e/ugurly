import { createRestClient } from "~/trpc/rest";

export async function getApi({ request }: { request: Request }) {
  const apiKey = request.headers.get("Authorization")?.split(" ")[1] ?? "";
  const api = await createRestClient({ apiKey });

  return api;
}
