export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase;
  const appEnv = config.public.appEnv;

  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    baseUrl: apiBase,
    environment: appEnv,
    version: process.env.npm_package_version || '1.0.0'
  }
}) 
