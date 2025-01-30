# Use official node image to build the React app
FROM node:16-slim as build

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
