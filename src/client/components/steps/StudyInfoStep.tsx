import { FieldLabel, HelperText, Chip } from '@/client/components/form/primitives'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { weekdays } from '@/client/data/formOptions'
import type { StudyState } from './formState'

export default function StudyInfoStep({
  value,
  onChange,
}: Readonly<{
  value: StudyState
  onChange: (patch: Partial<StudyState>) => void
}>) {
  const toggleDay = (day: string) => {
    const next = value.days.includes(day)
      ? value.days.filter((d) => d !== day)
      : [...value.days, day]
    onChange({ days: next })
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <FieldLabel htmlFor="academy">다닌 학원명 (선택)</FieldLabel>
        <Textarea
          id="academy"
          rows={3}
          placeholder="예 : OO수학전문학원"
          value={value.academy}
          onChange={(e) => onChange({ academy: e.target.value })}
        />
        <HelperText>여러 곳일 경우 줄바꿈으로 나눠 입력하세요.</HelperText>
      </div>

      <div>
        <FieldLabel required htmlFor="progress">
          학습 진도 / 교재 (자세히)
        </FieldLabel>
        <Textarea
          id="progress"
          rows={3}
          placeholder="예: 중1-1학기 완료, 중1-2학기 평면도형 학습중 / 중1-1 개념원리, 중1-2 RPM"
          value={value.progress}
          onChange={(e) => onChange({ progress: e.target.value })}
        />
      </div>

      <div>
        <FieldLabel note="(이번에 모집하지 않는 요일은 표시되지 않습니다)">희망 요일</FieldLabel>
        <div className="flex flex-wrap gap-2">
          {weekdays.map((d) => (
            <Chip
              key={d}
              label={d}
              selected={value.days.includes(d)}
              onClick={() => toggleDay(d)}
            />
          ))}
        </div>
      </div>

      <div className="flex items-start gap-2 rounded-xl bg-info-bg p-4 text-sm text-info-bg-foreground">
        <span aria-hidden className="mt-0.5 select-none">ⓘ</span>
        <p className="leading-relaxed">
          일부 학년/시험범위는 조기 마감될 수 있습니다. 퇴원 후 3개월 이내 재응시는 제한될 수 있으며,
          연속 응시는 관리자 확인이 필요합니다.
        </p>
      </div>

      <div className="flex items-center justify-between border-t border-border pt-5">
        <label htmlFor="agree" className="flex items-center gap-2 text-sm text-foreground">
          <Checkbox
            id="agree"
            checked={value.agree}
            onCheckedChange={(c) => onChange({ agree: c === true })}
          />
          개인정보 수집 및 예약 약관에 동의합니다.
        </label>
        <a href="#" className="text-sm text-muted-foreground hover:text-primary">
          자세히 보기 &rsaquo;
        </a>
      </div>
    </div>
  )
}
