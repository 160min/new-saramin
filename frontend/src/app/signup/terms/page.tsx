'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const CONTETN = {
  terms: `제1조 (목적) 본 약관은 서비스 이용에 관한 기본적인 사항을 규정합니다.
제2조 (이용계약) 이용자가 회원가입 신청 후 회사가 승인함으로써 계약이 성립됩니다.
제3조 (서비스 이용) 회원은 본 약관 및 관련 법령을 준수하여 서비스를 이용해야 합니다.`,

  privacy: `1. 수집 항목: 이름, 닉네임, 이메일, 전화번호
2. 수집 목적: 회원 식별, 서비스 제공 및 고객 지원
3. 보유 기간: 회원 탈퇴 시까지 보유 후 즉시 파기합니다.`,

  notify: `1. 수신 항목: 채용 공고 알림, 서비스 업데이트 안내
2. 수신 방법: 이메일 및 앱 푸시 알림
3. 동의 철회: 마이페이지에서 언제든지 수신 거부 가능합니다.`,
}

const CustomCheckbox = ({
  checked,
  onChange,
  className = ''
}: {
  checked: boolean
  onChange: () => void
  className?: string
}) => {
  return (
    <div
      onClick={onChange}
      className={`w-4 h-4 rounded flex-shrink-0 border-2 cursor-pointer flex items-center justify-center transition-colors ${className} ${
        checked
          ? 'bg-[#185FA5] border-[#185FA5]'
          : 'bg-[#CBD5E1] border-[#CBD5E1]'
      }`}
    >
      {checked && (
        <svg width={10} height={10} viewBox="0 0 12 12" fill="none">
          <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
    </div>
  )
}

export default function TermsPage() {
  const router = useRouter()
  const [allChecked, setAllChecked] = useState(false)
  const [terms, setTerms] = useState(false)
  const [privacy, setPrivacy] = useState(false)
  const [notify, setnotify] = useState(false)

  const [modalContent, setModalContent] = useState<{ title: string; content: string } | null>(null)

  const handleAllCheck = () => {
    const next = !allChecked
    setAllChecked(next)
    setTerms(next)
    setPrivacy(next)
    setnotify(next)
  }

  const handleSingleCheck = (
    setter: (v: boolean) => void,
    current: boolean,
    others: boolean[]
  ) => {
    const next = !current
    setter(next)
    setAllChecked(next && others.every(Boolean))
  }

  const handleNext = () => {
    if (!terms || !privacy) {
      alert('필수 약관에 동의해주세요.')
      return
    }
    router.push('/signup')
  }

  return (
    <div className="min-h-screen bg-[#F0F4F8] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-10 w-[440px]">

        {/* 제목 */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#1E293B]">서비스 이용약관</h1>
          <p className="text-sm text-[#94A3B8] mt-2">서비스 이용을 위해 아래 약관에 동의해주세요</p>
        </div>

        {/* 전체 동의 */}
        <div className="mb-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <CustomCheckbox checked={allChecked} onChange={handleAllCheck} className="mt-1" />
            <div>
              <p className="font-bold text-[#1E293B]">전체 동의하기</p>
              <p className="text-xs text-[#94A3B8] mt-1">
                이용약관(필수), 개인정보처리방침(필수), 서비스 알림 수신(선택) 동의를 포함합니다.
              </p>
            </div>
          </label>
        </div>

        {/* 구분선 */}
        <hr className="border-[#E2E8F0] mb-4" />

        {/* 이용약관 */}
        <div className="flex items-center justify-between mb-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <CustomCheckbox
              checked={terms}
              onChange={() => handleSingleCheck(setTerms, terms, [privacy, notify])}
            />
            <span className="text-sm text-[#1E293B]">이용약관 (필수)</span>
          </label>
          <button
            onClick={() => setModalContent({ title: '이용약관', content: CONTETN.terms })}
            className="text-xs text-[#185FA5] underline"
          >
            보기
          </button>
        </div>

        {/* 개인정보처리방침 */}
        <div className="flex items-center justify-between mb-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <CustomCheckbox
              checked={privacy}
              onChange={() => handleSingleCheck(setPrivacy, privacy, [terms, notify])}
            />
            <span className="text-sm text-[#1E293B]">개인정보처리방침 (필수)</span>
          </label>
          <button
            onClick={() => setModalContent({ title: '개인정보처리방침', content: CONTETN.privacy })}
            className="text-xs text-[#185FA5] underline"
          >
            보기
          </button>
        </div>

        {/* 알림 수신 */}
        <div className="flex items-center justify-between mb-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <CustomCheckbox
              checked={notify}
              onChange={() => handleSingleCheck(setnotify, notify, [terms, privacy])}
            />
            <span className="text-sm text-[#1E293B]">채용 공고 및 서비스 알림 수신 (선택)</span>
          </label>
          <button
            onClick={() => setModalContent({ title: '서비스 알림 수신', content: CONTETN.notify })}
            className="text-xs text-[#185FA5] underline"
          >
            보기
          </button>
        </div>

        {/* 개인정보 수집 안내 */}
        <div className="mb-6">
          <p className="text-xs font-bold text-[#475569] mb-2">• 개인정보 수집 및 이용 안내</p>
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-4">
            <p className="text-xs text-[#94A3B8] leading-5">
              수집 항목: 이름, 닉네임, 이메일, 전화번호<br />
              수집 목적: 회원 식별 및 서비스 제공<br />
              보유 기간: 회원 탈퇴 시까지
            </p>
          </div>
        </div>

        {/* 다음 버튼 */}
        <button
          onClick={handleNext}
          className={`w-full h-12 font-bold rounded-lg transition-colors text-white ${
            terms && privacy
              ? 'bg-[#185FA5]'
              : 'bg-[#CBD5E1]'
          }`}
        >
          다음
        </button>

      </div>

      {/* 모달 */}
      {modalContent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50">
          <div className="bg-white rounded-2xl p-8 w-[500px]">
            <h2 className="text-lg font-bold text-[#1E293B] mb-4">{modalContent.title}</h2>
            <p className="text-sm text-[#475569] leading-6 whitespace-pre-line mb-6">
              {modalContent.content}
            </p>
            <button
              onClick={() => setModalContent(null)}
              className="w-full h-11 bg-[#185FA5] text-white font-bold rounded-lg"
            >
              확인
            </button>
          </div>
        </div>
      )}

    </div>
  )
}