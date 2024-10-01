import React from 'react';

function Layout({ children }) {
  return (
    <div>
      <header>
        <nav>
          {/* Global header-innhold som navigasjon */}
          <h1>Portfolio App</h1>
          <ul>
            <li><a href="/">Hjem</a></li>
            <li><a href="/portfolio">Portfolio</a></li>
          </ul>
        </nav>
      </header>

      <main>
        {/* Her vil de forskjellige sidene rendres */}
        {children}
      </main>

      <footer>
        {/* Global footer-innhold */}
        <p>© 2024 Portfolio App. Alle rettigheter reservert.</p>
      </footer>
    </div>
  );
}

export default Layout;
