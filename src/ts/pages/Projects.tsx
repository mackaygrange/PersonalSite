import React from 'react';
import { ContentCard } from '../components/ContentCard';
import { DESEncryptionCard, DESDecryptionCard } from '../components/DESEncryptionDemo';

export function Projects()
{
    return (

        <section id="projects" className="pb-16">
            <h2 className="text-3xl font-bold mb-6">Projects</h2>
            <div className="flex flex-wrap gap-6">
            {/* Project Card Example */}
            <div className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0">
                <ContentCard title="Personal Website" eyebrow="Live">
                    <p className="mb-6">You're looking at it!</p>
                    <div className="flex flex-wrap gap-2">
                        <span className="font-semibold border-2 border-(--color-base)/50 shadow-sm text-(--color-text) text-xs bg-(--color-pine)/50 px-3 py-1 rounded-full hover:bg-(--color-pine)/80 duration-800">React</span>
                        <span className="font-semibold border-2 border-(--color-base)/50 shadow-sm text-(--color-text) text-xs bg-(--color-love)/50 px-3 py-1 rounded-full hover:bg-(--color-love)/80 duration-800">TypeScript</span>
                        <span className="font-semibold border-2 border-(--color-base)/50 shadow-sm text-(--color-text) text-xs bg-(--color-rose)/50 px-3 py-1 rounded-full hover:bg-(--color-rose)/80 duration-800">TailwindCSS</span>
                        <span className="font-semibold border-2 border-(--color-base)/50 shadow-sm text-(--color-text) text-xs bg-(--color-iris)/50 px-3 py-1 rounded-full hover:bg-(--color-iris)/80 duration-800">Node</span>
                        <span className="font-semibold border-2 border-(--color-base)/50 shadow-sm text-(--color-text) text-xs bg-(--color-foam)/50 px-3 py-1 rounded-full hover:bg-(--color-foam)/80 duration-800">Vite</span>
                    </div>
                </ContentCard>
            </div>

            {/* DES Demo Parent Card */}
            <div className="w-full shrink-0">
                <ContentCard title="DES Encryption Demo" eyebrow="WebAssembly">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <DESEncryptionCard />
                        <DESDecryptionCard />
                    </div>
                    <div className="flex flex-wrap gap-2 pt-6">
                        <span className="font-semibold border-2 border-(--color-base)/50 shadow-sm text-(--color-text) text-xs bg-(--color-pine)/50 px-3 py-1 rounded-full hover:bg-(--color-pine)/80 duration-800">React</span>
                        <span className="font-semibold border-2 border-(--color-base)/50 shadow-sm text-(--color-text) text-xs bg-(--color-love)/50 px-3 py-1 rounded-full hover:bg-(--color-love)/80 duration-800">TypeScript</span>
                        <span className="font-semibold border-2 border-(--color-base)/50 shadow-sm text-(--color-text) text-xs bg-(--color-rose)/50 px-3 py-1 rounded-full hover:bg-(--color-rose)/80 duration-800">TailwindCSS</span>
                        <span className="font-semibold border-2 border-(--color-base)/50 shadow-sm text-(--color-text) text-xs bg-(--color-iris)/50 px-3 py-1 rounded-full hover:bg-(--color-iris)/80 duration-800">Node</span>
                        <span className="font-semibold border-2 border-(--color-base)/50 shadow-sm text-(--color-text) text-xs bg-(--color-foam)/50 px-3 py-1 rounded-full hover:bg-(--color-foam)/80 duration-800">Vite</span>

                        <span className="font-semibold border-2 border-(--color-base)/50 shadow-sm text-(--color-text) text-xs bg-(--color-gold)/50 px-3 py-1 rounded-full hover:bg-(--color-gold)/80 duration-800">C++</span>
                        <span className="font-semibold border-2 border-(--color-base)/50 shadow-sm text-(--color-text) text-xs bg-(--color-base)/50 px-3 py-1 rounded-full hover:bg-(--color-base)/80 duration-800">Wasm</span>
                    </div>
                </ContentCard>
            </div>
            </div>
        </section>

    )
}