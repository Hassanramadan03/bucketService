# Use the official Nginx image as the base
FROM nginx

# Remove the default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy your custom Nginx configuration file to the container
COPY nginx.conf /etc/nginx/conf.d/

# Expose the port Nginx listens on (e.g., 80)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
