import React, { useRef, useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { projects } from '../data/projects';
import Stack from './Stack';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import LustreText from './ui/lustretext';
// gsap import removed since it's unused

interface BentoProps {
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  spotlightRadius?: number;
  glowColor?: string;
}

const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '212, 175, 55'; // Gold RGB
const MOBILE_BREAKPOINT = 768;

const MagicBento: React.FC<BentoProps> = ({
  enableSpotlight = true,
  enableBorderGlow = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [galleryProject, setGalleryProject] = useState<typeof projects[0] | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Global Spotlight Effect - Updates all cards based on mouse position
  useEffect(() => {
    if (isMobile || !gridRef.current) return;
    const grid = gridRef.current;
    let rafId: number | null = null;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) return; // Skip if a frame is already requested

      rafId = requestAnimationFrame(() => {
        const cards = grid.getElementsByClassName('project-card');
        for (const card of cards as any as HTMLElement[]) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        }
        rafId = null;
      });
    };

    grid.addEventListener('mousemove', handleMouseMove);
    grid.addEventListener('mouseleave', () => {
         // Optional: Reset or fade out effect when leaving grid
         const cards = grid.getElementsByClassName('project-card');
         for (const card of cards as any as HTMLElement[]) {
             card.style.removeProperty('--mouse-x');
             card.style.removeProperty('--mouse-y');
         }
         if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
         }
    });

    return () => {
        grid.removeEventListener('mousemove', handleMouseMove);
        if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (galleryProject) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [galleryProject]);

  return (
    <>
      <style>
        {`
          .project-card::before {
            content: "";
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(${glowColor}, 0.15), transparent 40%);
            opacity: 0;
            transition: opacity 0.5s;
            pointer-events: none;
            z-index: 2;
          }
          .project-card:hover::before {
            opacity: 1;
          }
           .project-card::after {
            content: "";
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(${glowColor}, 0.4), transparent 40%);
            opacity: 0;
            z-index: 1;
            transition: opacity 0.5s;
             border-radius: inherit;
          }  
           .project-card:hover::after {
            opacity: 0.1;
          }
        `}
      </style>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 md:px-6">
        {projects.map((project, index) => {
            // Layout logic: Zig-zag pattern for 6 items in 3 columns
            // Row 1: [2, 1] (Index 0 is Large)
            // Row 2: [1, 2] (Index 3 is Large)
            // Row 3: [2, 1] (Index 4 is Large)
            const isLarge = index === 0 || index === 3 || index === 4;
            const spanClass = isLarge ? "md:col-span-2" : "col-span-1";

            return (
                <div
                    key={project.id}
                    onClick={() => setGalleryProject(project)}
                    className={cn(
                        "project-card relative group rounded-3xl overflow-hidden cursor-pointer border border-white/10 bg-[#121212] transition-all duration-300 hover:border-[#D4AF37]/50 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]",
                        "min-h-[300px] flex flex-col justify-end",
                        spanClass
                    )}
                >
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                         {/* Stronger Gradient for readability */}
                         <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/80 to-[#121212]/30 z-10" />
                         <img 
                            src={project.image} 
                            alt={project.title} 
                            className="w-full h-full object-cover opacity-50 grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100"
                        />
                    </div>

                    {/* Content - Hidden by default, reveals on hover */}
                     <div className="relative z-20 p-6 md:p-8 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                              {project.tech.map((tech, i) => (
                                <Badge key={i} variant="outline" shiny className="uppercase tracking-wider font-semibold text-xs px-3 py-1 bg-black/50 border-white/10 backdrop-blur-sm text-neutral-300">
                                    {tech}
                                </Badge>
                              ))}
                          </div>
                         
                         <h3 className="text-2xl font-display font-bold text-[#D4AF37] mb-2 group-hover:text-[#E5E4E2] transition-colors">
                            {project.title}
                         </h3>

                         {/* Action Hint */}
                         <div className="flex items-center gap-2 text-sm font-display font-medium text-[#D4AF37]">
                            See Details <ArrowUpRight size={16} />
                         </div>
                    </div>
                </div>
            )
        })}
      </div>

       {/* Modal - Rendered via Portal */}
       {galleryProject && typeof document !== 'undefined' && createPortal(
        <AnimatePresence mode="wait">
            <motion.div
                key="modal-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-xl"
            >
                <motion.div 
                    key="modal-content"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="relative w-full max-w-6xl max-h-[90vh] bg-[#121212] border border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)]"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Modal Header - Fixed at top */}
                    <div className="flex-none flex items-center justify-between p-6 border-b border-white/5 bg-[#121212] z-50">
                        <div>
                            <h3 className="text-2xl font-display font-bold text-[#E5E4E2]">
                                <LustreText text={galleryProject.title} />
                            </h3>
                            <div className="flex items-center gap-3 mt-2">
                                {galleryProject.github && (
                                    <a href={galleryProject.github} target="_blank" className="flex items-center gap-1 text-xs font-display text-[#D4AF37] hover:underline">
                                        <Github size={14} /> Source Code
                                    </a>
                                )}
                            </div>
                        </div>
                        <button 
                            onClick={() => setGalleryProject(null)}
                            className="p-2 rounded-full bg-white/5 hover:bg-[#D4AF37] hover:text-black text-neutral-400 transition-all duration-300"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Scrollable Content Container */}
                    <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#D4AF37]/50 scrollbar-track-neutral-900">
                        <div className="relative w-full p-4 md:p-10 flex items-center justify-center min-h-[500px] h-full">
                            <div className="w-full max-w-4xl aspect-video relative">
                             <Stack 
                                randomRotation={true}
                                sensitivity={180}
                                sendToBackOnClick={true}
                                cards={galleryProject.gallery?.map((img, idx) => (
                                    <div key={idx} className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative group">
                                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end p-6">
                                            <p className="text-white/80 font-display text-sm tracking-wider">
                                                {idx + 1} / {galleryProject.gallery.length}
                                            </p>
                                         </div>
                                         <img 
                                            src={img} 
                                            alt={`Gallery ${idx}`} 
                                            className="w-full h-full object-cover pointer-events-none"
                                        />
                                    </div>
                                )) || []}
                            />
                        </div>
                    </div>     
                    

                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>,
        document.body
       )}
    </>
  );
};

export default MagicBento;
