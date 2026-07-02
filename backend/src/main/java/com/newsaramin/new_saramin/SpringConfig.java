package com.newsaramin.new_saramin;

import com.newsaramin.new_saramin.repository.JdbcMemberRepository;
import com.newsaramin.new_saramin.repository.MemberRepository;
import com.newsaramin.new_saramin.service.MemberService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.sql.DataSource;

@Configuration
public class SpringConfig {

    private final DataSource dataSource;
    private final BCryptPasswordEncoder passwordEncoder;

    public SpringConfig(DataSource dataSource, BCryptPasswordEncoder passwordEncoder) {
        this.dataSource = dataSource;
        this.passwordEncoder = passwordEncoder;
    }

    @Bean
    public MemberRepository memberRepository() {
        return new JdbcMemberRepository(dataSource);
    }

    @Bean
    public MemberService memberService() {
        return new MemberService(memberRepository(), passwordEncoder);
    }
}