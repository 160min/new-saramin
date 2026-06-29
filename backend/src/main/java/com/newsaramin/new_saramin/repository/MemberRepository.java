package com.newsaramin.new_saramin.repository;

import com.newsaramin.new_saramin.domain.Member;

import java.util.List;
import java.util.Optional;

public interface MemberRepository {
    Member save(Member member);
    Optional<Member> findById(Long id);
    Optional<Member> findByLoginId(String loginId);
    Optional<Member> findByEmail(String email);
    Optional<Member> findByPhone(String phone);
    List<Member> findAll();
}