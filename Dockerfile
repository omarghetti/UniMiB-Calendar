FROM node:12.16.1-alpine as frontend

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY ./frontend/package.json /app/package.json
RUN npm install
RUN npm install react-scripts@3.0.1 -g

COPY ./frontend .
RUN npm run build

# ------------------------------------------------------

FROM node:12.16.1-alpine

WORKDIR /usr/src/app

COPY backend/package*.json ./

RUN npm install

COPY ./backend .
COPY --from=frontend /app/build ./ui

EXPOSE 8080

CMD ["node", "server.js"]
