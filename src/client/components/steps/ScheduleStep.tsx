import { useState } from 'react'
import { FieldLabel, HelperText, Chip } from '@/client/components/form/primitives'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { StitchCalendarPicker } from '@/client/components/schedule/StitchCalendarPicker'
import { courses, grades } from '@/client/data/formOptions'
import { defaultViewDate, findSlot, type ServiceType } from '@/client/data/scheduleSlots'
import type { ScheduleState } from './formState'

export default function ScheduleStep({
  value,
  onChange,
  service,
}: Readonly<{
  value: ScheduleState
  onChange: (patch: Partial<ScheduleState>) => void
  service: ServiceType
}>) {
  const isTest = service === 'test'

  // Which date the calendar is currently showing. The committed value is the
  // slot id in form state; the viewed date is transient UI state.
  const [viewDate, setViewDate] = useState(
    () => (value.slotId && findSlot(value.slotId)?.date) || defaultViewDate(service),
  )

  const toggleCourse = (id: string) => {
    const next = value.courses.includes(id)
      ? value.courses.filter((c) => c !== id)
      : [...value.courses, id]
    onChange({ courses: next })
  }

  const pickDate = (iso: string) => {
    setViewDate(iso)
    onChange({ slotId: '' }) // changing date invalidates the previously chosen slot
  }

  return (
    <div className="flex flex-col gap-6">
      {isTest && (
        <div className="sm:max-w-xs">
          <FieldLabel required>학년</FieldLabel>
          <Select value={value.grade} onValueChange={(v) => onChange({ grade: v })}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="학년을 선택하세요." />
            </SelectTrigger>
            <SelectContent>
              {grades.map((g) => (
                <SelectItem key={g} value={g}>
                  {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <HelperText>테스트 일정이 있는 학년만 표시됩니다.</HelperText>
        </div>
      )}

      <div>
        <FieldLabel required>{isTest ? '응시 일정' : '설명회 일정'}</FieldLabel>
        <StitchCalendarPicker
          service={service}
          selectedDate={viewDate}
          selectedSlot={value.slotId || null}
          onPickDate={pickDate}
          onSelectSlot={(id) => onChange({ slotId: id })}
        />
        <HelperText>
          {isTest
            ? '예약 가능한 날짜(관리자 오픈)를 고른 뒤, 응시 시간대를 선택하세요.'
            : '예약 가능한 날짜(관리자 오픈)를 고른 뒤, 설명회 시간대를 선택하세요.'}
        </HelperText>
      </div>

      {isTest && (
        <div>
          <FieldLabel required note="(최근 공부한 선행과정 2과정을 선택해 주시기 바랍니다.)">
            시험 진도(과정) 선택
          </FieldLabel>
          <div className="rounded-lg border border-border p-4">
            <p className="mb-3 text-xs font-medium text-muted-foreground">과정목록</p>
            <div className="flex flex-wrap gap-2">
              {courses.map((c) => (
                <Chip
                  key={c.id}
                  label={c.closed ? `${c.label} (마감)` : c.label}
                  disabled={c.closed}
                  selected={value.courses.includes(c.id)}
                  onClick={() => toggleCourse(c.id)}
                />
              ))}
            </div>
          </div>
          <HelperText>마감된 과정은 선택되지 않습니다.</HelperText>
        </div>
      )}
    </div>
  )
}
