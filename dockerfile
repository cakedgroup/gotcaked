FROM node:16-alpine AS builder
COPY ./frontend /frontend
WORKDIR /frontend
RUN npm install
RUN npm run-script build

FROM node:16-alpine
COPY ./backend /opt/gotcaked/backend
COPY --from=builder /frontend ./opt/gotcaked/frontend
WORKDIR /opt/gotcaked/backend
RUN npm install

CMD [ "npm", "run-script", "start" ]