// Sample JavaScript Code with Issues

// Duplicate Code
function calculateSum(a, b) {
    return a + b;
}

function calculateTotal(x, y) {
    return x + y;
}

// Long Method (Code Smell)
function processOrder(order) {
    if (order.status === 'NEW') {
        // Process new order
        console.log('Processing new order');
        if (order.items.length > 0) {
            for (let i = 0; i < order.items.length; i++) {
                console.log('Processing item:', order.items[i]);
            }
        } else {
            console.log('No items to process');
        }
    } else if (order.status === 'PENDING') {
        // Process pending order
        console.log('Processing pending order');
        if (order.items.length > 0) {
            for (let i = 0; i < order.items.length; i++) {
                console.log('Processing item:', order.items[i]);
            }
        } else {
            console.log('No items to process');
        }
    } else if (order.status === 'COMPLETED') {
        // Process completed order
        console.log('Order already completed');
    } else {
        console.log('Unknown order status');
    }
}

// High Cyclomatic Complexity
function validateUser(user) {
    if (user.name) {
        if (user.age) {
            if (user.email) {
                if (user.password) {
                    console.log('User is valid');
                } else {
                    console.log('Password is missing');
                }
            } else {
                console.log('Email is missing');
            }
        } else {
            console.log('Age is missing');
        }
    } else {
        console.log('Name is missing');
    }
}

// Security Vulnerability (SQL Injection)
function getUserData(userId) {
    const query = "SELECT * FROM users WHERE id = '" + userId + "'";
    database.execute(query); // Vulnerable to SQL injection
}

// Bug (Incorrect Logic)
function calculateDiscount(price, discount) {
    if (discount > 0 && discount < 100) {
        return price - (price * discount / 100);
    } else {
        return price; // Incorrect logic, should handle discount >= 100
    }
}

// Dead Code (Code Smell)
function unusedFunction() {
    console.log('This function is never used');
}
