import React from 'react';

const Navbar: React.FC<{ title: string }> = ({ title }) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <a className="navbar-brand" href="#">
      {title}
    </a>
    {/* aqui filter ulises */}
  </nav>
);

export default Navbar;