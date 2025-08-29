const getHomePage = (req, res) => {
  return res.render('index.ejs');
};

const getApiHome = (req, res) => {
  return res.status(200).json({
    EC: 0,
    EM: "API Home - Welcome authenticated user!",
    DT: {
      user: req.user,
      message: "You have successfully accessed the protected route"
    }
  });
};

module.exports = { getHomePage, getApiHome };