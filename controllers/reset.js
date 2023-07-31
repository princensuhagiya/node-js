exports.reset = (req, res) => {
  try {
    console.log(req.body);
    res.json(req.body);
    console.log(req.body);
  } catch (error) {
    console.log(error);
  }
};
