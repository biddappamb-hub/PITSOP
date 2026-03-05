import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/drivers', label: 'Drivers' },
    { path: '/teams', label: 'Teams' },
    { path: '/calendar', label: 'Calendar' },
    { path: '/standings', label: 'Standings' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-dark-charcoal border-b border-medium-grey">
      <nav className="max-w-[100rem] mx-auto px-8 md:px-16 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <motion.div 
              className="font-heading text-2xl md:text-3xl font-black text-white cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              F1<span className="text-accent-red">HUB</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}>
                <motion.div
                  className={`font-paragraph text-base font-medium cursor-pointer transition-colors duration-300 relative ${
                    isActive(link.path) ? 'text-accent-red' : 'text-light-grey hover:text-white'
                  }`}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-accent-red"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-4 pt-6 pb-4">
                {navLinks.map((link) => (
                  <Link key={link.path} to={link.path} onClick={() => setIsMenuOpen(false)}>
                    <div
                      className={`font-paragraph text-base font-medium py-2 px-4 rounded transition-colors duration-300 ${
                        isActive(link.path)
                          ? 'text-accent-red bg-accent-red bg-opacity-10'
                          : 'text-light-grey hover:text-white hover:bg-medium-grey'
                      }`}
                    >
                      {link.label}
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
