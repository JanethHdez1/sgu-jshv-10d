#Etapa 1: Compilación de los recursos
FROM node:20 AS build 

# Establecer el directorio de trabajo
WORKDIR /app

# para que copiemos package-lock.json, package.json
COPY package*.json ./

# Funciona para generar el node_modules
RUN npm install

# todo lo que esté dentro de /client/* -> /app/*
COPY . .

# Traer esos argumentos
ARG API_HOST
ARG API_BASE 
ARG API_PORT

# Establecer las variables de entorno de la base de datos
ENV VITE_API_HOST=$API_HOST
ENV VITE_API_BASE=$API_BASE
ENV VITE_API_PORT=$API_PORT

#Funciona para generar la carpeta /dist
RUN npm run build



#Etapa 2: Construcción de la imagen
FROM nginx:alpine

# Servir todos los recursos generados en la etapa anterior en la imagen
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer la imagen en el puerto
EXPOSE 80

# Levantar el nginx
CMD ["nginx", "-g", "daemon off;"]