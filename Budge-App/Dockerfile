FROM node:8
WORKDIR /Budge-App
COPY . /Budge-App
RUN npm install

############################################################
# Dockerfile to build MongoDB container images
# Based on Ubuntu
############################################################

# Set the base image to Ubuntu
FROM ubuntu

# File Author / Maintainer
MAINTAINER Example Pablo Ezequiel

# Update the repository sources list
RUN apt-get update

# Add required dependency
RUN apt install -y gnupg

################## BEGIN INSTALLATION ######################
# Install MongoDB Following the Instructions at MongoDB Docs
# Ref: http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/

# Add the package verification key
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4

# Add MongoDB to the repository sources list
RUN bash -c 'echo "deb [arch=amd64] http://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse" > /etc/apt/sources.list.d/mongodb-org-4.0.list'
# Update the repository sources list once more
RUN apt-get update

# Install MongoDB package (.deb)
RUN apt install -y mongodb-org

# Create the default data directory
RUN mkdir -p /data/db

##################### INSTALLATION END #####################

# Expose the default port
EXPOSE 27017

# Set default container command
ENTRYPOINT usr/bin/mongod

### Expose ports necessary for MongoDB and Node.js ###
EXPOSE 3000

### Start application ###
CMD ["npm", "start"]
