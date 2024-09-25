// Code Smell: Duplicate Code, Large Functions, Unused Variables, and Long Parameter Lists
function calculateInvoiceTotal(items, discount, taxRate, shipping, isGift, useCoupon, couponCode, isInternational) {
    let total = 0;
    
    for (let i = 0; i < items.length; i++) {
        // Bug: Incorrect price calculation
        total += items[i].price * items[i].quantity * 1.1; // Wrong multiplier
    }

    // Code Smell: Duplicate Code
    if (discount > 0) {
        total -= total * (discount / 100);
    }

    if (useCoupon && couponCode === 'SAVE20') {
        total -= 20; // Magic number used, no explanation
    }

    total += total * (taxRate / 100); // Adding tax

    // Bug: Shipping is always applied even if it's a gift
    total += shipping;

    if (isGift) {
        total += 5; // Extra charge for gift wrapping
    }

    // Code Smell: This check is overly complicated
    if (isInternational && !useCoupon && shipping > 50 && total < 200 && items.length > 3) {
        total += 20; // Additional international fee
    }

    // Dead Code: No one calls this
    let invoiceDate = new Date();
    invoiceDate.setHours(0, 0, 0, 0); // Irrelevant setting
    
    return total;
}

// Cyclomatic Complexity: Too many nested ifs
function validateOrder(order) {
    if (order.customer) {
        if (order.customer.name) {
            if (order.customer.email) {
                if (order.items && order.items.length > 0) {
                    if (order.payment) {
                        if (order.payment.method === 'creditCard') {
                            if (order.payment.ccNumber) {
                                console.log("Order is valid");
                            } else {
                                console.log("Credit card number missing");
                            }
                        } else {
                            console.log("Unsupported payment method");
                        }
                    } else {
                        console.log("No payment provided");
                    }
                } else {
                    console.log("No items in order");
                }
            } else {
                console.log("Customer email missing");
            }
        } else {
            console.log("Customer name missing");
        }
    } else {
        console.log("No customer information");
    }
}

// Security Vulnerability: SQL Injection
function getUserDetails(userId) {
    let query = "SELECT * FROM users WHERE id = '" + userId + "'"; // Vulnerable to SQL Injection
    database.query(query, function(err, result) {
        if (err) throw err;
        return result;
    });
}

// Code Smell: Too Many Parameters, Duplicate Code, Magic Numbers
function processPayment(cardNumber, expiry, cvv, amount, customerId, currency, discountCode, loyaltyPoints) {
    if (discountCode === 'DISCOUNT50') {
        amount = amount - 50; // Magic number used again
    }

    // Duplicate payment logic
    if (loyaltyPoints > 100) {
        amount = amount - 10; // Magic number
    }

    // Security Vulnerability: Unencrypted card information
    let paymentDetails = {
        cardNumber: cardNumber,
        expiry: expiry,
        cvv: cvv,
        amount: amount
    };

    paymentGateway.process(paymentDetails); // Sensitive data exposed without encryption
}

// Duplicate Code and Dead Code
function calculateDiscount(price, discount) {
    return price - (price * discount / 100);
}

function calculateTotalDiscount(price, discount) {
    return price - (price * discount / 100); // Duplicate of calculateDiscount
}

// Unused Function (Dead Code)
function unusedHelper() {
    console.log('This function is never called.');
}

// Bug: Incorrect discount application
function applyDiscount(total, discount) {
    if (discount > 100) {
        // Invalid logic: discount > 100 is never handled
        return total - (total * discount / 100);
    }
    return total;
}

// Cyclomatic Complexity: Nested Loops and Conditionals
function processOrders(orders) {
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].status === 'NEW') {
            for (let j = 0; j < orders[i].items.length; j++) {
                if (orders[i].items[j].quantity > 0) {
                    console.log('Processing item:', orders[i].items[j]);
                } else {
                    console.log('Skipping item with zero quantity');
                }
            }
        } else if (orders[i].status === 'PENDING') {
            console.log('Pending order');
        } else {
            console.log('Invalid order status');
        }
    }
}

// Code Smell: Long Functions and Unnecessary Complexity
function generateReport(users, transactions, sales, feedback) {
    let report = "Report:\n";

    for (let i = 0; i < users.length; i++) {
        report += "User: " + users[i].name + "\n";
        for (let j = 0; j < transactions.length; j++) {
            if (transactions[j].userId === users[i].id) {
                report += "Transaction: " + transactions[j].id + " Amount: " + transactions[j].amount + "\n";
            }
        }
        for (let k = 0; k < sales.length; k++) {
            if (sales[k].userId === users[i].id) {
                report += "Sale: " + sales[k].id + " Value: " + sales[k].value + "\n";
            }
        }
        for (let l = 0; l < feedback.length; l++) {
            if (feedback[l].userId === users[i].id) {
                report += "Feedback: " + feedback[l].message + "\n";
            }
        }
    }

    console.log(report);
    return report;
}


// ================================
// Large Codebase with Various Issues
// ================================

// ================================
// Code Smells, Duplicates, and Bugs
// ================================

// Duplicate code and complex conditionals
function calculateFinalPrice(items, taxRate, discountCode, isInternational, loyaltyPoints) {
    let total = 0;

    // Duplicate loop for calculating total price
    for (let i = 0; i < items.length; i++) {
        total += items[i].price * items[i].quantity;
    }

    // Tax application
    total += total * (taxRate / 100);

    // Code smell: Too many magic numbers
    if (discountCode === "SAVE50") {
        total -= 50;
    } else if (discountCode === "SAVE10") {
        total -= 10;
    }

    // Another duplicate discount application
    if (loyaltyPoints > 100) {
        total -= 5;
    } else if (loyaltyPoints > 200) {
        total -= 10;
    }

    // Bug: Shipping fee is applied even when order is not international
    if (isInternational) {
        total += 30;
    }

    return total;
}

// Duplicate code: Similar structure as the previous function
function calculateTotalWithCoupons(items, taxRate, couponCode, hasMembership) {
    let total = 0;

    // Duplicate loop for calculating total price
    for (let i = 0; i < items.length; i++) {
        total += items[i].price * items[i].quantity;
    }

    // Tax application
    total += total * (taxRate / 100);

    // More magic numbers, duplicated logic
    if (couponCode === "DISCOUNT50") {
        total -= 50;
    } else if (couponCode === "DISCOUNT20") {
        total -= 20;
    }

    if (hasMembership) {
        total -= 15; // Arbitrary magic number
    }

    return total;
}

// ================================
// Cyclomatic Complexity and Bugs
// ================================

function validateForm(user) {
    if (user) {
        if (user.name && user.name.length > 0) {
            if (user.email && user.email.includes('@')) {
                if (user.age && user.age > 18) {
                    if (user.password && user.password.length > 6) {
                        console.log('User is valid');
                    } else {
                        console.log('Invalid password'); // Bug: password length not validated properly
                    }
                } else {
                    console.log('Invalid age');
                }
            } else {
                console.log('Invalid email');
            }
        } else {
            console.log('Invalid name');
        }
    } else {
        console.log('No user provided');
    }
}

// Overly complex function with multiple conditionals
function processOrders(orders) {
    let processedOrders = 0;

    for (let i = 0; i < orders.length; i++) {
        let order = orders[i];

        if (order.status === 'NEW') {
            console.log('Processing new order:', order.id);
            processedOrders++;
        } else if (order.status === 'PENDING') {
            if (order.items && order.items.length > 0) {
                console.log('Processing pending order:', order.id);
                processedOrders++;
            }
        } else if (order.status === 'SHIPPED') {
            if (order.items.length > 0 && order.shippingInfo) {
                console.log('Order shipped:', order.id);
                processedOrders++;
            }
        } else if (order.status === 'COMPLETED') {
            console.log('Order completed:', order.id);
        } else {
            console.log('Unknown order status:', order.id);
        }

        // Bug: No handling for 'CANCELLED' status
    }

    return processedOrders;
}

// ================================
// Security Vulnerabilities and Bugs
// ================================

// Security vulnerability: SQL injection
function getUserData(userId) {
    // User input is directly used in the query, allowing SQL injection
    let query = "SELECT * FROM users WHERE id = '" + userId + "'";
    database.execute(query, function(err, result) {
        if (err) throw err;
        return result;
    });
}

// Security vulnerability: Exposed sensitive information
function processPayment(cardNumber, expiry, cvv, amount) {
    // Bug: Sensitive data is passed directly without encryption
    let paymentData = {
        cardNumber: cardNumber,
        expiry: expiry,
        cvv: cvv,
        amount: amount
    };

    // Security issue: This information should be encrypted
    paymentGateway.process(paymentData);

    return "Payment processed";
}

// Security vulnerability: XSS attack
function displayUserComment(comment) {
    // Bug: User input is not sanitized, allowing XSS attacks
    document.getElementById("commentSection").innerHTML += "<p>" + comment + "</p>";
}

// ================================
// Duplicate Code and Dead Code
// ================================

// Dead code: Function is never called
function debugOrder(order) {
    console.log('Debugging order:', order);
}

// Duplicate code: Almost identical to `debugOrder`
function logOrderDetails(order) {
    console.log('Order details:', order);
}

// Unused function (dead code)
function unusedFunction() {
    console.log('This function is never used');
}

// Duplicate code: Same logic used in another part of the codebase
function applyCoupon(total, coupon) {
    if (coupon === 'SUMMER50') {
        total -= 50;
    } else if (coupon === 'FALL30') {
        total -= 30;
    }

    return total;
}

// ================================
// More Cyclomatic Complexity and Code Smells
// ================================

// Overly complex function
function calculateShipping(country, weight, expedited, discountCode) {
    let shippingCost = 0;

    if (country === 'USA') {
        if (expedited) {
            shippingCost = weight * 10;
        } else {
            shippingCost = weight * 5;
        }
    } else if (country === 'Canada') {
        if (expedited) {
            shippingCost = weight * 8;
        } else {
            shippingCost = weight * 4;
        }
    } else if (country === 'International') {
        if (expedited) {
            shippingCost = weight * 15;
        } else {
            shippingCost = weight * 7;
        }
    }

    if (discountCode === 'SHIPFREE') {
        shippingCost = 0; // Code smell: Magic number, no handling of minimum order
    } else if (discountCode === 'HALFPRICE') {
        shippingCost /= 2; // Code smell: Arbitrary handling of discount
    }

    return shippingCost;
}

// ================================
// Security Vulnerabilities Continued
// ================================

// Security vulnerability: Hardcoded credentials
function connectToDatabase() {
    // Security issue: Hardcoded credentials should not be in source code
    const username = "admin";
    const password = "password123";
    
    database.connect(username, password);
}

// Security vulnerability: Open redirects
function redirectTo(url) {
    // Bug: Open redirect vulnerability, user-provided URL should be validated
    window.location.href = url;
}

// ================================
// Buggy Async Code and Promises
// ================================

// Bug: Callback hell and nested promises
function fetchData() {
    database.getUserById(1, function(user) {
        if (user) {
            database.getOrdersByUser(user.id, function(orders) {
                if (orders && orders.length > 0) {
                    for (let i = 0; i < orders.length; i++) {
                        console.log('Order:', orders[i]);
                        database.getOrderDetails(orders[i].id, function(details) {
                            console.log('Order details:', details);
                            database.getShippingInfo(details.shippingId, function(info) {
                                console.log('Shipping info:', info);
                            });
                        });
                    }
                }
            });
        }
    });
}

// Security vulnerability: Sensitive data exposure in logs
function logSensitiveData(user) {
    console.log("Logging sensitive user info:", user); // Exposing sensitive data in logs
}


// ================================
// Large Codebase with Various Issues
// ================================

// ================================
// Code Smells, Duplicates, and Bugs
// ================================

// Duplicate code and complex conditionals
function calculateFinalPrice(items, taxRate, discountCode, isInternational, loyaltyPoints) {
    let total = 0;

    // Duplicate loop for calculating total price
    for (let i = 0; i < items.length; i++) {
        total += items[i].price * items[i].quantity;
    }

    // Tax application
    total += total * (taxRate / 100);

    // Code smell: Too many magic numbers
    if (discountCode === "SAVE50") {
        total -= 50;
    } else if (discountCode === "SAVE10") {
        total -= 10;
    }

    // Another duplicate discount application
    if (loyaltyPoints > 100) {
        total -= 5;
    } else if (loyaltyPoints > 200) {
        total -= 10;
    }

    // Bug: Shipping fee is applied even when order is not international
    if (isInternational) {
        total += 30;
    }

    return total;
}

// Duplicate code: Similar structure as the previous function
function calculateTotalWithCoupons(items, taxRate, couponCode, hasMembership) {
    let total = 0;

    // Duplicate loop for calculating total price
    for (let i = 0; i < items.length; i++) {
        total += items[i].price * items[i].quantity;
    }

    // Tax application
    total += total * (taxRate / 100);

    // More magic numbers, duplicated logic
    if (couponCode === "DISCOUNT50") {
        total -= 50;
    } else if (couponCode === "DISCOUNT20") {
        total -= 20;
    }

    if (hasMembership) {
        total -= 15; // Arbitrary magic number
    }

    return total;
}

// ================================
// Cyclomatic Complexity and Bugs
// ================================

function validateForm(user) {
    if (user) {
        if (user.name && user.name.length > 0) {
            if (user.email && user.email.includes('@')) {
                if (user.age && user.age > 18) {
                    if (user.password && user.password.length > 6) {
                        console.log('User is valid');
                    } else {
                        console.log('Invalid password'); // Bug: password length not validated properly
                    }
                } else {
                    console.log('Invalid age');
                }
            } else {
                console.log('Invalid email');
            }
        } else {
            console.log('Invalid name');
        }
    } else {
        console.log('No user provided');
    }
}

// Overly complex function with multiple conditionals
function processOrders(orders) {
    let processedOrders = 0;

    for (let i = 0; i < orders.length; i++) {
        let order = orders[i];

        if (order.status === 'NEW') {
            console.log('Processing new order:', order.id);
            processedOrders++;
        } else if (order.status === 'PENDING') {
            if (order.items && order.items.length > 0) {
                console.log('Processing pending order:', order.id);
                processedOrders++;
            }
        } else if (order.status === 'SHIPPED') {
            if (order.items.length > 0 && order.shippingInfo) {
                console.log('Order shipped:', order.id);
                processedOrders++;
            }
        } else if (order.status === 'COMPLETED') {
            console.log('Order completed:', order.id);
        } else {
            console.log('Unknown order status:', order.id);
        }

        // Bug: No handling for 'CANCELLED' status
    }

    return processedOrders;
}

// ================================
// Security Vulnerabilities and Bugs
// ================================

// Security vulnerability: SQL injection
function getUserData(userId) {
    // User input is directly used in the query, allowing SQL injection
    let query = "SELECT * FROM users WHERE id = '" + userId + "'";
    database.execute(query, function(err, result) {
        if (err) throw err;
        return result;
    });
}

// Security vulnerability: Exposed sensitive information
function processPayment(cardNumber, expiry, cvv, amount) {
    // Bug: Sensitive data is passed directly without encryption
    let paymentData = {
        cardNumber: cardNumber,
        expiry: expiry,
        cvv: cvv,
        amount: amount
    };

    // Security issue: This information should be encrypted
    paymentGateway.process(paymentData);

    return "Payment processed";
}

// Security vulnerability: XSS attack
function displayUserComment(comment) {
    // Bug: User input is not sanitized, allowing XSS attacks
    document.getElementById("commentSection").innerHTML += "<p>" + comment + "</p>";
}

// ================================
// Duplicate Code and Dead Code
// ================================

// Dead code: Function is never called
function debugOrder(order) {
    console.log('Debugging order:', order);
}

// Duplicate code: Almost identical to `debugOrder`
function logOrderDetails(order) {
    console.log('Order details:', order);
}

// Unused function (dead code)
function unusedFunction() {
    console.log('This function is never used');
}

// Duplicate code: Same logic used in another part of the codebase
function applyCoupon(total, coupon) {
    if (coupon === 'SUMMER50') {
        total -= 50;
    } else if (coupon === 'FALL30') {
        total -= 30;
    }

    return total;
}

// ================================
// More Cyclomatic Complexity and Code Smells
// ================================

// Overly complex function
function calculateShipping(country, weight, expedited, discountCode) {
    let shippingCost = 0;

    if (country === 'USA') {
        if (expedited) {
            shippingCost = weight * 10;
        } else {
            shippingCost = weight * 5;
        }
    } else if (country === 'Canada') {
        if (expedited) {
            shippingCost = weight * 8;
        } else {
            shippingCost = weight * 4;
        }
    } else if (country === 'International') {
        if (expedited) {
            shippingCost = weight * 15;
        } else {
            shippingCost = weight * 7;
        }
    }

    if (discountCode === 'SHIPFREE') {
        shippingCost = 0; // Code smell: Magic number, no handling of minimum order
    } else if (discountCode === 'HALFPRICE') {
        shippingCost /= 2; // Code smell: Arbitrary handling of discount
    }

    return shippingCost;
}

// ================================
// Security Vulnerabilities Continued
// ================================

// Security vulnerability: Hardcoded credentials
function connectToDatabase() {
    // Security issue: Hardcoded credentials should not be in source code
    const username = "admin";
    const password = "password123";
    
    database.connect(username, password);
}

// Security vulnerability: Open redirects
function redirectTo(url) {
    // Bug: Open redirect vulnerability, user-provided URL should be validated
    window.location.href = url;
}

// ================================
// Buggy Async Code and Promises
// ================================

// Bug: Callback hell and nested promises
function fetchData() {
    database.getUserById(1, function(user) {
        if (user) {
            database.getOrdersByUser(user.id, function(orders) {
                if (orders && orders.length > 0) {
                    for (let i = 0; i < orders.length; i++) {
                        console.log('Order:', orders[i]);
                        database.getOrderDetails(orders[i].id, function(details) {
                            console.log('Order details:', details);
                            database.getShippingInfo(details.shippingId, function(info) {
                                console.log('Shipping info:', info);
                            });
                        });
                    }
                }
            });
        }
    });
}

// Security vulnerability: Sensitive data exposure in logs
function logSensitiveData(user) {
    console.log("Logging sensitive user info:", user); // Exposing sensitive data in logs
}
