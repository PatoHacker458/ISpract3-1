import React from 'react';

const Navbar: React.FC<{ title: string }> = ({ title }) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <a className="navbar-brand" href="#">
      {title}
    </a>
    {/* resto de navbar */}
  </nav>
);

export default Navbar;