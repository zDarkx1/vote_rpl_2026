// Seed data for classes and students extracted from "DATA ABSENSI 50, 51, DAN 52.xlsx"
// 52 = Kelas X (Angkatan 2025), 51 = Kelas XI (Angkatan 2024), 50 = Kelas XII (Angkatan 2023)

export interface ClassData {
  name: string;
  angkatan: string;
  students: string[];
}

export const classesData: ClassData[] = [
  {
    name: "X RPL A",
    angkatan: "52",
    students: [
      "Adinda Khairunnisa", "Ahmad Fauzi", "Ahmad Haikal Muttaqin", "Aliyah Siti Aisah",
      "Amirah Marwa Mufidah", "Arkan Hikaru", "Bima Octavian", "Cantika Salsabilla",
      "Daffa Gani Gunanjar", "Dhawy Gani Gunanjar", "Fauzi Hasbi Fadilah",
      "Ferlita Callysta Aspriyanto", "Faris Syakir Dzakwan", "Ramadhan Firmansyah",
      "Ghiyats Ahmad Fawwaz Firmansyah", "Khalif Rahardian Sya'reza",
      "Kiran Anggara Putra Warsito", "Kirana Cinta Gumilar", "Luna Putrianti",
      "Luthfi Nur Listiyanti", "Muhammad Andika Sofyan", "Muhammad Arhan AlHakimi",
      "Muhammad Dika Kelana", "Muhammad Fadhlan Arrayhan", "Muhammad Farrel Ash Shiddiq",
      "Muhammad Rizqy", "Nuraini Bulan Nugraningsih", "Raditya Putra Ramdhani",
      "Raisya Fitriani Ginting", "Reifan Gavin Budiman", "Resa Muhammad Syarif",
      "Rifa Rairiany", "Seo Daffa Pramudya", "Sefti Ramadani", "Shifa Nurul Husna",
      "Sinta Rohayati", "Yusuf", "Zulfikar Azeem Ali"
    ],
  },
  {
    name: "X RPL B",
    angkatan: "52",
    students: [
      "Agista Anisa Putri", "Agni Nurmlasari", "Alfi Ramdhan", "Alif Fakhri Setiawan",
      "Andin Nesza Ardinatha", "Anisa Fitri Nugraeni", "Arya Ramza Mochammad Hadiana",
      "Bayu Muhammad Arsyad", "Dena Khamila Khansa", "Dhean Aleandha Fitrah",
      "Fabian Daru Guntur Pratama", "Fauzan Hafizh Firdaus", "Ghina Janeeta Meydini",
      "Gilang Ramadan", "Irfan Miftahul Iman", "Lana Rizqiya Nafiya Farida",
      "Luthfiani Nur Shafa", "Mahzuz Alief", "Mario Rafael Simanjuntak",
      "Mohammad Zidane Nurkherun", "Muhamad Restu Prayogi", "Muhammad Daffa Azrulloh",
      "Muhammad Fadli Budiman", "Muhammad Finzaghi Andrisheva",
      "Muhammad Rizky Aditya Nugraha", "Mutia Safarotun Nisa", "Queensa Alea Kasta",
      "Rajendra Rafa Sukmana Putra", "Rapli Pratama", "Rinjani Hasna Alghefira",
      "Reno Setiyoriawan", "Sachi Azaria Hermawan", "Senta Maya Lestari", "Suni Salam",
      "Syafira Khairani Putri", "Syifa Oktaviani", "Williansyah", "Yusuf Haris Wibisono"
    ],
  },
  {
    name: "X RPL C",
    angkatan: "52",
    students: [
      "Aline Maulid", "Almira Anindya", "Amarulloh Ibnu Rizal",
      "Annasthasya Wahyu Wulandari", "Asti Nursyifa", "Bagas Fadhlan Rinawan",
      "Berryl Zelva Choerulannam Arumbinang", "Corel Ahmad Gustafyan",
      "Fajri Maulana Putra Setya", "Fathan Argiawan Mehtar", "Feiza Azaria Salsabila",
      "Firyal Ammar Rasyad", "Haidar Ali Rahman", "Juliana Ting",
      "Khaleefa Ryu Kaisan Tanjung", "Lentera Nadinecita",
      "Malik Muhammad Razaan Firaas", "Mihran Tahir Nugraha",
      "Muhamad Rega Alfiansyah", "Muhammad Dzaki Ramdan", "Muhammad Farhan Qaishar",
      "Muhammad Kenzie Devarandedan", "Muhammad Rizky Azhari", "Nafeeza Calista",
      "Naufal R. R", "Niken Indah Mahmudiyah", "Rahma Al Fadila",
      "Rasyid Malik Ibrahim", "Raup Wardani", "Rizky Satria Ramadhan",
      "Sarah Rantelayuk Parura", "Shafira Dwita Aviani", "Silvy Aulia",
      "Vicka Ramadhani", "Vicky Azka Al Faza", "Yoga Ramdani",
      "Zianka Praya Agisty", "Ziyad Akhtari Izzatulakma"
    ],
  },
  {
    name: "XI RPL A",
    angkatan: "51",
    students: [
      "Aditya Wirya Atmaja", "Adzkia Akbar Alfalfa", "Ahmad Alis Fadillah",
      "Alrizky Filardhi Budiman", "Aulia Fadillah", "Cahaya Alzya Rachman",
      "Daniel Fitriyani Efendi", "Densus Prabowo Sugiharto", "Dilansyah Raditya Putra",
      "Fenita Siti Rahmadewi Emawan", "Gynda Raihan Jati Prabowo",
      "Hafiid Dwi Riansyah", "Kaila Nuril Azkiya", "Muhamad Revan Aulia",
      "Muhamad Reyfan Salman Alfarisy", "Muhammad Aldiza Julian Muwarizqy",
      "Muhammad Aroyyan", "Muhammad Rafsya Nurfaizi", "Muhammad Raihan Nugraha",
      "Naila Azmi Amani", "Naila Nur Aini Mulyawati", "Nashifa Rana Fathiya",
      "Padilla Septyani", "Pazza Nur Hidayah", "Raffa Adhiasta Pratama",
      "Ransya Maulana Jati", "Rizky Alhabsi Aliansyah", "Shafa Azzahra",
      "Syifa Nur Rizky", "Tasya Mega Prasetya", "Vania Alfia Damayanti",
      "Willy Zaki Supriatna", "Wirya Dinata Mulya", "Yolanda Angelica", "Zahra Thalita"
    ],
  },
  {
    name: "XI RPL B",
    angkatan: "51",
    students: [
      "Adhya Pratama Sukmawijaya", "Aghnia Qinthara Rahman", "Aida Putri Rizkya",
      "Aisha Lubna Sakhi", "Akbar Wijaya Kesuma", "Arlan Delon Ramadan",
      "Cakra Adhiguna Putra Prasevi", "Elma Diananova", "Fadiel Rachmadani",
      "Fauzaan Idiansyah", "Kayyisah Taushiyah Ramadhani", "M. Firgi Nafi Al-Hadi",
      "Mochamad Denta Herlambang", "Mochammad Atha Rasyid Rizqi",
      "Mochammad Choirul Rizal", "Muhamad Rizky Syahputro Wibisono",
      "Muhamad Sahal Nurjamil", "Muhammad Faiz Fitrotulloh",
      "Muhammad Irfan Rafiansyah", "Muhammad Rizki Kurniadi",
      "Muhammad Zaen Alif Abdilah", "Naila Putri Firdasari",
      "Naila Tsara Dhafina Putri", "Najmira Madina Falah", "Naufal Abdul Zaelani",
      "Nur Syifa Fadilah", "Prasya Rhaditya Putra", "Raditya Fathan Saputra",
      "Rafi Amruloh", "Raja Muhammad Elmas", "Ririn Rahma Dwi Aris",
      "Saskia Hanansyah", "Septia Azzahra Ramadani", "Siti Alisya Apriliyanti",
      "Tiara Zafira Putri"
    ],
  },
  {
    name: "XI RPL C",
    angkatan: "51",
    students: [
      "Ade Ahmad Zakaria", "Andika Putra", "Anjeli Hayuning Qurrotu Salsabila",
      "An'nissa Rahayu Nurhaq", "Arsi Rizkiyani Sudarsono", "Atira Nida Fathiya",
      "Bryan Piobama Christian Pakpahan", "Chagi Rizki Satia", "Cut Fahri Abdul Malik",
      "Dadi Hadiansyah", "Dea Selvi Agustina", "Devira Eka Ramadhani",
      "Dimitria Maliqhira", "Farel Maulana Yusuf", "Firyal Khairunisa",
      "Gamiel Akmal Nabilasyama", "Grecs Martin Jay S", "Hafidz Fadhillah Muchtar",
      "Mahatma Arangga", "Muhammad Fathan Al Hazaq", "Muhammad Hafidz Sya'bani",
      "Muhammad Ahnaf Alwafie", "Muhammad Fachri Sunarya", "Najmi Kultsum Saleha",
      "Nazhril Ilham Saputra", "Ninda Dwi Hadian", "Raisya Dea Arvia",
      "Rasyad Fawaza", "Rizky Dika Syahreza", "Salma Sandi Pertiwi",
      "Shareefa Alfarani", "Syaima Siti Fatimah", "Syeril Ramadani",
      "Whamvy Armiredelando Fasilafa", "Zakii Maulana Maalik"
    ],
  },
  {
    name: "XII RPL A",
    angkatan: "50",
    students: [
      "Alfaiq Ridho Fairuz", "Ananda Dwi Putri Setiady", "Andina Rachma Sari",
      "Andityo Wisnu Nugroho", "Arkan Ardiansyah", "Bilqis Reihanna Nashita",
      "Bryan Iko Rismaputra", "Dhika Faturrahman Ghany", "Disya Rachma Sari",
      "Erlangga Dwi Andono", "Farel Raditya Virgantara", "Febriani Fitri",
      "Firaas Raihansyah Rizqullah", "Helsa Dwi Anjany", "Julian Dwi Permana",
      "Karina Lestari", "Karina Tesyania Putrie", "Kitna Mahardika Favian",
      "Marsha Salsabilah Mufidah", "Mochammad Aditya Firmansyah",
      "Muhammad Dzakwan G.L", "Muhammad Prana Ayesha",
      "Muhammad Rizki Prasetya Adhyarahman", "Najwa Maretalita Setiawan",
      "Nasya Anandita Putri", "Rd. Airlangga Dewanata", "Rahma Kartika Dewi",
      "Reyhan Zema Agustyan", "Riefa Azzahra", "Rifai Zamzam Multazam",
      "Rizka Maghfira", "Thamarezki Febyanda Zahran", "Vriza Hexandria Saputra",
      "Zahra Amelia Putri", "Zikra Nasywa Akmalia", "Zulfa Nur Indriani"
    ],
  },
  {
    name: "XII RPL B",
    angkatan: "50",
    students: [
      "Adrenalin Muhammad Dewangga", "Andhika Farizky Mansyur",
      "Aneiyra Anindya Pawwaz", "Azijul Akbar Nur Fatihah", "Berty Septya Ningrum",
      "Daffa Abiyu Hidayaturrohim", "Daiva Afdal Rizki Febrian",
      "Esther Renata Situmorang", "Evan Dwi Saiful Gifari", "Evliya Satari Nurarifah",
      "Hany Alya Maudina", "Ikmal Hanaan Zikri", "Ira Setiawati",
      "Juang Syahid Al Jihad", "Kayla Dwi Ramadhany", "Khumeira Nur'Aini",
      "Kirani Lestari", "Muhamad Hanif Nur Dzakwan", "Muhammad Qinthara Izzatullah",
      "Muhammad Rafi Shidqi", "Muhammad Salman Hanan Hakim",
      "Muhammad Zufar Rasyid Ibrahim", "Naufal Aulia Sabhani",
      "Paradilla Soraya Afifah", "Raditya Faiz Fathir Ahmad",
      "Rahka Maulida Sukmawan", "Reffi Reskian", "Reyva Azka Ali Farysta",
      "Ristiya Nurputri", "Salma Siti Aisyah", "Yahya Abdul Aziz Asy Syuhada",
      "Yusuf Leonard Passandaraan", "Zanabar Muhammad Firzi"
    ],
  },
];

// Placeholder candidates — will be updated with real data later
export interface CandidateData {
  name: string;
  position: "koordinator" | "wakil_koordinator";
  kelas_asal: string;
  angkatan: string;
  visi: string;
  misi: string;
  photo_url: string;
  candidate_number: number;
}

export const candidatesData: CandidateData[] = [
  {
    name: "Zulfikar Azeem Ali",
    position: "wakil_koordinator",
    kelas_asal: "X RPL A",
    angkatan: "52",
    visi: "Mengembangkan ruang lingkup RPL sebagai ruang belajar dan sosial yang produktif ,teratur, serta tidak meninggalkan nilai-nilai religius. Menjaga keharmonisan antar sesama demi terciptanya anggota jurusan yang kreatif, inovatif, berani berpendapat, dan menjunjung tinggi rasa kekeluargaan.",
    misi: "-Menanamkan nilai religius dalam setiap aktivitas sebagai fondasi utama dalam membangun cara beretika,bersikap dalam mengambil keputusan\n-Memberikan ruang eksplorasi bagi anggota jurusan untuk mengembangkan ide-ide kreatif ,inovatif serta kolaborasi yang konstruktif\n-Membangun budaya diskusi yang beradab, berani dalam berpendapat, dan menegakkan hak berpendapat\n-Meningkatkan produktivitas akademik dan manajemen waktu siswa\n-Melestarikan dan melaksanakan program kerja serta budaya positif RPL dari periode sebelumnya",
    photo_url: "/placeholder-candidate.png",
    candidate_number: 1,
  },
  {
    name: "Rajendra Raffa Sukmana P.",
    position: "wakil_koordinator",
    kelas_asal: "X RPL B",
    angkatan: "52",
    visi: "Mewujudkan jurusan rekayasa perangkat lunak yang unggul, inovatif, dan berdaya saing tinggi melalui semangat \"CODING\" (Creative, Organize, Disiplined, Innovative, Growth), sehingga mampu mencetak siswa yang kompeten di bidang teknologi serta memiliki karakter yang kuat dan adaptif terhadap perkembangan zaman.",
    misi: "-CREATIVE\nMenumbuhkan kreativitas siswa dalam proses pembelajaran dan pengembangan karya di bidang rekayasa perangkat lunak\n-ORGANIZED\nMendidik koordinator jurusan dalam membangun koordinasi dan manajemen kegiatan yang terstruktur, efektif, dan kolaboratif\n-DISCIPLINED\nMenanamkan sikap disiplin, tanggung jawab, dan konsistensi dalam belajar maupun berorganisasi.\n-INNOVATIVE\nMendorong siswa untuk terus berinovasi dan mampu menciptakan solusi kreatif di bidang teknologi.\n-NETWORKING\nMembangun relasi yang baik antar siswa, guru, dan lainnya untuk mendukung pengembangan diri.\n-GROWTH\nMenumbuhkan pola pikir berkembang (growth mindset) dan semangat belajar berkelanjutan dalam menghadapi perkembangan teknologi.",
    photo_url: "/placeholder-candidate.png",
    candidate_number: 2,
  },
  {
    name: "Corel Ahmad Gustafyan",
    position: "wakil_koordinator",
    kelas_asal: "X RPL C",
    angkatan: "52",
    visi: "Mewujudkan siswa RPL yang kompeten secara teknis, inovatif dalam berkarya, dan memiliki daya saing global di era digital",
    misi: "-menanamkan karakter pemimpin yang solutif\n-menyediakan wadah eksplorasi teknologi bagi siswa untuk menciptakan solusi digital\n-Membangun ekosistem knowledge sharing dan solidaritas antar siswa untuk meminimalisirkan kesenjangan sesama",
    photo_url: "/placeholder-candidate.png",
    candidate_number: 3,
  },
  {
    name: "Muhamad Revan aulia",
    position: "koordinator",
    kelas_asal: "XI RPL A",
    angkatan: "51",
    visi: "Menjadikan jurusan RPL sebagai kawah canradimuka yang adaptif, membina ketangguhan karakter dalam kondisi apapun agar mampu memenuhi tuntutan zaman",
    misi: "-Mengubah konsekuensi menjadi pendewasaan diri lewat pendekatan konstruktif\n-mendorong keahlian siswa RPL dalam bidang teknis maupun nonteknis yang relevan dengan zaman",
    photo_url: "/placeholder-candidate.png",
    candidate_number: 1,
  },
  {
    name: "Adhya Pratama Sukmawijaya",
    position: "koordinator",
    kelas_asal: "XI RPL B",
    angkatan: "51",
    visi: "mewujudkan jurusan RPL yang unggul dalam presentasi, aktif dalam kegiatan, serta solid dalam kerja sama, dengan mengedepankan semangat kekeluargaan, inovasi, dan profesionalisme",
    misi: "-Mendukung peningkatan kualitas pembelajaran dan pengembangan keterampilan siswa di bidang teknologi dan perangkat lunak.\n-Membangun lingkungan jurusan yang kondusif, suportif, dan inklusif bagi seluruh siswa.\n-Mengadakan kegiatan yang mempererat hubungan antar siswa, baik dalam bidang akademik maupun non-akademik.\n-Menjadi wadah penyalur aspirasi dan ide kreatif siswa jurusan untuk kemajuan bersama.\n-Menjaga nama baik jurusan RPL dengan sikap yang profesional, disiplin, dan penuh tanggung jawab.",
    photo_url: "/placeholder-candidate.png",
    candidate_number: 2,
  },
  {
    name: "Zakii Maulana Maalik",
    position: "koordinator",
    kelas_asal: "XI RPL C",
    angkatan: "51",
    visi: "menghilangkan senioritas berlebih dan mengganti dengan rasa kekeluargaan yang nyata. Membangun lingkungan yang saling mendukung untuk pertumbuhan bersama",
    misi: "-01 Sinergi & Komunikasi\nMengoptimalkan ruang diskusi dan evaluasi yang bersifat dua arah, asertif, dan berorientasi pada solusi untuk menjaga keharmonisan antar angkatan.\n\n-02 Kultur Kolaborasi & Prestasi\nMembangun iklim kompetitif yang sehat dengan memfasilitasi bimbingan dan kolaborasi sebaya untuk meningkatkan hard-skill maupun soft-skill siswa.\n\n-03 Lingkungan Supportif\nMenciptakan ekosistem jurusan yang suportif dan saling peduli, sehingga setiap siswa merasa aman dan didukung dalam menghadapi tantangan akademik maupun organisasi.\n\n-04 Karakter & Etika\nMengedepankan adab, etika profesi, dan nilai-nilai religius sebagai fondasi utama dalam setiap aktivitas, guna membentuk lulusan RPL yang tidak hanya cerdas secara teknologi, tetapi juga berintegritas tinggi.",
    photo_url: "/placeholder-candidate.png",
    candidate_number: 3,
  },
];
