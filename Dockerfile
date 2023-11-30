# Use an official Node.js runtime as a parent image
FROM node:lts-alpine
ADD . /app
# Set the working directory in the container
WORKDIR /app
# Expose the port your app is running on (e.g., 3000)
EXPOSE 3000
# Define the command to run your Node.js application
CMD [ "npm", "run", "start" ]