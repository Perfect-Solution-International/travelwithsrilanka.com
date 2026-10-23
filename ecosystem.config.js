module.exports = {
  apps: [
    {
      name: "travelwithsrilanka.com",
      cwd: "/var/www/travelwithsrilanka.com",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3001",
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
      },
      instances: 1,
      autorestart: true,
      max_memory_restart: "500M",
    },
  ],
};

