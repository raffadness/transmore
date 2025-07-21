# Backend Setup

## Install dependencies

```
cd backend
npm install
```

## Run development server

```
npm run dev
```

## Run production server

```
npm start
```

Server berjalan di port 3001 secara default.

## API Endpoints

### Auth

- POST `/api/register` — Register user baru
- POST `/api/login` — Login user, return JWT

### Produk

- GET `/api/products` — List semua produk
- GET `/api/products/:id` — Detail produk
- POST `/api/products` — Tambah produk (admin, butuh JWT)
- PUT `/api/products/:id` — Edit produk (admin, butuh JWT)
- DELETE `/api/products/:id` — Hapus produk (admin, butuh JWT)

### Testing

Gunakan Postman/Insomnia atau fetch dari frontend untuk test endpoint di atas.
