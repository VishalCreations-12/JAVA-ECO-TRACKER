# Eco Watch Backend (Spring Boot)

This is a ready-to-run Spring Boot backend for the Eco Watch frontend you provided.
It uses H2 in-memory database by default, exposes REST APIs, and includes a sample data initializer.

## Requirements
- Java 17+
- Maven 3.6+

## How to run
1. Build:
```
mvn clean package -DskipTests
```
2. Run:
```
mvn spring-boot:run
```
Application will start on `http://localhost:8080`.

H2 console: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:ecowatchdb`
- User: `sa` (no password)

## API Endpoints (examples)
- `POST /api/users/register` - register user (JSON body: name, email, password)
- `POST /api/users/login` - login (JSON body: email, password)
- `GET /api/users/{id}` - get user by id

- `POST /api/sensors` - create sensor reading (JSON body: sensorType, value, unit) optional query param `userId`
- `GET /api/sensors` - get all readings
- `GET /api/sensors/{id}` - get reading by id
- `GET /api/sensors/type/{sensorType}` - get readings by type
- `DELETE /api/sensors/{id}` - delete reading

## Notes
- CORS origin is set in `application.properties` (default `http://localhost:5173`) — change to your frontend origin if different.
- Passwords are hashed when registering via `/api/users/register` through `UserService`. The `DataInitializer` inserts a demo user with plain password for quick testing.
- To use MySQL, uncomment and set the MySQL configuration in `src/main/resources/application.properties` and provide DB credentials.

