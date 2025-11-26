import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-3xl">✨</span>
          <h1 className="text-xl font-bold text-gray-900">استوديو المنتجات <span className="text-primary">AI</span></h1>
        </div>
        <nav>
          <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
            عن الأداة
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;