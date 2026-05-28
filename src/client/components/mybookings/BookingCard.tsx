import { CalendarClock, Hash } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { services } from '@/client/data/scheduleSlots'
import {
  formatPrice,
  reservationAmount,
  reservationSlotLabel,
  type Reservation,
} from '@/client/data/reservations'

export default function BookingCard({
  reservation,
  onCancel,
}: Readonly<{
  reservation: Reservation
  onCancel: (id: string) => void
}>) {
  const cancelled = reservation.status === 'cancelled'
  const meta = services[reservation.service]

  return (
    <div
      className={cn(
        'rounded-xl border bg-card p-5 shadow-[0_1px_10px_rgba(0,0,0,0.04)] transition-colors',
        cancelled ? 'border-border opacity-70' : 'border-border',
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <Badge
          className={
            reservation.service === 'briefing'
              ? 'bg-success/15 text-success'
              : 'bg-brand-tint text-primary'
          }
        >
          {meta.name}
        </Badge>
        {cancelled ? (
          <Badge variant="destructive">취소됨</Badge>
        ) : (
          <Badge className="bg-success text-success-foreground">예약완료</Badge>
        )}
        <span className="ml-auto text-sm font-semibold text-foreground">
          {formatPrice(reservationAmount(reservation))}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-2 text-foreground">
        <CalendarClock className="size-4 text-primary" />
        <span className={cn('font-display text-base font-bold', cancelled && 'line-through')}>
          {reservationSlotLabel(reservation)}
        </span>
      </div>

      <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
        <Hash className="size-3.5" />
        예약번호 {reservation.id}
      </div>

      {!cancelled && (
        <div className="mt-5 flex justify-end border-t border-border pt-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                예약 취소
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>예약을 취소할까요?</AlertDialogTitle>
                <AlertDialogDescription>
                  {meta.name} · {reservationSlotLabel(reservation)} 예약(번호 {reservation.id})이
                  취소됩니다. 이 작업은 되돌릴 수 없습니다.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>돌아가기</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onCancel(reservation.id)}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  예약 취소
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </div>
  )
}
