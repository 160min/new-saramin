package com.newsaramin.new_saramin;

import com.newsaramin.new_saramin.repository.MemberRepository;
import com.newsaramin.new_saramin.repository.MemoryMemberRepository;
import com.newsaramin.new_saramin.service.MemberService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class SpringConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public MemberRepository memberRepository() {
        return new MemoryMemberRepository();
    }

    @Bean
    public MemberService memberService() {
        return new MemberService(memberRepository(), passwordEncoder());
    }
}