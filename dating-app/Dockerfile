FROM node:20-alpine

WORKDIR /app

# Copy package.json and package-lock.json separately
COPY package*.json /app/

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . /app/

# Expose the required port
EXPOSE 5173

# Start the app
CMD ["npm", "run", "dev", "--", "--host"]
