#! /bin/bash
echo $APPLICATION_PROPERTIES | base64 --decode > /app/application.yml
java -jar /app/app.jar
