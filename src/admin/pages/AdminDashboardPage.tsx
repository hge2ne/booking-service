import { useMemo, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AdminShell from '@/admin/components/AdminShell'
import StatCards, { type AdminStats } from '@/admin/components/StatCards'
import ReservationLog from '@/admin/components/ReservationLog'
import SlotManager from '@/admin/components/SlotManager'
import { slots as seedSlots } from '@/client/data/scheduleSlots'
import { reservations, reservationAmount } from '@/client/data/reservations'

export default function AdminDashboardPage() {
  // Local working copy so open/close toggles take effect without a backend.
  const [slots, setSlots] = useState(() => seedSlots.map((s) => ({ ...s })))

  const toggleSlot = (id: string) =>
    setSlots((prev) => prev.map((s) => (s.id === id ? { ...s, open: !s.open } : s)))

  const stats = useMemo<AdminStats>(
    () => ({
      total: reservations.length,
      briefing: reservations.filter((r) => r.service === 'briefing').length,
      test: reservations.filter((r) => r.service === 'test').length,
      revenue: reservations
        .filter((r) => r.status === 'confirmed')
        .reduce((sum, r) => sum + reservationAmount(r), 0),
      openSlots: slots.filter((s) => s.open).length,
    }),
    [slots],
  )

  return (
    <AdminShell>
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">예약 관리 대시보드</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          입학 테스트·설명회 예약 현황을 확인하고 시간대 슬롯을 관리합니다.
        </p>
      </header>

      <StatCards stats={stats} />

      <Tabs defaultValue="log" className="mt-8">
        <TabsList>
          <TabsTrigger value="log">예약 신청 현황</TabsTrigger>
          <TabsTrigger value="slots">슬롯 관리</TabsTrigger>
        </TabsList>
        <TabsContent value="log" className="mt-5">
          <ReservationLog reservations={reservations} />
        </TabsContent>
        <TabsContent value="slots" className="mt-5">
          <SlotManager slots={slots} onToggle={toggleSlot} />
        </TabsContent>
      </Tabs>
    </AdminShell>
  )
}
