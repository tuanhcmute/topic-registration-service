package com.bosch.topicregistration.api.auth;

import com.bosch.topicregistration.api.exception.BadRequestException;
import com.bosch.topicregistration.api.response.Response;
import com.bosch.topicregistration.api.security.jwt.JwtService;
import com.bosch.topicregistration.api.user.User;
import com.bosch.topicregistration.api.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {
    private final JwtService jwtService;
    private final UserRepository userRepository;
    @Override
    public Response<RefreshTokenDTO> refreshToken(RefreshTokenRequest request) {
//        Validate expired access token from client
        boolean isAccessTokenValid = jwtService.validateToken(request.getAccessToken());
        if(!isAccessTokenValid) throw new BadRequestException("Access token has not yet expired");

//        Validate refresh token
        boolean isRefreshTokenValid = jwtService.validateToken(request.getRefreshToken());
        if(!isRefreshTokenValid) throw new BadRequestException("Refresh token is not valid");

//        Validate user
        final String userId = jwtService.getUsernameFromToken(request.getRefreshToken());
        final Optional<User> userOptional = userRepository.findById(userId);
        if(!userOptional.isPresent()) throw new BadRequestException("User could not be found");
        final User user = userOptional.get();

//        Generate new accessToken, refreshToken
        final String accessToken = jwtService.createToken(user.getEmail());
        final String refreshToken = jwtService.createRefreshToken(user.getId());
        RefreshTokenDTO refreshTokenDTO = RefreshTokenDTO.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
        Map<String, RefreshTokenDTO> data = new HashMap<>();
        data.put("refreshToken", refreshTokenDTO);

//        Build response
        return Response.<RefreshTokenDTO>builder()
                .message("Token has been updated successfully")
                .statusCode(HttpStatus.OK.value())
                .data(data)
                .build();
    }
}
