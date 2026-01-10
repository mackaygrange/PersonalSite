import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { FaLightbulb } from 'react-icons/fa';
import { SiC, SiCplusplus, SiGnubash, SiGooglesheets, SiTypescript, SiLua, SiBlender, SiGimp, SiFigma, SiArduino, SiLatex, SiCmake, SiMake, SiRos, SiLucid, SiUml, SiEspressif, SiArchlinux, SiUbuntu, SiHyprland, SiSqlite  } from 'react-icons/si';
import { DiRasberryPi, DiJsBadge, DiNodejs, DiNpm, DiPython, DiReact, DiMysql, DiLinux, DiHtml5, DiGit, DiGithubBadge, DiDocker, DiCss3 } from "react-icons/di";
import { IconWithTooltip } from '../components/IconWithTooltip';

import profilePic  from '../../assets/images/PFP.jpg';
import { Link } from 'react-router-dom';

export function Home()
{
  const [expandedDiploma, setExpandedDiploma] = useState<string | null>(null);

  return (
    <section id="home">
      {/* Main Content: About Section with Profile Pic on Right */}
      <div className="flex flex-col md:flex-row gap-8 mb-16 items-start md:items-center">
        {/* Left Column: Text Content */}
        <div className="flex-1">
          {/* About Section */}
          <section id="about" className="">
            <h1 className="text-5xl font-bold mb-4">Software Engineer</h1>
            <h2 className="text-3xl font-semibold mb-4 text-(--color-subtle)">Mackay Grange | B.S. Software Engineering</h2>
            <div className="border-b-4 border-double border-(--color-overlay) mb-4 max-w-2xl"> </div>
            <p className="text-lg text-(--color-text) max-w-2xl pb-0">
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
                className="rounded-lg px-4 py-2 bg-(--color-muted) hover:bg-(--color-subtle) text-white transition-all duration-400 hover:scale-98 active:scale-95"
              >
                 More about me...
              </Link>
            </div>
          </section>
        </div>

        {/* Right Column: Profile Picture - Centered above Programming Languages */}
        <div className="flex flex-1 justify-center md:justify-center" data-tooltip-id="TT-ProfilePic">
          <img
            src={profilePic}
            alt="Me and my Beautiful Wife"
            className="w-96 h-96 rounded-full border-8 border-(--color-highlight-med) object-cover shadow-lg"
          />
        </div>
        <Tooltip
          id="TT-ProfilePic"
          content="Me and my beautiful wife Nadia"
          place="bottom"
          className="bg-(--color-overlay) text-(--color-text) px-2 py-1 rounded text-sm delay-400"
        />
      </div>

      {/* Two-Column Section: Education (Left) and Programming Languages (Right) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Left Column: Education */}
        <section id="eDiplomas">
          <div className="relative rounded-2xl w-full border border-(--color-overlay)/60 bg-(--color-muted)/40 shadow-xl overflow-hidden backdrop-blur">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-linear-to-r from-(--color-rose) via-(--color-foam) to-(--color-pine)/80" />
            <div className="p-6 md:p-8">
              <h2 className="text-3xl font-bold text-(--color-text) mb-6">Education</h2>
              <div className="space-y-4">
                {/* Bachelor of Science Subcard */}
                <div className="relative rounded-lg border border-(--color-overlay)/40 bg-(--color-base)/50 overflow-hidden">
                  <div className="p-4">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-(--color-text)">Bachelor of Science</h3>
                      <p className="text-sm text-(--color-subtle)">Software Engineering</p>
                      <p className="text-sm text-(--color-subtle) mt-1">Utah Valley University | 2025</p>
                    </div>
                    <button
                      onClick={() => setExpandedDiploma(expandedDiploma === 'ba' ? null : 'ba')}
                      className="w-full px-4 py-2 bg-(--color-pine) hover:bg-(--color-pine)/80 text-(--color-text) rounded-lg transition-colors duration-300 font-semibold text-sm"
                    >
                      {expandedDiploma === 'ba' ? 'Hide Diploma' : 'View Diploma'}
                    </button>
                  </div>
                  {expandedDiploma === 'ba' && (
                    <div className="mt-4 border-t border-(--color-overlay)/40">
                      <iframe
                        src="/MackayGrange_BA_eDiploma.pdf#toolbar=0&navpanes=0&scrollbar=1&messages=0&page=2&view=fitV"
                        className="w-full h-64 md:sm:h-80"
                        title="Bachelor of Science in Software Engineering eDiploma"
                      />
                    </div>
                  )}
                </div>

                {/* Programmer Certificate Subcard */}
                <div className="relative rounded-lg border border-(--color-overlay)/40 bg-(--color-base)/50 overflow-hidden">
                  <div className="p-4">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-(--color-text)">Programmer Certificate</h3>
                      <p className="text-sm text-(--color-subtle) mt-1">Utah Valley University | 2025</p>
                    </div>
                    <button
                      onClick={() => setExpandedDiploma(expandedDiploma === 'pc' ? null : 'pc')}
                      className="w-full px-4 py-2 bg-(--color-pine) hover:bg-(--color-pine)/80 text-(--color-text) rounded-lg transition-colors duration-300 font-semibold text-sm"
                    >
                      {expandedDiploma === 'pc' ? 'Hide Diploma' : 'View Diploma'}
                    </button>
                  </div>
                  {expandedDiploma === 'pc' && (
                    <div className="mt-4 border-t border-(--color-overlay)/40">
                      <iframe
                        src="/MackayGrange_PC_eDiploma.pdf#toolbar=0&navpanes=0&scrollbar=0&messages=0&page=2&zoom=fit"
                        className="w-full h-64"
                        title="Programmer Certificate eDiploma"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Hint about verification */}
              <div className="text-xs sm:text-sm text-(--color-subtle) p-3 rounded mt-6 bg-(--color-base)/50">
                <span className="flex items-start gap-2">
                  <FaLightbulb className="text-(--color-gold) mt-0.5 shrink-0" />
                  <span>These eDiplomas include built-in one-click verification through UVU's secure validation system.</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Right Column: Programming Languages */}
        <section id="programming-languages">
          <div className="relative rounded-2xl w-full border border-(--color-overlay)/60 bg-(--color-muted)/40 shadow-xl overflow-hidden backdrop-blur h-full">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-linear-to-r from-(--color-rose) via-(--color-foam) to-(--color-pine)/80" />
            <div className="p-6 md:p-8 flex flex-col h-full">
              <div>
                <h2 className="text-3xl font-bold text-(--color-text) mb-6">Programming Languages</h2>
                <div className="text-xs sm:text-sm text-(--color-subtle) p-2 sm:p-3 rounded mb-4 bg-(--color-base)/50">
                  <span className="flex items-start gap-2">
                    <FaLightbulb className="text-(--color-gold) mt-0.5 shrink-0" />
                    <span>Hover or tap an icon if you do not recognize it to see what it represents.</span>
                  </span>
                </div>
                <div className="flex flex-wrap gap-4">
                  <IconWithTooltip id="TT-C" icon={SiC} tooltipText="C Programming Language" />
                  <IconWithTooltip id="TT-CPP" icon={SiCplusplus} tooltipText="C++ Programming Language" />
                  <IconWithTooltip id="TT-Python" icon={DiPython} tooltipText="Python Programming Language" />
                  <IconWithTooltip id="TT-Lua" icon={SiLua} tooltipText="Lua Programming Language" />
                  <IconWithTooltip id="TT-JS" icon={DiJsBadge} tooltipText="JavaScript Programming Language" />
                  <IconWithTooltip id="TT-TS" icon={SiTypescript} tooltipText="TypeScript Programming Language" />
                </div>
              </div>
              <div className="mt-auto pt-6">
                <p className="text-(--color-subtle) text-lg md:text-base border-l-4 border-(--color-pine) pl-4 italic">
                  My primary languages are C, C++, and TypeScript, which I use across systems programming, 
                  embedded development, and web applications. I'm also proficient in Python for scripting 
                  and automation, and have experience with Lua for tool configurations.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Skills Section - Full Width with Unified Card containing Subcards */}
      <section id="skills" className="pb-16">
        <div className="relative rounded-2xl w-full border border-(--color-overlay)/60 bg-(--color-muted)/40 shadow-xl overflow-hidden backdrop-blur">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-linear-to-r from-(--color-rose) via-(--color-foam) to-(--color-pine)/80" />
          <div className="p-6 md:p-8">
            <h2 className="text-3xl font-bold text-(--color-text) mb-6">Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tools & DevOps Subcard */}
              <div className="relative rounded-lg border border-(--color-overlay)/40 bg-(--color-base)/50 overflow-hidden p-4">
                <p className="text-lg font-semibold text-(--color-gold) mb-4 indent-0">Tools & DevOps</p>
                <div className="flex flex-wrap gap-4">
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
              </div>

              {/* Embedded & IoT Subcard */}
              <div className="relative rounded-lg border border-(--color-overlay)/40 bg-(--color-base)/50 overflow-hidden p-4">
                <p className="text-lg font-semibold text-(--color-love) mb-4 indent-0">Embedded & IoT</p>
                <div className="flex flex-wrap gap-4">
                  <IconWithTooltip id="TT-RaspberryPi" icon={DiRasberryPi} tooltipText="Raspberry Pi Single-board Computer" bgColor="bg-(--color-love)/50" />
                  <IconWithTooltip id="TT-Arduino" icon={SiArduino} tooltipText="Arduino Microcontroller Platform" bgColor="bg-(--color-love)/50" />
                  <IconWithTooltip id="TT-Espressif" icon={SiEspressif} tooltipText="Espressif Systems IoT Platform" bgColor="bg-(--color-love)/50" />
                  <IconWithTooltip id="TT-ROS" icon={SiRos} tooltipText="Robot Operating System (ROS/ROS2)" bgColor="bg-(--color-love)/50" />
                </div>
              </div>

              {/* Web Development Subcard */}
              <div className="relative rounded-lg border border-(--color-overlay)/40 bg-(--color-base)/50 overflow-hidden p-4">
                <p className="text-lg font-semibold text-(--color-pine) mb-4 indent-0">Web Development</p>
                <div className="flex flex-wrap gap-4">
                  <IconWithTooltip id="TT-React" icon={DiReact} tooltipText="React Framework" bgColor="bg-(--color-pine)/50" />
                  <IconWithTooltip id="TT-Nodejs" icon={DiNodejs} tooltipText="Node.js Runtime Environment" bgColor="bg-(--color-pine)/50" />
                  <IconWithTooltip id="TT-Npm" icon={DiNpm} tooltipText="Node Package Manager" bgColor="bg-(--color-pine)/50" />
                  <IconWithTooltip id="TT-HTML5" icon={DiHtml5} tooltipText="HTML5 Markup Language" bgColor="bg-(--color-pine)/50" />
                  <IconWithTooltip id="TT-CSS3" icon={DiCss3} tooltipText="CSS3 Styling Language" bgColor="bg-(--color-pine)/50" />
                </div>
              </div>

              {/* Design & Documentation Subcard */}
              <div className="relative rounded-lg border border-(--color-overlay)/40 bg-(--color-base)/50 overflow-hidden p-4">
                <p className="text-lg font-semibold text-(--color-iris) mb-4 indent-0">Design & Documentation</p>
                <div className="flex flex-wrap gap-4">
                  <IconWithTooltip id="TT-UML" icon={SiUml} tooltipText="Unified Modeling Language (UML)" bgColor="bg-(--color-iris)/50" />
                  <IconWithTooltip id="TT-Lucid" icon={SiLucid} tooltipText="Lucidchart Diagramming Tool" bgColor="bg-(--color-iris)/50" />
                  <IconWithTooltip id="TT-Figma" icon={SiFigma} tooltipText="Figma Design Tool" bgColor="bg-(--color-iris)/50" />
                  <IconWithTooltip id="TT-LaTeX" icon={SiLatex} tooltipText="LaTeX Document Preparation System" bgColor="bg-(--color-iris)/50" />
                  <IconWithTooltip id="TT-GoogleSheets" icon={SiGooglesheets} tooltipText="Google Sheets Spreadsheet Application" bgColor="bg-(--color-iris)/50" />
                  <IconWithTooltip id="TT-Blender" icon={SiBlender} tooltipText="Blender 3D Modeling Software" bgColor="bg-(--color-iris)/50" />
                  <IconWithTooltip id="TT-Gimp" icon={SiGimp} tooltipText="GIMP Image Editor" bgColor="bg-(--color-iris)/50" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}