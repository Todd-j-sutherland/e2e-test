# FROM node:16.13.1
# RUN apt update && apt install default-jdk -y
# RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \ 
#     && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list
# RUN apt-get update && apt-get -y install google-chrome-stable
# COPY entrypoint.sh /entrypoint.sh

# ENTRYPOINT ["/entrypoint.sh"]

# FROM ianwalter/puppeteer:latest
FROM node:16.13.1
RUN apt update && apt install default-jdk -y
# WORKDIR /onboarding-web
ADD . /e2e-test

# RUN npm install

# CMD npm run test:e2e 