package com.bosch.topicregistration.api.schedule;

import com.bosch.topicregistration.api.enrollment.enrollmentperiod.EnrollmentPeriod;
import com.bosch.topicregistration.api.enrollment.enrollmentperiod.EnrollmentPeriodRepository;
import com.bosch.topicregistration.api.enrollment.semester.Semester;
import com.bosch.topicregistration.api.enrollment.semester.SemesterRepository;
import com.bosch.topicregistration.api.enrollment.semester.SemesterStatus;
import com.bosch.topicregistration.api.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Component
public class EnrollmentPeriodScheduledTasks {

    private final EnrollmentPeriodRepository enrollmentPeriodRepository;
    private final SemesterRepository semesterRepository;

    //    Task will be running every day at 0am
    @Scheduled(cron = "0 0 0 ? * *")
    public void changeEnrollmentPeriodStatus() {
//        Get current semester
        List<Semester> semesters = semesterRepository.findByStatus(SemesterStatus.ACTIVATED);
        if (semesters.size() == 0) throw new BadRequestException("Current semester could not be found");
        Semester currentSemester = semesters.get(0);
        log.info("Current semester: {}", currentSemester.getId());

        // Get list of enrollment period that belong to the current semester
        List<EnrollmentPeriod> enrollmentPeriods = enrollmentPeriodRepository.findBySemester(currentSemester);
        enrollmentPeriods.forEach(enrollmentPeriod -> {
            if (enrollmentPeriod.getStatus().equals(SemesterStatus.ACTIVATED)) {
                if (enrollmentPeriod.getEndDate().isEqual(LocalDate.now())) {
                    enrollmentPeriod.setStatus(SemesterStatus.TERMINATED);
                    enrollmentPeriodRepository.save(enrollmentPeriod);
                    log.info("Status enrollment period {} has been updated from {} to {}", enrollmentPeriod.getId(), SemesterStatus.ACTIVATED.name(), SemesterStatus.TERMINATED.name());
                }
            } else if (enrollmentPeriod.getStatus().equals(SemesterStatus.SCHEDULED)) {
                if (enrollmentPeriod.getStartDate().equals(LocalDate.now())) {
                    enrollmentPeriod.setStatus(SemesterStatus.ACTIVATED);
                    enrollmentPeriodRepository.save(enrollmentPeriod);
                    log.info("Status enrollment period {} has been updated from {} to {}", enrollmentPeriod.getId(), SemesterStatus.TERMINATED.name(), SemesterStatus.ACTIVATED.name());
                }
            }
        });
    }
}
