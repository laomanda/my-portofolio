import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { FolderGit2, CalendarDays, Activity, Briefcase, GraduationCap, Github, ExternalLink, Lock, ChevronDown } from 'lucide-react';

import { TextAnimate } from './text-animate';

interface AboutTabsProps {
  description: string;
  githubData: {
    repoCount: number | string;
    contributions: string;
    yearsActive: number | string;
    username: string;
    calendar?: Array<{ date: string; count: number; level: number }>;
  };
}

const AboutTabs: React.FC<AboutTabsProps> = ({ description, githubData: initialGithubData }) => {
  const [activeTab, setActiveTab] = useState<'about' | 'journey' | 'digital' | 'certificate'>('about');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [githubData, setGithubData] = useState(initialGithubData);

  // Fetch latest data on mount with 1-hour caching
  useEffect(() => {
    const fetchLatestData = async () => {
      const CACHE_KEY = `github_data_${initialGithubData.username}`;
      const CACHE_DURATION = 3600 * 1000; // 1 hour in milliseconds

      try {
        // Check cache first
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
            const { data, timestamp } = JSON.parse(cached);
            if (Date.now() - timestamp < CACHE_DURATION) {
                // Cache is still valid
                setGithubData(data);
                return;
            }
        }

        const username = initialGithubData.username;
        
        // Parallel fetch
        const [userRes, contribRes] = await Promise.all([
            fetch(`https://api.github.com/users/${username}`),
            fetch(`https://github-contributions-api.jogruber.de/v4/${username}`)
        ]);

        if (userRes.ok && contribRes.ok) {
            const userData = await userRes.json();
            const contribData = await contribRes.json();
            
            let totalContribs = 0;
            if (contribData.total && typeof contribData.total === "object") {
                totalContribs = Object.values(contribData.total).reduce((a: any, b: any) => a + b, 0) as number;
            }

            const createdDate = new Date(userData.created_at);
            const currentDate = new Date();
            const years = currentDate.getFullYear() - createdDate.getFullYear();

            // Structure calendar data for the graph
            let calendarData = [];
            if (contribData.contributions) {
                 calendarData = contribData.contributions.sort((a: any, b: any) => 
                    new Date(a.date).getTime() - new Date(b.date).getTime()
                 );
            }

            const newData = {
                repoCount: userData.public_repos,
                contributions: totalContribs > 0 ? totalContribs.toLocaleString() : initialGithubData.contributions,
                yearsActive: years > 0 ? years : initialGithubData.yearsActive,
                username: username,
                calendar: calendarData.length > 0 ? calendarData : initialGithubData.calendar
            };

            setGithubData(newData);
            
            // Save to cache
            localStorage.setItem(CACHE_KEY, JSON.stringify({
                data: newData,
                timestamp: Date.now()
            }));
        }
      } catch (error) {
        console.error("Failed to refresh GitHub data:", error);
      }
    };

    fetchLatestData();
  }, [initialGithubData.username]);

  const tabs = [
    { id: 'about', label: 'Tentang' },
    { id: 'journey', label: 'Perjalanan' },
    { id: 'digital', label: 'Digital' },
    { id: 'certificate', label: 'Sertifikat' },
  ] as const;

  return (
    <div className="w-full space-y-8">
      {/* Tab Navigation */}
      <div className="relative z-50">
        {/* Mobile Dropdown */}
        <div className="md:hidden">
            <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl text-[#E5E4E2] font-display uppercase tracking-widest text-sm"
            >
                <span>{tabs.find(t => t.id === activeTab)?.label}</span>
                <ChevronDown className={`w-4 h-4 text-[#D4AF37] transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {isDropdownOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-neutral-950 border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50"
                        style={{ backgroundColor: '#0a0a0a' }}
                    >
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => {
                                    setActiveTab(tab.id);
                                    setIsDropdownOpen(false);
                                }}
                                className={`w-full text-left px-4 py-3 text-sm uppercase tracking-widest transition-colors font-display
                                    ${activeTab === tab.id ? 'bg-[#D4AF37]/10 text-[#D4AF37]' : 'text-neutral-400 hover:bg-white/5 hover:text-white'}
                                `}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

        {/* Desktop Tabs */}
        <div className="hidden md:flex items-center gap-8 border-b border-white/5 pb-1">
            {tabs.map((tab) => (
            <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative pb-4 text-sm uppercase tracking-[0.2em] transition-colors duration-500 font-display
                ${
                    activeTab === tab.id
                    ? 'text-[#D4AF37]'
                    : 'text-neutral-500 hover:text-[#E5E4E2]'
                }
                `}
            >
                {tab.label}
                {activeTab === tab.id && (
                <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 w-full h-px bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
                )}
            </button>
            ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="min-h-[300px]">
        <AnimatePresence mode="wait">
          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <TextAnimate 
                as="p" 
                animation="slideUp" 
                by="word" 
                className="text-lg md:text-xl text-neutral-400 leading-relaxed font-light"
                startOnView={false}
                once={true}
                delay={0.2}
                duration={1.0}
              >
                {description}
              </TextAnimate>
              
              <div className="pt-4">
                 <div className="italic text-[#E5E4E2]/60 border-l-2 border-[#D4AF37]/30 pl-4 py-2">
                    <TextAnimate
                      as="p"
                      animation="slideUp"
                      by="word"
                      startOnView={false}
                      once={true}
                      delay={1.5}
                      duration={1.0}
                    >
                      "Menciptakan pengalaman digital yang menggabungkan presisi teknis dengan kemewahan estetika."
                    </TextAnimate>
                 </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'journey' && (
            <motion.div
              key="journey"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Experience */}
              <div className="space-y-4">
                 <h4 className="flex items-center gap-2 text-[#D4AF37] text-sm uppercase tracking-wider">
                    <Briefcase className="w-4 h-4" /> Pengalaman
                 </h4>
                 <div className="relative border-l border-white/10 ml-2 space-y-8 pl-8 py-2">
                    {/* DPF */}
                    <div className="relative group">
                       <div className="absolute -left-[37px] top-1.5 w-3 h-3 rounded-full bg-[#121212] border border-[#D4AF37] group-hover:bg-[#D4AF37] transition-colors duration-300"></div>
                       <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1">
                          <h5 className="text-[#E5E4E2] font-semibold text-lg">Web Developer Intern</h5>
                          <span className="text-xs text-[#D4AF37]/80 font-mono bg-[#D4AF37]/5 px-2 py-1 rounded">9 Bulan</span>
                       </div>
                       <div className="text-neutral-500 text-sm mb-3">Djalaludin Pane Foundation</div>
                       <p className="text-neutral-400 text-sm leading-relaxed mb-3">
                          Memimpin pembangunan ulang <a href="https://github.com/laomanda/donasi-website" target="_blank" className="text-[#D4AF37] hover:underline inline-flex items-center gap-1">platform donasi <ExternalLink className="w-3 h-3"/></a> menggunakan standar web modern. Secara bersamaan memelihara stabilitas dan performa website yayasan yang lama.
                       </p>
                    </div>
                 </div>
              </div>

              {/* Education */}
              <div className="space-y-4">
                 <h4 className="flex items-center gap-2 text-[#D4AF37] text-sm uppercase tracking-wider">
                    <GraduationCap className="w-4 h-4" /> Pendidikan
                 </h4>
                 <div className="relative border-l border-white/10 ml-2 space-y-6 pl-8 py-2">
                    {/* SMKN 64 */}
                    <div className="relative group">
                       <div className="absolute -left-[37px] top-1.5 w-3 h-3 rounded-full bg-[#121212] border border-neutral-700 group-hover:border-[#E5E4E2] transition-colors duration-300"></div>
                       <div className="flex justify-between items-baseline mb-1">
                          <h5 className="text-[#E5E4E2] font-semibold">SMKN 64 Jakarta</h5>
                       </div>
                       <div className="text-neutral-500 text-sm">Rekayasa Perangkat Lunak (RPL)</div>
                    </div>
                     {/* SMPN 50 */}
                    <div className="relative group">
                       <div className="absolute -left-[37px] top-1.5 w-3 h-3 rounded-full bg-[#121212] border border-neutral-700 group-hover:border-[#E5E4E2] transition-colors duration-300"></div>
                       <div className="flex justify-between items-baseline mb-1">
                          <h5 className="text-[#E5E4E2] font-semibold">SMP Negeri 50 Jakarta</h5>
                       </div>
                       <div className="text-neutral-500 text-sm">Sekolah Menengah Pertama</div>
                    </div>
                 </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'digital' && (
            <motion.div
              key="digital"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
               {/* Stats Grid */}
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[#D4AF37]/30 transition-colors group relative overflow-hidden">
                    <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />
                    <div className="mb-3 text-[#D4AF37] group-hover:scale-110 transition-transform duration-500 origin-left relative z-20">
                        <FolderGit2 className="w-5 h-5" />
                    </div>
                    <div className="text-2xl font-bold text-[#E5E4E2] mb-1 relative z-20">
                        <AnimatedCounter value={githubData.repoCount} />
                    </div>
                    <div className="text-xs text-neutral-500 uppercase tracking-wider relative z-20">Repositori</div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[#D4AF37]/30 transition-colors group relative overflow-hidden">
                    <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />
                    <div className="mb-3 text-[#D4AF37] group-hover:scale-110 transition-transform duration-500 origin-left relative z-20">
                        <Activity className="w-5 h-5" />
                    </div>
                    <div className="text-2xl font-bold text-[#E5E4E2] mb-1 relative z-20">
                        <AnimatedCounter value={githubData.contributions} />
                    </div>
                    <div className="text-xs text-neutral-500 uppercase tracking-wider relative z-20">Kontribusi</div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[#D4AF37]/30 transition-colors group relative overflow-hidden">
                    <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />
                    <div className="mb-3 text-[#D4AF37] group-hover:scale-110 transition-transform duration-500 origin-left relative z-20">
                        <CalendarDays className="w-5 h-5" />
                    </div>
                    <div className="text-2xl font-bold text-[#E5E4E2] mb-1 flex items-baseline relative z-20">
                        <AnimatedCounter value={githubData.yearsActive} />
                        <span className="text-sm text-[#D4AF37] ml-0.5">Y</span>
                    </div>
                    <div className="text-xs text-neutral-500 uppercase tracking-wider relative z-20">Pengalaman</div>
                </div>
               </div>

               {/* GitHub CTA */}
               <div className="pt-4">
                  <a 
                    href={`https://github.com/${githubData.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-[#1a1a1a] to-[#121212] border border-white/10 hover:border-[#D4AF37] group transition-all duration-500 cursor-pointer"
                  >
                     <div className="flex items-center gap-4">
                        <div className="p-2 rounded-full bg-white/5 group-hover:bg-[#D4AF37] group-hover:text-black transition-colors duration-500">
                           <Github className="w-5 h-5" />
                        </div>
                        <div>
                           <div className="text-[#E5E4E2] font-medium group-hover:text-[#D4AF37] transition-colors">Kunjungi Laboratorium Saya</div>
                           <div className="text-neutral-500 text-xs mt-0.5">Lihat semua kode sumber dan commit</div>
                        </div>
                     </div>
                     <ExternalLink className="w-4 h-4 text-neutral-600 group-hover:text-[#D4AF37] transition-colors" />
                  </a>
               </div>
            </motion.div>
          )}
          
          {activeTab === 'certificate' && (
            <motion.div
              key="certificate"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center py-12 px-4 text-center space-y-6"
            >
               <div className="relative">
                  <div className="absolute inset-0 bg-[#D4AF37] blur-[40px] opacity-10 rounded-full animate-pulse-slow"></div>
                  <div className="relative p-6 rounded-full border border-[#D4AF37]/20 bg-[#1a1a1a] shadow-[0_0_30px_rgba(212,175,55,0.05)]">
                     <Lock className="w-10 h-10 text-[#D4AF37]/80" />
                  </div>
               </div>
               
               <div className="space-y-2 max-w-md">
                   <h3 className="text-xl font-bold text-[#E5E4E2] tracking-wide">Segera Hadir</h3>
                   <p className="text-neutral-500 text-sm leading-relaxed">
                       Sertifikat dan bukti kompetensi sedang dalam proses kurasi. Dokumen fisik saat ini masih tersimpan di arsip sekolah dan akan segera didigitalisasi.
                   </p>
               </div>

               <div className="flex gap-2">
                   {[0, 1, 2].map(i => (
                       <div key={i} className="w-2 h-2 rounded-full bg-[#D4AF37]" style={{ opacity: 0.2 + (i * 0.3) }}></div>
                   ))}
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Helper for number animation
const AnimatedCounter = ({ value }: { value: number | string }) => {
    const numericValue = typeof value === 'string' ? parseInt(value.replace(/[^0-9]/g, '') || "0") : value;
    const suffix = typeof value === 'string' && value.includes('+') ? '+' : '';
    
    // We use a spring for smooth counting
    const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
    const display = useTransform(spring, (current) => Math.floor(current).toLocaleString());

    useEffect(() => {
        spring.set(numericValue);
    }, [numericValue, spring]);

    return (
        <span className="flex items-center gap-0.5">
            <motion.span>{display}</motion.span>
            {suffix}
        </span>
    );
};

export default AboutTabs;
