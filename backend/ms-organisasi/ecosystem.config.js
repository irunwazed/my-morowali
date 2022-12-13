module.exports = {
  apps: [{
    name: "MS-ORGANISASI",
    script: "./app/server.js",
    watch: true,
    log_date_format: "YYYY/MM/DD HH:mm Z",
    ignore_watch : ["node_modules"],
    // error_file: "./storages/logs/stderr.log",
    // out_file: "./storages/logs/stdout.log",
    instances: 1,
    max_memory_restart: "112M",
    autorestart: true,
    // merge_logs: true,
  }]
}