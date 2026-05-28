import { useState } from 'react'
import {
  ArrowRight,
  GraduationCap,
  Headphones,
  MessageCircle,
} from 'lucide-react'
import { SchedulePageShell } from '@/client/components/schedule/SchedulePageShell'
import { StitchCalendarPicker } from '@/client/components/schedule/StitchCalendarPicker'

export default function StitchSchedulePage() {
  const [selectedDate, setSelectedDate] = useState('2026-06-06')
  const [selectedSlot, setSelectedSlot] = useState<string | null>('0606-am')

  const pickDate = (iso: string) => {
    setSelectedDate(iso)
    setSelectedSlot(null)
  }

  return (
    <SchedulePageShell
      title="응시 일정 · Stitch 버전"
      subtitle="Stitch 디자인 시스템으로 생성한 화면을 React 컴포넌트로 변환해 디자인 토큰으로 렌더링했습니다."
    >
      <div className="mb-6 flex items-center justify-center gap-2">
        <div className="h-1.5 w-24 rounded-full bg-primary" />
        <div className="h-1.5 w-24 rounded-full bg-border" />
        <div className="h-1.5 w-24 rounded-full bg-border" />
      </div>

      <StitchCalendarPicker
        selectedDate={selectedDate}
        selectedSlot={selectedSlot}
        onPickDate={pickDate}
        onSelectSlot={setSelectedSlot}
        bookingAction={
          <button
            type="button"
            disabled={!selectedSlot}
            className="rounded-lg bg-primary px-10 py-3.5 text-lg font-bold text-primary-foreground shadow-md transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
          >
            예약하기
          </button>
        }
      />

      {/* Promotional bento (faithful to the Stitch layout) */}
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="relative col-span-1 overflow-hidden rounded-xl border border-border bg-card p-6 md:col-span-2">
          <div className="relative z-10">
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
              Notice
            </span>
            <h3 className="mt-4 mb-2 text-xl font-bold text-foreground">admission Guide 2026</h3>
            <p className="max-w-[70%] text-sm text-muted-foreground">
              올해 입학 전형의 변경 사항과 준비 서류를 확인하세요.
            </p>
            <button
              type="button"
              className="mt-6 flex items-center gap-2 font-bold text-primary hover:underline"
            >
              자세히 보기 <ArrowRight className="size-4" />
            </button>
          </div>
          <GraduationCap className="pointer-events-none absolute -right-5 -bottom-5 size-40 text-foreground opacity-[0.06]" />
        </div>
        <div className="flex flex-col justify-between rounded-xl border border-primary bg-primary p-6 text-primary-foreground">
          <div>
            <h3 className="mb-2 text-lg font-semibold">실시간 상담</h3>
            <p className="text-sm opacity-90">예약 관련 궁금한 점은 실시간 톡으로 문의하세요.</p>
          </div>
          <div className="mt-8 flex -space-x-3">
            <div className="flex size-10 items-center justify-center rounded-full border-2 border-primary bg-card">
              <Headphones className="size-5 text-primary" />
            </div>
            <div className="flex size-10 items-center justify-center rounded-full border-2 border-primary bg-brand-tint">
              <MessageCircle className="size-5 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </SchedulePageShell>
  )
}
