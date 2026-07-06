const BASE_URL = 'http://localhost:8080'

// 회원가입
export const signup = async (data: {
  userId: string
  password: string
  passwordCheck: string
  name: string
  email: string
  nickname: string
  phone: string
}) => {
  const response = await fetch(`${BASE_URL}/api/member/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return response.json()
}

// 로그인
export const login = async (data: {
  id: string
  password: string
}) => {
  const response = await fetch(`${BASE_URL}/api/member/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return response.json()
}

// 아이디 중복 체크
export const checkId = async (id: string) => {
  const response = await fetch(`${BASE_URL}/api/member/check-id?id=${id}`)
  return response.json()
}

// 닉네임 중복 체크
export const checkNickname = async (nickname: string) => {
  const response = await fetch(`${BASE_URL}/api/member/check-nickname?nickname=${nickname}`)
  return response.json()
}