import { Link } from 'react-router-dom'

const navItems: { label: string; to: string }[] = [
  { label: 'Programs', to: '/' },
  { label: 'Schedule', to: '/' },
  { label: 'My Bookings', to: '/my' },
  { label: 'Notice', to: '/' },
]

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-card/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5">
        <Link to="/" className="font-display text-xl font-bold tracking-tight text-primary">
          NP Edu
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/my"
          className="rounded-full border border-brand px-4 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-brand-tint"
        >
          내 예약
        </Link>
      </div>
    </header>
  )
}
