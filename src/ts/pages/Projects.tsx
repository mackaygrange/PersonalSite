import React from 'react';
import { ContentCard } from '../components/ContentCard';
import { DESEncryptionCard, DESDecryptionCard } from '../components/DESEncryptionDemo';
import { RSAKeyGenerationCard, RSAEncryptionCard, RSADecryptionCard } from '../components/RSAEncryptionDemo';
import { EmulatorDemo } from '../components/EmulatorDemo';
import { TechTag } from '../components/TechTag';
import { RepositoryLink } from '../components/RepositoryLink';

export function Projects()
{
  return (
    <section id="projects" className="pb-16">
      <h1 className="text-5xl font-bold mb-4 text-(--color-text)">Projects</h1>
      <h2 className="text-3xl font-semibold mb-4 text-(--color-subtle)">Showcasing Design & Implementation</h2>
      <div className="border-b-4 border-double border-(--color-overlay) mb-4 max-w-2xl"> </div>
      <p className="text-lg text-(--color-text) max-w-2xl mb-2">
        Below you'll find a selection of projects demonstrating my expertise in systems programming, cryptography, and full-stack web development. 
        From interactive WebAssembly encryption demos to this portfolio site itself, each project reflects my commitment to clean code, 
        performance, and user experience. Feel free to explore the source code and see how these applications are built.
      </p>
      <div className="flex flex-wrap gap-6">
        {/* Left Column - Larger Cards (2x width) */}
        <div className="flex flex-col gap-6 flex-2 min-w-xs">

          {/* CS4380 Emulator/Assembler Demo */}
          <div>
            <ContentCard
              title="Custom Chipset CPU Emulator and Assembler"
              eyebrow="WebAssembly"
              actions={<RepositoryLink url="https://github.com/mackaygrange/cs4380-emulator-assembler" label="View Source Code" />}
            >
              <p className="mb-6 text-(--color-text)">
                A custom CPU emulator with fetch-decode-execute architecture, featuring a complete instruction set, 
                register file, memory management, and caching. The emulator runs assembled binaries from a custom 
                assembler, demonstrating low-level systems programming concepts in the browser.
              </p>
              <EmulatorDemo />
              <div className="flex flex-wrap gap-2 pt-6 justify-center">
                <TechTag name="C++" />
                <TechTag name="Wasm" />
                <TechTag name="React" />
                <TechTag name="TypeScript" />
                <TechTag name="Python" />
              </div>
            </ContentCard>
          </div>

          {/* DES Demo Parent Card */}
          <div>
            <ContentCard
              title="DES Encryption Demo"
              eyebrow="WebAssembly"
              actions={<RepositoryLink url="https://github.com/mackaygrange/DES_Encryption_Project" label="View Source Code" />}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden">
                <DESEncryptionCard />
                <DESDecryptionCard />
              </div>
              <div className="flex flex-wrap gap-2 pt-6 justify-center">
                <TechTag name="React" />
                <TechTag name="TypeScript" />
                <TechTag name="C++" />
                <TechTag name="Wasm" />
              </div>
            </ContentCard>
          </div>

          {/* RSA Demo Parent Card */}
          <div>
            <ContentCard
              title="RSA Encryption Demo"
              eyebrow="WebAssembly"
              actions={<RepositoryLink url="https://github.com/mackaygrange/RSA_Encryption_Project" label="View Source Code" />}
            >
              <div className="grid grid-cols-1 gap-6 mb-6 overflow-hidden">
                <RSAKeyGenerationCard />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden">
                <RSAEncryptionCard />
                <RSADecryptionCard />
              </div>

              <div className="flex flex-wrap gap-2 pt-6 justify-center">
                <TechTag name="React" />
                <TechTag name="TypeScript" />
                <TechTag name="C++" />
                <TechTag name="Wasm" />
              </div>
            </ContentCard>
          </div>


        </div>

        {/* Right Column - Smaller Cards */}
        <div className="flex flex-col gap-6 flex-1 min-w-xs">
          <div>
            <ContentCard
              title="Personal Website"
              eyebrow="Live"
              actions={<RepositoryLink url="https://github.com/mackaygrange/PersonalSite" label="View Source Code" />}
            >
              <p className="mb-6">You're looking at it!</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <TechTag name="React" />
                <TechTag name="TypeScript" />
                <TechTag name="TailwindCSS" />
                <TechTag name="Node" />
                <TechTag name="Vite" />
              </div>
            </ContentCard>
          </div>

          <div>
            <ContentCard
              title="Linux Dotfiles"
              eyebrow="Configuration"
              actions={<RepositoryLink url="https://github.com/mackaygrange/dotfiles" label="View Repository" />}
            >
              <p className="mb-6">My personal Linux configuration files including Neovim setup, shell configurations, and window manager settings. A reflection of my development environment and workflow preferences.</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <TechTag name="Linux" />
                <TechTag name="Neovim" />
                <TechTag name="Bash" />
                <TechTag name="Git" />
              </div>
            </ContentCard>
          </div>

          <div>
            <ContentCard title="More Projects!" eyebrow="Coming Soon">
              <p className="mb-6"> I am constantly working on new and exciting projects. In addition, I have many c/c++ projects that are in the process of being adapted to be being web assembly friendly. Stay tuned for updates!</p>
              <div className="flex flex-wrap gap-2">

              </div>
            </ContentCard>
          </div>
        </div>
      </div>
    </section>
  )
}