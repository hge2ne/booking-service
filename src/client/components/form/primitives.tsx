import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** Field label with optional required dot, inline note, and helper text below. */
export function FieldLabel({
  children,
  required,
  note,
  htmlFor,
}: Readonly<{
  children: ReactNode
  required?: boolean
  note?: string
  htmlFor?: string
}>) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm font-semibold text-foreground"
    >
      <span className="inline-flex items-center">
        {children}
        {required && (
          <span className="ml-1 inline-block size-1.5 rounded-full bg-destructive align-middle" />
        )}
      </span>
      {note && <span className="text-xs font-normal text-muted-foreground">{note}</span>}
    </label>
  )
}

export function HelperText({ children }: Readonly<{ children: ReactNode }>) {
  return <p className="mt-1.5 text-xs text-muted-foreground">{children}</p>
}

/** A single revealed step: "STEP n · 제목" heading above a white card. */
export function SectionCard({
  step,
  title,
  children,
  animate = true,
}: Readonly<{
  step: number
  title: string
  children: ReactNode
  animate?: boolean
}>) {
  return (
    <section className={cn(animate && 'animate-in fade-in slide-in-from-bottom-3 duration-500')}>
      <div className="mb-3 flex items-baseline gap-2">
        <span className="font-display text-sm font-bold tracking-tight text-primary">
          STEP {step}
        </span>
        <h2 className="text-lg font-bold tracking-tight text-foreground">{title}</h2>
      </div>
      <div className="rounded-xl border border-border bg-card p-6 shadow-[0_1px_10px_rgba(0,0,0,0.04)] sm:p-7">
        {children}
      </div>
    </section>
  )
}

/** Selectable chip (course / weekday). Olive-tint when selected. */
export function Chip({
  label,
  selected,
  disabled,
  onClick,
}: Readonly<{
  label: string
  selected?: boolean
  disabled?: boolean
  onClick?: () => void
}>) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        'rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors',
        disabled && 'cursor-not-allowed border-border bg-muted text-muted-foreground line-through',
        !disabled && selected && 'border-brand bg-brand-tint text-[color:var(--accent-foreground)]',
        !disabled &&
          !selected &&
          'border-border bg-card text-foreground hover:border-brand hover:bg-brand-tint/40',
      )}
    >
      {label}
    </button>
  )
}

/** Segmented progress indicator; fills `current` of `total` segments. */
export function StepProgress({
  current,
  total = 3,
}: Readonly<{ current: number; total?: number }>) {
  return (
    <div className="mt-5 flex gap-1.5" aria-label={`진행 단계 ${current} / ${total}`}>
      {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
        <span
          key={n}
          className={cn(
            'h-1.5 flex-1 rounded-full transition-colors duration-500',
            n <= current ? 'bg-primary' : 'bg-border',
          )}
        />
      ))}
    </div>
  )
}

/** Olive-green outline pill button for utility actions (인증/주소찾기). */
export const pillButtonClass =
  'shrink-0 whitespace-nowrap rounded-full border border-brand bg-card px-4 text-sm font-medium text-primary transition-colors hover:bg-brand-tint disabled:opacity-50'
