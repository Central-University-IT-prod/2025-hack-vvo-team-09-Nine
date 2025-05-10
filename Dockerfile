FROM node:20.1-alpine AS build
RUN npm cache clean --force
COPY . .
WORKDIR src/app/client-side
RUN npm install
RUN npm install -g @angular/cli@16
RUN ng build

FROM nginx:latest AS ngi
COPY --from=build src/app/client-side/dist/nine-team /usr/share/nginx/html
COPY src/app/client-side/nginx.conf  /etc/nginx/conf.d/default.conf
EXPOSE 80
