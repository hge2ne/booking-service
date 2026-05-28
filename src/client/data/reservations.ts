// Mock reservation records — read by the client "내 예약 확인·취소" page (/my) and
// the /admin reservation log. No backend: lookups and cancellations live in React
// local state. `slotId` points into `slots` in ./scheduleSlots so date/time/price
// can be derived rather than duplicated.

import { findSlot, services, type ServiceType } from './scheduleSlots'

export type ReservationStatus = 'confirmed' | 'cancelled'

export interface Reservation {
  id: string // 예약번호, e.g. 'NP-20260520-001'
  name: string
  phone: string
  service: ServiceType
  slotId: string
  appliedAt: string // 신청일시, ISO datetime
  status: ReservationStatus
}

/** Demo credentials surfaced in the lookup UI so the mock can be exercised. */
export const demoCredential = { name: '홍길동', phone: '010-1234-5678' }

export const reservations: Reservation[] = [
  { id: 'NP-20260520-001', name: '홍길동', phone: '010-1234-5678', service: 'test', slotId: '0606-am', appliedAt: '2026-05-20T09:12:00', status: 'confirmed' },
  { id: 'NP-20260521-002', name: '홍길동', phone: '010-1234-5678', service: 'briefing', slotId: 'b-0605', appliedAt: '2026-05-21T14:03:00', status: 'confirmed' },
  { id: 'NP-20260519-003', name: '김서연', phone: '010-2222-3333', service: 'test', slotId: '0606-pm', appliedAt: '2026-05-19T10:30:00', status: 'confirmed' },
  { id: 'NP-20260522-004', name: '이준호', phone: '010-4444-5555', service: 'briefing', slotId: 'b-0608', appliedAt: '2026-05-22T16:45:00', status: 'confirmed' },
  { id: 'NP-20260523-005', name: '박지민', phone: '010-6666-7777', service: 'test', slotId: '0610-pm', appliedAt: '2026-05-23T11:20:00', status: 'cancelled' },
  { id: 'NP-20260524-006', name: '최유나', phone: '010-8888-9999', service: 'test', slotId: '0613-am', appliedAt: '2026-05-24T08:55:00', status: 'confirmed' },
  { id: 'NP-20260524-007', name: '정민재', phone: '010-1212-3434', service: 'briefing', slotId: 'b-0612', appliedAt: '2026-05-24T19:02:00', status: 'confirmed' },
  { id: 'NP-20260525-008', name: '강하늘', phone: '010-5656-7878', service: 'test', slotId: '0620-pm', appliedAt: '2026-05-25T13:40:00', status: 'confirmed' },
  { id: 'NP-20260526-009', name: '윤서아', phone: '010-9090-1010', service: 'briefing', slotId: 'b-0619', appliedAt: '2026-05-26T20:15:00', status: 'confirmed' },
  { id: 'NP-20260527-010', name: '임도윤', phone: '010-3434-5656', service: 'test', slotId: '0606-am', appliedAt: '2026-05-27T07:48:00', status: 'cancelled' },
]

/** Payment amount for a reservation, derived from its service. */
export function reservationAmount(r: Reservation): number {
  return services[r.service].price
}

const digits = (s: string) => s.replace(/\D/g, '')

/** Match reservations by name + phone (phone compared digits-only). */
export function lookupReservations(name: string, phone: string): Reservation[] {
  const n = name.trim()
  const p = digits(phone)
  if (!n || !p) return []
  return reservations.filter((r) => r.name === n && digits(r.phone) === p)
}

/** '₩5,000' / '무료' display for an amount. */
export function formatPrice(amount: number): string {
  return amount === 0 ? '무료' : `₩${amount.toLocaleString('ko-KR')}`
}

/** 'YYYY.MM.DD HH:mm' display for an ISO datetime. */
export function formatDateTime(iso: string): string {
  const d = new Date(iso)
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}.${p(d.getMonth() + 1)}.${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`
}

/** Human schedule label for a reservation's slot, e.g. '6월 6일 (토) · 오전 10:00'. */
export function reservationSlotLabel(r: Reservation): string {
  const slot = findSlot(r.slotId)
  if (!slot) return '-'
  const [, m, d] = slot.date.split('-').map(Number)
  const weekday = ['일', '월', '화', '수', '목', '금', '토'][new Date(slot.date).getDay()]
  return `${m}월 ${d}일 (${weekday}) · ${slot.label}`
}
