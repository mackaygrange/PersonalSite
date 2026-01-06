import React from 'react';
import { Tooltip } from 'react-tooltip';
import { FaLinkedin, FaGithub, FaEnvelope, FaLightbulb, FaFileAlt } from 'react-icons/fa';

export function Contact()
{
  return (
    <section id="contact" className="pb-16">
      <h1 className="text-5xl font-bold mb-4 text-(--color-text)">Contact</h1>
      <h2 className="text-3xl font-semibold mb-4 text-(--color-text)" style={{ textShadow: '0 0 16px rgba(235, 111, 146, 0.8)' }}>
        Currently Seeking Employment Opportunities!
      </h2>
      <div className="border-b-4 border-double border-(--color-overlay) mb-4 max-w-2xl"> </div>

      {/* Contact Card */}
      <div className="my-4 relative rounded-2xl w-full border border-(--color-overlay)/60 bg-(--color-muted)/40 shadow-xl overflow-hidden backdrop-blur max-w-2xl">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-linear-to-r from-(--color-rose) via-(--color-foam) to-(--color-pine)/80" />
        <div className="p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-(--color-text) mb-6">Get In Touch</h2>
          <p className="text-(--color-text) mb-8">
            I'm actively looking for engineering opportunities. Feel free to reach out through any of the channels below—I'd love to hear from you!
          </p>

          {/* Contact Links */}
          <div className="space-y-4">
            {/* LinkedIn */}
            <div className="flex items-center gap-3 pb-4 border-b border-(--color-overlay)/30">
              <FaLinkedin className="text-3xl text-(--color-gold)" data-tooltip-id="TT-LinkedIn" />
              <div>
                <p className="text-sm text-(--color-subtle) font-semibold">LinkedIn</p>
                <a
                  href="https://linkedin.com/in/mackay-grange-751941235/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-(--color-gold) underline hover:text-(--color-rose) transition-colors"
                >
                  mackay-grange-751941235
                </a>
              </div>
              <Tooltip
                id="TT-LinkedIn"
                content="Visit LinkedIn profile"
                place="top"
                className="bg-(--color-overlay) text-(--color-text) px-2 py-1 rounded text-sm z-9999"
              />
            </div>

            {/* GitHub */}
            <div className="flex items-center gap-3 pb-4 border-b border-(--color-overlay)/30">
              <FaGithub className="text-3xl text-(--color-rose)" data-tooltip-id="TT-GitHub" />
              <div>
                <p className="text-sm text-(--color-subtle) font-semibold">GitHub</p>
                <a
                  href="https://github.com/mackaygrange"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-(--color-gold) underline hover:text-(--color-rose) transition-colors"
                >
                  mackaygrange
                </a>
              </div>
              <Tooltip
                id="TT-GitHub"
                content="Visit GitHub profile"
                place="top"
                className="bg-(--color-overlay) text-(--color-text) px-2 py-1 rounded text-sm z-9999"
              />
            </div>

            {/* Email */}
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-3xl text-(--color-pine)" data-tooltip-id="TT-Email-Contact" />
              <div>
                <p className="text-sm text-(--color-subtle) font-semibold">Email</p>
                <a
                  href="mailto:mackay.grange@gmail.com"
                  className="text-(--color-gold) underline hover:text-(--color-rose) transition-colors"
                >
                  mackay.grange@gmail.com
                </a>
              </div>
              <Tooltip
                id="TT-Email-Contact"
                content="Send an email"
                place="top"
                className="bg-(--color-overlay) text-(--color-text) px-2 py-1 rounded text-sm z-9999"
              />
            </div>
          </div>

          {/* Hint about header icons */}
          <div className="text-xs sm:text-sm text-(--color-subtle) p-3 sm:p-3 rounded mt-6 bg-(--color-base)/50">
            <span className="flex items-start gap-2">
              <FaLightbulb className="text-(--color-gold) mt-0.5 shrink-0" />
              <span>Pro tip: The contact icons in the header are also clickable links!</span>
            </span>
          </div>
        </div>
      </div>

      {/* Resume Card */}
      <div className="my-4 relative rounded-2xl w-full border border-(--color-overlay)/60 bg-(--color-muted)/40 shadow-xl overflow-hidden backdrop-blur max-w-2xl">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-linear-to-r from-(--color-rose) via-(--color-foam) to-(--color-pine)/80" />
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <FaFileAlt className="text-2xl text-(--color-iris)" />
            <h2 className="text-2xl font-semibold text-(--color-text)">Resume</h2>
          </div>
          <p className="text-(--color-text) mb-6">
            Download my resume to learn more about my education, experience, and technical qualifications.
          </p>
          <a
            href="/PersonalSite/MackayGrange_Resume.pdf"
            download="MackayGrange_Resume.pdf"
            className="inline-block px-6 py-3 bg-(--color-iris)/80 hover:bg-(--color-iris) text-white font-semibold rounded-lg transition-all duration-400 hover:scale-98 active:scale-95"
          >
            Download Resume (PDF)
          </a>
        </div>
      </div>
    </section>
  );
}