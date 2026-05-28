// Shared mock for 예약 일정 slots — read by the apply form, the /schedule comparison
// pages, and the /admin dashboard. Two services: 설명회(briefing, free) and
// 테스트(test, ₩5,000). Every slot is a specific date + time and is CLOSED by
// default; an admin "opens" individual slots, and only OPEN slots are selectable.
// No backend yet — these arrays stand in for what /admin controls in local state.

export type ServiceType = 'briefing' | 'test'

export interface ServiceMeta {
  id: ServiceType
  name: string
  price: number
  blurb: string
}

export const services: Record<ServiceType, ServiceMeta> = {
  briefing: { id: 'briefing', name: '설명회', price: 0, blurb: '학사 안내 · 입학 설명회 (무료)' },
  test: { id: 'test', name: '입학 테스트', price: 5000, blurb: '학년별 배치 진단 테스트 (₩5,000)' },
}

export const serviceList: ServiceMeta[] = [services.briefing, services.test]

export interface Slot {
  id: string
  service: ServiceType
  date: string // ISO 'YYYY-MM-DD'
  time: string // '10:00'
  label: string // '오전 10:00'
  capacity: number
  open: boolean // admin-controlled; default closed
}

/** @deprecated kept as an alias for older imports — use {@link Slot}. */
export type TestSlot = Slot

export const slots: Slot[] = [
  // 입학 테스트 (₩5,000)
  { id: '0606-am', service: 'test', date: '2026-06-06', time: '10:00', label: '오전 10:00', capacity: 12, open: true },
  { id: '0606-pm', service: 'test', date: '2026-06-06', time: '14:00', label: '오후 2:00', capacity: 12, open: true },
  { id: '0610-pm', service: 'test', date: '2026-06-10', time: '16:00', label: '오후 4:00', capacity: 8, open: true },
  { id: '0613-am', service: 'test', date: '2026-06-13', time: '10:00', label: '오전 10:00', capacity: 10, open: true },
  { id: '0613-pm', service: 'test', date: '2026-06-13', time: '14:00', label: '오후 2:00', capacity: 12, open: false },
  { id: '0617-pm', service: 'test', date: '2026-06-17', time: '16:00', label: '오후 4:00', capacity: 8, open: false },
  { id: '0620-am', service: 'test', date: '2026-06-20', time: '10:00', label: '오전 10:00', capacity: 12, open: false },
  { id: '0620-pm', service: 'test', date: '2026-06-20', time: '14:00', label: '오후 2:00', capacity: 12, open: true },
  { id: '0627-am', service: 'test', date: '2026-06-27', time: '10:00', label: '오전 10:00', capacity: 12, open: false },
  { id: '0627-pm', service: 'test', date: '2026-06-27', time: '14:00', label: '오후 2:00', capacity: 12, open: false },

  // 설명회 (무료)
  { id: 'b-0605', service: 'briefing', date: '2026-06-05', time: '19:00', label: '저녁 7:00', capacity: 40, open: true },
  { id: 'b-0608', service: 'briefing', date: '2026-06-08', time: '11:00', label: '오전 11:00', capacity: 40, open: true },
  { id: 'b-0612', service: 'briefing', date: '2026-06-12', time: '19:00', label: '저녁 7:00', capacity: 40, open: true },
  { id: 'b-0615', service: 'briefing', date: '2026-06-15', time: '11:00', label: '오전 11:00', capacity: 40, open: false },
  { id: 'b-0619', service: 'briefing', date: '2026-06-19', time: '19:00', label: '저녁 7:00', capacity: 40, open: true },
  { id: 'b-0623', service: 'briefing', date: '2026-06-23', time: '11:00', label: '오전 11:00', capacity: 40, open: false },
  { id: 'b-0626', service: 'briefing', date: '2026-06-26', time: '19:00', label: '저녁 7:00', capacity: 40, open: false },
]

/** All test-service slots — kept for the /schedule comparison pages. */
export const testSlots: Slot[] = slots.filter((s) => s.service === 'test')

/** Month the calendars open on, matching the mock data above. */
export const defaultMonth = new Date(2026, 5, 1) // June 2026

/** First date that has data for a service — used to seed the calendar view. */
export function defaultViewDate(service: ServiceType): string {
  return service === 'briefing' ? '2026-06-05' : '2026-06-06'
}

const WEEKDAYS_KO = ['일', '월', '화', '수', '목', '금', '토'] as const

/** Local-time ISO date ('YYYY-MM-DD') — avoids the UTC shift of toISOString(). */
export function toISODate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function formatKoreanDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  const weekday = WEEKDAYS_KO[new Date(y, m - 1, d).getDay()]
  return `${m}월 ${d}일 (${weekday})`
}

/** Every slot on a date for a service (open + closed), so closed ones render disabled. */
export function getSlotsForDate(iso: string, service: ServiceType = 'test'): Slot[] {
  return slots.filter((s) => s.service === service && s.date === iso)
}

/** A date is selectable only if it has at least one admin-opened slot for the service. */
export function isDateAvailable(iso: string, service: ServiceType = 'test'): boolean {
  return slots.some((s) => s.service === service && s.date === iso && s.open)
}

/** Set of ISO dates with ≥1 open slot for a service — handy for calendar tile gating. */
export function availableDatesFor(service: ServiceType): ReadonlySet<string> {
  return new Set(slots.filter((s) => s.service === service && s.open).map((s) => s.date))
}

/** Test-service open dates — kept for the /schedule comparison pages. */
export const availableDates: ReadonlySet<string> = availableDatesFor('test')

export function findSlot(id: string): Slot | undefined {
  return slots.find((s) => s.id === id)
}
