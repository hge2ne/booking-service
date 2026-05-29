// Static definitions for the 토스 페이먼츠 결제 단계 UI (design only — no real integration).
// Payment methods = the Toss 기본 세트; agreements gate the 결제 button.

import { CircleDollarSign, type LucideIcon } from 'lucide-react'

export interface PaymentMethod {
  id: string
  label: string
  icon: LucideIcon
}

export const paymentMethods: PaymentMethod[] = [
  { id: 'tosspay', label: '토스페이', icon: CircleDollarSign },
]

export interface Agreement {
  id: string
  label: string
  required: boolean
  body: string
}

export const agreements: Agreement[] = [
  {
    id: 'pg',
    label: '결제대행 서비스 이용약관',
    required: true,
    body: '결제는 토스페이먼츠(PG)를 통해 처리되며, 본인은 결제대행 서비스 이용약관에 동의합니다. (디자인 데모 — 실제 약관 전문은 연동 단계에서 제공됩니다.)',
  },
  {
    id: 'privacy',
    label: '개인정보 수집·이용 동의',
    required: true,
    body: '예약·결제 처리를 위해 응시생 이름, 연락처, 결제 정보가 수집·이용됩니다. 수집된 정보는 서비스 제공 목적 외로 사용되지 않습니다.',
  },
  {
    id: 'thirdparty',
    label: '개인정보 제3자 제공 동의',
    required: true,
    body: '결제 처리를 위해 결제대행사(토스페이먼츠)에 결제에 필요한 최소한의 정보가 제공됩니다.',
  },
  {
    id: 'marketing',
    label: '마케팅 정보 수신',
    required: false,
    body: '설명회·신규 과정 안내 등 마케팅 정보를 문자/이메일로 받아봅니다. 선택 항목이며 동의하지 않아도 결제가 가능합니다.',
  },
]

export const requiredAgreementIds = agreements.filter((a) => a.required).map((a) => a.id)
