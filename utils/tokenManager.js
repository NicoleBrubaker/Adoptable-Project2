require("dotenv").config();

let currentToken = {
  value: null,
  expiry: Date.now(),
};

async function refreshToken() {
  const fetch = (await import("node-fetch")).default;
  const response = await fetch("https://api.petfinder.com/v2/oauth2/token", {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.PETFINDER_CLIENT_ID,
      client_secret: process.env.PETFINDER_CLIENT_SECRET,
    }),
  });
  const data = await response.json();
  currentToken.value = data.access_token;
  // Assuming the token expires in 1 hour; adjust as per the actual token expiry
  currentToken.expiry =
    Date.now() + data.expires_in * 1000 || Date.now() + 3600000;
  return currentToken.value;
}

function isTokenValid() {
  return currentToken.value && currentToken.expiry > Date.now();
}

async function getToken() {
  if (!isTokenValid()) {
    await refreshToken();
  }
  return currentToken.value;
}

module.exports = { getToken };
