import { useState } from 'react'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FieldLabel } from '@/client/components/form/primitives'
import { demoCredential } from '@/client/data/reservations'

export default function MyBookingLogin({
  onSubmit,
}: Readonly<{
  onSubmit: (name: string, phone: string) => void
}>) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const canSubmit = name.trim().length > 0 && phone.replace(/\D/g, '').length >= 9

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-[0_1px_10px_rgba(0,0,0,0.04)] sm:p-8">
      <h2 className="text-lg font-bold tracking-tight text-foreground">예약 조회</h2>
      <p className="mt-1.5 text-sm text-muted-foreground">
        신청 시 입력한 이름과 휴대폰번호로 예약 내역을 조회합니다.
      </p>

      <form
        className="mt-6 flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault()
          if (canSubmit) onSubmit(name, phone)
        }}
      >
        <div>
          <FieldLabel required htmlFor="lookup-name">
            이름
          </FieldLabel>
          <Input
            id="lookup-name"
            placeholder="예: 홍길동"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <FieldLabel required htmlFor="lookup-phone">
            휴대폰번호
          </FieldLabel>
          <Input
            id="lookup-phone"
            inputMode="tel"
            placeholder="010-1234-5678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <Button type="submit" disabled={!canSubmit} className="h-11 w-full text-base font-semibold">
          <Search className="size-4" />
          예약 조회
        </Button>
      </form>

      <p className="mt-4 rounded-lg bg-muted/60 p-3 text-xs text-muted-foreground">
        데모 계정 — 이름 <span className="font-semibold text-foreground">{demoCredential.name}</span>{' '}
        / 휴대폰 <span className="font-semibold text-foreground">{demoCredential.phone}</span>
      </p>
    </div>
  )
}
