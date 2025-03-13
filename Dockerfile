FROM node:20-alpine AS development
# Set environment variables
ARG REACT_APP_API_URL
ARG NODE_ENV

ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV NODE_ENV=$NODE_ENV
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package.json .
RUN npm install --force
# Copy app files
COPY . .
# Expose port
EXPOSE 3000
# Start the app
CMD [ "npm", "start"]
