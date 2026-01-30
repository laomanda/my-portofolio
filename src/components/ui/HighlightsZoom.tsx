import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Check, Star, Zap, Smartphone, Layers, Box as BoxIcon, Code, Palette, Eye, Gauge, Image as ImageIcon, FileCode, Monitor as MonitorIcon, Blend, GraduationCap, Utensils, Users, LogIn, ShieldCheck, Lock, BarChart3, LayoutDashboard, Type, Bug, Wrench, Rocket, Maximize2, X, Tag } from 'lucide-react';
import ElectricBorder from '../ElectricBorder';
import { RevealText } from './reveal-text';
import DraggableAvatar from './draggable-avatar';

const services = [
    {
        title: "Fullstack Web Development",
        desc: "Mengembangkan aplikasi web berbasis Laravel 12 dengan Blade dan Tailwind CSS, fokus pada sistem manajemen sekolah dan kantin digital yang siap digunakan secara nyata.",
        valueStatement: "Mampu membangun aplikasi fullstack dari database hingga tampilan dashboard dengan struktur rapi, aman, dan scalable.",
        microFocus: [{ icon: BoxIcon, text: "Arsitektur MVC" }, { icon: Code, text: "Komponen UI Modern" }],
        tags: ["Laravel 12", "Blade", "Tailwind CSS", "Fullstack Developer", "Dashboard System"],
        image: "/highlight/Section-2.png",
        color: "from-yellow-500 to-amber-500",
        hexColor: "#D4AF37",
        icon: Zap
    },
    {
        title: "Aplikasi Manajemen Bisnis Digital",
        desc: "Pengembangan aplikasi manajemen berbasis web untuk kebutuhan sekolah dan kantin digital, mencakup pengelolaan data siswa, barang, serta transaksi harian secara terstruktur.",
        valueStatement: "Menyediakan solusi digital yang efisien untuk operasional nyata dengan alur kerja jelas dan pembagian peran pengguna yang tepat.",
        microFocus: [{ icon: GraduationCap, text: "Student Management" }, { icon: Utensils, text: "Sistem Kantin Digital" }],
        tags: ["Business Application", "Management System", "Multi Role", "Laravel Project"],
        image: "/highlight/Section-1.png",
        color: "from-purple-600 to-pink-500",
        hexColor: "#9333EA",
        icon: Layers
    },
    {
        title: "User Authentication System",
        desc: "Implementasi sistem autentikasi dan pembagian hak akses pengguna pada aplikasi Laravel untuk memastikan keamanan dan alur kerja sesuai peran.",
        valueStatement: "Menjamin aplikasi aman, terstruktur, dan siap digunakan pada sistem multi-user skala nyata.",
        microFocus: [{ icon: ShieldCheck, text: "Role & Permission" }, { icon: Lock, text: "Middleware Security" }],
        tags: ["Authentication", "Role Permission", "Laravel Security", "Multi User System"],
        image: "/highlight/Section-3.png",
        color: "from-blue-600 to-cyan-500",
        hexColor: "#2563EB",
        icon: ShieldCheck
    },
    {
        title: "Dashboard & Visualization",
        desc: "Perancangan antarmuka dashboard modern untuk aplikasi manajemen berbasis web, dengan fokus pada kenyamanan pengguna dan visualisasi data yang jelas.",
        valueStatement: "Meningkatkan pengalaman pengguna melalui tampilan yang rapi, informatif, dan mudah dipahami untuk kebutuhan operasional harian.",
        microFocus: [{ icon: BarChart3, text: "Chart" }, { icon: LayoutDashboard, text: "Professional Layout" }],
        tags: ["UI/UX Design", "Dashboard", "Tailwind CSS", "Data Visualization"],
        image: "/highlight/Section-4.png",
        color: "from-emerald-500 to-teal-500",
        hexColor: "#10B981",
        icon: LayoutDashboard
    },
    {
        title: "Problem Solving & Industrial Readiness",
        desc: "Pengalaman menyelesaikan permasalahan nyata pada pengembangan aplikasi web, baik di sisi backend maupun frontend, melalui proses debugging dan evaluasi sistem.",
        valueStatement: "Membangun mindset developer yang siap menghadapi tantangan teknis di dunia kerja dan lingkungan industri IT.",
        microFocus: [{ icon: Wrench, text: "UI Troubleshooting" }, { icon: Rocket, text: "Tech Adaptation" }],
        tags: ["Problem Solving", "Debugging", "Industrial Ready", "Magang"],
        image: "/highlight/Section-5.png",
        color: "from-rose-500 to-red-500",
        hexColor: "#F43F5E",
        icon: Bug
    }
];

interface Service {
    title: string;
    desc: string;
    valueStatement: string;
    microFocus: { icon: any; text: string }[];
    tags: string[];
    image: string;
    color: string;
    hexColor: string;
    icon: any;
}

const HighlightsZoom = () => {
    const containerRef = useRef(null);
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <section ref={containerRef} className="relative h-[400vh] bg-light-bg dark:bg-dark-bg">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-x-hidden">
                {services.map((service, index) => {
                    const start = index / services.length;
                    const end = (index + 1) / services.length;
                    const isLast = index === services.length - 1;

                    const scale = useTransform(scrollYProgress, [start, end], [1, isLast ? 1 : 1.1]);
                    const opacity = useTransform(
                        scrollYProgress,
                        [start, end - 0.1, end],
                        [1, 1, isLast ? 1 : 0]
                    );
                    const display = useTransform(scrollYProgress, value => {
                        if (value < start - 0.1 || value > end) return 'none';
                        return 'flex';
                    });

                    return (
                        <motion.div
                            key={index}
                            style={{
                                scale,
                                opacity,
                                display,
                                zIndex: services.length - index,
                            }}
                            className="absolute w-full h-full flex items-center justify-center p-4 md:p-10 will-change-transform"
                        >
                            <ElectricBorder
                                color={service.hexColor}
                                speed={1.5}
                                chaos={0.25}
                                thickness={3}
                                displacement={8}
                                className=""
                                style={{ borderRadius: 40 }}
                            >
                                <div className="relative w-full max-w-7xl h-[85vh] md:h-[90vh] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl bg-white/20 dark:bg-white/5 backdrop-blur-2xl flex flex-col md:block">
                                    <div className={`absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-gradient-to-br ${service.color} opacity-5 blur-[100px] md:blur-[150px] pointer-events-none rounded-full`} />

                                    <div className="grid grid-cols-1 md:grid-cols-[40%_60%] w-full h-full relative z-10">
                                        <div className="relative w-full h-[20vh] md:h-full p-0 md:p-4 order-1 md:order-1">
                                            <div className="w-full h-full overflow-hidden rounded-none md:rounded-[2rem] relative shadow-lg group">
                                                <div className="absolute inset-0 bg-black/5 z-10" />
                                                <img
                                                    src={service.image}
                                                    alt={service.title}
                                                    className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105 saturate-[1.1]"
                                                />

                                                {/* Mobile: View Full Button Overlay */}
                                                <div className="absolute inset-0 z-20 flex items-center justify-center md:hidden opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-[1px]">
                                                    <button
                                                        onClick={() => setSelectedService(service)}
                                                        className="flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-black/80 rounded-full shadow-xl backdrop-blur-md transform transition-transform active:scale-95"
                                                    >
                                                        <Maximize2 className="w-4 h-4 text-gray-800 dark:text-white" />
                                                        <span className="text-xs font-bold text-gray-800 dark:text-white uppercase tracking-wider">
                                                            View Full
                                                        </span>
                                                    </button>
                                                </div>

                                                {/* Desktop: View Full Button (Optional, can be always visible or hover) */}
                                                <div className="absolute bottom-4 right-4 z-20 hidden md:flex">
                                                    <button
                                                        onClick={() => setSelectedService(service)}
                                                        className="p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-colors border border-white/20"
                                                        aria-label="View Full Image"
                                                    >
                                                        <Maximize2 className="w-5 h-5 text-white" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col justify-center px-4 md:px-12 h-full overflow-y-auto scrollbar-hide py-4 pb-12 md:py-0 order-2 md:order-2">
                                            <div className="relative z-10 max-w-2xl">
                                                <h2 className="text-xl md:text-5xl font-luxury font-bold mb-2 md:mb-6 leading-none tracking-tight" style={{ color: service.hexColor }}>
                                                    <RevealText mode="auto" direction="down" duration={0.6} stagger={0.08} boxColor={service.hexColor}>
                                                        {service.title}
                                                    </RevealText>
                                                </h2>

                                                <p className="text-xs md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-sans font-normal tracking-wide mb-3 md:mb-8" style={{ letterSpacing: '0.015em', lineHeight: '1.5' }}>
                                                    {service.desc}
                                                </p>


                                                <div className="mb-4 md:mb-12 relative">
                                                    <div className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-6">
                                                        {/* Avatar with pointer */}
                                                        <div className="hidden md:block flex-shrink-0 scale-75 md:scale-100 origin-center md:origin-top-left -my-2 md:my-0">
                                                            <DraggableAvatar
                                                                image="/saya/Jakkob.jpeg"
                                                                borderColor={service.hexColor}
                                                                range={50}
                                                                size={70}
                                                            />
                                                        </div>

                                                        {/* Quote bubble */}
                                                        <div className="flex-1 w-full relative px-3 py-2 md:px-6 bg-white/40 dark:bg-white/5 rounded-lg md:rounded-2xl backdrop-blur-md shadow-xl border border-white/30 dark:border-white/10 transition-all duration-300 hover:shadow-2xl hover:bg-white/50 dark:hover:bg-white/8 text-center md:text-left" style={{ borderLeftColor: service.hexColor, borderTopColor: service.hexColor }}>
                                                            <p className="text-xs md:text-lg italic text-gray-800 dark:text-gray-100 font-serif leading-relaxed tracking-wide">
                                                                "{service.valueStatement}"
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap gap-1.5 md:gap-4 mb-4 md:mb-10 mt-4 md:mt-12 pt-3 md:pt-6 relative z-10 justify-center md:justify-start">
                                                    {service.microFocus.map((focus, i) => {
                                                        const IconComponent = focus.icon;
                                                        return (
                                                            <div
                                                                key={i}
                                                                className="relative overflow-hidden px-5 py-2 rounded-full border transition-all hover:shadow-lg"
                                                                style={{
                                                                    backgroundColor: `${service.hexColor}15`,
                                                                    borderColor: `${service.hexColor}40`
                                                                }}
                                                            >
                                                                <div className="flex items-center gap-2 relative z-10">
                                                                    <IconComponent className="w-3.5 h-3.5" style={{ color: service.hexColor }} />
                                                                    <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: service.hexColor }}>
                                                                        {focus.text}
                                                                    </span>
                                                                </div>

                                                                {/* Shine effect for light mode */}
                                                                <span
                                                                    className="absolute inset-0 pointer-events-none animate-shine dark:hidden"
                                                                    style={{
                                                                        background: "linear-gradient(120deg, transparent 40%, rgba(255,255,255,0.7) 50%, transparent 60%)",
                                                                        backgroundSize: "200% 100%",
                                                                        animationDuration: "4s",
                                                                        mixBlendMode: "overlay"
                                                                    }}
                                                                />

                                                                {/* Shine effect for dark mode */}
                                                                <span
                                                                    className="absolute inset-0 pointer-events-none animate-shine hidden dark:block"
                                                                    style={{
                                                                        background: "linear-gradient(120deg, transparent 40%, rgba(255,255,255,0.5) 50%, transparent 60%)",
                                                                        backgroundSize: "200% 100%",
                                                                        animationDuration: "4s",
                                                                        mixBlendMode: "overlay"
                                                                    }}
                                                                />
                                                            </div>
                                                        );
                                                    })}
                                                </div>

                                                {/* Tags: Visible on Mobile & Desktop */}
                                                <div className="flex flex-wrap gap-1.5 md:gap-4 pt-2 md:pt-6 border-t border-gray-200/30 dark:border-white/5 justify-center md:justify-start">
                                                    {service.tags.map((tag, i) => (
                                                        <span
                                                            key={i}
                                                            className="text-xs font-mono font-medium text-gray-700 dark:text-white/80 hover:text-black dark:hover:text-white transition-colors"
                                                        >
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ElectricBorder>
                        </motion.div>
                    );
                })}
            </div>

            {/* Mobile Full Screen Detail Modal */}
            <AnimatePresence>
                {selectedService && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl"
                        onClick={() => setSelectedService(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header / Close Button */}
                            <div className="absolute top-4 right-4 z-20">
                                <button
                                    onClick={() => setSelectedService(null)}
                                    className="p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="relative w-full h-[70vh] bg-gray-100 dark:bg-gray-900/50 flex items-center justify-center">
                                <img
                                    src={selectedService.image}
                                    alt={selectedService.title}
                                    className="w-full h-full object-contain p-2 rounded-[3rem]"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section >
    );
};

export default HighlightsZoom;
