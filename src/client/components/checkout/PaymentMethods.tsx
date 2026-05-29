import { RadioGroup as RadioGroupPrimitive } from 'radix-ui'
import { CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { paymentMethods } from '@/client/data/checkout'

export default function PaymentMethods({
  value,
  onChange,
}: Readonly<{
  value: string
  onChange: (value: string) => void
}>) {
  return (
    <section>
      <h2 className="mb-3 text-lg font-bold tracking-tight text-foreground">결제 수단</h2>
      <RadioGroupPrimitive.Root
        value={value}
        onValueChange={onChange}
        className="grid grid-cols-1 gap-3 sm:w-1/2"
        aria-label="결제 수단 선택"
      >
        {paymentMethods.map((m) => {
          const selected = value === m.id
          const Icon = m.icon
          return (
            <RadioGroupPrimitive.Item
              key={m.id}
              value={m.id}
              className={cn(
                'relative flex items-center gap-3 rounded-xl p-4 text-left outline-none transition-all focus-visible:ring-3 focus-visible:ring-ring/50',
                selected
                  ? 'border-2 border-brand bg-brand-tint'
                  : 'border border-border bg-card hover:border-muted-foreground/40',
              )}
            >
              <Icon className={cn('size-6', selected ? 'text-primary' : 'text-muted-foreground')} />
              <span
                className={cn(
                  'text-sm',
                  selected ? 'font-bold text-primary' : 'font-medium text-muted-foreground',
                )}
              >
                {m.label}
              </span>
              {selected && (
                <CheckCircle2 className="ml-auto size-[18px] text-primary" />
              )}
            </RadioGroupPrimitive.Item>
          )
        })}
      </RadioGroupPrimitive.Root>
    </section>
  )
}
