FROM node:alpine AS base
WORKDIR "/app"

FROM base AS install
COPY package*.json ./
RUN npm install
COPY . .

FROM install as builder
RUN npm run build

FROM builder AS release
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./

EXPOSE 3000
CMD ["npm", "run", "start"]