import { headers } from "next/headers";
import "server-only";
import { createCaller } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";

export const createRestClient = async ({ apiKey }: { apiKey: string }) => {
  const heads = new Headers(headers());
  heads.set("x-trpc-source", "rest");
  heads.set("Authorization", `Bearer ${apiKey}`);

  return createCaller(
    await createTRPCContext({
      headers: heads,
    }),
  );
};

export const TRPC_CODES_STATUS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 408,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  METHOD_NOT_SUPPORTED: 405,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500,
  PARSE_ERROR: 400,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  UNSUPPORTED_MEDIA_TYPE: 501,
} as const;
