import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { SchedulePageShell } from '@/client/components/schedule/SchedulePageShell'
import {
  SelectedSlotBanner,
  SlotLegend,
  TimeSlotList,
} from '@/client/components/schedule/slotui'
import {
  availableDates,
  defaultMonth,
  isDateAvailable,
  toISODate,
} from '@/client/data/scheduleSlots'

export default function ShadcnSchedulePage() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [slotId, setSlotId] = useState<string | null>(null)

  const iso = date ? toISODate(date) : null

  const handleSelect = (d: Date | undefined) => {
    setDate(d)
    setSlotId(null)
  }

  return (
    <SchedulePageShell
      title="응시 일정 · shadcn 버전"
      subtitle="shadcn/ui Calendar(react-day-picker) 컴포넌트. 관리자가 오픈한 날짜만 활성화되고, 나머지는 비활성 처리됩니다."
    >
      <div className="rounded-xl border border-border bg-card p-6 shadow-[0_1px_10px_rgba(0,0,0,0.04)] sm:p-7">
        <div className="flex flex-col gap-7 md:flex-row md:gap-8">
          <div className="flex flex-col gap-3">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleSelect}
              defaultMonth={defaultMonth}
              disabled={(d) => !isDateAvailable(toISODate(d))}
              modifiers={{ available: (d) => availableDates.has(toISODate(d)) }}
              modifiersClassNames={{
                available: 'font-semibold text-primary',
              }}
              className="rounded-lg border border-border"
            />
            <SlotLegend />
          </div>
          <div className="flex-1">
            <TimeSlotList date={iso} selectedId={slotId} onSelect={setSlotId} />
          </div>
        </div>

        <div className="mt-7">
          <SelectedSlotBanner slotId={slotId} />
        </div>
      </div>
    </SchedulePageShell>
  )
}
