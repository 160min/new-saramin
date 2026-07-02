package com.newsaramin.new_saramin.controller;

import com.newsaramin.new_saramin.domain.Member;
import com.newsaramin.new_saramin.dto.request.MemberJoinRequest;
import com.newsaramin.new_saramin.dto.request.MemberLoginRequest;
import com.newsaramin.new_saramin.dto.response.MemberResponse;
import com.newsaramin.new_saramin.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/api/member")
public class MemberController {

    private final MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping("/new")
    public String createForm(Model model) {
        model.addAttribute("memberForm", new MemberJoinRequest());
        return "members/createMemberForm";
    }

    @PostMapping("/new")
    public String create(MemberJoinRequest request) {

        if (!request.getPwd().equals(request.getPwdConfirm())) {
            throw new IllegalStateException("비밀번호가 일치하지 않습니다.");
        }

        Member member = request.toEntity();
        memberService.join(member);
        return "redirect:/";
    }

        /*@GetMapping("/login")
    public String loginForm(Model model) {
        model.addAttribute("loginForm", new MemberLoginRequest());
        return "members/loginForm";
    }


    /*@PostMapping("/login")
    public String login(MemberLoginRequest request, HttpServletRequest httpRequest) {


        Member loginMember = memberService.login(request.getUserId(), request.getPwd());

        // 검증 성공
        HttpSession session = httpRequest.getSession();
        session.setAttribute("loginMemberId", loginMember.getId());

        return "redirect:/";
    }

    @PostMapping("/logout")
    public String logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false); // 세션 없으면 새로 만들지 않음
        if (session != null) {
            session.invalidate();
        }
        return "redirect:/";
    }*/

    @GetMapping("/")
    public String list(Model model) {
        List<MemberResponse> members = memberService.findMembers().stream()
                .map(MemberResponse::from)
                .toList();
        model.addAttribute("members", members);
        return "members/memberList";
    }
}