import React from 'react';
import { Tooltip } from 'react-tooltip';
import { SiC, SiCplusplus, SiGnubash, SiGooglesheets, SiTypescript, SiLua, SiBlender, SiGimp, SiFigma, SiArduino, SiLatex, SiCmake, SiMake, SiRos, SiLucid, SiUml, SiEspressif, SiArchlinux, SiUbuntu, SiHyprland, SiSqlite  } from 'react-icons/si';
import { DiRasberryPi, DiJsBadge, DiNodejs, DiNpm, DiPython, DiReact, DiMysql, DiLinux, DiHtml5, DiGit, DiGithubBadge, DiDocker, DiCss3 } from "react-icons/di";
import { IconWithTooltip } from '../components/IconWithTooltip';

import profilePic  from '../../assets/images/PFP.jpg';
import { Link } from 'react-router-dom';

export function Home()
{
    return (
        <section id="home">
            {/* Main Content: About Section with Profile Pic */}
            <div className="flex flex-col md:flex-row gap-8 mb-16 items-start">
                {/* Left Column: Text Content */}
                <div className="flex-1">
                    {/* About Section */}
                    <section id="about" className="">
                        <h1 className="text-5xl font-bold mb-4">Software Engineer</h1>
                        <h2 className="text-3xl font-semibold mb-4 text-(--color-subtle)">Mackay Grange | B.S. Software Engineering</h2>
                        <div className="border-b-4 border-double border-(--color-overlay) mb-4 max-w-2xl"> </div>
                        <p className="text-xl text-(--color-text) max-w-2xl pb-0">
                            Hello, I'm <b>Mackay Grange</b>, a software engineer with a Bachelor of Science in Software Engineering.
                            I got my degree from <a href="https://www.uvu.edu" target="_blank" rel="noopener noreferrer" className="text-(--color-pine) underline">Utah Valley University</a> in 2025.
                            I enjoy designing and building reliable, maintainable systems with a strong foundation in computer science principles.
                            This website serves as a professional portfolio showcasing my projects, technical experience, 
                            and areas of interest—from systems programming and embedded development to full-stack and software design. 
                            I'm always eager to learn, improve, and take on meaningful engineering challenges.
                        </p>

                        {/* Link to About Page */}
                        <div className="mt-6 flex justify-center md:justify-center max-w-2xl">
                            <Link
                                to="/about"
                                className="rounded-lg px-4 py-2 bg-(--color-muted) shadow-md hover:bg-(--color-subtle) text-white transition-colors duration-800"
                            >
                                More about me...
                            </Link>
                        </div>
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

                <div className="flex flex-wrap gap-4 max-w-2xl pb-8" >
                    <IconWithTooltip id="TT-Linux" icon={DiLinux} tooltipText="Linux Operating System" bgColor="bg-(--color-gold)/50" />
                    <IconWithTooltip id="TT-Ubuntu" icon={SiUbuntu} tooltipText="Ubuntu Operating System" bgColor="bg-(--color-gold)/50" />
                    <IconWithTooltip id="TT-ArchLinux" icon={SiArchlinux} tooltipText="Arch Linux Operating System" bgColor="bg-(--color-gold)/50" />
                    <IconWithTooltip id="TT-Git" icon={DiGit} tooltipText="Git Version Control" bgColor="bg-(--color-gold)/50" />
                    <IconWithTooltip id="TT-Github" icon={DiGithubBadge} tooltipText="GitHub Platform" bgColor="bg-(--color-gold)/50" />
                    <IconWithTooltip id="TT-Bash" icon={SiGnubash} tooltipText="GNU Bash Shell" bgColor="bg-(--color-gold)/50" />
                    <IconWithTooltip id="TT-CMake" icon={SiCmake} tooltipText="CMake Build System" bgColor="bg-(--color-gold)/50" />
                    <IconWithTooltip id="TT-Make" icon={SiMake} tooltipText="Make Build Automation Tool" bgColor="bg-(--color-gold)/50" />
                    <IconWithTooltip id="TT-Docker" icon={DiDocker} tooltipText="Docker Containerization Platform" bgColor="bg-(--color-gold)/50" />
                    <IconWithTooltip id="TT-SQLite" icon={SiSqlite} tooltipText="PostgreSQL Database" bgColor="bg-(--color-gold)/50" />
                    <IconWithTooltip id="TT-MySQL" icon={DiMysql} tooltipText="MySQL Database" bgColor="bg-(--color-gold)/50" />
                    <IconWithTooltip id="TT-Hyprland" icon={SiHyprland} tooltipText="Hyprland Window Manager" bgColor="bg-(--color-gold)/50" />
                </div>

                <div className="flex flex-wrap gap-4 max-w-2xl pb-8" >
                    <IconWithTooltip id="TT-RaspberryPi" icon={DiRasberryPi} tooltipText="Raspberry Pi Single-board Computer" bgColor="bg-(--color-love)/50" />
                    <IconWithTooltip id="TT-Arduino" icon={SiArduino} tooltipText="Arduino Microcontroller Platform" bgColor="bg-(--color-love)/50" />
                    <IconWithTooltip id="TT-Espressif" icon={SiEspressif} tooltipText="Espressif Systems IoT Platform" bgColor="bg-(--color-love)/50" />
                    <IconWithTooltip id="TT-ROS" icon={SiRos} tooltipText="Robot Operating System (ROS/ROS2)" bgColor="bg-(--color-love)/50" />
                </div>

                <div className="flex flex-wrap gap-4 max-w-2xl pb-8" >
                    <IconWithTooltip id="TT-React" icon={DiReact} tooltipText="React Framework" bgColor="bg-(--color-pine)/50" />
                    <IconWithTooltip id="TT-Nodejs" icon={DiNodejs} tooltipText="Node.js Runtime Environment" bgColor="bg-(--color-pine)/50"  />
                    <IconWithTooltip id="TT-Npm" icon={DiNpm} tooltipText="Node Package Manager" bgColor="bg-(--color-pine)/50" />
                    <IconWithTooltip id="TT-HTML5" icon={DiHtml5} tooltipText="HTML5 Markup Language" bgColor="bg-(--color-pine)/50" />
                    <IconWithTooltip id="TT-CSS3" icon={DiCss3} tooltipText="CSS3 Styling Language" bgColor="bg-(--color-pine)/50" />
                </div>

                <div className="flex flex-wrap gap-4 max-w-2xl" >
                    <IconWithTooltip id="TT-UML" icon={SiUml} tooltipText="Unified Modeling Language (UML)" bgColor="bg-(--color-iris)/50" />
                    <IconWithTooltip id="TT-Lucid" icon={SiLucid} tooltipText="Lucidchart Diagramming Tool" bgColor="bg-(--color-iris)/50" />
                    <IconWithTooltip id="TT-Figma" icon={SiFigma} tooltipText="Figma Design Tool" bgColor="bg-(--color-iris)/50" />
                    <IconWithTooltip id="TT-LaTeX" icon={SiLatex} tooltipText="LaTeX Document Preparation System" bgColor="bg-(--color-iris)/50" />
                    <IconWithTooltip id="TT-GoogleSheets" icon={SiGooglesheets} tooltipText="Google Sheets Spreadsheet Application" bgColor="bg-(--color-iris)/50" />
                    <IconWithTooltip id="TT-Blender" icon={SiBlender} tooltipText="Blender 3D Modeling Software" bgColor="bg-(--color-iris)/50" />
                    <IconWithTooltip id="TT-Gimp" icon={SiGimp} tooltipText="GIMP Image Editor" bgColor="bg-(--color-iris)/50" />
                </div>

            </section>
        </section>
    )
}