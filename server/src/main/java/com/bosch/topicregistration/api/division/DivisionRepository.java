package com.bosch.topicregistration.api.division;

import com.bosch.topicregistration.api.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DivisionRepository extends JpaRepository<Division, String> {
    Page<Division> findByLecture(User lecture, Pageable pageable);
}
