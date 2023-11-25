# Pull base image
FROM node:lts-alpine
# set work directory
WORKDIR /frontend

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install -g serve
RUN npm install

# copy react project
COPY . .

# build react project
RUN npm run build