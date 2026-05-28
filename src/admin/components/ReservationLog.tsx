import { useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { services, type ServiceType } from '@/client/data/scheduleSlots'
import {
  formatDateTime,
  formatPrice,
  reservationAmount,
  reservationSlotLabel,
  type Reservation,
} from '@/client/data/reservations'

type Filter = 'all' | ServiceType

const filters: { key: Filter; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'briefing', label: '설명회' },
  { key: 'test', label: '입학 테스트' },
]

export default function ReservationLog({
  reservations,
}: Readonly<{ reservations: Reservation[] }>) {
  const [filter, setFilter] = useState<Filter>('all')

  const rows = useMemo(() => {
    const list = filter === 'all' ? reservations : reservations.filter((r) => r.service === filter)
    return [...list].sort((a, b) => b.appliedAt.localeCompare(a.appliedAt))
  }, [reservations, filter])

  return (
    <div className="rounded-xl border border-border bg-card shadow-[0_1px_10px_rgba(0,0,0,0.04)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-5">
        <div>
          <h2 className="text-base font-bold tracking-tight text-foreground">예약 신청 현황</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            신청일시 최신순 · 총 {rows.length}건
          </p>
        </div>
        <div className="inline-flex rounded-lg bg-muted p-0.5">
          {filters.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={cn(
                'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                filter === f.key
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="whitespace-nowrap">신청일시</TableHead>
              <TableHead className="whitespace-nowrap">예약번호</TableHead>
              <TableHead className="whitespace-nowrap">이름</TableHead>
              <TableHead className="whitespace-nowrap">연락처</TableHead>
              <TableHead className="whitespace-nowrap">서비스</TableHead>
              <TableHead className="whitespace-nowrap">일정</TableHead>
              <TableHead className="whitespace-nowrap text-right">금액</TableHead>
              <TableHead className="whitespace-nowrap">상태</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="py-10 text-center text-muted-foreground">
                  해당 조건의 신청 내역이 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {formatDateTime(r.appliedAt)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap font-medium text-foreground">
                    {r.id}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{r.name}</TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {r.phone}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Badge
                      className={
                        r.service === 'briefing'
                          ? 'bg-success/15 text-success'
                          : 'bg-brand-tint text-primary'
                      }
                    >
                      {services[r.service].name}
                    </Badge>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{reservationSlotLabel(r)}</TableCell>
                  <TableCell className="whitespace-nowrap text-right font-medium">
                    {formatPrice(reservationAmount(r))}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {r.status === 'cancelled' ? (
                      <Badge variant="destructive">취소됨</Badge>
                    ) : (
                      <Badge className="bg-success text-success-foreground">예약완료</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
