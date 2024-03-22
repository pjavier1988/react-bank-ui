# Use a specific Node.js version
FROM node:14-alpine AS builder

# Set working directory
WORKDIR /app

# Copy the rest of the application code
COPY . .

# Set default values for environment variables

# Copy the appropriate webpack configuration based on the environment
ARG ENVIRONMENT

# Install production dependencies
RUN npm i 
# Build the application


# Set environment variables
ENV REACT_APP_BANK_API_URL=http://158.220.117.174:8000/
COPY package.json ./
RUN npm run build -- --env REACT_APP_BANK_API_URL=$REACT_APP_BANK_API_URL

# Use a lightweight Nginx image
FROM nginx:alpine
COPY default.conf /etc/nginx/conf.d/default.conf

# Copy the built static files from the builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 5437 to the outside world
EXPOSE 5437

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
