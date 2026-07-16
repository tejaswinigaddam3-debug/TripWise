# Travel Planner Web Application - Setup & Run Guide

## 📋 Prerequisites

Make sure you have these installed on your system:

1. **Java 17 or higher**
   ```bash
   java -version
   ```
   Download from: https://www.oracle.com/java/technologies/downloads/#java17

2. **MySQL 8.0 or MariaDB**
   ```bash
   mysql --version
   ```
   Download from: https://dev.mysql.com/downloads/mysql/

3. **Maven 3.6+**
   ```bash
   mvn --version
   ```
   Download from: https://maven.apache.org/download.cgi

---

## 🗄️ Step 1: Setup Database

### Option A: Using MySQL Command Line
```bash
# Connect to MySQL
mysql -u root -p

# Create the database (when prompted, enter your MySQL password)
CREATE DATABASE travelplanner;

# Verify it was created
SHOW DATABASES;

# Exit MySQL
EXIT;
```

### Option B: Using MySQL Workbench
1. Open MySQL Workbench
2. Connect to your MySQL server
3. Click the "+" icon to create new SQL script
4. Run this command:
   ```sql
   CREATE DATABASE travelplanner;
   ```

---

## 📦 Step 2: Update Database Configuration

Edit the database credentials in your `application.properties` file:

**File**: `src/main/resources/application.properties`

```properties
# MySQL Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/travelplanner
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

Replace `YOUR_MYSQL_PASSWORD` with your actual MySQL password.

---

## 🚀 Step 3: Build the Project

Open terminal/command prompt in the project directory and run:

```bash
cd C:\Users\ADMIN\IdeaProjects\Travel-planner-web-application

mvn clean package
```

This will:
- Download dependencies
- Compile the code
- Run tests (if any)
- Create a JAR file in the `target/` folder

**Expected output**: `BUILD SUCCESS`

---

## ▶️ Step 4: Run the Application

### Option A: Using Maven (Recommended for Development)
```bash
mvn spring-boot:run
```

### Option B: Using Java (After building with Maven)
```bash
java -jar target/Travel-planner-web-application-0.0.1-SNAPSHOT.jar
```

### Option C: Using IDE (IntelliJ IDEA)
1. Right-click on `TravelPlannerWebApplication.java` in the editor
2. Select **Run 'TravelPlannerWebApplication'**
3. Or press `Shift + F10`

---

## ✅ Verify Application is Running

When the application starts successfully, you should see:

```
2026-07-16 10:30:00.123  INFO 12345 --- [  main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8080
2026-07-16 10:30:00.456  INFO 12345 --- [  main] o.s.t.TravelPlannerWebApplication       : Started TravelPlannerWebApplication in 5.123 seconds
```

---

## 🌐 Access the Application

Open your web browser and go to:
```
http://localhost:8080
```

You should see the login page with two options:
- **Register** - Create a new account
- **Login** - Sign in with existing credentials

---

## 🧪 Testing the Application

### 1. Register a New User
1. Click **Register** button
2. Fill in:
   - Name: "John Doe"
   - Email: "john@example.com"
   - Password: "SecurePass123"
   - Confirm Password: "SecurePass123"
3. Click **Sign Up**
4. You'll be redirected to login

### 2. Login
1. Enter email: "john@example.com"
2. Enter password: "SecurePass123"
3. Click **Login**
4. You should see the **Dashboard**

### 3. Create a Trip
1. On Dashboard, look for "Create Trip" or similar button
2. Fill in:
   - Destination: "Paris, France"
   - Start Date: "2026-08-01"
   - End Date: "2026-08-15"
   - Budget: "2500.00"
3. Click **Create** or **Save**
4. Your trip should appear in the dashboard

---

## 🧬 Test Using API (Optional)

If you want to test the API endpoints directly using Postman or curl:

### Register User (POST)
```bash
curl -X POST http://localhost:8080/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "SecurePass123"
  }'
```

### Login User (POST)
```bash
curl -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@example.com",
    "password": "SecurePass123"
  }'
```

### Get All Users (GET)
```bash
curl http://localhost:8080/api/users
```

### Create a Trip (POST)
```bash
curl -X POST http://localhost:8080/api/trips \
  -H "Content-Type: application/json" \
  -d '{
    "destination": "Tokyo, Japan",
    "startDate": "2026-09-01",
    "endDate": "2026-09-20",
    "budget": 3500.00,
    "user": {"id": 1}
  }'
```

### Get All Trips (GET)
```bash
curl http://localhost:8080/api/trips
```

---

## 🐛 Troubleshooting

### Issue: "Connection refused" or "Cannot connect to database"
**Solution**:
- Make sure MySQL is running
- Check username and password in `application.properties`
- Verify the database `travelplanner` exists
- Check if port 3306 is being used by MySQL

### Issue: "Port 8080 already in use"
**Solution**:
- The application tries to start on port 8080 (default)
- Kill the process using port 8080 or change the port in `application.properties`:
  ```properties
  server.port=8081
  ```
  Then access at: http://localhost:8081

### Issue: "Java version not compatible"
**Solution**:
- Make sure you have Java 17+ installed
- Check with: `java -version`
- Update Java if needed

### Issue: "Maven command not found"
**Solution**:
- Maven is not in your system PATH
- Download and install Maven
- Or use `mvnw.cmd` (Maven wrapper) instead:
  ```bash
  mvnw.cmd clean package
  mvnw.cmd spring-boot:run
  ```

### Issue: Build fails with errors
**Solution**:
- Clean the project: `mvn clean`
- Update dependencies: `mvn dependency:resolve`
- Rebuild: `mvn package`

---

## ⏹️ Stop the Application

Press `Ctrl + C` in the terminal/command prompt window running the application.

---

## 📊 Database Tables (Auto-Created)

The application automatically creates these tables on first run:

### users table
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

### trips table
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

## 📝 Important Files

| File | Purpose |
|------|---------|
| `application.properties` | Database & server configuration |
| `pom.xml` | Project dependencies and build settings |
| `TravelPlannerWebApplication.java` | Main application entry point |
| `src/main/java/` | Java source code (controllers, services, etc.) |
| `src/main/resources/static/` | Frontend files (HTML, CSS, JavaScript) |

---

## 🎯 Quick Command Reference

```bash
# Build the project
mvn clean package

# Run with Maven
mvn spring-boot:run

# Run with Java
java -jar target/Travel-planner-web-application-0.0.1-SNAPSHOT.jar

# Run tests
mvn test

# View all Maven commands
mvn help:describe
```

---

## ✨ You're All Set!

The application is now ready to use. Visit **http://localhost:8080** in your browser and start planning your trips! 🌍✈️


