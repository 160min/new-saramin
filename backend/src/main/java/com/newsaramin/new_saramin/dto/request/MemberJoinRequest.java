package com.newsaramin.new_saramin.dto.request;

import com.newsaramin.new_saramin.domain.Member;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MemberJoinRequest {

    private String user_id;
    private String pwd;
    private String pwdConfirm;
    private String email;
    private String nickname;
    private String phone;

    public Member toEntity() {
        Member member = new Member();
        member.setUserId(user_id);
        member.setPwd(pwd);
        member.setEmail(email);
        member.setNickname(nickname);
        member.setPhone(formatPhone(phone));
        return member;
    }

    private String formatPhone(String phone) {
        if (phone == null) return null;

        String plain = phone.replace("-", "");

        if (plain.startsWith("02")) {
            if (plain.length() == 9) {
                return plain.substring(0, 2) + "-" + plain.substring(2, 5) + "-" + plain.substring(5, 9);
            } else if (plain.length() == 10) {
                return plain.substring(0, 2) + "-" + plain.substring(2, 6) + "-" + plain.substring(6, 10);
            }
        } else {
            if (plain.length() == 11) {
                return plain.substring(0, 3) + "-" + plain.substring(3, 7) + "-" + plain.substring(7, 11);
            } else if (plain.length() == 10) {
                return plain.substring(0, 3) + "-" + plain.substring(3, 6) + "-" + plain.substring(6, 10);
            }
        }

        return plain;
    }
}