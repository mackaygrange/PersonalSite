import React from 'react';
import { ContentCard } from '../components/ContentCard';
import diorSticker from '../../assets/images/dior-sticker.png';
import juniSticker from '../../assets/images/juni-sticker.png';
import restoredPlaneSticker from '../../assets/images/restored-plane-sticker.png';

export function About()
{
  return (
    <>
      <img
        src={diorSticker}
        alt="Dior sticker decoration"
        className="fixed top-32 md:top-32 right-2 md:right-0 w-16 md:w-64 h-auto z-10 pointer-events-none"
      />

      <section id="about" className="pb-16">
      <h1 className="text-5xl font-bold mb-4 text-(--color-text)">About Me</h1>
      <h2 className="text-3xl font-semibold mb-4 text-(--color-subtle)">Avid Creator and Collector</h2>
      <div className="border-b-4 border-double border-(--color-overlay) mb-4 max-w-2xl"> </div>
      <p className="text-lg text-(--color-text) max-w-2xl mb-2">
                Hello! I'm Mackay Grange, a passionate software developer and technology enthusiast. I love creating innovative solutions and exploring new technologies.
                When I'm not coding, you can find me picking up new hobbies with reckless abandon. It's hard to find time for all of them, but luckily I tend to cycle between them every few months.
      </p>
      <div className="flex flex-wrap min-w-xs max-w-2xl">
        <ContentCard eyebrow="Woodworking" >
          <img
            src={restoredPlaneSticker}
            alt="Restored plane sticker decoration"
            className="w-64 pointer-events-none"
          />
          <p className="text-(--color-text) max-w-2xl mb-2">
                        Under Construction!
          </p>
        </ContentCard>

        <ContentCard eyebrow="Hobby Electronics">
          <p className="text-(--color-text) max-w-2xl mb-2">
                        Under Construction!
          </p>
        </ContentCard>

        <ContentCard eyebrow="N Scale DCC Model Railroading">
          <p className="text-(--color-text) max-w-2xl mb-2">
                        Under Construction!
          </p>
        </ContentCard>

        <ContentCard eyebrow="Traveling and Enjoying Nature">
          <p className="text-(--color-text) max-w-2xl mb-2">
                        Under Construction!
          </p>
        </ContentCard>

        <ContentCard eyebrow="Magic the Gathering">
          <p className="text-(--color-text) max-w-2xl mb-2">
                        Under Construction!
          </p>
        </ContentCard>

        <ContentCard eyebrow="Hobbyist Math and Physics">
          <p className="text-(--color-text) max-w-2xl mb-2">
                        Under Construction!
          </p>
        </ContentCard>

        <ContentCard eyebrow="Cats!">
          <img
            src={juniSticker}
            alt="Juni sticker decoration"
            className="w-64 pointer-events-none"
          />
          <p className="text-(--color-text) max-w-2xl mb-2">
                        Under Construction!
          </p>
        </ContentCard>

        <ContentCard eyebrow="Wild Mushroom Foraging">
          <p className="text-(--color-text) max-w-2xl mb-2">
                        Under Construction!
          </p>
        </ContentCard>
      </div>
    </section>
    </>
  )
}