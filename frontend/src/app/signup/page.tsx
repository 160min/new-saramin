'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const router = useRouter()

  const [name, setName] = useState('')
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')

  // 전화번호 자동 하이픈 추가
  const handlePhone = (value: string) => {
    const numbers = value.replace(/[^0-9]/g, '')
    if (numbers.length <= 3) {
      setPhone(numbers)
    } else if (numbers.length <= 7) {
      setPhone(`${numbers.slice(0, 3)}-${numbers.slice(3)}`)
    } else {
      setPhone(`${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`)
    }
  }

  // 회원가입 버튼 클릭
  const handleSignup = () => {
    if (!name || !nickname || !email || !phone || !password || !passwordCheck) {
      alert('모든 항목을 입력해주세요.')
      return
    }
    if (!email.includes('@')) {
      alert('이메일 형식이 올바르지 않습니다.')
      return
    }
    if (password.length < 8) {
      alert('비밀번호는 8자 이상 입력해주세요.')
      return
    }
    if (password !== passwordCheck) {
      alert('비밀번호가 일치하지 않습니다.')
      return
    }
    alert('회원가입이 완료되었습니다!')
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-[#F0F4F8] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-10 w-[440px]">

        {/* 제목 */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#1E293B]">회원가입</h1>
          <p className="text-sm text-[#94A3B8] mt-2">나에게 맞는 채용 정보를 지금 바로 받아보세요</p>
        </div>

        {/* 이름 + 닉네임 */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1">
            <label className="block text-xs font-medium text-[#475569] mb-1">이름</label>
            <input
              type="text"
              placeholder="홍길동"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-11 px-3 text-sm border border-[#E2E8F0] rounded-lg bg-[#F8FAFC] focus:outline-none focus:border-[#185FA5]"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-[#475569] mb-1">닉네임</label>
            <input
              type="text"
              placeholder="nick123"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full h-11 px-3 text-sm border border-[#E2E8F0] rounded-lg bg-[#F8FAFC] focus:outline-none focus:border-[#185FA5]"
            />
          </div>
        </div>

        {/* 이메일 */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-[#475569] mb-1">이메일</label>
          <input
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-11 px-3 text-sm border border-[#E2E8F0] rounded-lg bg-[#F8FAFC] focus:outline-none focus:border-[#185FA5]"
          />
        </div>

        {/* 전화번호 */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-[#475569] mb-1">전화번호</label>
          <input
            type="tel"
            placeholder="010-0000-0000"
            value={phone}
            onChange={(e) => handlePhone(e.target.value)}
            className="w-full h-11 px-3 text-sm border border-[#E2E8F0] rounded-lg bg-[#F8FAFC] focus:outline-none focus:border-[#185FA5]"
          />
        </div>

        {/* 비밀번호 */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-[#475569] mb-1">비밀번호</label>
          <input
            type="password"
            placeholder="8자 이상 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-11 px-3 text-sm border border-[#E2E8F0] rounded-lg bg-[#F8FAFC] focus:outline-none focus:border-[#185FA5]"
          />
        </div>

        {/* 비밀번호 확인 */}
        <div className="mb-6">
          <label className="block text-xs font-medium text-[#475569] mb-1">비밀번호 확인</label>
          <input
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
            className="w-full h-11 px-3 text-sm border border-[#E2E8F0] rounded-lg bg-[#F8FAFC] focus:outline-none focus:border-[#185FA5]"
          />
        </div>

        {/* 회원가입 버튼 */}
        <button
          onClick={handleSignup}
          className={`w-full h-12 font-bold rounded-lg transition-colors text-white ${
            name && nickname && email && phone && password && passwordCheck
              ? 'bg-[#185FA5]'
              : 'bg-[#CBD5E1]'
          }`}
        >
          회원가입
        </button>

        {/* 로그인 링크 */}
        <p className="text-center text-xs text-[#94A3B8] mt-4">
          이미 계정이 있으신가요?{' '}
          <span
            onClick={() => router.push('/login')}
            className="text-[#185FA5] underline cursor-pointer"
          >
            로그인
          </span>
        </p>

      </div>
    </div>
  )
}