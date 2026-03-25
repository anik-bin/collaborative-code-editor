# ==========================================
# STAGE 1: Build the Application
# ==========================================
FROM maven:3.9-eclipse-temurin-21-alpine AS builder
WORKDIR /app

# Copy the pom.xml first to cache dependencies and speed up future builds
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the source code and build the JAR file
# We skip tests here to make the production deployment faster
COPY src ./src
RUN mvn clean package -DskipTests

# ==========================================
# STAGE 2: Production Runner
# ==========================================
FROM eclipse-temurin:21-jre-alpine AS runner
WORKDIR /app

# SECURITY: Create a restricted user so the app doesn't run as root
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# Copy the compiled .jar file from the builder stage
COPY --from=builder /app/target/*.jar app.jar

# Open the standard Spring Boot port
EXPOSE 8080

# Give the Java Virtual Machine a strict RAM limit so it plays nice on your 4GB VPS
ENV JAVA_OPTS="-Xmx1g -Xms512m"

# Start the Spring Boot application
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]