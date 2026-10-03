# Web Store dan Automasi Top-Up Game (Study Case 1)

- **Latar Belakang**: Ekosistem gaming berkembang pesat, dan para pemain seringkali membutuhkan platform yang cepat dan aman untuk membeli item atau currency dalam game tanpa kendala transaksi.
- **Tugas**: Membangun halaman storefront untuk layanan top-up game dan halaman checkout yang mensimulasikan validasi dari gerbang pembayaran (payment gateway).
- **Fitur yang Wajib Ada**:
  1. Katalog item/currency game (nama paket, jumlah, dan harga).
  2. Formulir input ID Pemain dan pilihan metode pembayaran.
  3. Halaman nota (invoice) yang muncul secara dinamis setelah pembayaran disimulasikan sukses.
- **Panduan**: Peserta tidak perlu mengintegrasikan sistem pembayaran sungguhan. Gunakan mock API atau data JSON lokal untuk memvalidasi format ID pemain secara dummy dan mensimulasikan respons sukses/gagal. Pada contoh implementasi di bawah, penguji memilih hasil simulasi agar kedua jalur dapat dicoba secara konsisten.

## Arah Pengalaman (Top Surface)

Fokus utama adalah kenyamanan: alur mudah dipahami tanpa menjadikan pesan keamanan atau promosi ramai sebagai pusat pengalaman.

- **Storefront**: Langsung menampilkan paket MLBB, bukan halaman pemilih banyak game.
- **Nuansa**: Dipandu dan jelas; pemain mudah memahami pilihan dan langkah berikutnya.
- **Alur utama**: Pilih paket → checkout satu layar → lihat nota yang tenang dan jelas setelah sukses.

## Catatan Diskusi: Contoh Implementasi Mobile Legends

Rincian berikut mencatat pilihan untuk contoh implementasi, bukan syarat universal untuk semua storefront.

- **Katalog contoh**: 6 paket Diamond dengan harga dummy; angka ini bukan daftar paket atau harga resmi MLBB.
  - 50 Diamond — Rp10.000
  - 100 Diamond — Rp18.000
  - 250 Diamond — Rp40.000
  - 500 Diamond — Rp75.000
  - 1.000 Diamond — Rp140.000
  - 2.000 Diamond — Rp260.000
- **ID pemain**: Satu kolom dengan format `UserID(ZoneID)`, misalnya `12345678(1234)`. Validasi hanya mengecek format angka dan maksimal 15 digit gabungan; validasi ini tidak memastikan akun benar-benar ada. [Panduan ID Codashop Indonesia](https://id.support.codashop.com/hc/id/articles/360002000895-Di-Mana-Saya-Dapat-Menemukan-User-ID-Mobile-Legends-Saya)
- **Metode pembayaran**: QRIS, e-wallet, dan Virtual Account, seluruhnya sebagai pilihan simulasi tanpa transaksi nyata.
- **Hasil checkout**: Penguji memilih mode sukses atau gagal agar kedua jalur bisa dicoba secara konsisten. Jika gagal, tampilkan pesan gagal tanpa invoice sukses.
- **Invoice sukses**: Tampilkan nomor invoice, waktu transaksi, paket/jumlah Diamond, ID pemain, metode pembayaran, total, dan status.
- **Batas simulasi**: Tidak ada verifikasi akun MLBB, pemrosesan pembayaran sungguhan, atau pengiriman Diamond ke dalam game.

- **ID kosong/format salah**: Tampilkan error di dekat kolom ID, jangan lanjutkan checkout, dan pertahankan pilihan paket serta metode pembayaran.
- **Coba lagi setelah gagal**: Pertahankan data form agar penguji bisa mengubah mode simulasi dan mencoba checkout kembali.
- **Penyimpanan invoice**: Invoice hanya berlaku pada sesi checkout saat ini; tidak ada riwayat atau penyimpanan setelah refresh.
