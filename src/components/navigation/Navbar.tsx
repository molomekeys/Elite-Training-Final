import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };



  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className=" flex items-center justify-between h-16">
          <div className="flex items-center justify-start">
            <div className="flex-shrink-0">
              <span className="text-white font-semibold">Logo</span>
            </div>
            <div className="hidden md:block">
              <span className="text-white ml-10 font-semibold">Version Beta</span>
            </div>
          </div>
          <div className="flex items-center">
            <div className="mr-4 md:hidden ">
              <button               onClick={toggleMenu}
                type="button"
  
                className="inline-flex   items-center justify-center p-2 rounded-md text-gray-400 hover:text-white z-40 relative
                 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                
                {isOpen==true?<svg    
                  className={`${isOpen ? 'hidden' : 'block'} h-6 relative z-20 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg> :
                <svg  
                  className={`${isOpen ? 'block' : 'hidden'} h-6 w-6 z-20 text-blue-500 relative`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>}
              </button>
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  ref={navRef}
                  initial={{ opacity: 0, x: '100%' }}
                  animate={{ opacity: 1, x: '0%' }}
                  exit={{ opacity: 0, x: '100%' }}
                  transition={{ duration: 0.2 }}
                  className="md:hidden absolute bottom-0 right-0 top-0 inset-0  bg-slate-200   z-10  shadow-lg"
                >
                  <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col  h-screen relative">
                    <a
                      href="#"
                      className="text-gray-800 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                      Menu Item 1
                    </a>
                    <a
                      href="#"
                      className="text-gray-800 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                      Menu Item 2
                    </a>
                    <a
                      href="#"
                      className="text-gray-800 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                      Menu Item 3
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
