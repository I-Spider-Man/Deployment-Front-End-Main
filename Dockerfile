FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm","start"]
EXPOSE 3000
