import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import SiteHeader from '@/client/components/SiteHeader'
import SiteFooter from '@/client/components/SiteFooter'
import { cn } from '@/lib/utils'

const versions = [
  { to: '/schedule/shadcn', label: 'shadcn' },
  { to: '/schedule/stitch', label: 'Stitch' },
  { to: '/schedule/react', label: 'react-calendar' },
]

/** Standalone comparison-page frame: header, title, version switcher, back-to-form link. */
export function SchedulePageShell({
  title,
  subtitle,
  children,
}: Readonly<{
  title: string
  subtitle: string
  children: ReactNode
}>) {
  const { pathname } = useLocation()

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="mx-auto w-full max-w-[760px] flex-1 px-5 py-10 sm:py-14">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          신청 폼으로 돌아가기
        </Link>

        <header className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {title}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
        </header>

        <nav className="mb-8 flex flex-wrap gap-2" aria-label="캘린더 버전 전환">
          {versions.map((v) => {
            const active = pathname === v.to
            return (
              <Link
                key={v.to}
                to={v.to}
                className={cn(
                  'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                  active
                    ? 'border-brand bg-brand text-brand-foreground'
                    : 'border-border bg-card text-foreground hover:border-brand hover:bg-brand-tint/40',
                )}
              >
                {v.label}
              </Link>
            )
          })}
        </nav>

        {children}
      </main>
      <SiteFooter />
    </div>
  )
}
