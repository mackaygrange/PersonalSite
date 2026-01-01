import React from 'react';

export function Projects()
{
    return (

        <section id="projects" className="pb-16">
            <h2 className="text-3xl font-bold mb-6">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Project Card Example */}
            <div className="mx-auto shadow-lg bg-(--color-muted)/50 rounded-lg p-6 border-2 border-(--color-border) hover:bg-(--color-subtle)/50 transition-colors duration-800">
                <h3 className="text-xl font-semibold mb-2">Personal Website</h3>
                <p className="text-(--color-text) mb-4">You're looking at it! </p>
                <div className="flex gap-2">
                <span className="font-semibold border-2 border-(--color-base)/50 shadow-sm text-(--color-text) text-xs bg-(--color-pine)/50 px-3 py-1 rounded-full hover:bg-(--color-pine)/80 duration-800">React</span>
                <span className="font-semibold border-2 border-(--color-base)/50 shadow-sm text-(--color-text) text-xs bg-(--color-love)/50 px-3 py-1 rounded-full hover:bg-(--color-love)/80 duration-800">TypeScript</span>
                <span className="font-semibold border-2 border-(--color-base)/50 shadow-sm text-(--color-text) text-xs bg-(--color-rose)/50 px-3 py-1 rounded-full hover:bg-(--color-rose)/80 duration-800">TailwindCSS</span>
                <span className="font-semibold border-2 border-(--color-base)/50 shadow-sm text-(--color-text) text-xs bg-(--color-iris)/50 px-3 py-1 rounded-full hover:bg-(--color-iris)/80 duration-800">Node</span>
                <span className="font-semibold border-2 border-(--color-base)/50 shadow-sm text-(--color-text) text-xs bg-(--color-foam)/50 px-3 py-1 rounded-full hover:bg-(--color-foam)/80 duration-800">Vite</span>
                </div>
            </div>
            </div>
        </section>

    )
}