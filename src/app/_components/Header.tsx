const Header = () => {
  return (
    <header className={`fixed top-0 w-full h-14 border-b border-solid border-[#e5e7eb] z-40 p-5`}>
      <div className="container flex h-full max-w-screen-2xl flex-col items-start justify-center gap-4">
        <ul className="flex items-center justify-start gap-3 text-sm">
          <li className="text-muted-foreground hover:text-accent-foreground hover:underline">
            <a href="/about">About</a>
          </li>
        </ul>
        <span className="text-center text-xs text-muted-foreground">2026 JIHYEON JEONG</span>
      </div>
    </header>
  );
};

export default Header;
