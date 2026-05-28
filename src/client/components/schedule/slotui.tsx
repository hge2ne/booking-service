import { cn } from '@/lib/utils'
import {
  findSlot,
  formatKoreanDate,
  getSlotsForDate,
} from '@/client/data/scheduleSlots'

/** Open/closed time-slot buttons for the selected date. Shared by all 3 versions. */
export function TimeSlotList({
  date,
  selectedId,
  onSelect,
}: Readonly<{
  date: string | null
  selectedId: string | null
  onSelect: (id: string) => void
}>) {
  if (!date) {
    return (
      <p className="text-sm text-muted-foreground">
        캘린더에서 응시 가능한 날짜를 먼저 선택하세요.
      </p>
    )
  }

  const slots = getSlotsForDate(date)
  if (slots.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        {formatKoreanDate(date)} 에는 예정된 시험 일정이 없습니다.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-xs font-medium text-muted-foreground">
        {formatKoreanDate(date)} · 응시 시간대
      </p>
      <div className="flex flex-wrap gap-2.5">
        {slots.map((s) => {
          const selected = s.id === selectedId
          return (
            <button
              key={s.id}
              type="button"
              disabled={!s.open}
              aria-pressed={selected}
              onClick={() => onSelect(s.id)}
              className={cn(
                'min-w-28 rounded-lg border px-4 py-2.5 text-left text-sm font-medium transition-colors',
                !s.open && 'cursor-not-allowed border-border bg-muted text-muted-foreground',
                s.open &&
                  selected &&
                  'border-brand bg-brand-tint text-[color:var(--accent-foreground)] ring-1 ring-brand',
                s.open &&
                  !selected &&
                  'border-border bg-card text-foreground hover:border-brand hover:bg-brand-tint/40',
              )}
            >
              <span className="block">{s.label}</span>
              <span className="mt-0.5 block text-xs font-normal">
                {s.open ? `잔여 ${s.capacity}석` : '미오픈'}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

/** Confirmation banner for the chosen slot. */
export function SelectedSlotBanner({ slotId }: Readonly<{ slotId: string | null }>) {
  const slot = slotId ? findSlot(slotId) : undefined
  if (!slot) return null
  return (
    <div className="rounded-lg border border-brand bg-brand-tint/50 px-4 py-3 text-sm">
      <span className="font-semibold text-foreground">선택한 일정&nbsp;·&nbsp;</span>
      <span className="text-foreground">
        {formatKoreanDate(slot.date)} {slot.label} (잔여 {slot.capacity}석)
      </span>
    </div>
  )
}

/** Legend explaining the open/closed slot model. */
export function SlotLegend() {
  return (
    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
      <span className="inline-flex items-center gap-1.5">
        <span className="inline-block size-3 rounded-sm border border-brand bg-brand-tint" />
        예약 가능 (관리자 오픈)
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span className="inline-block size-3 rounded-sm border border-border bg-muted" />
        미오픈 / 마감
      </span>
    </div>
  )
}
