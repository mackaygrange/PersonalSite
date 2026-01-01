import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { SiC, SiCplusplus, SiGnubash, SiGooglesheets, SiTypescript, SiLua } from 'react-icons/si';
import { DiRasberryPi, DiJsBadge, DiNodejs, DiNpm, DiPython, DiReact, DiMysql, DiLinux, DiHtml5, DiGit, DiGithubBadge, DiDocker, DiCss3, } from "react-icons/di";

export function Home()
{
    return (
        <section id="home">
            {/* About Section */}
            <section id="about" className="pb-16">
                <h1 className="text-5xl font-bold mb-4">Software Engineer</h1>
                <h2 className="text-3xl font-semibold mb-4 text-(--color-subtle)">Mackay Grange | B.S. Software Engineering</h2>

                <div className="border-b-4 border-double border-(--color-overlay) mb-4 max-w-2xl"> </div>
 
                <p className="text-xl text-(--color-text) max-w-2xl">
                    Hello, I’m <b>Mackay Grange</b>, a software engineer with a Bachelor of Science in Software Engineering. 
                    I enjoy designing and building reliable, maintainable systems with a strong foundation in computer science principles.
                    This website serves as a professional portfolio showcasing my projects, technical experience, 
                    and areas of interest—from systems programming and embedded development to full-stack and software design. 
                    I’m always eager to learn, improve, and take on meaningful engineering challenges.
                </p>
            </section>

            {/* Languages Section */}
            <section id="programming-languages" className="pb-16">
                <h2 className="text-3xl font-bold mb-6">Programming Languages</h2>
                <div className="border-b-4 border-double border-(--color-overlay) mb-4 max-w-2xl"> </div>

                <div className="flex flex-wrap gap-4 max-w-2xl">
                    <span data-tooltip-id="TT-C" className="shadow-lg bg-(--color-muted) px-4 py-2 rounded-lg hover:bg-(--color-subtle) transition-colors duration-800"><SiC size={32} /></span>
                    <Tooltip id="TT-C" content="C Programming Language" place="bottom" className="bg-(--color-overlay) text-(--color-text) px-2 py-1 rounded text-sm delay-400" />

                    <span data-tooltip-id="TT-CPP" className="shadow-lg bg-(--color-muted) px-4 py-2 rounded-lg hover:bg-(--color-subtle) transition-colors duration-800"><SiCplusplus size={32} /></span>
                    <Tooltip id="TT-CPP" content="C++ Programming Language" place="bottom" className="bg-(--color-overlay) text-(--color-text) px-2 py-1 rounded text-sm delay-400" />

                    <span data-tooltip-id="TT-Python" className="shadow-lg bg-(--color-muted) px-4 py-2 rounded-lg hover:bg-(--color-subtle) transition-colors duration-800"><DiPython size={32} /></span>
                    <Tooltip id="TT-Python" content="Python Programming Language" place="bottom" className="bg-(--color-overlay) text-(--color-text) px-2 py-1 rounded text-sm delay-400" />

                    <span data-tooltip-id="TT-Lua" className="shadow-lg bg-(--color-muted) px-4 py-2 rounded-lg hover:bg-(--color-subtle) transition-colors duration-800"><SiLua size={32} /></span>
                    <Tooltip id="TT-Lua" content="Lua Programming Language" place="bottom" className="bg-(--color-overlay) text-(--color-text) px-2 py-1 rounded text-sm delay-400" />

                    <span data-tooltip-id="TT-JS" className="shadow-lg bg-(--color-muted) px-4 py-2 rounded-lg hover:bg-(--color-subtle) transition-colors duration-800"><DiJsBadge size={32} /></span>
                    <Tooltip id="TT-JS" content="JavaScript Programming Language" place="bottom" className="bg-(--color-overlay) text-(--color-text) px-2 py-1 rounded text-sm delay-400" />

                    <span data-tooltip-id="TT-TS" className="shadow-lg bg-(--color-muted) px-4 py-2 rounded-lg hover:bg-(--color-subtle) transition-colors duration-800"><SiTypescript size={32} /></span>
                    <Tooltip id="TT-TS" content="TypeScript Programming Language" place="bottom" className="bg-(--color-overlay) text-(--color-text) px-2 py-1 rounded text-sm delay-400" />
                </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="pb-16">
                <h2 className="text-3xl font-bold mb-6">Skills</h2>
                <div className="border-b-4 border-double border-(--color-overlay) mb-4 max-w-2xl"> </div>
                <div className="flex flex-wrap gap-4 max-w-2xl" >
                    <span data-tooltip-id="TT-React" className="shadow-lg bg-(--color-muted) px-4 py-2 rounded-lg hover:bg-(--color-subtle) transition-colors duration-800"><DiReact size={32} /></span>
                    <Tooltip id="TT-React" content="React Framework" place="bottom" className="bg-(--color-overlay) text-(--color-text) px-2 py-1 rounded text-sm delay-400" />

                    <span data-tooltip-id="TT-Nodejs" className="shadow-lg bg-(--color-muted) px-4 py-2 rounded-lg hover:bg-(--color-subtle) transition-colors duration-800"><DiNodejs size={32} /></span>
                    <Tooltip id="TT-Nodejs" content="Node.js Runtime Environment" place="bottom" className="bg-(--color-overlay) text-(--color-text) px-2 py-1 rounded text-sm delay-400" />

                    <span data-tooltip-id="TT-Npm" className="shadow-lg bg-(--color-muted) px-4 py-2 rounded-lg hover:bg-(--color-subtle) transition-colors duration-800"><DiNpm size={32} /></span>
                    <Tooltip id="TT-Npm" content="Node Package Manager" place="bottom" className="bg-(--color-overlay) text-(--color-text) px-2 py-1 rounded text-sm delay-400" />

                    <span data-tooltip-id="TT-HTML5" className="shadow-lg bg-(--color-muted) px-4 py-2 rounded-lg hover:bg-(--color-subtle) transition-colors duration-800"><DiHtml5 size={32} /></span>
                    <Tooltip id="TT-HTML5" content="HTML5 Markup Language" place="bottom" className="bg-(--color-overlay) text-(--color-text) px-2 py-1 rounded text-sm delay-400" />

                    <span data-tooltip-id="TT-CSS3" className="shadow-lg bg-(--color-muted) px-4 py-2 rounded-lg hover:bg-(--color-subtle) transition-colors duration-800"><DiCss3 size={32} /></span>
                    <Tooltip id="TT-CSS3" content="CSS3 Styling Language" place="bottom" className="bg-(--color-overlay) text-(--color-text) px-2 py-1 rounded text-sm delay-400" />

                    <span data-tooltip-id="TT-MySQL" className="shadow-lg bg-(--color-muted) px-4 py-2 rounded-lg hover:bg-(--color-subtle) transition-colors duration-800"><DiMysql size={32} /></span>
                    <Tooltip id="TT-MySQL" content="MySQL Database" place="bottom" className="bg-(--color-overlay) text-(--color-text) px-2 py-1 rounded text-sm delay-400" />

                    <span data-tooltip-id="TT-Git" className="shadow-lg bg-(--color-muted) px-4 py-2 rounded-lg hover:bg-(--color-subtle) transition-colors duration-800"><DiGit size={32} /></span>
                    <Tooltip id="TT-Git" content="Git Version Control" place="bottom" className="bg-(--color-overlay) text-(--color-text) px-2 py-1 rounded text-sm delay-400" />

                    <span data-tooltip-id="TT-Github" className="shadow-lg bg-(--color-muted) px-4 py-2 rounded-lg hover:bg-(--color-subtle) transition-colors duration-800"><DiGithubBadge size={32} /></span>
                    <Tooltip id="TT-Github" content="GitHub Platform" place="bottom" className="bg-(--color-overlay) text-(--color-text) px-2 py-1 rounded text-sm delay-400" />

                    <span data-tooltip-id="TT-Linux" className="shadow-lg bg-(--color-muted) px-4 py-2 rounded-lg hover:bg-(--color-subtle) transition-colors duration-800"><DiLinux size={32} /></span>
                    <Tooltip id="TT-Linux" content="Linux Operating System" place="bottom" className="bg-(--color-overlay) text-(--color-text) px-2 py-1 rounded text-sm delay-400" />

                    <span data-tooltip-id="TT-Bash" className="shadow-lg bg-(--color-muted) px-4 py-2 rounded-lg hover:bg-(--color-subtle) transition-colors duration-800"><SiGnubash size={32} /></span>
                    <Tooltip id="TT-Bash" content="GNU Bash Shell" place="bottom" className="bg-(--color-overlay) text-(--color-text) px-2 py-1 rounded text-sm delay-400" />

                    <span data-tooltip-id="TT-Docker" className="shadow-lg bg-(--color-muted) px-4 py-2 rounded-lg hover:bg-(--color-subtle) transition-colors duration-800"><DiDocker size={32} /></span>
                    <Tooltip id="TT-Docker" content="Docker Containerization" place="bottom" className="bg-(--color-overlay) text-(--color-text) px-2 py-1 rounded text-sm delay-400" />

                    <span data-tooltip-id="TT-RaspberryPi" className="shadow-lg bg-(--color-muted) px-4 py-2 rounded-lg hover:bg-(--color-subtle) transition-colors duration-800"><DiRasberryPi size={32} /></span>
                    <Tooltip id="TT-RaspberryPi" content="Raspberry Pi Single-board Computer" place="bottom" className="bg-(--color-overlay) text-(--color-text) px-2 py-1 rounded text-sm delay-400" />

                    <span data-tooltip-id="TT-GoogleSheets" className="shadow-lg bg-(--color-muted) px-4 py-2 rounded-lg hover:bg-(--color-subtle) transition-colors duration-800"><SiGooglesheets size={32} /></span>
                    <Tooltip id="TT-GoogleSheets" content="Google Sheets Spreadsheet Application" place="bottom" className="bg-(--color-overlay) text-(--color-text) px-2 py-1 rounded text-sm delay-400" />
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