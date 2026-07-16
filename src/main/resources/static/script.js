document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

    // ============================================
    // AUTHENTICATION PROTECTION
    // ============================================
    // Check if user is logged in when accessing the dashboard
    if (document.body.innerHTML.includes("Welcome back")) {
        const userId = sessionStorage.getItem('userId');
        // If no userId in session, user is not logged in
        if (!userId) {
            // Redirect to login page
            window.location.href = "/login.html";
            return;
        }
    }


    function showMessage(text, type = "info") {
        let box = document.getElementById("toast");
        if (!box) {
            box = document.createElement("div");
            box.id = "toast";
            box.style.position = "fixed";
            box.style.bottom = "20px";
            box.style.right = "20px";
            box.style.padding = "14px 18px";
            box.style.borderRadius = "12px";
            box.style.color = "#fff";
            box.style.fontWeight = "600";
            box.style.zIndex = "9999";
            box.style.boxShadow = "0 12px 24px rgba(0,0,0,.18)";
            document.body.appendChild(box);
        }
        box.textContent = text;
        box.style.background =
            type === "success" ? "#16a34a" :
                type === "error" ? "#ef4444" :
                    "#2563eb";
        box.style.display = "block";
        clearTimeout(window.toastTimer);
        window.toastTimer = setTimeout(() => {
            box.style.display = "none";
        }, 4000);
    }

    function showSuccessModal(message, redirectUrl, delay = 4000) {
        const modal = document.createElement("div");
        modal.id = "successModal";
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;
        
        const content = document.createElement("div");
        content.style.cssText = `
            background: white;
            padding: 40px;
            border-radius: 16px;
            text-align: center;
            max-width: 400px;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
        `;
        
        content.innerHTML = `
            <div style="font-size: 48px; margin-bottom: 16px;">✅</div>
            <h2 style="font-size: 1.5rem; margin-bottom: 8px; color: #172033;">Success!</h2>
            <p style="color: #667085; margin-bottom: 24px; line-height: 1.6;">${message}</p>
            <p style="color: #2563eb; font-size: 0.9rem;">Redirecting in <span id="countdown">4</span> seconds...</p>
        `;
        
        modal.appendChild(content);
        document.body.appendChild(modal);
        
        let count = 4;
        const countdownInterval = setInterval(() => {
            count--;
            const countdownEl = document.getElementById("countdown");
            if (countdownEl) {
                countdownEl.textContent = count;
            }
            if (count <= 0) {
                clearInterval(countdownInterval);
                window.location.href = redirectUrl;
            }
        }, 1000);
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // ============================================
    // LOGOUT BUTTON HANDLER
    // ============================================
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            // Clear all session data
            sessionStorage.removeItem('userId');
            sessionStorage.removeItem('userName');
            sessionStorage.removeItem('userEmail');

            // Show logout message
            showMessage("Logged out successfully. Redirecting to login...", "success");

            // Redirect to login page after short delay
            setTimeout(() => {
                window.location.href = "/login.html";
            }, 500);
        });
    }

    const loginForm = document.getElementById("loginForm");
    if (loginForm && document.getElementById("password") && document.getElementById("email")) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            if (!email || !password) {
                showMessage("Please fill in all login fields.", "error");
                return;
            }

            if (!validateEmail(email)) {
                showMessage("Please enter a valid email address.", "error");
                return;
            }

            if (password.length < 6) {
                showMessage("Password must be at least 6 characters.", "error");
                return;
            }

            // Submit to authentication API
            const loginData = {
                email: email,
                password: password
            };

            fetch("/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => {
                        throw new Error(err.message || "Login failed");
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log("Login successful:", data);
                if (data.success && data.data) {
                    // Store user info in session storage
                    sessionStorage.setItem('userId', data.data.id);
                    sessionStorage.setItem('userName', data.data.name);
                    sessionStorage.setItem('userEmail', data.data.email);
                    
                    showMessage("Login successful. Redirecting to dashboard...", "success");
                    // Redirect immediately to dashboard/index page
                    setTimeout(() => {
                        window.location.href = "/index.html";
                    }, 500);
                } else {
                    throw new Error("Invalid response format");
                }
            })
            .catch(error => {
                console.error("Login error:", error);
                showMessage("Login failed: " + (error.message || "Please try again"), "error");
            });
        });
    }

    const registerForm = document.getElementById("registerForm");
    if (registerForm && document.getElementById("firstName") && document.getElementById("confirmPassword")) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const firstName = document.getElementById("firstName").value.trim();
            const lastName = document.getElementById("lastName").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const password = document.getElementById("password").value.trim();
            const confirmPassword = document.getElementById("confirmPassword").value.trim();
            const terms = document.getElementById("terms").checked;

            if (!firstName || !lastName || !email || !password || !confirmPassword) {
                showMessage("Please complete all required registration fields.", "error");
                return;
            }

            if (!validateEmail(email)) {
                showMessage("Please enter a valid email address.", "error");
                return;
            }

            if (phone && !/^[0-9+\-\s]{7,15}$/.test(phone)) {
                showMessage("Please enter a valid phone number.", "error");
                return;
            }

            if (password.length < 8) {
                showMessage("Password must be at least 8 characters.", "error");
                return;
            }

            if (password !== confirmPassword) {
                showMessage("Passwords do not match.", "error");
                return;
            }

            if (!terms) {
                showMessage("You must accept the terms to continue.", "error");
                return;
            }

            // Submit to API
            const userData = {
                name: firstName + " " + lastName,
                email: email,
                password: password
            };

            fetch("/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => {
                        throw new Error(err.message || "Registration failed");
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log("Registration successful:", data);
                showSuccessModal(
                    "Your account has been created successfully! You can now log in with your email and password.",
                    "/login.html",
                    4000
                );
            })
            .catch(error => {
                console.error("Registration error:", error);
                showMessage("Registration failed: " + (error.message || "Please try again"), "error");
            });
        });
    }

    const sidebarToggleBtn = document.querySelector("[data-toggle-sidebar]");
    const sidebar = document.querySelector(".sidebar");
    if (sidebarToggleBtn && sidebar) {
        sidebarToggleBtn.addEventListener("click", () => {
            sidebar.classList.toggle("open");
        });
    }

    // Dashboard functionality
    if (document.body.innerHTML.includes("Welcome back")) {
        // Load user info from session
        const userId = sessionStorage.getItem('userId');
        const userName = sessionStorage.getItem('userName');

        if (userId) {
            document.querySelector(".topbar h1").textContent = `Welcome back, ${userName}! 👋`;
        }

        // Load user trips
        if (userId) {
            fetch(`/api/trips/user/${userId}`)
                .then(response => response.json())
                .then(data => {
                    console.log("Trips loaded:", data);
                    if (data.success && data.data && data.data.length > 0) {
                        const tripListContainer = document.querySelector(".trip-list");
                        if (tripListContainer) {
                            tripListContainer.innerHTML = data.data.map(trip => `
                                <div class="trip-item">
                                    <div class="trip-info">
                                        <h4>${trip.destination}</h4>
                                        <p>${new Date(trip.startDate).toLocaleDateString()} - ${new Date(trip.endDate).toLocaleDateString()}</p>
                                    </div>
                                    <div class="trip-badge">$${trip.budget.toFixed(2)}</div>
                                </div>
                            `).join('');
                        }
                    }
                })
                .catch(error => console.error("Error loading trips:", error));
        }
    }

    const newTripBtn = document.querySelector(".btn.primary");
    if (newTripBtn && !document.getElementById("loginForm") && !document.getElementById("registerForm")) {
        newTripBtn.addEventListener("click", () => {
            const modal = document.createElement("div");
            modal.id = "tripFormModal";
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
            `;

            const content = document.createElement("div");
            content.style.cssText = `
                background: white;
                padding: 40px;
                border-radius: 16px;
                max-width: 500px;
                width: 90%;
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
            `;

            const userId = sessionStorage.getItem('userId');
            content.innerHTML = `
                <h2 style="margin-bottom: 24px; font-size: 1.5rem; color: #172033;">Create New Trip</h2>
                <form id="tripForm" style="display: grid; gap: 16px;">
                    <div>
                        <label style="display: block; margin-bottom: 6px; font-weight: 600; color: #172033;">Destination</label>
                        <input type="text" id="tripDestination" required placeholder="e.g., Paris, France" style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 8px;">
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 6px; font-weight: 600; color: #172033;">Start Date</label>
                        <input type="date" id="tripStartDate" required style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 8px;">
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 6px; font-weight: 600; color: #172033;">End Date</label>
                        <input type="date" id="tripEndDate" required style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 8px;">
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 6px; font-weight: 600; color: #172033;">Budget ($)</label>
                        <input type="number" id="tripBudget" required placeholder="0.00" min="0.01" step="0.01" style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 8px;">
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px;">
                        <button type="submit" style="background: #2563eb; color: white; border: none; padding: 12px; border-radius: 8px; font-weight: 600; cursor: pointer;">Create Trip</button>
                        <button type="button" onclick="document.getElementById('tripFormModal').remove()" style="background: #e5e7eb; color: #172033; border: none; padding: 12px; border-radius: 8px; font-weight: 600; cursor: pointer;">Cancel</button>
                    </div>
                </form>
            `;

            modal.appendChild(content);
            document.body.appendChild(modal);

            document.getElementById("tripForm").addEventListener("submit", (e) => {
                e.preventDefault();

                const tripData = {
                    destination: document.getElementById("tripDestination").value,
                    startDate: document.getElementById("tripStartDate").value,
                    endDate: document.getElementById("tripEndDate").value,
                    budget: parseFloat(document.getElementById("tripBudget").value),
                    user: { id: userId }
                };

                fetch("/api/trips", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(tripData)
                })
                .then(response => response.json())
                .then(data => {
                    console.log("Trip created:", data);
                    if (data.success) {
                        showMessage("Trip created successfully!", "success");
                        document.getElementById("tripFormModal").remove();
                        // Reload trips
                        window.location.reload();
                    } else {
                        throw new Error(data.message || "Failed to create trip");
                    }
                })
                .catch(error => {
                    console.error("Error creating trip:", error);
                    showMessage("Error creating trip: " + error.message, "error");
                });
            });
        });
    }
});