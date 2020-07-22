(function (window) {
  window.__env = window.__env || {};

  // API url
  window.__env.baseUrl = 'http://192.168.1.18:8080';
  window.__env.versionFront = '1.0.2';
  window.__env.versionBackend = '1.0.2';

  window.__env.envNameFront = 'dev';
  window.__env.envNameBackend = 'dev';
  window.__env.nomPharmacie = 'Pharmacie du boulevard';
  // Whether or not to enable debug mode
  // Setting this to false will disable console output
  window.__env.enableDebug = true;
  window.__env.production = false;
}(this));
