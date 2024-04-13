import type { TRPCError } from "@trpc/server";
import { getApi } from "~/server/rest";
import { TRPC_CODES_STATUS } from "~/trpc/rest";
import type { RouterInput } from "~/trpc/utils";

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { url, maxClicks, password, slug } = (await request.json()) as Omit<
    RouterInput["url"]["edit"],
    "id"
  >;

  const api = await getApi({ request });

  try {
    const result = await api.url.edit({
      id: params.id,
      url,
      maxClicks,
      password,
      slug,
    });

    return Response.json(result);
  } catch (error) {
    const trpcError = error as TRPCError;

    return new Response(trpcError.message, {
      status: TRPC_CODES_STATUS[trpcError.code],
      statusText: trpcError.code,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
