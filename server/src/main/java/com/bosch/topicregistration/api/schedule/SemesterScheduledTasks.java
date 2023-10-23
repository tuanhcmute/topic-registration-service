package com.bosch.topicregistration.api.schedule;

import com.bosch.topicregistration.api.enrollment.semester.Semester;
import com.bosch.topicregistration.api.enrollment.semester.SemesterRepository;
import com.bosch.topicregistration.api.enrollment.semester.SemesterStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
@Slf4j
@RequiredArgsConstructor
public class SemesterScheduledTasks {

    private final SemesterRepository semesterRepository;

    //    Task will be running every day at 0am
    @Scheduled(cron = "0 0 0 ? * *")
    public void ChangeSemesterStatusTask() {
        List<Semester> activatedSemesters = semesterRepository.findByStatus(SemesterStatus.ACTIVATED);
        List<Semester> scheduledSemesters = semesterRepository.findByStatus(SemesterStatus.SCHEDULED);
        log.info("Size of activatedSemesters: {}", activatedSemesters.size());
        log.info("Size of scheduledSemesters: {}", scheduledSemesters.size());

        activatedSemesters.forEach(activatedSemester -> {
            if (activatedSemester.getEndDate().isEqual(LocalDate.now())) {
                activatedSemester.setStatus(SemesterStatus.TERMINATED);
            }
        });
        semesterRepository.saveAll(activatedSemesters);
        log.info("activatedSemesters have been updated");

        scheduledSemesters.forEach(activatedSemester -> {
            if (activatedSemester.getStartDate().isEqual(LocalDate.now())) {
                activatedSemester.setStatus(SemesterStatus.ACTIVATED);
            }
        });
        semesterRepository.saveAll(scheduledSemesters);
        log.info("scheduledSemesters have been updated");
    }
}
