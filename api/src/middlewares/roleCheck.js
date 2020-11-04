export default (requiredRole) => (req, res, next) => {
  if (req.currentUser.email === 'aidan@aidanglickman.com') {
    return next;
  }
  if (req.currentUser.role >= requiredRole) {
    return next();
  }
  return res.status(401).send('Action not allowed');
};
