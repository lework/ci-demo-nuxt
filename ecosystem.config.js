module.exports = {
  apps: {
    name: 'ci-demo-nuxt',
    cwd: `${process.cwd()}`,
    script: './server/index.mjs',
    instances: 2,
    exec_mode: 'cluster',
    autorestart: true,
    max_restarts: 3,
    watch: false,
    log_type: 'json',
    log_date_format: 'YYYY-MM-DD HH:mm Z',
    env: {
      PORT: 3000,
      HOST: '0.0.0.0'
    },
    env_dev: {
      NODE_ENV: 'development',
      MODE: 'dev'
    },
    env_test: {
      NODE_ENV: 'test',
      MODE: 'test'
    },
    env_prod: {
      NODE_ENV: 'production',
      MODE: 'prod'
    }
  }
}
