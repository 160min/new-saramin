package com.newsaramin.new_saramin.service;

import com.newsaramin.new_saramin.domain.Member;
import com.newsaramin.new_saramin.repository.MemberRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;
import java.util.Optional;

public class MemberService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public MemberService(MemberRepository memberRepository, BCryptPasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
    }

    //회원가입
    public Long join(Member member) {
        validateDuplicateLongId(member);
        validateDuplicateEmail(member);
        validateDuplicatePhone(member);

        String encodedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encodedPassword);

        memberRepository.save(member);
        return member.getId();
    }

    //아아디 중복 검사
    private void validateDuplicateLongId(Member member) {
        memberRepository.findByLoginId(member.getLoginId())
                .ifPresent(m -> {
                    throw new IllegalStateException("이미 사용중인 아이디입니다.");
                });
    }

    //이메일 중복 검사
    private void validateDuplicateEmail(Member member) {
        memberRepository.findByEmail(member.getEmail())
                .ifPresent(m -> {
                    throw new IllegalStateException("이미 사용중인 이메일입니다.");
                });
    }

    //전화번호 중복 검사
    private void validateDuplicatePhone(Member member) {
        memberRepository.findByPhone(member.getPhone())
                .ifPresent(m -> {
                    throw new IllegalStateException("이미 사용중인 전화번호입니다.");
                });
    }

    //전체 회원 조회
    public List<Member> findMembers() {
        return memberRepository.findAll();
    }

    //단건 조회 - ID로 찾기
    public Optional<Member> findOne(Long memberId) {
        return memberRepository.findById(memberId);
    }

    //단건 조회 - 로그인 아이디 찾기
    public Optional<Member> findByLoginId(String loginId) {
        return memberRepository.findByLoginId(loginId);
    }
}