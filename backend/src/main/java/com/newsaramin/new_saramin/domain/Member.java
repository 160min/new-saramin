package com.newsaramin.new_saramin.domain;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class Member {

    private Long id;
    private String userId;
    private String pwd;
    private String email;
    private String nickname;
    private String phone;
    private String role;

}