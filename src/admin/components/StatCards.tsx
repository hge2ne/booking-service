import { CalendarCheck, DoorOpen, Megaphone, Wallet } from 'lucide-react'
import { formatPrice } from '@/client/data/reservations'

export interface AdminStats {
  total: number
  briefing: number
  test: number
  revenue: number
  openSlots: number
}

const cards = [
  { key: 'total', label: '총 신청', icon: CalendarCheck, fmt: (s: AdminStats) => `${s.total}건` },
  {
    key: 'services',
    label: '설명회 / 테스트',
    icon: Megaphone,
    fmt: (s: AdminStats) => `${s.briefing} / ${s.test}건`,
  },
  { key: 'revenue', label: '결제 합계', icon: Wallet, fmt: (s: AdminStats) => formatPrice(s.revenue) },
  {
    key: 'openSlots',
    label: '열린 슬롯',
    icon: DoorOpen,
    fmt: (s: AdminStats) => `${s.openSlots}개`,
  },
] as const

export default function StatCards({ stats }: Readonly<{ stats: AdminStats }>) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((c) => {
        const Icon = c.icon
        return (
          <div
            key={c.key}
            className="rounded-xl border border-border bg-card p-5 shadow-[0_1px_10px_rgba(0,0,0,0.04)]"
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon className="size-4" />
              <span className="text-xs font-medium">{c.label}</span>
            </div>
            <p className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground">
              {c.fmt(stats)}
            </p>
          </div>
        )
      })}
    </div>
  )
}
