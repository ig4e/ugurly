import type { TRPCError } from "@trpc/server";
import { getApi } from "~/server/rest";
import { TRPC_CODES_STATUS } from "~/trpc/rest";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const api = await getApi({ request });

  try {
    const result = await api.url.delete({ id: params.id });

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
