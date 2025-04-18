module.exports = (err, req, res, next) => {
  console.error(err.stack);  // Logs error stack trace for debugging
  res.status(500).send('Something went wrong!');
};
