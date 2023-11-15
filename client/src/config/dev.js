const PORT = process.env.PORT || "3002";

module.exports = {
  redirectUri: `http://localhost:${PORT}/oauth2/redirect`,
  apiBaseUrl: "http://localhost:8080/api/v1",
};
