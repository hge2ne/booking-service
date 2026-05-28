import { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import './react-calendar-theme.css'
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

export default function ReactCalendarSchedulePage() {
  const [date, setDate] = useState<Date | null>(null)
  const [slotId, setSlotId] = useState<string | null>(null)

  const iso = date ? toISODate(date) : null

  return (
    <SchedulePageShell
      title="응시 일정 · react-calendar 버전"
      subtitle="react-calendar 패키지를 설치해 가져온 뒤 NP Edu Trust 디자인 토큰으로 재스타일링했습니다."
    >
      <div className="rounded-xl border border-border bg-card p-6 shadow-[0_1px_10px_rgba(0,0,0,0.04)] sm:p-7">
        <div className="flex flex-col gap-7 md:flex-row md:gap-8">
          <div className="np-rc flex flex-col gap-3">
            <Calendar
              locale="ko-KR"
              calendarType="gregory"
              value={date}
              onChange={(value) => {
                setDate(value as Date)
                setSlotId(null)
              }}
              defaultActiveStartDate={defaultMonth}
              minDetail="month"
              tileDisabled={({ date: d, view }) =>
                view === 'month' && !isDateAvailable(toISODate(d))
              }
              tileClassName={({ date: d, view }) =>
                view === 'month' && availableDates.has(toISODate(d)) ? 'rc-available' : null
              }
              formatDay={(_locale, d) => String(d.getDate())}
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
