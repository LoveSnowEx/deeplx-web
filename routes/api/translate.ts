import { Handlers } from "$fresh/server.ts";

const TRANSLATION_API_URL = "https://deeplx.mingming.dev/translate";

export const handler: Handlers = {
  async POST(req, _ctx) {
    return await fetch(TRANSLATION_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(await req.json()),
    });
  },
};
