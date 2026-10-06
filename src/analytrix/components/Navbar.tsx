interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

interface NavItem {
  id: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'INTRO' },
  { id: 'chapter-01', label: '01: DATATHON' },
  { id: 'gallery-01', label: '01: GALLERY' },
  { id: 'chapter-02', label: '02: CONCLAVE' },
  { id: 'gallery-02', label: '02: GALLERY' },
];

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  return (
    <header
      id="main-navigation-bar"
      className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/90 backdrop-blur-md border-b border-white/[0.05] transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
        {/* Left side brand name matching screenshot: Instrument Serif italic */}
        <button
          onClick={() => onNavigate('hero')}
          className="text-left group focus:outline-none"
        >
          <span className="text-xl sm:text-2xl font-serif-display italic text-white/95 tracking-wide hover:text-white transition-colors">
            Analytrix
          </span>
        </button>

        {/* Right side navigation links */}
        <div className="flex items-center gap-6 sm:gap-10">
          <nav
            aria-label="Timeline Navigation"
            className="flex items-center gap-5 sm:gap-8 overflow-x-auto py-2 scrollbar-none"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => onNavigate(item.id)}
                  className="group relative flex flex-col items-center pt-1 pb-2 focus:outline-none transition-colors duration-200 shrink-0"
                >
                  {/* Dot indicator */}
                  <div className="h-3 flex items-center justify-center mb-1">
                    {isActive ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.95)]" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full border border-zinc-600 bg-transparent group-hover:border-zinc-300 transition-colors" />
                    )}
                  </div>

                  {/* Nav label */}
                  <span
                    className={`text-[11px] sm:text-xs font-mono-code tracking-[0.2em] uppercase transition-colors duration-200 ${
                      isActive ? 'text-white font-semibold' : 'text-zinc-400 group-hover:text-zinc-200'
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* Underline indicator */}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[1.5px] transition-all duration-300 ${
                      isActive ? 'bg-white opacity-100' : 'bg-transparent opacity-0 group-hover:bg-zinc-700 group-hover:opacity-60'
                    }`}
                  />
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
