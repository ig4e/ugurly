import "server-only";
import { headers } from "next/headers";
import { createCaller } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";

export const createRestClient = async ({ apiKey }: { apiKey: string }) => {
  const heads = new Headers(headers());
  heads.set("x-trpc-source", "rest");
  heads.set("x-trpc-source", "rest");
  heads.set("Authorization", `Bearer ${apiKey}`);

  return createCaller(
    await createTRPCContext({
      headers: heads,
    }),
  );
};
/*
BAD_REQUEST	The server cannot or will not process the request due to something that is perceived to be a client error.	400
UNAUTHORIZED	The client request has not been completed because it lacks valid authentication credentials for the requested resource.	401
FORBIDDEN	The server was unauthorized to access a required data source, such as a REST API.	403
NOT_FOUND	The server cannot find the requested resource.	404
TIMEOUT	The server would like to shut down this unused connection.	408
CONFLICT	The server request resource conflict with the current state of the target resource.	409
PRECONDITION_FAILED	Access to the target resource has been denied.	412
PAYLOAD_TOO_LARGE	Request entity is larger than limits defined by server.	413
METHOD_NOT_SUPPORTED	The server knows the request method, but the target resource doesn't support this method.	405
UNPROCESSABLE_CONTENT	The server understands the request method, and the request entity is correct, but the server was unable to process it.	422
TOO_MANY_REQUESTS	The rate limit has been exceeded or too many requests are being sent to the server.	429
CLIENT_CLOSED_REQUEST	Access to the resource has been denied.	499
INTERNAL_SERVER_ERROR	An unspecified error occurred.	500
*/

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
