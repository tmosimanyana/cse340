function handleErrors(err, req, res, next) {
    console.error(err.stack)
    res.status(500).render('500', { title: 'Server Error', error: err.message })
  }
  
  module.exports = handleErrors
  