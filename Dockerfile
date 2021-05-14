FROM node:10-alpine
WORKDIR /usr/src/app
COPY . .
RUN npm install nuxt && npm rebuild

ENV HOST 0.0.0.0

CMD [ "npm", "start" ]