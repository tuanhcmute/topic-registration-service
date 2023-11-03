package com.bosch.topicregistration.api.logging;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

@Component
@Aspect
@Slf4j
public class LoggingAspect {

    @Pointcut("@annotation(LoggerAround)")
    public void logAroundPointcut() {
    }

    @Around("logAroundPointcut()")
    public Object logAllMethodCallsAdvice(ProceedingJoinPoint joinPoint) throws Throwable {
        log.info(joinPoint.getSignature() + " executed");
        Object result = joinPoint.proceed();
        log.info(joinPoint.getSignature() + " finished");
        return result;
    }
}