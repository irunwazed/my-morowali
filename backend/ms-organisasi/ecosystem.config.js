module.exports = {
  apps: [{
    name: "MS-ORGANISASI",
    script: "./app/server.js",
    watch: true,
    log_date_format: "YYYY/MM/DD HH:mm Z",
    error_file: "./storages/logs/stderr.log",
    out_file: "./storages/logs/stdout.log",
    instances: 1,
    exec_mode: "fork",
    max_memory_restart: "512M",
    autorestart: true,
    merge_logs: true,
    env: {
      NODE_ENV: "development"
    },
    env_production: {
      NODE_ENV: 'production'
    },
  }]
}