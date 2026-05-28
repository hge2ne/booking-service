import { FieldLabel, pillButtonClass } from '@/client/components/form/primitives'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { genders, studyMethods } from '@/client/data/formOptions'
import type { StudentState } from './formState'

export default function StudentInfoStep({
  value,
  onChange,
  showLearningFields = true,
}: Readonly<{
  value: StudentState
  onChange: (patch: Partial<StudentState>) => void
  showLearningFields?: boolean
}>) {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
        <div>
          <FieldLabel required htmlFor="student-name">
            학생 이름
          </FieldLabel>
          <Input
            id="student-name"
            placeholder="예: 김하늘"
            value={value.name}
            onChange={(e) => onChange({ name: e.target.value })}
          />
        </div>
        <div>
          <FieldLabel required>성별</FieldLabel>
          <Select value={value.gender} onValueChange={(v) => onChange({ gender: v })}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="선택" />
            </SelectTrigger>
            <SelectContent>
              {genders.map((g) => (
                <SelectItem key={g} value={g}>
                  {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <FieldLabel required htmlFor="school">
          학교명
        </FieldLabel>
        <Input
          id="school"
          placeholder="예: 서울중, 휘문고"
          value={value.school}
          onChange={(e) => onChange({ school: e.target.value })}
        />
      </div>

      <div>
        <FieldLabel required>학부모 휴대전화 · 인증번호</FieldLabel>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex gap-2">
            <Input
              inputMode="tel"
              placeholder="010-1234-5678"
              value={value.phone}
              onChange={(e) => onChange({ phone: e.target.value })}
            />
            <button type="button" className={pillButtonClass}>
              인증번호 발송
            </button>
          </div>
          <div className="flex gap-2">
            <Input
              inputMode="numeric"
              maxLength={6}
              placeholder="인증번호 6자리"
              value={value.code}
              onChange={(e) => onChange({ code: e.target.value })}
            />
            <button type="button" className={pillButtonClass}>
              인증하기
            </button>
          </div>
        </div>
      </div>

      <div>
        <FieldLabel required note="차량안내를 위한 참고자료이며, 세부주소는 입력하지 않습니다.">
          주소
        </FieldLabel>
        <div className="flex gap-2">
          <Input
            placeholder="주소를 입력하세요."
            value={value.address}
            onChange={(e) => onChange({ address: e.target.value })}
          />
          <button type="button" className={`${pillButtonClass} shrink-0`}>
            주소찾기
          </button>
        </div>
        <div className="mt-2">
          <Input
            placeholder="상세주소 입력"
            value={value.detailAddress}
            onChange={(e) => onChange({ detailAddress: e.target.value })}
          />
        </div>
      </div>

      {showLearningFields && (
        <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
          <div>
            <FieldLabel required>학습 방법</FieldLabel>
            <Select value={value.method} onValueChange={(v) => onChange({ method: v })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {studyMethods.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <FieldLabel required htmlFor="period">
              학습 기간
            </FieldLabel>
            <Input
              id="period"
              placeholder="예: 6개월"
              value={value.period}
              onChange={(e) => onChange({ period: e.target.value })}
            />
          </div>
        </div>
      )}
    </div>
  )
}
