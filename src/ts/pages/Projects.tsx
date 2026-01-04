import React from 'react';
import { ContentCard } from '../components/ContentCard';
import { DESEncryptionCard, DESDecryptionCard } from '../components/DESEncryptionDemo';
import { RSAKeyGenerationCard, RSAEncryptionCard, RSADecryptionCard } from '../components/RSAEncryptionDemo';

export function Projects()
{
    return (

        <section id="projects" className="pb-16">
            <h2 className="text-3xl font-bold mb-6">Projects</h2>
            <div className="flex flex-wrap gap-6">
                {/* Left Column - Larger Cards (2x width) */}
                <div className="flex flex-col gap-6 flex-[2] min-w-xs">
                    {/* DES Demo Parent Card */}
                    <div>
                        <ContentCard title="DES Encryption Demo" eyebrow="WebAssembly">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden">
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

                    {/* RSA Demo Parent Card */}
                    <div>
                        <ContentCard title="RSA Encryption Demo" eyebrow="WebAssembly">
                            <div className="grid grid-cols-1 gap-6 mb-6 overflow-hidden">
                                <RSAKeyGenerationCard />
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden">
                                <RSAEncryptionCard />
                                <RSADecryptionCard />
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

                {/* Right Column - Smaller Cards */}
                <div className="flex flex-col gap-6 flex-1 min-w-xs">
                    <div>
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
                </div>
            </div>
        </section>
    )
}