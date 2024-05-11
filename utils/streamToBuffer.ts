export default async function streamToBuffer(readableStream: NodeJS.ReadableStream): Promise<Uint8Array> {
  const chunks: any[] = [];
  for await (const chunk of readableStream) chunks.push(chunk);
  return Buffer.concat(chunks);
}
