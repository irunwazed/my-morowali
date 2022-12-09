module.exports = {
  apps: [{
    name: "MS-KEMISKINAN",
    script: "./app/server.js",
    watch: true,
    log_date_format: "YYYY/MM/DD HH:mm Z",
    ignore_watch : ["node_modules", "public", "uploads"],
    // error_file: "./storages/logs/stderr.log",
    // out_file: "./stdout.log",
    instances: 1,
    max_memory_restart: "512M",
    autorestart: true,
    // merge_logs: true,
  }]
}