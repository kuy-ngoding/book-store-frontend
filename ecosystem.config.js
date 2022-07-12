module.exports = {
  apps: [
    {
      exec_mode: "cluster",
      script: "serve",
      watch: true,
      env: {
        PM2_SERVE_PATH: "./build",
        PM2_SERVE_PORT: 3000,
        PM2_SERVE_SPA: "true",
      },
      instances: "2",
      name: "backoffice.contag.id",
    },
  ],
};
