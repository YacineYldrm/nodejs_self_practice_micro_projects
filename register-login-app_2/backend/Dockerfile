# meine erste Dockerfile

# wir definieren mit FROM das 'base image / parent image'
FROM node:18.18-alpine3.18

# arbeitsverzeichnis definieren, da kommen alle apps rein
WORKDIR /app

# kopiere package files
COPY package*.json ./

# shell befehle
RUN npm install

COPY . ./

#port exposen
EXPOSE 3001

# env variables definieren
ENV PORT=3001

CMD ["npm", "start"]