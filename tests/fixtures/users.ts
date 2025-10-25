export const testUsers = {
    adminUser: {
        email: 'admin@example.com',
        password: 'Admin@123',
        role: 'admin'
    },
    validCustomer: {
        email: 'customer@example.com',
        password: 'Customer@123',
        role: 'customer'
    },
    invalidUsers: {
        wrongPassword: {
            email: 'customer@example.com',
            password: 'WrongPass@123'
        },
        wrongEmail: {
            email: 'nonexistent@example.com',
            password: 'Test@123'
        },
        malformedEmail: {
            email: 'invalid.email',
            password: 'Test@123'
        }
    }
};