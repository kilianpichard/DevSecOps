FROM node:alpine

RUN apk update && apk upgrade --no-cache && apk add --no-cache curl
WORKDIR /app
COPY ./src .
RUN npm install --production
USER node

ENTRYPOINT ["node"]
CMD ["index.js"]

EXPOSE 3001
HEALTHCHECK --interval=1m --timeout=20s --retries=3 CMD curl --fail http://localhost:3001 || exit 1
