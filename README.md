## Aplikasi Filmku

Halo, nama saya Bagas. Repository ini adalah repository untuk frontend dari projek aplikasi Filmku. Repository backend dengan terpaksa saya private karena saya sempat push credentials secara public dan akan terdeteksi oleh github. Techstack yang saya gunakan dalam pembuatan aplikasi Filmku adalah Next.js untuk frontend, Nest.js untuk backend, Supabase untuk database, Ant Design untuk components, dan Vercel untuk deployment.

Aplikasi ini menggunakan OAuth Google untuk autentikasi, lalu dari sisi client akan menembak API dengan mengirimkan token yang terbentuk dari Google dan balikan dari APInya adalah access token yang akan digunakan untuk autorisasi. Berikut adalah alur dari autentikasi untuk aplikasi Filmku

<img width="460" height="688" alt="diagram-export-7-12-2025-7_44_32-PM" src="https://github.com/user-attachments/assets/b4438250-cee0-4fbe-8552-3e1fb98bf376" />

Pada alur dimana client menembak API ke server untuk mendapatkan access token, terdapat pengecekan apakah user sudah terdaftar dalam aplikasi atau belum. Apabila sudah, maka server akan mengembalikan access token. Apabila belum, server akan menembak API user info Google untuk validasi apakah email valid atau tidak. API user info Google akan mengembalikan response seperti nama, email, dan foto profil. Selanjutkan server akan mengembalikan access token sebagai response ke client.

Apabila user sudah login, maka user dapat menggunakan beberapa fitur yang tersedia seperti menambahkan film/series favorit dan yang akan ditonton nanti. User juga dapat memberikan review terhadap film/series. Film/series yang sudah dilihat sebelumnya juga akan ditampilkan dalam riwayat. Maka dari itu, database yang dibuat memiliki table user, favorite, watchlist, history, dan review. Berikut adalah desain database untuk aplikasi Filmku.

<img width="344" height="1351" alt="postgres - public" src="https://github.com/user-attachments/assets/9c0a0849-061d-40ab-928d-e32715bcc868" />

Selain fitur-fitur yang disebutkan, terdapat juga fitur untuk melihat detail dari film/series seperti aktor dan aktris yang terlibat hingga menonton trailer. Terdapat juga fitur kalender dimana user dapat melihat jadwal tayang film yang akan datang.

Untuk melihat aplikasinya secara langsung dapat diakses melalui link berikut [Filmku](http://filmku-jade.vercel.app/);

Semoga aplikasi yang saya buat dapat memberikan manfaat kepada masyarakat khususnya untuk mencari tahu lebih dalam mengenai film atau series favorit. Terimakasih,

Salam Hangat,

_Adrianus Bagas Tantyo Dananjaya_
