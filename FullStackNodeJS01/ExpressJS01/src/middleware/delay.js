const delay = (req, res, next) => {
  setTimeout(() => {
    next();
  }, 1000); // Delay 1 giây
};

module.exports = delay;