import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../../data/projects';
import { ArrowUpRight, Github, ExternalLink, Box, X } from 'lucide-react';
import { Badge } from './badge';
import { cn } from '@/lib/utils';

export default function ExpandableProjects() {
  const [activeId, setActiveId] = useState<number | null>(1);
  const [isMobile, setIsMobile] = useState(false);
  const [galleryProject, setGalleryProject] = useState<typeof projects[0] | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-20">
      {/* ... Header ... */}
      <div className="mb-12 text-center">
         <h2 
            suppressHydrationWarning
            className="text-4xl md:text-5xl font-serif font-bold text-[#E5E4E2] mb-4"
         >
            Featured <span className="text-[#D4AF37]">Work</span>
         </h2>
         <p className="text-neutral-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Kumpulan proyek pilihan yang dikerjakan dengan presisi tinggi dan teknologi modern.
         </p>
      </div>

      <div className="flex flex-col md:flex-row h-auto md:h-[600px] gap-4">
        {projects.map((project) => {
            const isActive = activeId === project.id;
            return (
                <motion.div
                    key={project.id}
                    layout
                    onClick={() => setActiveId(project.id)}
                    className={cn(
                        "relative cursor-pointer overflow-hidden rounded-3xl border transition-all duration-500 ease-out group",
                        isActive 
                            ? "md:flex-[3] flex-[10] h-[500px] md:h-auto border-[#D4AF37]/20 shadow-[0_0_30px_rgba(212,175,55,0.1)]" 
                            : "md:flex-[1] flex-[2] h-[100px] md:h-auto border-white/10 hover:border-[#D4AF37]/50 bg-white/5 backdrop-blur-sm"
                    )}
                >
                    {/* ... Background ... */}
                    <motion.div 
                        className="absolute inset-0 z-0"
                        animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1.0 : 1.1 }}
                        transition={{ duration: 0.7, ease: "easeInOut" }}
                    >   
                        <div className={cn("absolute inset-0 bg-gradient-to-b from-black/0 via-black/50 to-black z-10", isActive ? "opacity-90" : "opacity-60")} />
                        <img 
                            src={project.image} 
                            alt={project.title} 
                            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                        />
                    </motion.div>

                    {/* Collapsed Text */}
                    {!isActive && !isMobile && (
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                             <h3 className="text-2xl font-bold text-[#E5E4E2]/80 -rotate-90 whitespace-nowrap tracking-[0.2em] font-display uppercase group-hover:text-[#D4AF37] transition-colors duration-300">
                                {project.title}
                             </h3>
                        </div>
                    )}

                    {/* Active Content */}
                    <AnimatePresence mode="wait">
                        {isActive && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="absolute inset-0 z-20 p-6 md:p-10 flex flex-col justify-end"
                            >
                                <div className="max-w-2xl relative">
                                    {/* Decorative Line */}
                                    <motion.div 
                                        initial={{ width: 0 }} 
                                        animate={{ width: "100px" }}
                                        transition={{ delay: 0.4, duration: 0.5 }}
                                        className="h-1 bg-[#D4AF37] mb-6"
                                    />
                                    
                                    <motion.div 
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="mb-8"
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <Badge variant="secondary" className="bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 backdrop-blur-md px-3 py-1 text-xs tracking-wider uppercase">
                                                {project.tech[0]}
                                            </Badge>
                                             <Badge variant="outline" className="text-neutral-300 border-white/10 px-3 py-1 text-xs tracking-wider uppercase">
                                                {project.tech[1]}
                                            </Badge>
                                        </div>
                                        <h3 className="text-3xl md:text-5xl font-bold text-[#E5E4E2] mb-4 font-serif leading-tight">
                                            {project.title}
                                        </h3>
                                        <p className="text-neutral-400 text-base md:text-lg mb-8 leading-relaxed max-w-xl">
                                            {project.description}
                                        </p>
                                    </motion.div>

                                    {/* Action Buttons */}
                                    <motion.div 
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="flex flex-wrap gap-4"
                                    >
                                        {project.github && (
                                            <a 
                                                href={project.github}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-[#121212] font-semibold rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                                            >
                                                <Github size={18} />
                                                Explore Code
                                            </a>
                                        )}
                                        {project.gallery && project.gallery.length > 0 && (
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setGalleryProject(project);
                                                }}
                                                className="flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 text-[#E5E4E2] font-semibold rounded-full hover:bg-white/10 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300"
                                            >
                                                <ArrowUpRight size={18} />
                                                View Gallery ({project.gallery.length})
                                            </button>
                                        )}
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            );
        })}
      </div>

      {/* Gallery Modal */}
      <AnimatePresence>
        {galleryProject && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10 bg-black/80 backdrop-blur-xl"
                onClick={() => setGalleryProject(null)}
            >
                <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="relative w-full max-w-6xl h-[85vh] bg-[#121212] border border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Modal Header */}
                    <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#121212]/50 backdrop-blur-md z-50">
                        <div>
                            <h3 className="text-2xl font-serif font-bold text-[#E5E4E2]">
                                {galleryProject.title} <span className="text-[#D4AF37]">Gallery</span>
                            </h3>
                            <p className="text-neutral-500 text-sm mt-1">{galleryProject.shortDesc}</p>
                        </div>
                        <button 
                            onClick={() => setGalleryProject(null)}
                            className="p-2 rounded-full bg-white/5 hover:bg-[#D4AF37] hover:text-black text-neutral-400 transition-all duration-300"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Scrollable Gallery Grid */}
                    <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-[#D4AF37]/50 scrollbar-track-neutral-900">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {galleryProject.gallery?.map((img, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className={cn(
                                        "group relative rounded-xl overflow-hidden shadow-2xl border border-white/5 hover:border-[#D4AF37]/50 transition-all duration-500",
                                        idx % 3 === 0 ? "md:col-span-2 aspect-video" : "md:col-span-1 aspect-[4/3]"
                                    )}
                                >
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                    <img 
                                        src={img} 
                                        alt={`Gallery ${idx}`} 
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                                        loading="lazy"
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
