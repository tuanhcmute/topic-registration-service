FROM maven:3.8.3-openjdk-17 as BUILD
COPY server/src /server/src
# COPY server/src/main/resources/application.yml server/src/main/resources/application.yml
COPY server/pom.xml /server
RUN mvn -f /server/pom.xml -B -DskipTests clean package


FROM openjdk:17-jdk
WORKDIR /app
ARG JAR_FILE_NAME=app.jar
COPY --from=BUILD /server/target/${JAR_FILE_NAME} /app/app.jar
EXPOSE 8080
COPY server/docker_entrypoint.sh /server/docker_entrypoint.sh
RUN chmod +x /server/docker_entrypoint.sh
CMD ["/server/docker_entrypoint.sh"]
# CMD ["java", "-jar", "/app/app.jar"]