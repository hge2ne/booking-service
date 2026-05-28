import { useMemo, type ReactNode } from 'react'
import {
  Ban,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Circle,
  Info,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  availableDatesFor,
  findSlot,
  formatKoreanDate,
  getSlotsForDate,
  toISODate,
  type ServiceType,
} from '@/client/data/scheduleSlots'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// Sunday-first 35-cell grid covering June 2026 (with May/July spillover).
function useJuneGrid() {
  return useMemo(() => {
    const first = new Date(2026, 5, 1)
    const start = new Date(first)
    start.setDate(first.getDate() - first.getDay())
    return Array.from({ length: 35 }, (_, i) => {
      const d = new Date(start)
      d.setDate(start.getDate() + i)
      return { iso: toISODate(d), day: d.getDate(), inMonth: d.getMonth() === 5 }
    })
  }, [])
}

/**
 * The Stitch "응시 일정" calendar (date grid → time-slot list → selected-slot banner),
 * rebuilt as a controlled React component over our design tokens. Shared by the
 * standalone /schedule/stitch comparison page and the inline form step.
 *
 * `bookingAction` renders at the right of the confirmation banner — the standalone
 * page passes its 예약하기 button; the form omits it (the form has its own CTA).
 */
export function StitchCalendarPicker({
  selectedDate,
  selectedSlot,
  onPickDate,
  onSelectSlot,
  bookingAction,
  service = 'test',
}: Readonly<{
  selectedDate: string
  selectedSlot: string | null
  onPickDate: (iso: string) => void
  onSelectSlot: (id: string) => void
  bookingAction?: ReactNode
  service?: ServiceType
}>) {
  const grid = useJuneGrid()
  const available = useMemo(() => availableDatesFor(service), [service])
  const slots = getSlotsForDate(selectedDate, service)
  const slot = selectedSlot ? findSlot(selectedSlot) : undefined

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-[0_1px_10px_rgba(0,0,0,0.04)]">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Calendar */}
        <div className="border-b border-border p-6 sm:p-8 md:border-b-0 md:border-r">
          <div className="mb-6 flex items-center justify-between">
            <button
              type="button"
              aria-label="이전 달"
              className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted"
            >
              <ChevronLeft className="size-5" />
            </button>
            <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
              2026년 6월
            </h2>
            <button
              type="button"
              aria-label="다음 달"
              className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>

          <div className="mb-2 grid grid-cols-7 gap-1 text-center">
            {WEEKDAYS.map((w, i) => (
              <div
                key={w}
                className={cn(
                  'py-2 text-xs font-medium',
                  i === 0 ? 'text-destructive' : 'text-muted-foreground',
                )}
              >
                {w}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {grid.map((cell) => {
              const selected = cell.inMonth && cell.iso === selectedDate
              const isAvailable = cell.inMonth && available.has(cell.iso)
              return (
                <button
                  key={cell.iso}
                  type="button"
                  disabled={!isAvailable}
                  onClick={() => isAvailable && onPickDate(cell.iso)}
                  className={cn(
                    'flex aspect-square items-center justify-center text-sm transition-all',
                    selected &&
                      'rounded-full bg-primary font-bold text-primary-foreground shadow-sm',
                    !selected &&
                      isAvailable &&
                      'cursor-pointer rounded-lg bg-brand-tint font-bold text-primary hover:-translate-y-0.5',
                    !selected &&
                      !isAvailable &&
                      cell.inMonth &&
                      'cursor-not-allowed rounded-lg bg-muted text-muted-foreground',
                    !cell.inMonth && 'cursor-not-allowed rounded-lg bg-muted/50 text-muted-foreground',
                  )}
                >
                  {cell.day}
                </button>
              )
            })}
          </div>

          <div className="mt-8 flex justify-center gap-6">
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-sm border border-brand/40 bg-brand-tint" />
              <span className="text-xs text-muted-foreground">예약 가능 (관리자 오픈)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-sm border border-border bg-muted" />
              <span className="text-xs text-muted-foreground">미오픈 / 마감</span>
            </div>
          </div>
        </div>

        {/* Time slots */}
        <div className="bg-background p-6 sm:p-8">
          <div className="mb-4">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {formatKoreanDate(selectedDate)} · 응시 시간대
            </span>
          </div>

          <div className="space-y-3">
            {slots.length === 0 && (
              <p className="text-sm text-muted-foreground">
                {formatKoreanDate(selectedDate)} 에는 예정된 일정이 없습니다.
              </p>
            )}
            {slots.map((s) => {
              if (!s.open) {
                return (
                  <div
                    key={s.id}
                    className="flex w-full cursor-not-allowed items-center justify-between rounded-lg border border-border bg-muted p-4 opacity-60"
                  >
                    <div>
                      <span className="font-display text-base font-semibold text-muted-foreground">
                        {s.label}
                      </span>
                      <div className="mt-0.5 text-xs text-muted-foreground">미오픈</div>
                    </div>
                    <Ban className="size-5 text-muted-foreground" />
                  </div>
                )
              }
              const isSel = s.id === selectedSlot
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onSelectSlot(s.id)}
                  className={cn(
                    'group flex w-full items-center justify-between rounded-lg p-4 text-left transition-all',
                    isSel
                      ? 'border-2 border-primary bg-brand-tint ring-4 ring-primary/10'
                      : 'border border-border bg-card hover:border-primary',
                  )}
                >
                  <div>
                    <span
                      className={cn(
                        'font-display text-base font-semibold',
                        isSel ? 'text-primary' : 'text-foreground',
                      )}
                    >
                      {s.label}
                    </span>
                    <div
                      className={cn(
                        'mt-0.5 text-xs',
                        isSel ? 'text-primary/80' : 'text-muted-foreground',
                      )}
                    >
                      잔여 {s.capacity}석
                    </div>
                  </div>
                  {isSel ? (
                    <CheckCircle2 className="size-5 text-primary" />
                  ) : (
                    <Circle className="size-5 text-border group-hover:text-primary" />
                  )}
                </button>
              )
            })}
          </div>

          <div className="mt-8">
            <div className="flex gap-3 rounded-xl bg-info-bg p-4">
              <Info className="size-5 shrink-0 text-info" />
              <p className="text-sm font-medium text-info-bg-foreground">
                시험 시작 20분 전까지 입실을 완료해 주세요.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation banner */}
      <div className="flex flex-col items-center justify-between gap-4 border-t border-border bg-brand-tint/50 p-6 md:flex-row">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary p-1.5">
            <CalendarDays className="size-5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-xs text-primary/80">선택한 일정</p>
            <p className="font-display text-base font-bold text-primary">
              {slot
                ? `${formatKoreanDate(slot.date)} ${slot.label} (잔여 ${slot.capacity}석)`
                : '시간대를 선택해 주세요'}
            </p>
          </div>
        </div>
        {bookingAction}
      </div>
    </div>
  )
}
