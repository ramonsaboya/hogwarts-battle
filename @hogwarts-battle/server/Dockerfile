# Use an official Node.js runtime as the base image
FROM --platform=linux/amd64 node:21.5.0

# Copy root package.json and lockfile
COPY package.json ./
COPY package-lock.json ./
 
# Copy the server and common package.json
COPY @hogwarts-battle/server/package.json ./@hogwarts-battle/server/package.json
COPY @hogwarts-battle/common/package.json ./@hogwarts-battle/common/package.json

# Install the dependencies
RUN npm install
 
# Copy app source
COPY @hogwarts-battle/server/ ./@hogwarts-battle/server/
COPY @hogwarts-battle/common/ ./@hogwarts-battle/common/
COPY tsconfig*.json ./

# Build the app
RUN npm run build:common
RUN npm run build:server

# Expose the port that the server will listen on
EXPOSE 4030

# Start the server
CMD [ "npm", "run", "start:server" ]
