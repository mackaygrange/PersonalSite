import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

export function Footer()
{
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-(--color-base) border-t-2 border-(--color-overlay) mt-16">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand / About Section */}
          <div>
            <h3 className="text-lg font-bold text-(--color-text) mb-3">Mackay Grange</h3>
            <p className="text-sm text-(--color-subtle) leading-relaxed">
              Software engineer passionate about systems programming, embedded development, and building reliable solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-(--color-text) mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-(--color-subtle) hover:text-(--color-gold) transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-(--color-subtle) hover:text-(--color-gold) transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/capstone" className="text-(--color-subtle) hover:text-(--color-gold) transition-colors">
                  Capstone
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-(--color-subtle) hover:text-(--color-gold) transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-bold text-(--color-text) mb-3">Connect</h3>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com/in/mackay-grange-751941235/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--color-subtle) hover:text-(--color-gold) transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="https://github.com/mackaygrange"
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--color-subtle) hover:text-(--color-gold) transition-colors"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="mailto:mackay.grange@gmail.com"
                className="text-(--color-subtle) hover:text-(--color-gold) transition-colors"
                aria-label="Email"
              >
                <FaEnvelope size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-(--color-overlay) my-8"></div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-(--color-subtle)">
          <p>&copy; {currentYear} Mackay Grange. All rights reserved.</p>
          <p>Crafted with React, TypeScript, and TailwindCSS</p>
        </div>
      </div>
    </footer>
  );
}
