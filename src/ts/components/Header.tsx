import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaEnvelope, FaFileAlt } from 'react-icons/fa';

export function Header()
{
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="drop-shadow-lg bg-(--color-base) border-(--color-rose) border-b-2">

      {/* Navigation Bar */}
      <nav className="container mx-auto px-4 py-8">

        {/* Container for Navbar Groups */}
        <div className="flex items-center justify-between">

          {/* Left Group: Logo and Social Icons */}
          <div className="flex items-center justify-between gap-4">

            {/* Logo/Name */}
            <Link to="/" className="px-2 text-2xl font-bold text-(--color-text)">Mackay Grange</Link>

            {/* Vertical Divider */}
            <div className="h-6 border-r-2 px-0 py-0 border-(--color-overlay)" aria-hidden="true"></div>

            {/* Social icons */}
            <div className="flex items-center gap-4 text-(--color-text)">

              {/* LinkedIn Icon + Link */}
              <a
                data-tooltip-id='TT-Linkedin'
                href="https://linkedin.com/in/mackay-grange-751941235/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-(--color-highlight-med) transition-colors duration-300"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin size={24} />
              </a>
              <Tooltip
                id="TT-Linkedin"
                content="Visit my LinkedIn Profile!"
                place="bottom"
                className="bg-(--color-overlay) text-(--color-text) px-2 py-1 rounded text-sm delay-400"
              />

              {/* Github Icon + Link */}
              <a
                data-tooltip-id='TT-GithubLink'
                href="https://github.com/mackaygrange"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-(--color-highlight-med) transition-colors duration-300"
                aria-label="GitHub Profile"
              >
                <FaGithub size={24} />
              </a>
              <Tooltip
                id="TT-GithubLink"
                content="Visit my GitHub Profile!"
                place="bottom"
                className="bg-(--color-overlay) text-(--color-text) px-2 py-1 rounded text-sm delay-400"
              />

              {/* Email Icon + Link */}
              <a
                data-tooltip-id='TT-Email'
                href="mailto:mackay.grange@gmail.com"
                className="p-2 rounded-lg hover:bg-(--color-highlight-med) transition-colors duration-300"
                aria-label="Send Email"
              >
                <FaEnvelope size={24} />
              </a>
              <Tooltip
                id="TT-Email"
                content="Send me an Email!"
                place="bottom"
                className="bg-(--color-overlay) text-(--color-text) px-2 py-1 rounded text-sm delay-400"
              />

              {/* Resume Icon + Link */}
              <a
                data-tooltip-id='TT-Resume'
                href="public/MackayGrange_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-(--color-highlight-med) transition-colors duration-300"
                aria-label="View Resume PDF"
              >
                <FaFileAlt size={24} />
              </a>

              <Tooltip
                id="TT-Resume"
                content="View my Resume (PDF)!"
                place="bottom"
                className="bg-(--color-overlay) text-(--color-text) px-2 py-1 rounded text-sm delay-400"
              />
            </div>
          </div>

          {/* Right Group: Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {/* Link to Home Page */}
            <Link to="/" className="rounded-lg p-2 bg-(--color-base) hover:bg-(--color-highlight-med) text-white transition-colors duration-800">
              Home
            </Link>

            {/* Link to About Page */}
            <Link to="/about" className="rounded-lg p-2 bg-(--color-base) hover:bg-(--color-highlight-med) text-white transition-colors duration-800">
              About
            </Link>

            {/* Link to Projects Page */}
            <Link to="/projects" className="rounded-lg p-2 bg-(--color-base) hover:bg-(--color-highlight-med) text-white transition-colors duration-800">
              Projects
            </Link>

            {/* Link to Gallery Page */}
            <Link to="/gallery" className="rounded-lg p-2 bg-(--color-base) hover:bg-(--color-highlight-med) text-white transition-colors duration-800">
              Gallery
            </Link>

            {/* Link to Contact Page */}
            <Link to="/contact" className="rounded-lg p-2 bg-(--color-base) hover:bg-(--color-highlight-med) text-white transition-colors duration-800">
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-(--color-text) px-4 py-1 hover:text-white duration-800 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="text-center md:hidden mt-4 space-y-2 pb-2">

            {/* Mobile About Link */}
            <Link
              to="/"
              className="block rounded-lg py-1 bg-(--color-base) text-(--color-text) hover:text-white hover:bg-(--color-highlight-med) transition-colors duration-800"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>

            {/* Mobile Projects Link */}
            <Link
              to="/projects"
              className="block rounded-lg py-1 bg-(--color-base) text-(--color-text) hover:text-white hover:bg-(--color-highlight-med) transition-colors duration-800"
              onClick={() => setIsMenuOpen(false)}

            >
              Projects
            </Link>

            {/* Mobile Skills Link */}
            <Link
              to="/gallery"
              className="block rounded-lg py-1 bg-(--color-base) text-(--color-text) hover:text-white hover:bg-(--color-highlight-med) transition-colors duration-800"
              onClick={() => setIsMenuOpen(false)}

            >
              Gallery
            </Link>

            {/* Mobile Contact Link */}
            <Link
              to="/contact"
              className="block rounded-lg py-1 bg-(--color-base) text-(--color-text) hover:text-white hover:bg-(--color-highlight-med) transition-colors duration-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
