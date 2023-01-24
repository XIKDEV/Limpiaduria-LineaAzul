FROM node:18.13.0-slim as runner
WORKDIR /app
COPY package.json ./
RUN yarn install --frozen-lockfile

FROM node:18.13.0-slim as prod-builder
WORKDIR /app
COPY --from=runner /app/node_modules ./node_modules
COPY . .
RUN yarn build

FROM node:18.13.0-slim as prod-deps
WORKDIR /app
COPY package.json package.json
RUN yarn install --prod --frozen-lockfile


FROM node:18.13.0-slim as prod
EXPOSE 3000
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=prod-builder /app/dist ./dist
CMD [ "node", "dist/main.js" ]