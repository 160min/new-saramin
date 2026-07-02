package com.newsaramin.new_saramin.dto.response;

import com.newsaramin.new_saramin.domain.Member;
import lombok.Getter;

@Getter
public class MemberResponse {

    private final Long id;
    private final String userId;
    private final String email;
    private final String nickname;
    private final String phone;
    private final String role;

    private MemberResponse(Long id, String userId, String email, String nickname, String phone, String role) {
        this.id = id;
        this.userId = userId;
        this.email = email;
        this.nickname = nickname;
        this.phone = phone;
        this.role = role;
    }

    public static MemberResponse from(Member member) {
        return new MemberResponse(
                member.getId(),
                member.getUserId(),
                member.getEmail(),
                member.getNickname(),
                member.getPhone(),
                member.getRole()
        );
    }
}