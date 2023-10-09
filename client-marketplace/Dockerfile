FROM node:lts-alpine

WORKDIR /client

RUN chown -R node:node /client && chmod -R 770 /client

COPY package.json .

RUN npm install --force

COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev" ]
