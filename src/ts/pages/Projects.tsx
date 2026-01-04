import React from 'react';
import { ContentCard } from '../components/ContentCard';
import { DESEncryptionCard, DESDecryptionCard } from '../components/DESEncryptionDemo';
import { RSAKeyGenerationCard, RSAEncryptionCard, RSADecryptionCard } from '../components/RSAEncryptionDemo';
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
              <div className="flex flex-wrap gap-2 pt-6">
                <TechTag name="React" color="pine" />
                <TechTag name="TypeScript" color="love" />
                <TechTag name="TailwindCSS" color="rose" />
                <TechTag name="Node" color="iris" />
                <TechTag name="Vite" color="foam" />
                <TechTag name="C++" color="gold" />
                <TechTag name="Wasm" color="base" />
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

              <div className="flex flex-wrap gap-2 pt-6">
                <TechTag name="React" color="pine" />
                <TechTag name="TypeScript" color="love" />
                <TechTag name="TailwindCSS" color="rose" />
                <TechTag name="Node" color="iris" />
                <TechTag name="Vite" color="foam" />
                <TechTag name="C++" color="gold" />
                <TechTag name="Wasm" color="base" />
              </div>
            </ContentCard>
          </div>
        </div>

        {/* Right Column - Smaller Cards */}
        <div className="flex flex-col gap-6 flex-1 min-w-xs">
          <div>
            <ContentCard title="Personal Website" eyebrow="Live">
              <p className="mb-6">You're looking at it!</p>
              <div className="flex flex-wrap gap-2">
                <TechTag name="React" color="pine" />
                <TechTag name="TypeScript" color="love" />
                <TechTag name="TailwindCSS" color="rose" />
                <TechTag name="Node" color="iris" />
                <TechTag name="Vite" color="foam" />
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