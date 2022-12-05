// module.exports = {
//   apps : [{
//     name: 'my_server',
//     script: './app/server.js',
//     "log_date_format"  : "YYYY-MM-DD HH:mm Z",
//     interpreter: "babel-node",

//     // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
//     args: 'one two',
//     instances: '1',
//     autorestart: true,
//     watch: "../",
//     max_restarts: 10,
//     max_memory_restart: '1G',
//     env: {
//       NODE_ENV: 'development'
//     },
//     env_production: {
//       NODE_ENV: 'production'
//     },
//     // exec_mode: 'cluster'
//   }],
// };
// --interpreter babel-node

module.exports = {
  "apps": [{
    "name": "Application",
    // "exec_interpreter": "./node_modules/@babel/node/bin/babel-node.js",
    "script": "./app/server.js",
    "args": [],
    "watch": ["public", "package.json", "pm2.development.json"],
    "ignore_watch": ["public"],
    "watch_options": {
      "persistent": true,
      "follow_symlinks": true
    },
    "log_date_format"  : "YYYY/MM/DD HH:mm Z",
    "interpreter_args": ["--presets", "es2015"],
    "error_file": "./storage/logs/stderr.log",
    "out_file": "./storage/logs/stdout.log",
    "instances": 1,
    "exec_mode": "fork",
    "max_memory_restart": "512M",
    "autorestart": true,
    "merge_logs": true,
    "env": {
      "NODE_ENV": "development"
    }
  }]
}