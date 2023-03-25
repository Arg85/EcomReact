const localtunnel = require("localtunnel");

const MAX_RETRIES = 5;
const createTunnel = async (port, retries = 0) => {
  try {
      const tunnel = await localtunnel({
          host: process.env.TUNNEL_SERVER_HOST,
          port,
          subdomain: process.env.TUNNEL_SUBDOMAIN,
        });
        console.log("tunne",tunnel)
    const { url } = tunnel;
    console.log(url, "url");
    const usedSubDomain = url.includes(process.env.TUNNEL_SUBDOMAIN);
    if (!usedSubDomain && retries < MAX_RETRIES) {
      console.warn("COuld not get requested subdomain, retrying");
      tunnel.close();
      return setTimeout(() => {
        createTunnel(port, ++retries);
      }, 200);
    }
    if (!usedSubDomain) {
      console.log("Could not get requested subdomain, generating a random one");
    }
    console.log(`Listening at localhost:${port} || tunnel:${url}`);
    tunnel.on("close", () => {
      console.log("tunnel closed");
    });
  } catch (error) {
    console.log(error, "error");
  }
};

module.exports = { createTunnel };
