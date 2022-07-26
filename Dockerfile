FROM node:16.16-alpine AS builder
COPY ./frontend /frontend
WORKDIR /frontend
RUN npm install
RUN npm run-script prod

FROM node:16.16
COPY ./backend /opt/gotcaked/backend
COPY --from=builder /frontend/dist/ ./opt/gotcaked/frontend/dist
WORKDIR /opt/gotcaked/backend
RUN npm install
ARG GITVERSION
ENV VERSION=$GITVERSION

CMD [ "npm", "run-script", "start" ]
