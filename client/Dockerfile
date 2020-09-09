FROM node:alpine
WORKDIR '/app'
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx
EXPOSE 3000
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx
COPY --from=0 /app/build /usr/share/nginx/html