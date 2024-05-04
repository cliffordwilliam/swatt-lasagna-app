const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="min-h-dvh flex items-center justify-center p-2">
        {children}
      </main>
    </>
  );
};

export default Layout;
