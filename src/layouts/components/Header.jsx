import React, { useState } from 'react';
import { Search } from 'lucide-react';
import FloatingInput from '../../components/ui/FloatingInput';
import ProfileMenu from './ProfileMenu';

const Header = () => {
  const [search, setSearch] = useState('');

  return (
    <header className="w-full flex items-center justify-between px-4 py-2 bg-white shadow-sm z-10">
      <div className="relative w-2/4 mt-4 ml-4">
        <span className="absolute top-4 right-3 text-gray-400 z-10">
          <Search size={16} />
        </span>
        <FloatingInput
          name="search"
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <ProfileMenu />
    </header>
  );
};

export default Header;
