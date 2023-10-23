const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
if (serverUrl === undefined) {
  console.error("NEXT_PUBLIC_SERVER_URL environment variable not defined");
  process.exit(1);
}
export default serverUrl;
