export const validateUserData = (req, res, next) => {
  const requiredFields = [
      'firstname', 'lastname', 'email', 
      'password', 'mobile', 'age', 'gender'
  ];
  
  const missingFields = requiredFields.filter(field => !req.body[field]);
  
  if (missingFields.length > 0) {
      return res.status(400).json({
          error: `Missing required fields: ${missingFields.join(', ')}`
      });
  }
  
  if (!req.body.profile_pic?.url) {
      return res.status(400).json({
          error: 'Profile picture is required'
      });
  }
  
  next();
};