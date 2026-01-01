import React from 'react';
import { Tooltip } from 'react-tooltip';
import { SiC, SiCplusplus, SiGnubash, SiGooglesheets, SiTypescript, SiLua } from 'react-icons/si';
import { DiRasberryPi, DiJsBadge, DiNodejs, DiNpm, DiPython, DiReact, DiMysql, DiLinux, DiHtml5, DiGit, DiGithubBadge, DiDocker, DiCss3 } from "react-icons/di";
import { IconWithTooltip } from '../components/IconWithTooltip';

import profilePic  from '../../assets/images/PFP.jpg';

export function Home()
{
    return (
        <section id="home">
            {/* Main Content: About Section with Profile Pic */}
            <div className="flex flex-col md:flex-row gap-8 mb-16 items-start">
                {/* Left Column: Text Content */}
                <div className="flex-1">
                    {/* About Section */}
                    <section id="about" className="pb-16">
                        <h1 className="text-5xl font-bold mb-4">Software Engineer</h1>
                        <h2 className="text-3xl font-semibold mb-4 text-(--color-subtle)">Mackay Grange | B.S. Software Engineering</h2>
                        <div className="border-b-4 border-double border-(--color-overlay) mb-4 max-w-2xl"> </div>
                        <p className="text-xl text-(--color-text) max-w-2xl">
                            Hello, I'm <b>Mackay Grange</b>, a software engineer with a Bachelor of Science in Software Engineering.
                            I got my degree from <a href="https://www.uvu.edu" target="_blank" rel="noopener noreferrer" className="text-(--color-pine) underline">Utah Valley University</a> in 2025.
                            I enjoy designing and building reliable, maintainable systems with a strong foundation in computer science principles.
                            This website serves as a professional portfolio showcasing my projects, technical experience, 
                            and areas of interest—from systems programming and embedded development to full-stack and software design. 
                            I'm always eager to learn, improve, and take on meaningful engineering challenges.
                        </p>
                    </section>
                </div>

                {/* Right Column: Profile Picture */}
                <div className="shrink-0" data-tooltip-id="TT-ProfilePic">
                    <img
                        src={profilePic}
                        alt="Me and my Beautiful Wife"
                        className="w-96 h-96 rounded-full border-16 border-(--color-highlight-med) object-cover shadow-lg"
                    />
                </div>
                <Tooltip 
                    id="TT-ProfilePic"
                    content="Me and my beautiful wife Nadia"
                    place="bottom"
                    className="bg-(--color-overlay) text-(--color-text) px-2 py-1 rounded text-sm delay-400"
                />
            </div>

            {/* Languages Section */}
            <section id="programming-languages" className="pb-16">
                <h2 className="text-3xl font-bold mb-6">Programming Languages</h2>
                <div className="border-b-4 border-double border-(--color-overlay) mb-4 max-w-2xl"> </div>

                <div className="flex flex-wrap gap-4 max-w-2xl">
                    <IconWithTooltip id="TT-C" icon={SiC} tooltipText="C Programming Language" />
                    <IconWithTooltip id="TT-CPP" icon={SiCplusplus} tooltipText="C++ Programming Language" />
                    <IconWithTooltip id="TT-Python" icon={DiPython} tooltipText="Python Programming Language" />
                    <IconWithTooltip id="TT-Lua" icon={SiLua} tooltipText="Lua Programming Language" />
                    <IconWithTooltip id="TT-JS" icon={DiJsBadge} tooltipText="JavaScript Programming Language" />
                    <IconWithTooltip id="TT-TS" icon={SiTypescript} tooltipText="TypeScript Programming Language" />
                </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="pb-16">
                <h2 className="text-3xl font-bold mb-6">Skills</h2>
                <div className="border-b-4 border-double border-(--color-overlay) mb-4 max-w-2xl"> </div>
                <div className="flex flex-wrap gap-4 max-w-2xl" >
                    <IconWithTooltip id="TT-React" icon={DiReact} tooltipText="React Framework" />
                    <IconWithTooltip id="TT-Nodejs" icon={DiNodejs} tooltipText="Node.js Runtime Environment" />
                    <IconWithTooltip id="TT-Npm" icon={DiNpm} tooltipText="Node Package Manager" />
                    <IconWithTooltip id="TT-HTML5" icon={DiHtml5} tooltipText="HTML5 Markup Language" />
                    <IconWithTooltip id="TT-CSS3" icon={DiCss3} tooltipText="CSS3 Styling Language" />
                    <IconWithTooltip id="TT-MySQL" icon={DiMysql} tooltipText="MySQL Database" />
                    <IconWithTooltip id="TT-Git" icon={DiGit} tooltipText="Git Version Control" />
                    <IconWithTooltip id="TT-Github" icon={DiGithubBadge} tooltipText="GitHub Platform" />
                    <IconWithTooltip id="TT-Linux" icon={DiLinux} tooltipText="Linux Operating System" />
                    <IconWithTooltip id="TT-Bash" icon={SiGnubash} tooltipText="GNU Bash Shell" />
                    <IconWithTooltip id="TT-Docker" icon={DiDocker} tooltipText="Docker Containerization" />
                    <IconWithTooltip id="TT-RaspberryPi" icon={DiRasberryPi} tooltipText="Raspberry Pi Single-board Computer" />
                    <IconWithTooltip id="TT-GoogleSheets" icon={SiGooglesheets} tooltipText="Google Sheets Spreadsheet Application" />
                </div>
            </section>

            {/* Frameworks Section */}
            <section id="frameworks" className="pb-16">
                <h2 className="text-3xl font-bold mb-6">Frameworks</h2>
                <div className="border-b-4 border-double border-(--color-overlay) mb-4 max-w-2xl"> </div>
                <div className="flex flex-wrap gap-4 max-w-2xl">

                </div>
            </section>
        </section>
    )
}