FROM ianwalter/puppeteer:latest
RUN apt update && apt install default-jdk -y
# WORKDIR /e2e-test
# ADD . /e2e-test

RUN npm install

CMD npm run test