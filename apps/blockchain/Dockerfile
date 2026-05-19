FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install
WORKDIR /app/apps/blockchain
EXPOSE 3002 6001
CMD ["npm", "start"]