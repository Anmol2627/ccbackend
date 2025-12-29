# Build stage
FROM node:18-alpine as build

WORKDIR /app

COPY package.json ./
# COPY package-lock.json ./ 
# We don't have package-lock.json in the file list I generated earlier? 
# Wait, I did see it in LS. I'll include it.
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx config if needed, or rely on default for SPA
# Default nginx config doesn't handle client-side routing (SPA) well (404 on refresh).
# So I'll add a simple nginx config.

RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
