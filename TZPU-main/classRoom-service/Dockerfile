FROM adoptopenjdk:11-jre-hotspot

WORKDIR /app

COPY target/classRoom-service-0.0.1-SNAPSHOT.jar /app/app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
