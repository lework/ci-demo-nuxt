#syntax=harbor.leops.local/library/docker/dockerfile:1
#                                                                                       
# ---- 编译环境 ----

FROM harbor.leops.local/common/tools/node:22 AS builder

ARG APP_ENV=test \
    APP=undefine \
    GIT_BRANCH= \
    GIT_COMMIT_ID=

ENV APP_ENV=$APP_ENV \
    APP=$APP \
    GIT_BRANCH=$GIT_BRANCH \
    GIT_COMMIT_ID=$GIT_COMMIT_ID

WORKDIR /app_build

COPY package.json package-lock.json ./

RUN --mount=type=cache,id=${APP}-npm,target=/root/.npm \
    --mount=type=cache,id=${APP}-node_modules,target=/app_build/node_modules \
    npm install

COPY ./ ./

RUN --mount=type=cache,id=${APP}-npm,target=/root/.npm \
    --mount=type=cache,id=${APP}-node_modules,target=/app_build/node_modules \
    npm run build:${APP_ENV}


#
# ---- 运行环境 ----

FROM harbor.leops.local/common/runtime/pm2:node-22 AS running

ARG APP_ENV=test \
    APP=undefine \
    GIT_BRANCH= \
    GIT_COMMIT_ID=

ENV APP_ENV=$APP_ENV \
    APP=$APP \
    GIT_BRANCH=$GIT_BRANCH \
    GIT_COMMIT_ID=$GIT_COMMIT_ID

WORKDIR /app

COPY --from=builder --link --chown=999:999 /app_build/.output /app

CMD ["bash", "-c", "exec pm2-runtime start ecosystem.config.js --json --env ${APP_ENV}"]
