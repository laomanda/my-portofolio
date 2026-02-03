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
        slug: 'recipe-indo',
        title: 'Recipe Indo',
        shortDesc: 'Ensiklopedia kuliner nusantara dalam genggaman.',
        description: 'Aplikasi konten yang menyajikan ribuan resep masakan Indonesia dengan fitur pencarian bahan dan tutorial langkah demi langkah.',
        challenge: 'Menyajikan konten media (foto/video) yang berat dengan performa cepat.',
        solution: 'Optimasi CDN untuk aset media dan implementasi Infinite Scroll.',
        tech: ['Laravel', 'Vue Js', 'MySQL'],
        size: 'large', 
        image: '/assets/project/IndoRecipe/Landing_Page.webp',
        gallery: [
            '/assets/project/IndoRecipe/Landing_Page.webp',
            '/assets/project/IndoRecipe/Auth.webp',
            '/assets/project/IndoRecipe/Detail_Recipe.webp',
            '/assets/project/IndoRecipe/Profil.webp'
        ],
        color: 'from-orange-500 to-yellow-500',
        github: 'https://github.com/laomanda/Recipe-Indo',
        demo: '',
        icon: BookOpen
    },
    {
        id: 2,
        slug: 'donasi-website',
        title: 'Donasi Website',
        shortDesc: 'Platform crowdfunding untuk kemanusiaan.',
        description: 'Sistem crowdfunding yang memungkinkan pengguna menggalang dana untuk berbagai kampanye sosial dengan transparansi penuh.',
        challenge: 'Membangun sistem pembayaran yang aman dan menangani transaksi konkuren.',
        solution: 'Mengimplementasikan Database Transaction & Locking serta integrasi Payment Gateway.',
        tech: ['Laravel', 'Typescript', 'Midtrans'],
        size: 'medium',
        image: '/assets/project/DPF/Landing_Page.webp',
        gallery: [
            '/assets/project/DPF/Landing_Page.webp',
            '/assets/project/DPF/Auth.webp',
            '/assets/project/DPF/Admin_Role.webp',
            '/assets/project/DPF/Editor_Role.webp',
            '/assets/project/DPF/SuperAdmin_Role.webp'
        ],
        color: 'from-blue-500 to-cyan-400',
        github: 'https://github.com/laomanda/donasi-website',
        demo: '',
        icon: ShieldCheck
    },
    {
        id: 3,
        slug: 'kantin-sekolah',
        title: 'Kantin Sekolah',
        shortDesc: 'Sistem manajemen kantin digital.',
        description: 'Versi enterprise dari sistem kantin yang mencakup manajemen multi-gerai, laporan keuangan, dan integrasi QR Code untuk pemesanan.',
        challenge: 'Mengelola multi-tenancy (banyak gerai) dalam satu sistem terpusat.',
        solution: 'Arsitektur database relasional yang memisahkan scope data antar tenant namun menyatukan laporan admin.',
        tech: ['Laravel', 'Blade', 'MySQL'],
        size: 'medium',
        image: '/assets/project/Kantin/Landing_Page.webp',
        gallery: [
            '/assets/project/Kantin/Landing_Page.webp',
            '/assets/project/Kantin/Auth.webp',
            '/assets/project/Kantin/Admin_Role.webp',
            '/assets/project/Kantin/Kantin_Role.webp',
            '/assets/project/Kantin/Detail_Menu.webp',
            '/assets/project/Kantin/Cart.webp'
        ],
        color: 'from-indigo-500 to-blue-600',
        github: 'https://github.com/laomanda/Kantin-Sekolah',
        demo: '',
        icon: School
    },
    {
        id: 4,
        slug: 'car-installments',
        title: 'Car Installments',
        shortDesc: 'Kalkulator simulasi kredit mobil akurat.',
        description: 'Tools utilitas untuk menghitung cicilan kredit kendaraan dengan variabel bunga, tenor, dan DP yang dinamis.',
        challenge: 'Menyajikan logika perhitungan finansial yang kompleks namun mudah dipahami user awam.',
        solution: 'Visualisasi grafik interaktif untuk breakdown angsuran pokok vs bunga.',
        tech: ['React', 'Laravel', 'MySql'],
        size: 'medium',
        image: '/assets/project/Car/Landing_Page.webp',
        gallery: [
            '/assets/project/Car/Landing_Page.webp',
            '/assets/project/Car/Auth.webp',
            '/assets/project/Car/Admin_Role.webp',
            '/assets/project/Car/Officer_Role.webp',
            '/assets/project/Car/Society_Role.webp'
        ],
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
        solution: 'Menggunakan teknik polling optimis untuk update status real-time.',
        tech: ['Laravel', 'Blade', 'Chart JS'],
        size: 'medium',
        image: '/assets/project/Restaurant/Landing_Page.webp',
        gallery: [
             '/assets/project/Restaurant/Landing_Page.webp',
             '/assets/project/Restaurant/Auth.webp',
             '/assets/project/Restaurant/Admin_Role.webp',
             '/assets/project/Restaurant/Kasir_Role.webp',
             '/assets/project/Restaurant/Owner_Role.webp',
             '/assets/project/Restaurant/Waiter_Role.webp'
        ],
        color: 'from-emerald-500 to-green-400',
        github: 'https://github.com/laomanda/restoran-food-fafa',
        demo: '',
        icon: ChefHat
    },
    {
        id: 6,
        slug: 'laundry-app',
        title: 'Laundry',
        shortDesc: 'Aplikasi manajemen laundry kiloan & satuan.',
        description: 'Sistem pencatatan transaksi laundry yang memudahkan tracking status cucian pelanggan dan laporan pendapatan.',
        challenge: 'Membuat flow transaksi yang fleksibel (bayar di muka/belakang) dan tracking status cucian.',
        solution: 'State management untuk status pesanan dan dashboard laporan keuangan harian/bulanan.',
        tech: ['Laravel', 'Blade', 'Chart JS'],
        size: 'large',
        image: '/assets/project/Laundry/Owner_Role.webp',
        gallery: [
            '/assets/project/Laundry/Owner_Role.webp',
            '/assets/project/Laundry/Auth.webp',
            '/assets/project/Laundry/Admin_Role.webp',
            '/assets/project/Laundry/Kasir_Role.webp'
        ],
        color: 'from-sky-400 to-blue-500',
        github: 'https://github.com/laomanda/laundry',
        demo: '',
        icon: ShoppingCart
    }
];
