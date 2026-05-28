import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, CalendarX2, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import SiteHeader from '@/client/components/SiteHeader'
import SiteFooter from '@/client/components/SiteFooter'
import MyBookingLogin from '@/client/components/mybookings/MyBookingLogin'
import BookingCard from '@/client/components/mybookings/BookingCard'
import { lookupReservations, type Reservation } from '@/client/data/reservations'

export default function MyBookingsPage() {
  const [account, setAccount] = useState<{ name: string; phone: string } | null>(null)
  const [results, setResults] = useState<Reservation[]>([])

  const handleLookup = (name: string, phone: string) => {
    setAccount({ name: name.trim(), phone: phone.trim() })
    setResults(lookupReservations(name, phone))
  }

  const handleCancel = (id: string) => {
    setResults((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'cancelled' as const } : r)),
    )
  }

  const reset = () => {
    setAccount(null)
    setResults([])
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="mx-auto w-full max-w-[680px] flex-1 px-5 py-10 sm:py-14">
        <header>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            신청 화면으로
          </Link>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            내 예약 확인 · 취소
          </h1>
          <p className="mt-2 text-muted-foreground">
            예약 내역을 조회하고, 필요 시 예약을 취소할 수 있습니다.
          </p>
        </header>

        <div className="mt-8">
          {account === null ? (
            <MyBookingLogin onSubmit={handleLookup} />
          ) : (
            <div>
              <div className="mb-5 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{account.name}</span>님의 예약
                  내역 · 총 {results.length}건
                </p>
                <Button variant="outline" size="sm" onClick={reset}>
                  <RotateCcw className="size-4" />
                  다시 조회
                </Button>
              </div>

              {results.length === 0 ? (
                <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border bg-muted/40 p-10 text-center">
                  <CalendarX2 className="size-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    입력하신 정보와 일치하는 예약이 없습니다.
                    <br />
                    이름과 휴대폰번호를 다시 확인해 주세요.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {results.map((r) => (
                    <BookingCard key={r.id} reservation={r} onCancel={handleCancel} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
