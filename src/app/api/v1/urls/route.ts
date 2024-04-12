import type { TRPCError } from "@trpc/server";
import type { NextRequest } from "next/server";
import { getApi } from "~/server/rest";
import { TRPC_CODES_STATUS } from "~/trpc/rest";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const api = await getApi({ request });

  try {
    let limit: number | undefined = Number(searchParams.get("limit"));
    const cursor = searchParams.get("cursor");

    if (limit < 1) {
      limit = undefined;
    }

    const result = await api.url.getUrls({
      limit: limit && isNaN(limit) ? undefined : limit,
      cursor: cursor ?? undefined,
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
