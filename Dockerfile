# syntax=docker/dockerfile:1

FROM node:22.6.0-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install

FROM base
COPY --from=build /app/node_modules /app/node_modules

RUN apk add --update xdg-utils

EXPOSE "3000"
CMD ["pnpm", "start"]