FROM maven:3.8.3-openjdk-17 as BUILD
COPY server/src /server/src
COPY server/pom.xml /server
RUN mvn -f /server/pom.xml -B -DskipTests clean package

FROM openjdk:17-jdk
WORKDIR /app
ARG JAR_FILE_NAME=topic-registration-0.0.1-SNAPSHOT.jar
COPY --from=BUILD /server/target/${JAR_FILE_NAME} /app/app.jar
EXPOSE 8080
CMD ["java", "-jar", "/app/app.jar"]