# The base image
FROM node:16-alpine AS build

# The working directory inside the container
WORKDIR /app

# Build arguments and environment variables
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL}

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code into the container
COPY . .

# Build the app
RUN npm run build

FROM node:16-alpine
WORKDIR /app

# Use a web server
RUN npm install -g serve
COPY --from=build /app/build ./build
CMD ["serve", "-s", "build", "-l", "3000"]

# Make port 3000 accessible outside the container
EXPOSE 3000
