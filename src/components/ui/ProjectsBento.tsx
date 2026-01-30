import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { projects } from '../../data/projects';
import { X, Github, ExternalLink, ArrowRight, Layers, Box } from 'lucide-react';
import { Badge } from './badge';

// --- Types ---
interface Project {
    id: number;
    slug: string;
    title: string;
    shortDesc: string;
    description: string;
    challenge?: string;
    solution?: string;
    tech: string[];
    size: 'large' | 'medium' | 'wide' | 'small';
    color: string;
    image?: string;
    github?: string;
    demo?: string;
    icon?: React.ElementType;
}

// --- Components ---

const TiltCard = ({ project, onClick }: { project: Project; onClick: () => void }) => {
    const ref = useRef<HTMLDivElement>(null);

    // Mouse Position State
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth Spring Animation params
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    // Transform mouse position to rotation
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    // Size Classes Logic
    const sizeClasses = {
        large: "md:col-span-2 md:row-span-2",
        medium: "md:col-span-1 md:row-span-1",
        wide: "md:col-span-2 md:row-span-1",
        small: "md:col-span-1 md:row-span-1"
    }[project.size] || "md:col-span-1 md:row-span-1";

    const Icon = project.icon || Box;

    return (
        <motion.div
            ref={ref}
            layoutId={`card-${project.id}`}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`cursor-pointer group relative rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 shadow-sm hover:shadow-2xl transition-all duration-300 ${sizeClasses}`}
        >
            {/* Background Gradient/Image */}
            <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />

            {/* Image Placeholder (Fallback) */}
            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-gray-100/50 to-transparent dark:from-black/50 pointer-events-none" />

            {/* Content Container */}
            <div className="relative h-full p-6 flex flex-col justify-between z-10">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${project.color} text-white shadow-lg`}>
                        <Icon size={20} />
                    </div>
                    {project.size === 'large' && (
                        <Badge variant="outline" className="bg-white/50 dark:bg-black/50 backdrop-blur-md">
                            Featured
                        </Badge>
                    )}
                </div>

                {/* Text Layout based on Size */}
                <div
                    className="transform transition-transform duration-300 translate-z-10 group-hover:translate-z-20"
                    style={{ transform: "translateZ(20px)" }}
                >
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 font-serif">
                        {project.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 md:line-clamp-3 leading-relaxed">
                        {project.shortDesc}
                    </p>
                </div>

                {/* Hover Reveal Action */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0 text-gray-400 dark:text-gray-500">
                    <ArrowRight size={24} />
                </div>
            </div>

            {/* Shine Effect */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
                style={{
                    background: "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)"
                }}
            />
        </motion.div>
    );
};

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
    if (!project) return null;
    const Icon = project.icon || Box;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
        >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />

            <motion.div
                layoutId={`card-${project.id}`}
                className="relative w-full max-w-4xl h-[85vh] md:h-auto max-h-[90vh] bg-white dark:bg-zinc-900 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row shadow-black/50"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 backdrop-blur text-white/50 hover:text-white hover:bg-white/20 transition-all"
                >
                    <X size={20} />
                </button>

                {/* Left Side: Visuals (40%) */}
                <div className={`relative w-full md:w-2/5 h-64 md:h-auto bg-gradient-to-br ${project.color} p-8 flex flex-col justify-end`}>
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="relative z-10"
                    >
                        <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl w-fit mb-6 shadow-xl border border-white/10">
                            <Icon size={32} className="text-white" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2 leading-tight">
                            {project.title}
                        </h2>
                        <p className="text-white/80 font-mono text-sm">
                            {project.slug}
                        </p>
                    </motion.div>
                </div>

                {/* Right Side: Content (60%) */}
                <div className="flex-1 overflow-y-auto p-6 md:p-10 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800">
                    <div className="space-y-8">
                        {/* Description */}
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
                                <span className="w-8 h-[1px] bg-gray-400"></span> About
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                                {project.description}
                            </p>
                        </div>

                        {/* Challenge & Solution Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-5 rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20">
                                <h4 className="text-red-600 dark:text-red-400 font-bold mb-2 flex items-center gap-2">
                                    <Layers size={16} /> Challenge
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {project.challenge || "No specific challenge details provided."}
                                </p>
                            </div>
                            <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/20">
                                <h4 className="text-emerald-600 dark:text-emerald-400 font-bold mb-2 flex items-center gap-2">
                                    <Box size={16} /> Solution
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {project.solution || "Solution details provided in documentation."}
                                </p>
                            </div>
                        </div>

                        {/* Tech Stack */}
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">
                                Technologies
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((t, i) => (
                                    <Badge key={i} variant="outline" className="px-3 py-1 text-sm bg-gray-50 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700">
                                        {t}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex gap-4">
                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-black dark:bg-white text-white dark:text-black font-semibold hover:opacity-80 transition-all"
                                >
                                    <Github size={18} /> View Code
                                </a>
                            )}
                            {project.demo && (
                                <a
                                    href={project.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white font-semibold hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all"
                                >
                                    <ExternalLink size={18} /> Live Demo
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default function ProjectsBento() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <section className="relative w-full py-20 px-4 md:px-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-16 md:mb-24 flex flex-col items-center text-center">
                <Badge variant="outline" shiny shinySpeed={3} className="mb-6 px-4 py-1.5 border-black/10 dark:border-white/10">
                    Selected Works
                </Badge>
                <h2 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
                    Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Masterpieces</span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[300px]">
                {projects.map((project) => (
                    <TiltCard
                        key={project.id}
                        project={project}
                        onClick={() => setSelectedProject(project)}
                    />
                ))}
            </div>

            {/* Modal Overlay */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
