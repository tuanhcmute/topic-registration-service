FROM node:18-alpine AS BUILD
WORKDIR /app
COPY client/package.json ./client/package.json
RUN cd client && npm install
COPY client ./client
RUN cd client && npm run build --network-timeout 6000000
WORKDIR /app/client
# RUN npm run build

FROM nginx:alpine
COPY ./.build/frontend/nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
EXPOSE 80
COPY --from=BUILD /app/client/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]