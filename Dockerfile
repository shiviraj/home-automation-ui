FROM artifactory.axisb.com/docker/node:16.13.1-alpine3.12
WORKDIR /app
COPY . /app
EXPOSE 3050
CMD yarn start
