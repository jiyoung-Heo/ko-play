package com.edu.koplay.jwt;


import com.edu.koplay.dto.CustomOAuth2User;
import com.edu.koplay.dto.CustomUserDetails;
import com.edu.koplay.dto.UserDTO;
import com.edu.koplay.util.ROLE;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtFilter extends OncePerRequestFilter {
    private final List<String> skipUrls = List.of("/oauth2", "/login/oauth2/code");
    private JwtUtil jwtUtil;

    @Autowired
    public JwtFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        logger.info("--------------------------------");
        //cookie들을 불러온 뒤 Authorization Key에 담긴 쿠키를 찾음
        String authorization = null;
        Cookie[] cookies = request.getCookies();

        String path = request.getRequestURI();
        logger.info("path: " + path);
        if (path.equals("/login")) {
            filterChain.doFilter(request, response);
            return;
        }
        logger.info("test1");
        if (skipUrls.stream().anyMatch(path::startsWith)) {

            System.out.println("매치됨 "+skipUrls.stream().toList().toString());
            filterChain.doFilter(request, response);
            return;
        }
//        System.out.println(cookies);
//        logger.info("test2");
        if (cookies != null) {
//            logger.info("test3");

            for (Cookie cookie : cookies) {
                logger.info("cookie.getName: " + cookie.getName());
                if (cookie.getName().equals("Authorization")) {

                    authorization = cookie.getValue();
                }
            }
        }
//        logger.info("test4");


        //Authorization 헤더 검증
        if (authorization == null) {
            logger.info("token null");
            filterChain.doFilter(request, response);

            //조건이 해당되면 메소드 종료 (필수)
            return;
        }

        //토큰
        String token = authorization;

        //토큰 소멸 시간 검증
        if (jwtUtil.isExpired(token)) {
            logger.info("token expired");

            filterChain.doFilter(request, response);

            //조건이 해당되면 메소드 종료 (필수)
            return;
        }

        //토큰에서 username과 role 획득
//        System.out.println(token);
        String username = jwtUtil.getData(token);
        String role = jwtUtil.getRole(token);
        logger.info("username: " + username);
        logger.info("role: " + role);

        //userDTO를 생성하여 값 set
        UserDTO userDTO = new UserDTO();
        userDTO.setData(username);
        userDTO.setRoles(role);

        Authentication authToken = null;
        if (ROLE.PARENT.toString().equals(role)) {
//            logger.info("부모부모");
            //UserDetails에 회원 정보 객체 담기
            CustomOAuth2User customOAuth2User = new CustomOAuth2User(userDTO);
            //스프링 시큐리티 인증 토큰 생성
            authToken = new UsernamePasswordAuthenticationToken(customOAuth2User, null, customOAuth2User.getAuthorities());
        } else if (ROLE.STUDENT.toString().equals(role)) {
//            logger.info("자식자식");
            CustomUserDetails customUserDetails = new CustomUserDetails(userDTO);

            authToken = new UsernamePasswordAuthenticationToken(customUserDetails, null, customUserDetails.getAuthorities());
        }
        // 추가: 인증 정보 로그 출력
        logger.info("Authenticated user: " + username + " with roles: " + role);
        //세션에 사용자 등록
        SecurityContextHolder.getContext().setAuthentication(authToken);
//        System.out.println(SecurityContextHolder.getContext().getAuthentication().toString());
        filterChain.doFilter(request, response);
    }
}

