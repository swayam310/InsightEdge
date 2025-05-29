// Check if user is authenticated
exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    
    res.status(401).json({ message: 'Not authenticated' });
  };
  
  // Check if user is an admin (for future use)
  exports.isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'admin') {
      return next();
    }
    
    res.status(403).json({ message: 'Not authorized' });
  };