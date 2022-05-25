FROM ianwalter/puppeteer:latest

WORKDIR /e2e-test
ADD . /e2e-test

RUN npm install

CMD npm run test