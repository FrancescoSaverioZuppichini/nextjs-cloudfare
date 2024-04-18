export const runtime = "edge";

export async function GET() {
  const environment = process.env.ENVIRONMENT || "local";
  return new Response(JSON.stringify({ status: "ok", environment }));
}
