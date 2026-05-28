import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CalendarDays, TicketCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { SectionCard, StepProgress } from '@/client/components/form/primitives'
import ServiceSelect from '@/client/components/form/ServiceSelect'
import ScheduleStep from '@/client/components/steps/ScheduleStep'
import StudentInfoStep from '@/client/components/steps/StudentInfoStep'
import StudyInfoStep from '@/client/components/steps/StudyInfoStep'
import {
  initialSchedule,
  initialStudent,
  initialStudy,
  isScheduleComplete,
  isStudentComplete,
} from '@/client/components/steps/formState'
import { services, type ServiceType } from '@/client/data/scheduleSlots'
import { formatPrice } from '@/client/data/reservations'

export default function ApplyForm() {
  const [service, setService] = useState<ServiceType | ''>('')
  const [revealed, setRevealed] = useState(1)
  const [schedule, setSchedule] = useState(initialSchedule)
  const [student, setStudent] = useState(initialStudent)
  const [study, setStudy] = useState(initialStudy)
  const [submitted, setSubmitted] = useState(false)

  const step2Ref = useRef<HTMLDivElement>(null)
  const step3Ref = useRef<HTMLDivElement>(null)

  const isTest = service === 'test'
  const totalSteps = isTest ? 3 : 2

  const selectService = useCallback((s: ServiceType) => {
    setService(s)
    setSchedule(initialSchedule) // slots differ per service — start the 일정 over
    setRevealed(1)
    setSubmitted(false)
  }, [])

  const patchSchedule = useCallback(
    (p: Partial<typeof schedule>) => setSchedule((s) => ({ ...s, ...p })),
    [],
  )
  const patchStudent = useCallback(
    (p: Partial<typeof student>) => setStudent((s) => ({ ...s, ...p })),
    [],
  )
  const patchStudy = useCallback(
    (p: Partial<typeof study>) => setStudy((s) => ({ ...s, ...p })),
    [],
  )

  useEffect(() => {
    if (revealed === 1) return
    const ref = revealed === 2 ? step2Ref : step3Ref
    const id = window.setTimeout(
      () => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      90,
    )
    return () => window.clearTimeout(id)
  }, [revealed])

  return (
    <div>
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          신입생 예약 · 결제
        </h1>
        <p className="mt-2 text-muted-foreground">
          서비스 선택 → 일정 → 정보 입력 → 확인까지 한 번에 처리됩니다.
        </p>
        {service && <StepProgress current={revealed} total={totalSteps} />}
      </header>

      <div className="mt-10 flex flex-col gap-12">
        <section>
          <div className="mb-3 flex items-baseline gap-2">
            <span className="font-display text-sm font-bold tracking-tight text-primary">
              STEP 0
            </span>
            <h2 className="text-lg font-bold tracking-tight text-foreground">서비스 선택</h2>
          </div>
          <ServiceSelect value={service} onChange={selectService} />
        </section>

        {service && (
          <SectionCard step={1} title={isTest ? '일정' : '설명회 일정'} animate>
            <ScheduleStep key={service} value={schedule} onChange={patchSchedule} service={service} />
            {revealed === 1 && (
              <div className="mt-6 flex justify-end">
                <Button
                  onClick={() => setRevealed(2)}
                  disabled={!isScheduleComplete(schedule, service)}
                >
                  다음 단계
                </Button>
              </div>
            )}
          </SectionCard>
        )}

        {service && revealed >= 2 && (
          <div ref={step2Ref}>
            <SectionCard step={2} title={isTest ? '학생 정보' : '학생 기본정보'}>
              <StudentInfoStep
                value={student}
                onChange={patchStudent}
                showLearningFields={isTest}
              />
              {isTest && revealed === 2 && (
                <div className="mt-6 flex justify-end">
                  <Button onClick={() => setRevealed(3)} disabled={!isStudentComplete(student)}>
                    다음 단계
                  </Button>
                </div>
              )}
            </SectionCard>
          </div>
        )}

        {isTest && revealed >= 3 && (
          <div ref={step3Ref}>
            <SectionCard step={3} title="학습 정보">
              <StudyInfoStep value={study} onChange={patchStudy} />
            </SectionCard>

            <div className="mt-8">
              <Button
                className="h-13 w-full text-base font-semibold"
                disabled={!study.agree}
                onClick={() => setSubmitted(true)}
              >
                검증 및 결제 단계로 이동 · {formatPrice(services.test.price)}
              </Button>
              {submitted && (
                <p className="mt-3 text-center text-sm text-primary">
                  예약 정보가 확인되었습니다. (결제 단계는 준비 중입니다)
                </p>
              )}
            </div>
          </div>
        )}

        {service === 'briefing' && revealed >= 2 && (
          <div>
            <label
              htmlFor="briefing-agree"
              className="flex items-start gap-2 rounded-xl border border-border bg-card p-4 text-sm text-foreground"
            >
              <Checkbox
                id="briefing-agree"
                checked={study.agree}
                onCheckedChange={(c) => patchStudy({ agree: c === true })}
              />
              개인정보 수집 및 예약 약관에 동의합니다. (설명회는 무료로 진행됩니다)
            </label>
            <div className="mt-6">
              <Button
                className="h-13 w-full text-base font-semibold"
                disabled={!(isStudentComplete(student) && study.agree)}
                onClick={() => setSubmitted(true)}
              >
                설명회 신청 완료 · {formatPrice(services.briefing.price)}
              </Button>
              {submitted && (
                <p className="mt-3 text-center text-sm text-primary">
                  설명회 신청이 접수되었습니다. 신청 내역은 ‘내 예약’에서 확인할 수 있습니다.
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      <MyBookingsCta />
      <ScheduleVersionLinks />
    </div>
  )
}

function MyBookingsCta() {
  return (
    <section className="mt-14 flex flex-col items-start justify-between gap-4 rounded-xl border border-border bg-card p-6 shadow-[0_1px_10px_rgba(0,0,0,0.04)] sm:flex-row sm:items-center">
      <div className="flex items-center gap-3">
        <span className="inline-flex size-10 items-center justify-center rounded-lg bg-brand-tint text-primary">
          <TicketCheck className="size-5" />
        </span>
        <div>
          <p className="text-sm font-bold tracking-tight text-foreground">이미 신청하셨나요?</p>
          <p className="text-sm text-muted-foreground">
            예약 내역을 조회하고 취소할 수 있습니다.
          </p>
        </div>
      </div>
      <Button asChild variant="outline" className="shrink-0">
        <Link to="/my">
          내 예약 확인 · 취소
          <ArrowRight className="size-4" />
        </Link>
      </Button>
    </section>
  )
}

const scheduleVersions = [
  { to: '/schedule/shadcn', title: 'shadcn 버전', desc: 'shadcn/ui Calendar 컴포넌트' },
  { to: '/schedule/stitch', title: 'Stitch 버전', desc: 'Stitch 디자인 시스템 적용' },
  { to: '/schedule/react', title: 'react-calendar 버전', desc: 'React 패키지 + 디자인 토큰' },
] as const

function ScheduleVersionLinks() {
  return (
    <section className="mt-6 rounded-xl border border-dashed border-border bg-muted/40 p-6 sm:p-7">
      <div className="flex items-center gap-2">
        <CalendarDays className="size-5 text-primary" />
        <h2 className="text-base font-bold tracking-tight text-foreground">
          응시 일정 캘린더 · 디자인 버전 비교
        </h2>
      </div>
      <p className="mt-1.5 text-sm text-muted-foreground">
        응시 일정 선택 UI를 3가지 방식으로 디자인했습니다. 아래 버튼으로 각 버전을 확인해 보세요.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {scheduleVersions.map((v) => (
          <Link
            key={v.to}
            to={v.to}
            className="group rounded-lg border border-border bg-card p-4 transition-colors hover:border-brand hover:bg-brand-tint/40"
          >
            <span className="block text-sm font-semibold text-foreground group-hover:text-primary">
              {v.title}
            </span>
            <span className="mt-0.5 block text-xs text-muted-foreground">{v.desc}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
