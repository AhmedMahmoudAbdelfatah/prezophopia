package com.example.server.security.jwt;

import com.example.server.exceptions.CustomErrorException;
import com.example.server.models.User;
import com.example.server.repository.UserRepository;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@NoArgsConstructor
@Component
public class AuthenticatedUser {
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private UserRepository userRepository;

    public Map<String,String>userData(HttpServletRequest request){
        String jwt = parseJwt(request);
        Map<String, String> userData = new HashMap<>();

        if (jwt == null || ! jwtUtils.validateJwtToken(jwt)){
            throw new CustomErrorException(HttpStatus.BAD_REQUEST,"Invalid JWT token");
        }

        String username = jwtUtils.getUserNameFromJwtToken(jwt);
        String user_id = jwtUtils.getUserIdFromJwtToken(jwt);

        userData.put("email",username);
        userData.put("user_id",user_id);

        return userData;
    }

    public Optional<User> getCurrentUser(HttpServletRequest request){
        Long user_id = Long.parseLong(userData(request).get("user_id"));
        Optional<User> currUser = userRepository.findUserById(user_id);
        if(currUser.isEmpty()) {
            throw new CustomErrorException(HttpStatus.NOT_FOUND,"user not found");
        }
        return currUser;
    }

    private String parseJwt(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");

        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer")) {
            return headerAuth.substring(7, headerAuth.length());
        }

        return null;
    }
}
