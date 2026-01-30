import {
    LayoutDashboard,
    ShoppingCart,
    Utensils,
    Calculator,
    ChefHat,
    School,
    BookOpen,
    ShieldCheck,
    Smartphone,
    Globe
} from 'lucide-react';

export const projects = [
    {
        id: 1,
        slug: 'donasi-website',
        title: 'Donasi Website',
        shortDesc: 'Platform crowdfunding & donasi berbasis web dengan keamanan tingkat tinggi.',
        description: 'Sistem crowdfunding yang memungkinkan pengguna menggalang dana untuk berbagai kampanye sosial. Dilengkapi dengan dashboard transparan dan sistem verifikasi ketat.',
        challenge: 'Membangun sistem pembayaran yang aman dan menangani ribuan transaksi konkuren tanpa race condition.',
        solution: 'Mengimplementasikan Database Transaction & Locking, serta integrasi Payment Gateway dengan Webhook verification.',
        tech: ['Laravel', 'MySQL', 'Midtrans API', 'Bootstrap'],
        size: 'large', // 2x2
        image: '/projects/donasi.png', // Placeholder, will need real images
        color: 'from-blue-500 to-cyan-400',
        github: 'https://github.com/laomanda/donasi-website',
        demo: '',
        icon: ShieldCheck
    },
    {
        id: 2,
        slug: 'porto-client',
        title: 'Porto Client',
        shortDesc: 'Showcase portofolio interaktif untuk klien profesional.',
        description: 'Landing page portofolio yang didesain khusus untuk personal branding klien, dengan animasi halus dan performa tinggi.',
        challenge: 'Mencapai skor Lighthouse 100/100 dengan animasi yang tetap kaya.',
        solution: 'Menggunakan teknik Lazy Loading, Image Optimization, dan Minimal CSS blocking.',
        tech: ['React', 'Tailwind CSS', 'Framer Motion'],
        size: 'medium', // 1x1
        image: '/projects/porto.png',
        color: 'from-purple-500 to-pink-500',
        github: 'https://github.com/laomanda/porto-client',
        demo: '',
        icon: Globe
    },
    {
        id: 3,
        slug: 'donatea-canteen',
        title: 'DonaTea Canteen',
        shortDesc: 'Manajemen kantin modern dengan sistem POS.',
        description: 'Aplikasi Point of Sales (POS) khusus kantin sekolah yang memudahkan pemesanan dan tracking inventaris stok bahan baku.',
        challenge: 'Mempercepat proses transaksi saat jam istirahat yang sangat padat.',
        solution: 'Interface "Quick-Tap" yang dioptimalkan untuk layar sentuh dan caching menu lokal.',
        tech: ['PHP Native', 'MySQL', 'JQuery'],
        size: 'medium', // 1x1
        image: '/projects/donatea.png',
        color: 'from-amber-500 to-orange-500',
        github: 'https://github.com/laomanda/DonaTea-Canteen',
        demo: '',
        icon: Utensils
    },
    {
        id: 4,
        slug: 'car-installments',
        title: 'Car Installments',
        shortDesc: 'Kalkulator simulasi kredit mobil akurat.',
        description: 'Tools utilitas untuk menghitung cicilan kredit kendaraan dengan variabel bunga, tenor, dan DP yang dinamis.',
        challenge: 'Menyajikan logika perhitungan finansial yang kompleks namun mudah dipahami user awam.',
        solution: 'Visualisasi grafik interaktif untuk breakdown angsuran pokok vs bunga.',
        tech: ['JavaScript', 'Chart.js', 'CSS3'],
        size: 'medium', // 1x1
        image: '/projects/car.png',
        color: 'from-red-500 to-rose-500',
        github: 'https://github.com/laomanda/Car-installments',
        demo: '',
        icon: Calculator
    },
    {
        id: 5,
        slug: 'restoran-food-fafa',
        title: 'Restoran Fafa',
        shortDesc: 'Sistem manajemen pesanan restoran dan dapur.',
        description: 'Solusi terintegrasi untuk restoran yang menghubungkan pelayan (front) dan koki (kitchen) secara real-time.',
        challenge: 'Sinkronisasi status pesanan antara dapur dan kasir tanpa delay.',
        solution: 'Menggunakan teknik Short-Polling (atau WebSocket) untuk update status real-time.',
        tech: ['Laravel', 'Livewire', 'Alpine.js'],
        size: 'medium', // 1x1
        image: '/projects/resto.png',
        color: 'from-emerald-500 to-green-400',
        github: 'https://github.com/laomanda/restoran-food-fafa',
        demo: '',
        icon: ChefHat
    },
    {
        id: 6,
        slug: 'kantin-sekolah',
        title: 'Kantin Sekolah',
        shortDesc: 'Ekosistem smart-canteen terintegrasi untuk institusi pendidikan.',
        description: 'Versi enterprise dari sistem kantin yang mencakup manajemen multi-gerai, laporan keuangan harian, dan sistem deposit siswa.',
        challenge: 'Mengelola multi-tenancy (banyak gerai) dalam satu sistem terpusat.',
        solution: 'Arsitektur database relasional yang memisahkan scope data antar tenant namun menyatukan laporan admin.',
        tech: ['Laravel', 'FilamentPHP', 'PostgreSQL'],
        size: 'large', // 2x2
        image: '/projects/kantin.png',
        color: 'from-indigo-500 to-blue-600',
        github: 'https://github.com/laomanda/Kantin-Sekolah',
        demo: '',
        icon: School
    },
    {
        id: 7,
        slug: 'recipe-indo',
        title: 'Recipe Indo',
        shortDesc: 'Ensiklopedia kuliner nusantara dalam genggaman.',
        description: 'Aplikasi konten yang menyajikan ribuan resep masakan Indonesia dengan fitur pencarian bahan dan tutorial langkah demi langkah.',
        challenge: 'Menyajikan konten media (foto/video) yang berat dengan performa cepat.',
        solution: 'Optimasi CDN untuk aset media dan implementasi Infinite Scroll.',
        tech: ['React Native', 'Firebase', 'Expo'],
        size: 'wide', // 2x1 (Full Width)
        image: '/projects/recipe.png',
        color: 'from-yellow-400 to-orange-500',
        github: 'https://github.com/laomanda/Recipe-Indo',
        demo: '',
        icon: BookOpen
    }
];
