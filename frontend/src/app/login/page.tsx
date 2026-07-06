'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({
    id: '',
    password: '',
  })

  const handleLogin = () => {
    const newErrors = { id: '', password: '' }
    let hasError = false

    if (!id) {
      newErrors.id = '아이디를 입력해주세요.'
      hasError = true
    }
    if (!password) {
      newErrors.password = '비밀번호를 입력해주세요.'
      hasError = true
    }

    setErrors(newErrors)
    if (hasError) return

    // 임시 로그인 (백엔드 연결 전)
    if (id === 'test' && password === '12345678') {
      router.push('/')
    } else {
      setErrors({
        id: '',
        password: '아이디 또는 비밀번호가 올바르지 않습니다.',
      })
    }
  }

  // 엔터키로 로그인
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleLogin()
  }

  return (
    <div className="min-h-screen bg-[#F0F4F8] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-10 w-[440px]">

        {/* 제목 */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#1E293B]">로그인</h1>
          <p className="text-sm text-[#94A3B8] mt-2">나에게 맞는 채용 정보를 지금 바로 받아보세요</p>
        </div>

        {/* 아이디 */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-[#475569] mb-1">아이디</label>
          <input
            type="text"
            placeholder="아이디를 입력하세요"
            value={id}
            onChange={(e) => { setId(e.target.value); setErrors((prev) => ({ ...prev, id: '' })) }}
            onKeyDown={handleKeyDown}
            className={`w-full h-11 px-3 text-sm border rounded-lg bg-[#F8FAFC] focus:outline-none focus:border-[#185FA5] ${errors.id ? 'border-red-400' : 'border-[#E2E8F0]'}`}
          />
          {errors.id && <p className="text-xs text-red-400 mt-1.5 font-medium">{errors.id}</p>}
        </div>

        {/* 비밀번호 */}
        <div className="mb-6">
          <label className="block text-xs font-medium text-[#475569] mb-1">비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setErrors((prev) => ({ ...prev, password: '' })) }}
            onKeyDown={handleKeyDown}
            className={`w-full h-11 px-3 text-sm border rounded-lg bg-[#F8FAFC] focus:outline-none focus:border-[#185FA5] ${errors.password ? 'border-red-400' : 'border-[#E2E8F0]'}`}
          />
          {errors.password && <p className="text-xs text-red-400 mt-1.5 font-medium">{errors.password}</p>}
        </div>

        {/* 로그인 버튼 */}
        <button
          onClick={handleLogin}
          className={`w-full h-12 font-bold rounded-lg transition-colors text-white ${
            id && password ? 'bg-[#185FA5]' : 'bg-[#CBD5E1]'
          }`}
        >
          로그인
        </button>

        {/* 회원가입 링크 */}
        <p className="text-center text-xs text-[#94A3B8] mt-4">
          아직 계정이 없으신가요?{' '}
          <span
            onClick={() => router.push('/signup/terms')}
            className="text-[#185FA5] underline cursor-pointer"
          >
            회원가입
          </span>
        </p>

      </div>
    </div>
  )
}