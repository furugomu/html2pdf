import {
  FastifyInstance,
  DefaultQuery,
  DefaultParams,
  DefaultHeaders,
  RouteShorthandOptions,
} from "fastify";
import puppeteer from "puppeteer";

export function api(
  fastify: FastifyInstance,
  options: unknown,
  done: () => void
): void {
  fastify.addContentTypeParser(
    "text/html",
    { parseAs: "string" },
    (req, body, done) => done(null, body)
  );

  fastify.post<DefaultQuery, DefaultParams, DefaultHeaders, Body>(
    "/",
    {
      schema: { body: { type: "string", contentMediaType: "text/html" } },
    },
    async (request, reply) => {
      // もらった HTML を puppeteer で PDF にして返す
      const html = request.body;
      const args = [];
      if (process.env.NO_SANDBOX) {
        args.push("--no-sandbox", "--disable-setuid-sandbox");
      }
      const browser = await puppeteer.launch({
        executablePath: "google-chrome-stable",
        args,
      });
      const page = await browser.newPage();
      await page.setContent(html);
      const pdf = await page.pdf();
      reply.header("content-type", "application/pdf");
      reply.header("access-control-allow-origin", "*");
      return pdf;
    }
  );
  done();
}

type Body = string;
