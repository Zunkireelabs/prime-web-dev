FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom static config
COPY nginx/static.conf /etc/nginx/conf.d/default.conf

# Copy built assets (from local 'out' folder)
COPY out/ /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
