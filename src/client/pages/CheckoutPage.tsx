import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import SiteHeader from '@/client/components/SiteHeader'
import SiteFooter from '@/client/components/SiteFooter'
import OrderSummary from '@/client/components/checkout/OrderSummary'
import PaymentMethods from '@/client/components/checkout/PaymentMethods'
import AgreementSection, {
  type AgreementState,
} from '@/client/components/checkout/AgreementSection'
import { requiredAgreementIds } from '@/client/data/checkout'
import { demoCredential, formatPrice } from '@/client/data/reservations'
import {
  findSlot,
  formatKoreanDate,
  services,
  slots,
  type Slot,
} from '@/client/data/scheduleSlots'

interface CheckoutLocationState {
  slotId?: string
  name?: string
}

/** First open test slot — fallback when the page is opened directly (no form state). */
const fallbackSlot: Slot | undefined = slots.find((s) => s.service === 'test' && s.open)

function scheduleLabelFor(slot: Slot | undefined): string {
  if (!slot) return '일정 미선택'
  return `${formatKoreanDate(slot.date)} · ${slot.label}`
}

export default function CheckoutPage() {
  const { state } = useLocation()
  const order = (state ?? {}) as CheckoutLocationState

  const slot = (order.slotId ? findSlot(order.slotId) : undefined) ?? fallbackSlot
  const studentName = order.name?.trim() || demoCredential.name
  const amount = services.test.price

  const [method, setMethod] = useState('')
  const [agreed, setAgreed] = useState<AgreementState>({})

  const requiredAgreed = requiredAgreementIds.every((id) => agreed[id])
  const canPay = Boolean(method) && requiredAgreed

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="mx-auto w-full max-w-[760px] flex-1 px-5 pb-40 pt-10 sm:pt-14">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          신청 폼으로 돌아가기
        </Link>

        <header className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">결제</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            예약 정보를 확인하고 결제를 완료하세요.
          </p>
        </header>

        <div className="flex flex-col gap-6">
          <OrderSummary
            scheduleLabel={scheduleLabelFor(slot)}
            studentName={studentName}
            amount={amount}
          />

          <PaymentMethods value={method} onChange={setMethod} />

          <div className="flex items-start gap-3 rounded-xl bg-info-bg p-4 text-info-bg-foreground">
            <Info className="mt-0.5 size-5 shrink-0" />
            <p className="text-sm">
              실제 결제는 토스 페이먼츠 연동 단계에서 활성화됩니다. 현재는 결제 단계 디자인 미리보기입니다.
            </p>
          </div>

          <AgreementSection value={agreed} onChange={setAgreed} />
        </div>
      </main>

      <SiteFooter />

      {/* Fixed bottom action bar */}
      <div className="fixed bottom-0 left-0 z-30 w-full border-t border-border bg-card/95 px-5 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-[760px] flex-col items-center justify-between gap-3 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">결제 금액</span>
            <span className="font-display text-xl font-bold text-foreground">
              {formatPrice(amount)}
            </span>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                disabled={!canPay}
                className="h-12 w-full px-10 text-base font-semibold sm:w-auto"
              >
                {formatPrice(amount)} 결제하기
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>결제 단계 디자인 미리보기</AlertDialogTitle>
                <AlertDialogDescription>
                  토스 페이먼츠 결제 단계 UI 디자인입니다. 실제 결제 연동은 다음 단계에서 진행되며,
                  지금은 결제가 처리되지 않습니다.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction>확인</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  )
}
