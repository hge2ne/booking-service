export interface ScheduleState {
  grade: string
  slotId: string
  courses: string[]
}

export interface StudentState {
  name: string
  gender: string
  school: string
  phone: string
  code: string
  address: string
  detailAddress: string
  method: string
  period: string
}

export interface StudyState {
  academy: string
  progress: string
  days: string[]
  agree: boolean
}

export const initialSchedule: ScheduleState = { grade: '', slotId: '', courses: [] }
export const initialStudent: StudentState = {
  name: '',
  gender: '',
  school: '',
  phone: '',
  code: '',
  address: '',
  detailAddress: '',
  method: '',
  period: '',
}
export const initialStudy: StudyState = { academy: '', progress: '', days: [], agree: false }

import type { ServiceType } from '@/client/data/scheduleSlots'

// 설명회(briefing) only needs a time slot; 입학 테스트(test) also needs 학년 + 과정.
export const isScheduleComplete = (s: ScheduleState, service: ServiceType = 'test') =>
  service === 'briefing'
    ? Boolean(s.slotId)
    : Boolean(s.grade && s.slotId && s.courses.length > 0)

export const isStudentComplete = (s: StudentState) =>
  Boolean(s.name && s.gender && s.school && s.phone && s.address)
