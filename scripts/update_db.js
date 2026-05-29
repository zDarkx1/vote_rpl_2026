const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = 'https://pjmejzwnausvxeyihjop.supabase.co';
const supabaseKey = 'sb_publishable_RCaEGAvUeBidKEfXDV6jaA_dhC3Ewp3';
const supabase = createClient(supabaseUrl, supabaseKey);

const candidates = [
  {
    name: "Zulfikar Azeem Ali",
    position: "wakil_koordinator",
    candidate_number: 1,
    visi: "Mengembangkan ruang lingkup RPL sebagai ruang belajar dan sosial yang produktif ,teratur, serta tidak meninggalkan nilai-nilai religius. Menjaga keharmonisan antar sesama demi terciptanya anggota jurusan yang kreatif, inovatif, berani berpendapat, dan menjunjung tinggi rasa kekeluargaan.",
    misi: "-Menanamkan nilai religius dalam setiap aktivitas sebagai fondasi utama dalam membangun cara beretika,bersikap dalam mengambil keputusan\n-Memberikan ruang eksplorasi bagi anggota jurusan untuk mengembangkan ide-ide kreatif ,inovatif serta kolaborasi yang konstruktif\n-Membangun budaya diskusi yang beradab, berani dalam berpendapat, dan menegakkan hak berpendapat\n-Meningkatkan produktivitas akademik dan manajemen waktu siswa\n-Melestarikan dan melaksanakan program kerja serta budaya positif RPL dari periode sebelumnya"
  },
  {
    name: "Rajendra Raffa Sukmana P.",
    position: "wakil_koordinator",
    candidate_number: 2,
    visi: "Mewujudkan jurusan rekayasa perangkat lunak yang unggul, inovatif, dan berdaya saing tinggi melalui semangat \"CODING\" (Creative, Organize, Disiplined, Innovative, Growth), sehingga mampu mencetak siswa yang kompeten di bidang teknologi serta memiliki karakter yang kuat dan adaptif terhadap perkembangan zaman.",
    misi: "-CREATIVE\nMenumbuhkan kreativitas siswa dalam proses pembelajaran dan pengembangan karya di bidang rekayasa perangkat lunak\n-ORGANIZED\nMendidik koordinator jurusan dalam membangun koordinasi dan manajemen kegiatan yang terstruktur, efektif, dan kolaboratif\n-DISCIPLINED\nMenanamkan sikap disiplin, tanggung jawab, dan konsistensi dalam belajar maupun berorganisasi.\n-INNOVATIVE\nMendorong siswa untuk terus berinovasi dan mampu menciptakan solusi kreatif di bidang teknologi.\n-NETWORKING\nMembangun relasi yang baik antar siswa, guru, dan lainnya untuk mendukung pengembangan diri.\n-GROWTH\nMenumbuhkan pola pikir berkembang (growth mindset) dan semangat belajar berkelanjutan dalam menghadapi perkembangan teknologi."
  },
  {
    name: "Corel Ahmad Gustafyan",
    position: "wakil_koordinator",
    candidate_number: 3,
    kelas_asal: "X RPL C",
    visi: "Mewujudkan siswa RPL yang kompeten secara teknis, inovatif dalam berkarya, dan memiliki daya saing global di era digital",
    misi: "-menanamkan karakterd pemimpin yang solutif\n-menyediakan wadah eksplorasi teknologi bagi siswa untuk menciptakan solusi digital\n-Membangun ekosistem knowlage sharing dan solidaritas antar siswa untuk meminimalisirkan kesenjangan sesama"
  },
  {
    name: "Muhamad Revan aulia",
    position: "koordinator",
    candidate_number: 1,
    visi: "Menjadikan jurusan RPL sebagai kawah canradimuka yang adaptif, membina ketangguhan karakter dalam kondisi apapun agar mampu memenuhi tuntutan zaman",
    misi: "-Mengubah konsekuensi menjadi pendewasaan diri lewat pendekatan konstruktif\n-mendorong keahlian siswa RPL dalam bidang teknis maupun nonteknis yang relevan dengan zaman"
  },
  {
    name: "Adhya Pratama Sukmawijaya",
    position: "koordinator",
    candidate_number: 2,
    visi: "mewujudkan jurusan RPL yang unggul dalam presentasi, aktif dalam kegiatan, serta solid dalam kerja sama, dengan mengedepankan semangat kekeluargaan, inovasi, dan profesionalisme",
    misi: "-Mendukung peningkatan kualitas pembelajaran dan pengembangan keterampilan siswa di bidang teknologi dan perangkat lunak.\n-Membangun lingkungan jurusan yang kondusif, suportif, dan inklusif bagi seluruh siswa.\n-Mengadakan kegiatan yang mempererat hubungan antar siswa, baik dalam bidang akademik maupun non-akademik.\n-Menjadi wadah penyalur aspirasi dan ide kreatif siswa jurusan untuk kemajuan bersama.\n-Menjaga nama baik jurusan RPL dengan sikap yang profesional, disiplin, dan penuh tanggung jawab."
  },
  {
    name: "Zakii Maulana Maalik",
    position: "koordinator",
    candidate_number: 3,
    visi: "menghilankan seniritas lberlebih dan mengganti dengan rasa kekeluargaan yang nyata. Membangun lingkungan yang saling mendukung untuk pertumbuhan bersama",
    misi: "-01 Sinergi & Komunikasi\n\nMengoptimalkan ruang diskusi dan evaluasi yang bersifat dua arah, asertif, dan berorientasi pada solusi untuk menjaga keharmonisan antar angkatan.\n\n-02 Kultur Kolaborasi & Prestasi\n\nMembangun iklim kompetitif yang sehat dengan memfasilitasi bimbingan dan kolaborasi sebaya untuk meningkatkan hard-skill maupun soft-skill siswa.\n\n-03 Lingkungan Supportif\n\nMenciptakan ekosistem jurusan yang suportif dan saling peduli, sehingga setiap siswa merasa aman dan didukung dalam menghadapi tantangan akademik maupun organisasi.\n\n-04 Karakter & Etika\n\nMengedepankan adab, etika profesi, dan nilai-nilai religius sebagai fondasi utama dalam setiap aktivitas, guna membentuk lulusan RPL yang tidak hanya cerdas secara teknologi, tetapi juga berintegritas tinggi."
  }
];

async function updateDB() {
  for (const c of candidates) {
    const updateData = {
      name: c.name,
      visi: c.visi,
      misi: c.misi
    };
    if (c.kelas_asal) updateData.kelas_asal = c.kelas_asal;

    const { data, error } = await supabase
      .from('candidates')
      .update(updateData)
      .eq('position', c.position)
      .eq('candidate_number', c.candidate_number);
    
    if (error) {
      console.error('Error updating', c.name, error);
    } else {
      console.log('Updated', c.name);
    }
  }
}
updateDB();
