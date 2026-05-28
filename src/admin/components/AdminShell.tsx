import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ExternalLink, ShieldCheck } from 'lucide-react'

export default function AdminShell({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-20 border-b border-border bg-card/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5">
          <div className="flex items-center gap-2">
            <span className="inline-flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <ShieldCheck className="size-5" />
            </span>
            <div className="leading-tight">
              <span className="block font-display text-base font-bold tracking-tight text-foreground">
                NP Edu
              </span>
              <span className="block text-xs text-muted-foreground">관리자 콘솔</span>
            </div>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-brand hover:text-primary"
          >
            신청 화면 보기
            <ExternalLink className="size-3.5" />
          </Link>
        </div>
      </header>
      <main className="mx-auto w-full max-w-[1200px] flex-1 px-5 py-8 sm:py-10">{children}</main>
    </div>
  )
}
