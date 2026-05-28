import { CheckCircle2, GraduationCap, Presentation } from 'lucide-react'
import { cn } from '@/lib/utils'
import { serviceList, services, type ServiceType } from '@/client/data/scheduleSlots'
import { formatPrice } from '@/client/data/reservations'

const icons: Record<ServiceType, typeof Presentation> = {
  briefing: Presentation,
  test: GraduationCap,
}

export default function ServiceSelect({
  value,
  onChange,
}: Readonly<{
  value: ServiceType | ''
  onChange: (service: ServiceType) => void
}>) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {serviceList.map((s) => {
        const Icon = icons[s.id]
        const selected = value === s.id
        return (
          <button
            key={s.id}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(s.id)}
            className={cn(
              'group relative flex flex-col gap-3 rounded-xl border bg-card p-5 text-left transition-all',
              selected
                ? 'border-2 border-primary bg-brand-tint/50 ring-4 ring-primary/10'
                : 'border-border hover:border-brand hover:bg-brand-tint/30',
            )}
          >
            {selected && (
              <CheckCircle2 className="absolute right-4 top-4 size-5 text-primary" />
            )}
            <span
              className={cn(
                'inline-flex size-11 items-center justify-center rounded-lg transition-colors',
                selected ? 'bg-primary text-primary-foreground' : 'bg-muted text-primary',
              )}
            >
              <Icon className="size-6" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-foreground">
                  {s.name}
                </span>
                <span
                  className={cn(
                    'rounded-full px-2 py-0.5 text-xs font-semibold',
                    s.price === 0
                      ? 'bg-success/15 text-success'
                      : 'bg-brand-tint text-primary',
                  )}
                >
                  {formatPrice(s.price)}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{services[s.id].blurb}</p>
            </div>
          </button>
        )
      })}
    </div>
  )
}
