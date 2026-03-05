import { Github, Twitter, Facebook, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-medium-grey border-t border-light-grey border-opacity-10">
      <div className="max-w-[100rem] mx-auto px-8 md:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Brand Section */}
          <div>
            <div className="font-heading text-2xl font-black text-white mb-4">
              PIT<span className="text-accent-red">STOP</span>
            </div>
            <p className="font-paragraph text-sm text-light-grey leading-relaxed">
              Your ultimate destination for Formula 1 data, statistics, and insights. Experience the thrill of racing from the comfort of your screen.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-bold text-white mb-4">Quick Links</h3>
            <div className="flex flex-col gap-3">
              {[
                { path: '/drivers', label: 'Drivers' },
                { path: '/teams', label: 'Teams' },
                { path: '/calendar', label: 'Race Calendar' },
                { path: '/standings', label: 'Standings' }
              ].map((link) => (
                <Link key={link.path} to={link.path}>
                  <div className="font-paragraph text-sm text-light-grey hover:text-accent-red transition-colors duration-300 cursor-pointer">
                    {link.label}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-heading text-lg font-bold text-white mb-4">Connect With Us</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-dark-charcoal p-3 rounded hover:bg-accent-red transition-colors duration-300 group"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 text-light-grey group-hover:text-white" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-dark-charcoal p-3 rounded hover:bg-accent-red transition-colors duration-300 group"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-light-grey group-hover:text-white" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-dark-charcoal p-3 rounded hover:bg-accent-red transition-colors duration-300 group"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-light-grey group-hover:text-white" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-dark-charcoal p-3 rounded hover:bg-accent-red transition-colors duration-300 group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-light-grey group-hover:text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-light-grey border-opacity-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-sm text-light-grey">
              © {currentYear} PITSTOP. All rights reserved.
            </p>
            <p className="font-paragraph text-sm text-light-grey">
              Built with passion for Formula 1 racing.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
