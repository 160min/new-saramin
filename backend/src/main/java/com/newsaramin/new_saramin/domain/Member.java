package com.newsaramin.new_saramin.domain;

public class Member {

    private Long id;
    private String loginId;
    private String password;
    private String email;    // 추가
    private String phone;    // 추가
    private String name;

    public Member() {}

    public Member(String loginId, String password, String email, String phone, String name) {
        this.loginId = loginId;
        this.password = password;
        this.email = email;
        this.phone = phone;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLoginId() {
        return loginId;
    }

    public void setLoginId(String loginId) {
        this.loginId = loginId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}