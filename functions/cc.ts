export const onRequest = () => {
  return new Response("Hello YoMo at " + new Date().toISOString() + "\r\n")
}