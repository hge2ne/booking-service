import { formatPrice } from '@/client/data/reservations'

function Row({ label, value }: Readonly<{ label: string; value: string }>) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  )
}

export default function OrderSummary({
  scheduleLabel,
  studentName,
  amount,
}: Readonly<{
  scheduleLabel: string
  studentName: string
  amount: number
}>) {
  return (
    <section className="rounded-xl border border-border bg-card p-6 shadow-[0_1px_10px_rgba(0,0,0,0.04)]">
      <div className="mb-4">
        <span className="inline-block rounded-full bg-brand-tint px-3 py-1 text-xs font-bold text-primary">
          입학 테스트
        </span>
      </div>
      <div className="space-y-4">
        <Row label="일정" value={scheduleLabel} />
        <Row label="응시생" value={studentName} />
        <div className="flex items-center justify-between border-t border-border pt-4">
          <span className="text-lg font-bold tracking-tight text-foreground">결제 금액</span>
          <span className="font-display text-3xl font-bold text-primary">{formatPrice(amount)}</span>
        </div>
      </div>
    </section>
  )
}
