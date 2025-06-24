FROM node:22

WORKDIR /app

COPY server server
COPY client client

RUN cd server && npm install
RUN cd client && npm install && npm run build

WORKDIR /app/server
ENV NODE_ENV=production
ENV SECURITYTRAILS_API_KEY=$SECURITYTRAILS_API_KEY

EXPOSE 4000
CMD [ "node", "index.js" ]