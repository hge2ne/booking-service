import { useMemo } from 'react'
import { Info, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import {
  formatKoreanDate,
  serviceList,
  type Slot,
  type ServiceType,
} from '@/client/data/scheduleSlots'

export default function SlotManager({
  slots,
  onToggle,
}: Readonly<{
  slots: Slot[]
  onToggle: (id: string) => void
}>) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-3 rounded-xl bg-info-bg p-4">
        <Info className="size-5 shrink-0 text-info" />
        <p className="text-sm font-medium text-info-bg-foreground">
          모든 시간대는 기본적으로 <strong>닫힘</strong> 상태입니다. 예약을 받을 시간대만 열어 주세요.
          연 슬롯만 신청 화면의 캘린더에 노출됩니다.
        </p>
      </div>

      {serviceList.map((svc) => (
        <ServiceSlotSection
          key={svc.id}
          service={svc.id}
          name={svc.name}
          slots={slots.filter((s) => s.service === svc.id)}
          onToggle={onToggle}
        />
      ))}
    </div>
  )
}

function ServiceSlotSection({
  service,
  name,
  slots,
  onToggle,
}: Readonly<{
  service: ServiceType
  name: string
  slots: Slot[]
  onToggle: (id: string) => void
}>) {
  const byDate = useMemo(() => {
    const map = new Map<string, Slot[]>()
    for (const s of slots) {
      const arr = map.get(s.date) ?? []
      arr.push(s)
      map.set(s.date, arr)
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b))
  }, [slots])

  const openCount = slots.filter((s) => s.open).length

  return (
    <div className="rounded-xl border border-border bg-card shadow-[0_1px_10px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between border-b border-border p-5">
        <h3 className="text-base font-bold tracking-tight text-foreground">{name}</h3>
        <Badge
          className={
            service === 'briefing' ? 'bg-success/15 text-success' : 'bg-brand-tint text-primary'
          }
        >
          {openCount} / {slots.length} 열림
        </Badge>
      </div>

      <div className="divide-y divide-border">
        {byDate.map(([date, daySlots]) => (
          <div key={date} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-start">
            <div className="w-32 shrink-0 pt-1.5 font-display text-sm font-semibold text-foreground">
              {formatKoreanDate(date)}
            </div>
            <div className="flex flex-1 flex-col gap-2">
              {daySlots.map((s) => (
                <label
                  key={s.id}
                  htmlFor={`slot-${s.id}`}
                  className={cn(
                    'flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors',
                    s.open ? 'border-brand bg-brand-tint/40' : 'border-border bg-card',
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-display text-sm font-semibold text-foreground">
                      {s.label}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Users className="size-3.5" />
                      정원 {s.capacity}석
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span
                      className={cn(
                        'text-xs font-medium',
                        s.open ? 'text-primary' : 'text-muted-foreground',
                      )}
                    >
                      {s.open ? '열림' : '닫힘'}
                    </span>
                    <Switch
                      id={`slot-${s.id}`}
                      checked={s.open}
                      onCheckedChange={() => onToggle(s.id)}
                    />
                  </div>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
