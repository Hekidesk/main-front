FROM node:14-alpine

WORKDIR /usr/src/app

ARG REACT_APP_BASE_URL=/

ENV REACT_APP_BASE_URL $REACT_APP_BASE_URL

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 80

CMD ["npm", "run", "dev"]
