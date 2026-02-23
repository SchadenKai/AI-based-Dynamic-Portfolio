"use client";

import React from 'react';
import { useLayoutStore, SectionName } from '@/store/useLayoutStore';
import { ExperienceCard } from "@/components/content/ExperienceCard";
import { ProjectCard } from "@/components/content/ProjectCard";
import { SkillCard } from "@/components/content/SkillCard";
import { AchievementCard } from "@/components/content/AchievementCard";
import { CompactOverlayCard } from "@/components/content/CompactOverlayCard";
import { WritingsSection } from "@/components/content/WritingsSection";
import { LeftColumn } from "@/components/content/LeftColumn";
import { ExpandButton } from "@/components/ui/ExpandButton";

import { Profile } from '@/types/profile';
import { motion, AnimatePresence } from 'framer-motion';

interface DynamicPortfolioProps {
  profile: Profile;
}

export function DynamicPortfolio({ profile }: DynamicPortfolioProps) {
  const { layoutOrder, highlightIds } = useLayoutStore();
  
  const isHighlighted = (id: string) => highlightIds.includes(id);
  
  const [achievementsExpanded, setAchievementsExpanded] = React.useState(false);

  const sections: Record<SectionName, React.ReactNode> = {
    about: (
      <motion.section
        layout
        id="about"
        key="about"
        className="mb-12 md:mb-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        aria-labelledby="about-heading"
      >
        <h3 id="about-heading" className="text-2xl md:text-4xl font-bold mb-6 md:mb-12 uppercase flex items-center tracking-wide">
          <span className="w-4 h-4 md:w-6 md:h-6 bg-primary mr-3 md:mr-6" aria-hidden="true"></span>
          About
        </h3>
        <div className="bg-surface border-2 border-border p-6 md:p-8 rounded-sm shadow-[4px_4px_0px_0px_var(--foreground)]">
            <p className="text-lg md:text-xl leading-relaxed text-foreground font-medium">
                {profile.basics.summary}
            </p>
        </div>
      </motion.section>
    ),
    experience: (
      <motion.section 
        layout
        id="experience"
        key="experience" 
        className="mb-12 md:mb-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        aria-labelledby="experience-heading"
      >
         <h3 id="experience-heading" className="text-2xl md:text-4xl font-bold mb-6 md:mb-12 uppercase flex items-center tracking-wide">
          <span className="w-4 h-4 md:w-6 md:h-6 bg-primary mr-3 md:mr-6" aria-hidden="true"></span>
          Experience
        </h3>
        <div className="grid grid-cols-1 gap-4 md:gap-8">
          {profile.work.map((work, index) => (
            <ExperienceCard 
                key={index} 
                work={work} 
                isHighlighted={isHighlighted(`work-${index}`)}
            />
          ))}
        </div>
      </motion.section>
    ),
    projects: (
         <motion.section 
            layout
            id="projects"
            key="projects" 
            className="mb-12 md:mb-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            aria-labelledby="projects-heading"
         >
            <h3 id="projects-heading" className="text-2xl md:text-4xl font-bold mb-6 md:mb-12 uppercase flex items-center tracking-wide">
            <span className="w-4 h-4 md:w-6 md:h-6 bg-primary mr-3 md:mr-6" aria-hidden="true"></span>
            Selected Projects
            </h3>
            <div className="grid grid-cols-1 gap-4 md:gap-8">
            {profile.projects.map((project, index) => (
                <ProjectCard 
                    key={index} 
                    project={project} 
                    isHighlighted={isHighlighted(`project-${index}`)}
                />
            ))}
            </div>
        </motion.section>
    ),
    skills: (
        <motion.section 
            layout
            id="skills"
            key="skills" 
            className="mb-12 md:mb-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            aria-labelledby="skills-heading"
        >
            <h3 id="skills-heading" className="text-2xl md:text-4xl font-bold mb-6 md:mb-12 uppercase flex items-center tracking-wide">
            <span className="w-4 h-4 md:w-6 md:h-6 bg-primary mr-3 md:mr-6" aria-hidden="true"></span>
            Technical Arsenal
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {profile.skills.map((skill, index) => (
                    <SkillCard 
                        key={index} 
                        skill={skill} 
                        isHighlighted={isHighlighted(`skill-${index}`)}
                    />
                ))}
            </div>
        </motion.section>
    ),
    achievements: (
        <motion.section 
            layout
            id="achievements"
            key="achievements" 
            className="mb-12 md:mb-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            aria-labelledby="achievements-heading"
        >
            <h3 id="achievements-heading" className="text-2xl md:text-4xl font-bold mb-6 md:mb-12 uppercase flex items-center tracking-wide">
            <span className="w-4 h-4 md:w-6 md:h-6 bg-primary mr-3 md:mr-6" aria-hidden="true"></span>
            Achievements
            </h3>
            
            <div className="flex flex-col gap-8">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                    <AnimatePresence initial={false} mode="popLayout">
                        {(achievementsExpanded ? profile.achievements : profile.achievements?.slice(0, 6))?.map((achievement, index) => (
                            <motion.div
                                layout
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <CompactOverlayCard 
                                    title={achievement.title}
                                    subtitle={`@${achievement.event}`}
                                    imageSrc={achievement.image}
                                    type="award"
                                    onClick={() => {}} // Could open a modal if needed, currently just static
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {profile.achievements && profile.achievements.length > 6 && (
                     <div className="flex justify-center">
                       <ExpandButton
                         isExpanded={achievementsExpanded}
                         onClick={() => setAchievementsExpanded(!achievementsExpanded)}
                         labelMore="VIEW ALL ACHIEVEMENTS"
                         labelLess="SHOW LESS"
                       />
                     </div>
                )}
            </div>
        </motion.section>
    ),
    writings: (
        <motion.div
           layout
           key="writings"
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: 20 }}
           transition={{ duration: 0.3 }}
        >
            <WritingsSection profile={profile} />
        </motion.div>
    )

  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
         {/* Left Column - Fixed on Desktop */}
         <aside className="lg:w-1/3 lg:min-w-[400px] relative">
            <LeftColumn profile={profile} />
         </aside>

         {/* Right Column - Scrollable Content */}
         <main className="lg:w-2/3 py-6 md:py-12 lg:py-0">
             <div className="lg:pt-24 lg:pb-32">
                <AnimatePresence mode="popLayout">
                    {layoutOrder.map(section => sections[section])}
                </AnimatePresence>
                
                <footer className="border-t-2 border-border pt-6 md:pt-8 text-center lg:text-left text-muted-foreground font-mono text-xs md:text-sm font-bold mt-12 md:mt-20">
                    <p>© {new Date().getFullYear()} {profile.basics.name}.</p>
                </footer>
             </div>
         </main>
    </div>
  );
}
