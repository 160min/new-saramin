package com.newsaramin.new_saramin.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MemberLoginRequest {

    private String user_id;
    private String pwd;
}