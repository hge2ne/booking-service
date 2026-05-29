import { Checkbox } from '@/components/ui/checkbox'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { agreements } from '@/client/data/checkout'

export type AgreementState = Record<string, boolean>

export default function AgreementSection({
  value,
  onChange,
}: Readonly<{
  value: AgreementState
  onChange: (next: AgreementState) => void
}>) {
  const allChecked = agreements.every((a) => value[a.id])

  const toggleAll = (checked: boolean) =>
    onChange(Object.fromEntries(agreements.map((a) => [a.id, checked])))

  const toggleOne = (id: string, checked: boolean) => onChange({ ...value, [id]: checked })

  return (
    <section className="rounded-xl border border-border bg-card p-6 shadow-[0_1px_10px_rgba(0,0,0,0.04)]">
      <label htmlFor="agree-all" className="flex cursor-pointer items-center gap-3">
        <Checkbox
          id="agree-all"
          className="size-6"
          checked={allChecked}
          onCheckedChange={(c) => toggleAll(c === true)}
        />
        <span className="text-base font-bold text-foreground">전체 동의합니다</span>
      </label>

      <div className="my-4 h-px bg-border" />

      <Accordion type="multiple" className="gap-1">
        {agreements.map((a) => (
          <AccordionItem key={a.id} value={a.id} className="border-b-0">
            <div className="flex items-center gap-3">
              <Checkbox
                id={`agree-${a.id}`}
                checked={!!value[a.id]}
                onCheckedChange={(c) => toggleOne(a.id, c === true)}
              />
              <label
                htmlFor={`agree-${a.id}`}
                className="flex-1 cursor-pointer text-sm text-muted-foreground"
              >
                {a.label}{' '}
                <span className={a.required ? 'text-destructive' : 'text-muted-foreground'}>
                  ({a.required ? '필수' : '선택'})
                </span>
              </label>
              <AccordionTrigger className="flex-none py-1.5 hover:no-underline">
                <span className="sr-only">{a.label} 내용 보기</span>
              </AccordionTrigger>
            </div>
            <AccordionContent className="pl-8 text-muted-foreground">{a.body}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
