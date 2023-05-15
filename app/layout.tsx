import "@styles/globals.css";

export const metadata = {
  title: "Busland",
  description: "A task i guess...",
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <div className="main">
        <div className="gradient"></div>
      </div>

      <main className="app">{children}</main>
    </html>
  );
}

export default RootLayout;
