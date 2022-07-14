const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
      res.redirect('/login');
    } else {
        // call the next middleware function
        next();
    }
};

module.exports = withAuth;

// this exported module is imported in the dashboard-routes.js file
// it is called as an argument in the get route
// so we start the get route, call this auth function and run through it
// the NEXT() is then continuing with the dashboard-routes file