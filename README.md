Open https://yona.pink to try out fully geo-distributed architecture open-sourced metaverse workplace.

## Architecture

- Web: [Next.js](https://nextjs.org)
- Web Hosting: [Cloudflare Pages with functions(beta)](https://cloudflare.com)
- Realtime Features: [YoMo](https://github.com/yomorun/yomo)
- WebRTC: [Agora](https://agora.io)

## Development

First, build Next.js project by `npm run export`.

Then, start Cloudflare Pages local dev:

`npx wrangler pages dev ./out --binding NEXT_PUBLIC_AGORA_APP_ID={AGORA_APP_ID} NEXT_AGORA_APP_CERTIFICATE={YOUR_AGORA_APP_CERTIFICATE} NEXT_PUBLIC_RTCTOKENKEY=RTCTOKEN`

## Deploy on Cloudflare

There are four Environment Variables need to be added on Cloudflare Pages:

- NEXT_PUBLIC_AGORA_APP_ID
- NEXT_AGORA_APP_CERTIFICATE
- NEXT_PUBLIC_RTCTOKENKEY
- NODE_VERSION
