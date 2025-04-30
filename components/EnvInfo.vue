<template>
  <div class="env-info-container">
    <ul class="env-list">
      <li><strong>环境类型：</strong> {{ appEnv }}</li>
      <li><strong>应用模式：</strong> {{ appMode }}</li>
      <li><strong>API基础URL：</strong> {{ apiBase }}</li>
    </ul>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();

// 获取环境变量
const apiBase = config.public.apiBase;
const appMode = config.public.appMode;
const appEnv = config.public.appEnv;
</script>

<style scoped>
.env-info-container {
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 6px;
  background-color: #f9f9f9;
  max-width: 500px;
  margin: 20px auto;
}

.env-list {
  padding-left: 20px;
  line-height: 1.8;
}
</style> 