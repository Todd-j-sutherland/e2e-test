# FROM node:16.13.1
# RUN apt update && apt install default-jdk -y
# RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \ 
#     && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list
# RUN apt-get update && apt-get -y install google-chrome-stable
# COPY entrypoint.sh /entrypoint.sh

# ENTRYPOINT ["/entrypoint.sh"]

# FROM ianwalter/puppeteer:latest
# # FROM node:16.13.1
# # RUN apt update && apt install default-jdk -y
# WORKDIR /e2e-test
# # COPY . /e2e-test
# COPY package.json .
# RUN npm install
# # Copies your code file from your action repository to the filesystem path `/` of the container
# COPY entrypoint.sh /entrypoint.sh

# # Code file to execute when the docker container starts up (`entrypoint.sh`)
# ENTRYPOINT ["/entrypoint.sh"]

# CMD npm run test:e2e 
FROM ianwalter/puppeteer:latest
# FROM node:16.13.1
# WORKDIR /e2e-test
COPY . /e2e-test
COPY entrypoint.sh /entrypoint.sh
RUN apt update && apt install default-jdk -y
# COPY package.json .
RUN npm install
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]