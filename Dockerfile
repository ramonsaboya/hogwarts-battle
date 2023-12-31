# Use an official Node.js runtime as the base image
FROM --platform=linux/amd64 node:14

COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the server.js file to the working directory
COPY . .

# Expose the port that the server will listen on
EXPOSE 4030

# Start the server
CMD [ "npm", "run", "serve" ]
