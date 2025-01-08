# Use an official Node.js image as the base
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /frontend

# Copy the rest of the application code
COPY ./website /frontend

# Install dependencies
RUN npm install



# Build the React app
RUN npm start

