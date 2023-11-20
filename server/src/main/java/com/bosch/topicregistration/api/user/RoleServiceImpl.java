package com.bosch.topicregistration.api.user;

import com.bosch.topicregistration.api.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;

    @Override
    public Role findByCode(RoleCode roleCode) {
        Optional<Role> roleOptional = roleRepository.findByCode(roleCode);
        if (!roleOptional.isPresent()) throw new BadRequestException("Role could not be found");
        return roleOptional.get();
    }
}
