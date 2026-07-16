'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signup, checkId, checkNickname, checkEmail } from '@/api/auth'

export default function SignupPage() {
  const router = useRouter()

  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')

  const [idCheck, setIdCheck] = useState<null | boolean>(null)
  const [nicknameCheck, setNicknameCheck] = useState<null | boolean>(null)
  const [emailMessage, setEmailMessage] = useState('')
  const [emailAvailable, setEmailAvailable] = useState(false)

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    passwordCheck: '',
  })

  const handlePhone = (value: string) => {
    const numbers = value.replace(/[^0-9]/g, '')
    if (numbers.length <= 3) {
      setPhone(numbers)
    } else if (numbers.length <= 7) {
      setPhone(`${numbers.slice(0, 3)}-${numbers.slice(3)}`)
    } else {
      setPhone(`${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`)
    }
    setErrors((prev) => ({ ...prev, phone: '' }))
  }

  const handleIdCheck = async () => {
  if (!id) return
  try {
    const result = await checkId(id)
    setIdCheck(result.available)
  } catch {
    setIdCheck(false)
  }
}

  const handleEmailCheck = async () => {
    if (!email) return
    try {
      const result = await checkEmail(email)
      setEmailAvailable(!result.isDuplicate)
      setEmailMessage('')
    } catch {
      setEmailAvailable(false)
      setEmailMessage('이메일 체크 중 오류가 발생했습니다.')
    }
  }

  const handleNicknameCheck = async () => {
  if (!nickname) return
  try {
    const result = await checkNickname(nickname)
    setNicknameCheck(result.available)
  } catch {
    setNicknameCheck(false)
  }
}

  const handleCheckEmail = async () => {
    if (!email) {
      setEmailMessage('이메일을 입력해주세요.')
      return
    }
    const result = await checkEmail(email)
    setEmailAvailable(result.available)
    setEmailMessage(result.message)
  }

  const handleSignup = async () => {
    const newErrors = {
      name: '',
      email: '',
      phone: '',
      password: '',
      passwordCheck: '',
    }
    let hasError = false

    if (!name) { newErrors.name = '이름을 입력해주세요.'; hasError = true }
    if (!idCheck) { hasError = true }
    if (!nicknameCheck) { hasError = true }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요.'; hasError = true
    }
    if (!phone) { newErrors.phone = '전화번호를 입력해주세요.'; hasError = true }
    if (password.length < 8) { newErrors.password = '비밀번호는 8자 이상 입력해주세요.'; hasError = true }
    if (password !== passwordCheck) { newErrors.passwordCheck = '비밀번호가 일치하지 않습니다.'; hasError = true }

    setErrors(newErrors)
    if (hasError) return

    try {
      const result = await signup({
        userId: id,
        password,
        passwordCheck,
        name,
        email,
        nickname,
        phone,
      })

      if (result.status === 409 || result.status === 400) {
        setErrors((prev) => ({ ...prev, password: result.message }))
        return
      }

      router.push('/login')
    } catch {
      setErrors((prev) => ({ ...prev, password: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' }))
    }
  }

  const isAllFilled = id && name && nickname && email && phone && password && passwordCheck && idCheck && nicknameCheck

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
          <div className="w-[35%]">
            <label className="block text-xs font-medium text-[#475569] mb-1">이름</label>
            <input
              type="text"
              placeholder="홍길동"
              value={name}
              onChange={(e) => { setName(e.target.value); setErrors((prev) => ({ ...prev, name: '' })) }}
              className={`w-full h-11 px-3 text-sm border rounded-lg bg-[#F8FAFC] focus:outline-none focus:border-[#185FA5] ${errors.name ? 'border-red-400' : 'border-[#E2E8F0]'}`}
            />
            {errors.name && <p className="text-xs text-red-400 mt-1.5 font-medium">{errors.name}</p>}
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-[#475569] mb-1">닉네임</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="nick123"
                value={nickname}
                onChange={(e) => { setNickname(e.target.value); setNicknameCheck(null) }}
                className="w-[190px] h-11 px-3 text-sm border border-[#E2E8F0] rounded-lg bg-[#F8FAFC] focus:outline-none focus:border-[#185FA5]"
              />
              <button
                onClick={handleNicknameCheck}
                className={`w-20 h-11 text-white text-xs font-bold rounded-lg shrink-0 ${nickname ? 'bg-[#185FA5]' : 'bg-[#CBD5E1]'}`}
              >
                중복확인
              </button>
            </div>
            {nicknameCheck === true && <p className="text-xs text-[#185FA5] mt-1.5 font-medium">사용 가능합니다</p>}
            {nicknameCheck === false && <p className="text-xs text-red-400 mt-1.5 font-medium">이미 사용중입니다</p>}
          </div>
        </div>

        {/* 아이디 */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-[#475569] mb-1">아이디</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="아이디를 입력하세요"
              value={id}
              onChange={(e) => { setId(e.target.value); setIdCheck(null) }}
              className="flex-1 h-11 px-3 text-sm border border-[#E2E8F0] rounded-lg bg-[#F8FAFC] focus:outline-none focus:border-[#185FA5]"
            />
            <button
              onClick={handleIdCheck}
              className={`w-20 h-11 text-white text-xs font-bold rounded-lg shrink-0 ${id ? 'bg-[#185FA5]' : 'bg-[#CBD5E1]'}`}
            >
              중복확인
            </button>
          </div>
          {idCheck === true && <p className="text-xs text-[#185FA5] mt-1.5 font-medium">사용 가능한 아이디입니다</p>}
          {idCheck === false && <p className="text-xs text-red-400 mt-1.5 font-medium">이미 사용중인 아이디입니다</p>}
        </div>

        {/* 이메일 */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-[#475569] mb-1">이메일</label>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors((prev) => ({ ...prev, email: '' })) }}
              className={`flex-1 h-11 px-3 text-sm border rounded-lg bg-[#F8FAFC] focus:outline-none focus:border-[#185FA5] ${errors.email ? 'border-red-400' : 'border-[#E2E8F0]'}`}
            />
            <button
              onClick={handleCheckEmail}
              className={`w-20 h-11 text-white text-xs font-bold rounded-lg shrink-0 ${/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'bg-[#185FA5]' : 'bg-[#CBD5E1]'}`}
            >
              인증하기
            </button>
          </div>
          {errors.email && <p className="text-xs text-red-400 mt-1.5 font-medium">{errors.email}</p>}
          {emailMessage && (
            <p className={`text-xs mt-1.5 font-medium ${emailAvailable ? 'text-[#185FA5]' : 'text-red-400'}`}>
              {emailMessage}
            </p>
          )}
        </div>

        {/* 전화번호 */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-[#475569] mb-1">전화번호</label>
          <input
            type="tel"
            placeholder="010-0000-0000"
            value={phone}
            onChange={(e) => handlePhone(e.target.value)}
            className={`w-full h-11 px-3 text-sm border rounded-lg bg-[#F8FAFC] focus:outline-none focus:border-[#185FA5] ${errors.phone ? 'border-red-400' : 'border-[#E2E8F0]'}`}
          />
          {errors.phone && <p className="text-xs text-red-400 mt-1.5 font-medium">{errors.phone}</p>}
        </div>

        {/* 비밀번호 */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-[#475569] mb-1">비밀번호</label>
          <input
            type="password"
            placeholder="8자 이상 입력"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setErrors((prev) => ({ ...prev, password: '' })) }}
            className={`w-full h-11 px-3 text-sm border rounded-lg bg-[#F8FAFC] focus:outline-none focus:border-[#185FA5] ${errors.password ? 'border-red-400' : 'border-[#E2E8F0]'}`}
          />
          {errors.password && <p className="text-xs text-red-400 mt-1.5 font-medium">{errors.password}</p>}
        </div>

        {/* 비밀번호 확인 */}
        <div className="mb-6">
          <label className="block text-xs font-medium text-[#475569] mb-1">비밀번호 확인</label>
          <input
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
            value={passwordCheck}
            onChange={(e) => { setPasswordCheck(e.target.value); setErrors((prev) => ({ ...prev, passwordCheck: '' })) }}
            className={`w-full h-11 px-3 text-sm border rounded-lg bg-[#F8FAFC] focus:outline-none focus:border-[#185FA5] ${errors.passwordCheck ? 'border-red-400' : 'border-[#E2E8F0]'}`}
          />
          {errors.passwordCheck && <p className="text-xs text-red-400 mt-1.5 font-medium">{errors.passwordCheck}</p>}
        </div>

        {/* 회원가입 버튼 */}
        <button
          onClick={handleSignup}
          className={`w-full h-12 font-bold rounded-lg transition-colors text-white ${isAllFilled ? 'bg-[#185FA5]' : 'bg-[#CBD5E1]'}`}
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