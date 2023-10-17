const PORT = process.env.PORT || "3001";

module.exports = {
  redirectUri: `http://localhost:${PORT}/oauth2/redirect`,
  apiBaseUrl: "http://localhost:8080/api/v1",
};
