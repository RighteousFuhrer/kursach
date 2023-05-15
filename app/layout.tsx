import "@styles/globals.css";

import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
  title: "Busland",
  description: "A task i guess...",
};

function RootLayout({ children }:  { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        
          <div className="main">
            <div className="gradient"></div>
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        
      </body>
    </html>
  );
}

export default RootLayout;
