# Backend Transmore

Backend aplikasi Transmore menggunakan Node.js, Express, dan SQLite. Backend ini menyediakan API untuk autentikasi user dan manajemen produk/jasa.

## Cara Menjalankan Backend

1. **Install dependencies**
   ```
   cd backend
   npm install
   ```
2. **Buat file environment**
   - Buat file `.env` di folder backend (jika belum ada) dan isi:
     ```
     JWT_SECRET=rahasia_anda
     ```
3. **Inisialisasi database**
   ```
   node database-init.js
   ```
4. **Jalankan server**
   ```
   npm run dev
   ```
   Server berjalan di http://localhost:3001

## Fitur Utama

- Registrasi & login user
- Role user: admin & user
- CRUD produk/jasa (admin)

## Akun Admin Default

Setelah instalasi backend, otomatis tersedia akun admin berikut:

- **Email:** admin@transmora.id
- **Password:** admin123
- **Nama:** Admin Transmora

Akun ini dapat digunakan untuk login sebagai admin di frontend dan mengelola produk/jasa.

## Endpoint API

### 1. Register

- **POST** `/api/register`
- Body: `{ "name": "Nama", "email": "email", "password": "password" }`
- Respon: data user

### 2. Login

- **POST** `/api/login`
- Body: `{ "email": "email", "password": "password" }`
- Respon: `{ token, user }`

### 3. List Produk

- **GET** `/api/products`
- Respon: array produk, setiap produk ada field `user_name` (nama pembuat)

### 4. Detail Produk

- **GET** `/api/products/:id`
- Respon: detail produk, ada field `user_name`

### 5. Tambah Produk (admin)

- **POST** `/api/products`
- Header: `Authorization: Bearer <token_admin>`
- Body: `{ name, description, price, image, location, category }`

### 6. Edit Produk (admin)

- **PUT** `/api/products/:id`
- Header: `Authorization: Bearer <token_admin>`
- Body: `{ name, description, price, image, location, category }`

### 7. Hapus Produk (admin)

- **DELETE** `/api/products/:id`
- Header: `Authorization: Bearer <token_admin>`

## Catatan

- Semua data produk akan menyimpan nama user yang menambahkannya.
- Untuk akses admin, ubah role user di database menjadi 'admin'.
- Untuk testing, gunakan Postman atau fetch dari frontend.
