# Travel Planner Web Application

A full-stack Spring Boot web application for planning and managing travel trips with budget tracking capabilities.

## 🚀 Features

### Core Functionality
- ✅ **User Management**: Registration, authentication, and profile management
- ✅ **Trip Planning**: Create, read, update, and delete trips
- ✅ **Budget Tracking**: Track and manage trip budgets
- ✅ **Responsive UI**: Modern, clean dashboard interface
- ✅ **API Security**: Password encryption with BCrypt
- ✅ **Input Validation**: Comprehensive backend and frontend validation
- ✅ **Error Handling**: Global exception handling with standardized responses
- ✅ **RESTful API**: Well-structured API endpoints with DTOs

---

## 📋 Project Structure

```
Travel-planner-web-application/
├── src/main/java/org/spring/travelplannerwebapplication/
│   ├── config/              # Spring configuration classes
│   │   └── SecurityConfig.java
│   ├── controller/          # REST API controllers
│   │   ├── UserController.java
│   │   ├── TripController.java
│   │   └── HomeController.java
│   ├── dto/                 # Data Transfer Objects
│   │   ├── UserDTO.java
│   │   ├── TripDTO.java
│   │   └── ApiResponse.java
│   ├── exception/           # Custom exceptions & global handler
│   │   ├── ResourceNotFoundException.java
│   │   ├── DuplicateResourceException.java
│   │   ├── InvalidCredentialsException.java
│   │   └── GlobalExceptionHandler.java
│   ├── model/               # JPA entities
│   │   ├── User.java
│   │   └── Trip.java
│   ├── repository/          # Data access layer
│   │   ├── UserRepository.java
│   │   └── TripRepository.java
│   ├── service/             # Business logic layer
│   │   ├── UserService.java
│   │   └── TripService.java
│   └── TravelPlannerWebApplication.java
├── src/main/resources/
│   ├── static/              # Frontend assets
│   │   ├── index.html       # Dashboard
│   │   ├── login.html       # Login page
│   │   ├── register.html    # Registration page
│   │   ├── style.css        # Styling
│   │   └── script.js        # JavaScript functionality
│   └── application.properties
├── pom.xml                  # Maven dependencies
└── README.md
```

---

## 🛠️ Tech Stack

### Backend
- **Framework**: Spring Boot 3.x
- **Language**: Java 17
- **Database**: MySQL 8.0
- **Security**: Spring Security with BCrypt
- **ORM**: JPA/Hibernate
- **Build Tool**: Maven
- **Validation**: Jakarta Validation API

### Frontend
- **HTML5** with semantic markup
- **CSS3** with responsive design
- **Vanilla JavaScript** (ES6+)
- **REST API Integration**

---

## ⚙️ Installation & Setup

### Prerequisites
- Java 17 or higher
- MySQL 8.0 or higher
- Maven 3.6+
- Git

### Step 1: Clone Repository
```bash
git clone <repository-url>
cd Travel-planner-web-application
```

### Step 2: Configure Database
Update `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/travelplanner
spring.datasource.username=root
spring.datasource.password=your_password
```

Or set environment variables:
```bash
export DB_URL=jdbc:mysql://localhost:3306/travelplanner
export DB_USERNAME=root
export DB_PASSWORD=your_password
```

### Step 3: Build Project
```bash
mvn clean package
```

### Step 4: Start Application
```bash
mvn spring-boot:run
```

Application will be available at: `http://localhost:8080`

---

## 🔐 Security Features

1. **Password Encryption**: Passwords are hashed using BCrypt before storage
2. **Input Validation**: All inputs validated using Jakarta Validation annotations
3. **Exception Handling**: Global exception handler prevents information leakage
4. **API Response Wrapper**: Standardized error responses
5. **Environment Configuration**: Sensitive credentials via environment variables
6. **User-Trip Relationship**: Ensures users can only access their own trips

---

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "statusCode": 201,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2026-07-16T10:30:00",
    "updatedAt": "2026-07-16T10:30:00"
  }
}
```

#### Login User
```http
POST /api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "statusCode": 200,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2026-07-16T10:30:00",
    "updatedAt": "2026-07-16T10:30:00"
  }
}
```

### User Endpoints

#### Get All Users
```http
GET /api/users
```

#### Get User by ID
```http
GET /api/users/{id}
```

#### Get User by Email
```http
GET /api/users/email/{email}
```

#### Update User
```http
PUT /api/users/{id}
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "NewPassword123"
}
```

#### Delete User
```http
DELETE /api/users/{id}
```

### Trip Endpoints

#### Create Trip
```http
POST /api/trips
Content-Type: application/json

{
  "destination": "Paris, France",
  "startDate": "2026-08-01",
  "endDate": "2026-08-15",
  "budget": 2500.00,
  "user": {
    "id": 1
  }
}
```

#### Get All Trips
```http
GET /api/trips
```

#### Get User's Trips
```http
GET /api/trips/user/{userId}
```

#### Get Trip by ID
```http
GET /api/trips/{id}
```

#### Update Trip
```http
PUT /api/trips/{id}
Content-Type: application/json

{
  "destination": "Tokyo, Japan",
  "startDate": "2026-09-01",
  "endDate": "2026-09-20",
  "budget": 3500.00
}
```

#### Delete Trip
```http
DELETE /api/trips/{id}
```

---

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);
```

### Trips Table
```sql
CREATE TABLE trips (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  destination VARCHAR(100) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  budget DECIMAL(10, 2) NOT NULL,
  user_id BIGINT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

## 🎯 Usage Examples

### 1. Register New User
```bash
curl -X POST http://localhost:8080/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

### 3. Create Trip
```bash
curl -X POST http://localhost:8080/api/trips \
  -H "Content-Type: application/json" \
  -d '{
    "destination": "Paris, France",
    "startDate": "2026-08-01",
    "endDate": "2026-08-15",
    "budget": 2500.00,
    "user": {"id": 1}
  }'
```

### 4. Get User's Trips
```bash
curl http://localhost:8080/api/trips/user/1
```

---

## 🧪 Testing

### Run Tests
```bash
mvn test
```

### Manual Testing with Postman
1. Import API endpoints to Postman
2. Create a new user via `/api/users/register`
3. Login via `/api/users/login`
4. Create trips with user ID from login response
5. Verify CRUD operations on trips

---

## 📝 Configuration

### Environment Variables
```bash
DB_URL=jdbc:mysql://localhost:3306/travelplanner
DB_USERNAME=root
DB_PASSWORD=your_password
```

### Application Properties
Key configurations in `application.properties`:
- `spring.jpa.hibernate.ddl-auto=update` - Auto schema updates
- `server.port=8080` - Server port
- `logging.level.org.springframework=INFO` - Logging level

---

## 🔄 Database Migration

The application uses Hibernate's auto-update DDL strategy. On first run:
1. Connect to MySQL server
2. Create database: `CREATE DATABASE travelplanner;`
3. Start the application
4. Hibernate automatically creates tables

To reset database:
```sql
DROP DATABASE travelplanner;
CREATE DATABASE travelplanner;
```

---

## 📊 API Response Format

All API responses follow a standardized format:

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "statusCode": 200,
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "statusCode": 400,
  "data": null
}
```

---

## 🐛 Error Handling

The application handles the following exceptions:
- `ResourceNotFoundException` (404) - Resource not found
- `DuplicateResourceException` (409) - Duplicate email/resource
- `InvalidCredentialsException` (401) - Wrong password
- `MethodArgumentNotValidException` (400) - Validation errors
- Generic Exception (500) - Unexpected errors

---

## 🎨 Frontend Features

### Dashboard (`index.html`)
- User welcome message
- Trip statistics (Total Trips, Upcoming, Budget, Countries)
- Recent trips list with budget display
- Budget status with progress bars
- Timeline of upcoming events
- Responsive sidebar navigation

### Login Page (`login.html`)
- Email and password fields
- Form validation
- Success message with redirect
- Clean, professional design

### Registration Page (`register.html`)
- Multi-field registration form
- Password confirmation matching
- Terms acceptance checkbox
- Success modal with countdown

---

## 🚀 Deployment

### Deploy to Production
1. Build: `mvn clean package`
2. Transfer JAR to server
3. Set environment variables
4. Run: `java -jar Travel-planner-web-application-0.0.1-SNAPSHOT.jar`

### Docker Deployment (Optional)
```dockerfile
FROM openjdk:17-jdk-slim
COPY target/Travel-planner-web-application-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
```

---

## 📞 Support & Documentation

- **Database**: MySQL 8.0
- **API Documentation**: Available in `API_REFERENCE.md`
- **Issue Tracking**: GitHub Issues
- **Email Support**: admin@travelplanner.app

---

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

---

## 👥 Contributors

- Development Team

---

## 🎓 Learning Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Security Guide](https://spring.io/guides/topicals/spring-security-architecture)
- [JPA/Hibernate Docs](https://hibernate.org/orm/documentation/)
- [REST API Best Practices](https://restfulapi.net/)

---

**Last Updated**: July 16, 2026

