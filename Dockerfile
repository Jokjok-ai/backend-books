FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate

# tambah ini untuk cek port db (biar bisa nunggu db ready)
RUN apk add --no-cache netcat-openbsd

EXPOSE 3000

# nunggu db:3306 siap, baru migrate, baru start
CMD ["sh", "-c", "until nc -z db 3306; do echo 'waiting for db...'; sleep 2; done; npx prisma migrate deploy && npm run start"]
