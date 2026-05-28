// UI-only placeholder options so the form renders. No backend/data layer yet —
// real schedules/courses/grades will be wired here later.

export const grades = ['초6', '중1', '중2', '중3', '고1'] as const

export interface CourseOption {
  id: string
  label: string
  closed?: boolean
}

export const courses: CourseOption[] = [
  { id: 'm1-1', label: '중1-1' },
  { id: 'm1-2', label: '중1-2' },
  { id: 'm2-1', label: '중2-1' },
  { id: 'm2-2', label: '중2-2', closed: true },
  { id: 'm3-1', label: '중3-1' },
]

export const genders = ['남', '여'] as const

export const studyMethods = ['학원', '과외', '인터넷강의', '독학'] as const

export const weekdays = ['월', '화', '수', '목', '금', '토', '일'] as const
