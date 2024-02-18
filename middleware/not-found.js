const notFound = (req, res) => res.status(404).send("Can't find the route")

module.exports = notFound