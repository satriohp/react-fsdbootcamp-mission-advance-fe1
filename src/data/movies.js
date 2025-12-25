const movies = {
  continue: [
    { id: "continue-1", src: "/assets/movie-posters/continue-watch/image208.png", title: "Rio", type: "film", isPremium: false, rating: "4.5/5", genres: ["Animation", "Adventure"], description: "Blu, seekor burung macaw langka yang tidak bisa terbang, melakukan perjalanan ke Rio de Janeiro." },
    { id: "continue-2", src: "/assets/movie-posters/continue-watch/image216.png", title: "Shazam", type: "film", isPremium: true, rating: "4.7/5", genres: ["Action", "Adventure"], description: "Seorang remaja mendapatkan kekuatan dewa kuno untuk melawan ancaman mematikan." },
    { id: "continue-3", src: "/assets/movie-posters/continue-watch/image218.png", title: "fastX", type: "film", isPremium: true, rating: "4.8/5", genres: ["Action", "Crime"], description: "Dom Toretto dan keluarganya menghadapi musuh paling mematikan dari masa lalu mereka." },
    { id: "continue-4", src: "/assets/movie-posters/continue-watch/image219.png", title: "Blue Lock", type: "series", isPremium: false, rating: "4.9/5", genres: ["Anime", "Sports"], description: "Jepang mengumpulkan 300 striker muda untuk menciptakan striker terbaik dunia." },
    { id: "continue-5", src: "/assets/movie-posters/continue-watch/image224.png", title: "A Man Called Otto", type: "film", isPremium: false, rating: "4.6/5", genres: ["Comedy", "Drama"], description: "Pria pemarah yang kehilangan tujuan hidup menemukan persahabatan tak terduga." },
    { id: "continue-6", src: "/assets/movie-posters/continue-watch/image226.png", title: "Big Hero 6", type: "film", isPremium: false, rating: "4.8/5", genres: ["Animation", "Action"], description: "Hiro Hamada membentuk tim superhero bersama robot medis bernama Baymax." },
  ],
  toprated: [
    { id: "toprated-1", src: "/assets/movie-posters/top-rated/image212.png", title: "The Tomorrow War", type: "film", isPremium: true, rating: "4.4/5", genres: ["Action", "Sci-Fi"], description: "Pasukan masa depan kembali ke masa kini untuk merekrut tentara demi perang global." },
    { id: "toprated-2", src: "/assets/movie-posters/top-rated/image213.png", title: "Batman", type: "film", isPremium: true, rating: "4.9/5", genres: ["Action", "Crime"], description: "Batman menyelidiki korupsi di Gotham sambil memburu pembunuh berantai, Riddler." },
    { id: "toprated-3", src: "/assets/movie-posters/top-rated/image234.png", title: "Sonic", type: "film", isPremium: false, rating: "4.7/5", genres: ["Action", "Adventure"], description: "Sonic mencoba memahami kehidupan di Bumi sambil menghindari kejaran Dr. Robotnik." },
    { id: "toprated-4", src: "/assets/movie-posters/top-rated/image223.png", title: "My Hero Academia", type: "series", isPremium: true, rating: "4.9/5", genres: ["Anime", "Action"], description: "Izuku Midoriya bermimpi menjadi pahlawan nomor satu di dunia yang penuh kekuatan super." },
    { id: "toprated-5", src: "/assets/movie-posters/top-rated/image224.png", title: "Doctor Strange: Multiverse of Madness", type: "film", isPremium: true, rating: "4.6/5", genres: ["Action", "Fantasy"], description: "Doctor Strange melintasi realitas alternatif multiverse yang berbahaya." },
    { id: "toprated-6", src: "/assets/movie-posters/top-rated/image235.png", title: "Guardians of Galaxy", type: "film", isPremium: true, rating: "4.8/5", genres: ["Action", "Sci-Fi"], description: "Sekelompok penjahat antargalaksi dipaksa bekerja sama untuk menyelamatkan alam semesta." },
  ],
  trending: [
    { id: "trending-1", src: "/assets/movie-posters/trending/image210.png", title: "Blue Lock", type: "series", isPremium: true, rating: "4.9/5", genres: ["Anime", "Sports", "Action"], description: "Program pelatihan radikal Jepang untuk menciptakan striker terbaik di dunia." },
    { id: "trending-2", src: "/assets/movie-posters/trending/image211.png", title: "Litle Mermaid", type: "film", isPremium: true, rating: "4.5/5", genres: ["Adventure", "Family", "Fantasy"], description: "Ariel membuat kesepakatan dengan penyihir laut untuk menjadi manusia." },
    { id: "trending-3", src: "/assets/movie-posters/trending/image221.png", title: "Antman-Wasp: Quantumania", type: "film", isPremium: true, rating: "4.3/5", genres: ["Action", "Adventure", "Comedy"], description: "Keluarga Ant-Man terjebak di Alam Kuantum dan menghadapi Kang the Conqueror." },
    { id: "trending-4", src: "/assets/movie-posters/trending/image226.png", title: "Black Adam", type: "film", isPremium: true, rating: "4.4/5", genres: ["Action", "Sci-Fi", "Fantasy"], description: "Setelah 5.000 tahun, Black Adam bebas untuk menegakkan keadilan dengan caranya sendiri." },
    { id: "trending-5", src: "/assets/movie-posters/trending/image230.png", title: "Jurassic World", type: "film", isPremium: true, rating: "4.5/5", genres: ["Action", "Adventure", "Sci-Fi"], description: "Taman hiburan dinosaurus berubah kacau saat spesimen cerdas melarikan diri." },
    { id: "trending-6", src: "/assets/movie-posters/trending/image236.png", title: "Spiderman Across The Spider Verse", type: "film", isPremium: true, rating: "5.0/5", genres: ["Animation", "Action", "Adventure"], description: "Miles Morales melintasi Multiverse untuk melindungi seluruh semesta." },
  ],
  newrelease: [
    { id: "newrelease-1", src: "/assets/movie-posters/new-release/image205.png", title: "Rio", type: "film", isPremium: true, rating: "4.5/5", genres: ["Animation", "Adventure", "Comedy"], description: "Petualangan Blu dan Jewel mencari sisa spesies mereka di hutan Amazon." },
    { id: "newrelease-2", src: "/assets/movie-posters/new-release/image216.png", title: "Alice In Borderland", type: "film", isPremium: true, rating: "4.8/5", genres: ["Action", "Drama", "Mystery"], description: "Arisu terjebak di Tokyo yang kosong dan harus bermain game maut demi bertahan hidup." },
    { id: "newrelease-3", src: "/assets/movie-posters/new-release/image225.png", title: "Dont Look Up", type: "series", isPremium: false, rating: "4.6/5", genres: ["Comedy", "Drama", "Sci-Fi"], description: "Dua astronom berjuang meyakinkan dunia tentang ancaman komet yang akan menghantam Bumi." },
    { id: "newrelease-4", src: "/assets/movie-posters/new-release/image227.png", title: "The Devil All The Time", type: "series", isPremium: true, rating: "4.7/5", genres: ["Crime", "Drama", "Thriller"], description: "Seorang pemuda melindungi orang tercintanya dari pendeta korup di kota terpencil." },
    { id: "newrelease-5", src: "/assets/movie-posters/new-release/image228.png", title: "Ted Lasso", type: "series", isPremium: false, rating: "4.9/5", genres: ["Comedy", "Drama", "Sports"], description: "Pelatih American Football optimis melatih klub sepak bola Inggris yang sedang terpuruk." },
    { id: "newrelease-6", src: "/assets/movie-posters/new-release/image232.png", title: "Dilan", type: "film", isPremium: true, rating: "4.5/5", genres: ["Drama", "Romance"], description: "Kisah cinta manis antara Milea dan Dilan di Bandung tahun 1990." },
  ],
};

export default movies;