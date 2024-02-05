# Koristi oficijalnu Node.js sliku kao osnovu
FROM node:14-alpine

# Postavljanje radnog direktorijuma unutar kontejnera
WORKDIR /usr/src/app

# Kopiranje package.json i package-lock.json u radni direktorijum
COPY package*.json ./

# Instaliranje zavisnosti
RUN npm install -g @angular/cli
RUN npm install --force

# Kopiranje ostatka aplikacije u radni direktorijum
COPY . .

# Izgradnja aplikacije
RUN npm run build

# Postavljanje web servera da sluša na portu 80
EXPOSE 80

# Pokretanje aplikacije
CMD ["npm", "start"]
