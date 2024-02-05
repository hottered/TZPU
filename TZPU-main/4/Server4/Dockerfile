FROM node:19.7.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --force
RUN npm install -g concurrently
COPY . .


EXPOSE 3000
ENV PATH /usr/src/app/node_modules/.bin:$PATH

CMD ["ts-node-dev", "--respawn", "./src/index.ts", "--experimental-modules"]
CMD ["npm", "run", "all" ]
