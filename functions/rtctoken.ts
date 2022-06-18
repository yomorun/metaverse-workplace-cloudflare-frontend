import { RtcTokenBuilder } from 'agora-access-token';

export const onRequestPost = (context: { request: any; env: any; params: any }) => {
  const { request, env, params } = context
  const { uid, channelName, role } = request.body
  if (uid && channelName && role) {
    const expirationTimeInSeconds = 24 * 60 * 60
    const currentTimestamp = Math.floor(Date.now() / 1000)
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds

    try {
      const token = RtcTokenBuilder.buildTokenWithUid(
        process.env.NEXT_PUBLIC_AGORA_APP_ID as string,
        process.env.NEXT_AGORA_APP_CERTIFICATE as string,
        channelName,
        uid,
        role,
        privilegeExpiredTs
      )

      request.status(200).send({ token, privilegeExpiredTs, channelName })
    } catch (e: unknown) {
      if (typeof e === 'string') {
        request.status(500).json({ msg: e })
      } else if (e instanceof Error) {
        request.status(500).json({ msg: e.message })
      }
    }
  } else {
    request.status(400).json({
      msg: 'Missing parameter: "uid", "channelName" and "role" is required.',
    })
  }
  return new Response("Hello YoMo at " + new Date().toISOString() + "\r\n")
}