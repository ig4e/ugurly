import { type TRPCError } from "@trpc/server";
import { getApi } from "~/server/rest";
import { TRPC_CODES_STATUS } from "~/trpc/rest";

export async function POST(request: Request) {
  const api = await getApi({ request });

  try {
    const { url, maxClicks, password, slug } = (await request.json()) as {
      url: string;
      slug?: string | undefined;
      password?: string | undefined;
      maxClicks?: number | undefined;
    };

    const result = await api.url.create({
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
