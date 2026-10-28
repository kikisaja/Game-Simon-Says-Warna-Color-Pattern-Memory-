# 🎮 Color Pattern Memory (Simon Says)

Aplikasi game memori pola warna klasik (*Simon Says*) berbasis JavaScript interaktif di mana pemain harus mengingat, menghafal, dan mengulang urutan nyala lampu tombol warna secara berurutan.

---

## 🎯 Konsep Pembelajaran RPL / Pemrograman Web

1. **Array Sequence & State Indexing:**
   Menyimpan urutan pola warna acak ke dalam array (`gamePattern`) serta mencocokkan input klik pemain satu per satu berdasarkan indeks array (`userClickedPattern`).
2. **Asynchronous Delays (`setTimeout`):**
   Menggunakan jeda waktu berjenjang (`index * 600`) untuk memutar animasi nyala tombol secara bergantian secara visual.
3. **Web Audio API Synth:**
   Memanfaatkan fungsi sintesis frekuensi suara murni menggunakan `OscillatorNode` untuk menghasilkan nada musik unik di setiap tombol warna tanpa berkas audio eksternal.

---

## 📂 Struktur Folder Proyek

```text
├── index.html       # Panel skor, level, kotak instruksi, & grid 4 tombol warna Simon
├── style.css        # Desain Neobrutalism kuning-pop, efek tombol aktif, & layout grid
└── script.js        # Logika urutan pola array, event klik, & Web Audio API
