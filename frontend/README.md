# Frontend Transmore

Frontend aplikasi Transmore menggunakan React dan Vite. Aplikasi ini menampilkan katalog produk/jasa, halaman detail, login, register, dan dashboard admin.

## Cara Menjalankan Frontend

1. **Install dependencies**
   ```
   cd frontend
   pnpm install
   ```
2. **Jalankan aplikasi**
   ```
   pnpm run dev
   ```
   Akses di http://localhost:5173 (atau sesuai info di terminal)

## Fitur Utama

- Registrasi & login user
- Lihat daftar produk/jasa
- Lihat detail produk/jasa
- Admin bisa menambah, edit, dan hapus produk

## Integrasi dengan Backend

- Pastikan backend sudah berjalan di http://localhost:3001
- Frontend otomatis mengambil data produk dan user dari backend
- Untuk fitur admin, login sebagai user dengan role admin

## Catatan

- Jika ingin mencoba fitur admin, minta akses admin ke pengelola aplikasi
- Jika backend tidak berjalan, data tidak akan tampil di frontend
