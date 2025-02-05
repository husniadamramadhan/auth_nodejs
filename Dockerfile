#BASE Image
FROM node:18

#Set Working Directory
WORKDIR /

#Salin Package
COPY package*.json ./

#Install Dependency
RUN npm install

#Copy Code
COPY . .

#Expose Port
EXPOSE 3000

#Jalankan app
CMD ["npm","start"]