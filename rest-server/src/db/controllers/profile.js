const db = require('../index.js');
import jwtDecode from 'jwt-decode';

module.exports = {
  get: (req, res) => {
    const email = jwtDecode(req.headers.authorization).email;

    const data = {};

    db.users.findOne({ where: { email: email },
    include: [{ model: db.projects } ]})
      .then(info => {
        data.info = info;
        db.notifications.findAll({ where: { user: email } })
        .then(notifications => {
          data.notifications = notifications;
          res.send(data);
        })
        .catch(err => {
          throw err;
        })
      })
      .catch(err => {
        throw err;
      })
  },

  update: (req, res) => {
    const email = req.body.email;
    const updatedUser = {
      name: req.body.name,
      position: req.body.position,
      availability: req.body.availability,
      description: req.body.description,
      location: req.body.location,
      imageurl: req.body.imageurl,
      title: req.body.title,
      tech: req.body.tech,
    };

    db.users.update(updatedUser, { where: { email: email } })
      .then(data => {
        res.send(data)
      })
      .catch((err) => {
        throw err;
      });
  },
};
