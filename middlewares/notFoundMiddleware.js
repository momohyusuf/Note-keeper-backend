const notFound = (req, res) => {
  res
    .status(404)
    .send(
      'Route those note exist check the url properly or use the documentation'
    );
};

module.exports = notFound;
