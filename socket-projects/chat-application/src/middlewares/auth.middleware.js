

export const isAuthenticated = (req, res, next) => {
    // 1. Check id user is loggedIN
        // If token exists
        // check if token is valid
        // If token is not valid
            // return error
        // If token is valid
            // continue

    // 2. Check if user exist in database
        // If user does not exist
            // return error
        // If user exists
            // continue

    // 3. Check if route is allowed to access
        // If route is allowed
            // continue
        // If route is not allowed
            // return error

    // 4. Check if user is authorized
        // If user is authorized
            // continue
        // If user is not authorized
            // return error

    // 5. Check if user is admin
        // If user is admin
            // continue
        // If user is not admin
            // return error

    // 6. Check if user is blocked
        // If user is blocked
            // return error
        // If user is not blocked
            // continue

    // 7. Check if user is suspended
        // If user is suspended
            // return error
        // If user is not suspended
            // continue

    // 8. Check if user is deleted
        // If user is deleted
            // return error
        // If user is not deleted
            // continue

    // 9. Check if user is banned
        // If user is banned
            // return error
        // If user is not banned
            // continue

    // 10. Check if user is muted
        // If user is muted
            // return error
        // If user is not muted
            // continue

    // 11. Check if user is locked
        // If user is locked
            // return error
        // If user is not locked
            // continue

    // 12. Check if user is verified
        // If user is verified
            // continue
        // If user is not verified
            // return error
    
    next();
}

