# Usamos una imagen base ligera de Nginx (Alpine Linux)
# Esto asegura que el contenedor final sea muy pequeño y rápido.
FROM nginx:alpine

# Copiamos nuestra configuración personalizada de Nginx
# Esto sobrescribe la configuración por defecto para usar el puerto 8080.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiamos todos los archivos estáticos del proyecto al directorio de Nginx
# (index.html, style.css, main.js, etc.)
COPY . /usr/share/nginx/html

# Exponemos el puerto 8080, que es el puerto estándar esperado por Cloud Run.
EXPOSE 8080

# Comando por defecto para iniciar Nginx en primer plano.
CMD ["nginx", "-g", "daemon off;"]
