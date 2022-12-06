module.exports = {
  apps: [{
    name: "MS-ORGANISASI",
    script: "./server.js",
    watch: true,
    log_date_format: "YYYY/MM/DD HH:mm Z",
    // error_file: "./storages/logs/stderr.log",
    // out_file: "./storages/logs/stdout.log",
    instances: 1,
    max_memory_restart: "512M",
    autorestart: true,
    // merge_logs: true,
  }]
}