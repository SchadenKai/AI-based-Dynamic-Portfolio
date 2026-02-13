"use client";

import React, { useState } from 'react';
import { useTheme, THEMES } from '@/components/providers/ThemeProvider';
import { motion } from 'framer-motion';

interface GithubStatsProps {
  username: string;
  variant?: 'default' | 'minimal';
}

interface AsyncStatsImageProps {
  src: string;
  alt: string;
  className?: string;
  displayBlock?: boolean;
}

function AsyncStatsImage({ src, alt, className = "", displayBlock = false }: AsyncStatsImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className={`relative w-full ${displayBlock ? 'block' : 'flex items-center justify-center'} min-h-[50px] ${className}`}>
        {isLoading && (
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-sm" />
        )}
        
        {!error ? (
            <img
                src={src}
                alt={alt}
                loading="lazy"
                onLoad={() => setIsLoading(false)}
                onError={() => { 
                    setIsLoading(false); 
                    setError(true); 
                }}
                className={`transition-opacity duration-500 w-full h-auto object-contain ${isLoading ? 'opacity-0 absolute' : 'opacity-100 relative'}`}
            />
        ) : null}
    </div>
  );
}

export function GithubStats({ username, variant = 'default' }: GithubStatsProps) {
  const { theme } = useTheme();
  const isDark = THEMES.find(t => t.name === theme)?.isDark ?? false;
  const graphTheme = isDark ? 'merko' : 'default';
  const langTheme = isDark ? 'react' : 'default';
  const streakTheme = isDark ? 'black-ice' : 'default';
  const calendarColor = '7C3AED'; 

  if (variant === 'minimal') {
    return (
        <section className="w-full flex flex-col gap-4 opacity-80 hover:opacity-100 transition-opacity">
            <h4 className="font-mono text-xs font-bold text-muted-foreground uppercase mb-1">Github Activity</h4>
            <div className="flex flex-col gap-2">
                <AsyncStatsImage
                    src={`https://github-readme-streak-stats-eight.vercel.app/?user=${username}&hide_border=true&background=${isDark ? '1a1a1a' : 'ffffff'}&ring=${calendarColor}&fire=${calendarColor}&currStreakNum=${isDark ? 'ffffff' : '000000'}&currStreakLabel=${calendarColor}&sideNums=${isDark ? 'ffffff' : '000000'}&sideLabels=${isDark ? 'ffffff' : '000000'}&dates=${isDark ? 'd4d4d4' : '666666'}`}
                    alt="GitHub Streak"
                />
                 <AsyncStatsImage
                    src={`https://ghchart.rshah.org/${calendarColor}/${username}`} 
                    alt={`${username}'s Github Contribution Chart`}
                    displayBlock
                />
            </div>
        </section>
    )
  }

  return (
    <section aria-labelledby="github-stats-heading" className="w-full">
      <h3 id="github-stats-heading" className="text-2xl md:text-4xl font-bold mb-6 md:mb-12 uppercase flex items-center tracking-wide">
        <span className="w-4 h-4 md:w-6 md:h-6 bg-primary mr-3 md:mr-6" aria-hidden="true"></span>
        GitHub Activity
      </h3>

      <div className="flex flex-col gap-6 md:gap-8">
        
        {/* Top Row: Languages & Activity Graph */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
            
            {/* Top Languages - ~40% space */}
             <motion.div 
               className="w-full lg:w-[40%] flex flex-col"
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
             >
                <div className="bg-surface border-2 border-border shadow-[4px_4px_0px_0px_var(--foreground)] rounded-sm overflow-hidden flex-grow">
                    <div className="p-4 flex items-center justify-center h-full bg-surface w-full">
                        <AsyncStatsImage
                            src={`https://github-readme-stats-matin.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=${langTheme}&hide_border=true&bg_color=${isDark ? '1a1a1a' : 'ffffff'}`}
                            alt="Top Languages"
                        />
                    </div>
                </div>
            </motion.div>

            {/* Activity Graph - ~60% space */}
            <motion.div 
                className="w-full lg:w-[60%] flex flex-col"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
            >
                 <div className="bg-surface border-2 border-border shadow-[4px_4px_0px_0px_var(--foreground)] rounded-sm overflow-hidden flex-grow">
                    <div className="p-4 flex items-center justify-center h-full bg-surface w-full">
                        <AsyncStatsImage
                            src={`https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=${graphTheme}&hide_border=true&area=true&bg_color=${isDark ? '1a1a1a' : 'ffffff'}&color=${calendarColor}`}
                            alt="Activity Graph"
                            displayBlock
                        />
                    </div>
                </div>
            </motion.div>
        </div>

        {/* Contribution Calendar (Heatmap) - Full Width */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-full overflow-hidden bg-surface border-2 border-border shadow-[4px_4px_0px_0px_var(--foreground)] rounded-sm p-4 md:p-6"
        >
          <div className="flex flex-col gap-4">
            <h4 className="font-mono font-bold text-lg md:text-xl text-primary">Contribution Map</h4>
            <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
              <div className="min-w-[700px]">
                <AsyncStatsImage
                  src={`https://ghchart.rshah.org/${calendarColor}/${username}`} 
                  alt={`${username}'s Github Contribution Chart`}
                  displayBlock
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Streak Stats - Centered or Full Width */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="w-full bg-surface border-2 border-border shadow-[4px_4px_0px_0px_var(--foreground)] rounded-sm overflow-hidden flex flex-col"
        >
             <div className="p-4 md:p-6 flex-grow flex items-center justify-center bg-surface w-full">
                <AsyncStatsImage
                  src={`https://github-readme-streak-stats-eight.vercel.app/?user=${username}&hide_border=true&background=${isDark ? '1a1a1a' : 'ffffff'}&ring=${calendarColor}&fire=${calendarColor}&currStreakNum=${isDark ? 'ffffff' : '000000'}&currStreakLabel=${calendarColor}&sideNums=${isDark ? 'ffffff' : '000000'}&sideLabels=${isDark ? 'ffffff' : '000000'}&dates=${isDark ? 'd4d4d4' : '666666'}`}
                  alt="GitHub Streak"
                />
             </div>
        </motion.div>

      </div>
    </section>
  );
}
