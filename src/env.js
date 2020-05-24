(function (window) {
  window.__env = window.__env || {};

  // API url
  window.__env.baseUrl = 'http://127.0.0.1:8080';
  window.__env.versionFront = '1.0.0';
  window.__env.versionBackend = '1.0.0';

  window.__env.envNameFront = 'dev';
  window.__env.envNameBackend = 'dev';
  // Whether or not to enable debug mode
  // Setting this to false will disable console output
  window.__env.enableDebug = true;
  window.__env.production = false;
}(this));
