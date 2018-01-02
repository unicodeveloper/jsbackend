var Meetup =  require('../models/meetup');

/**
 * List Public Meetups
 */
exports.getPublicMeetups = (req, res) => {
  return Meetup.find({type: 'public'}).exec().then((meetup) => {

    return res.json({ meetups: meetup });

  }).catch((err) => {

    return res.json({ err: err });

  });
}

exports.create = (req, res) => {

  const meetupData = {
    name: req.body.name,
    host: req.body.host,
    attendees: req.body.attendees,
    type: req.body.type
  };

  return Meetup.create(meetupData).then((meetup) => {

    return res.json({ message: "Meetup created successfully", meetup: meetup });

  }).catch((err) => {

    return res.json({ err: err });

  });
}


/**
 * List Private Meetups
 */
exports.getPrivateMeetups = (req, res) => {
  return Meetup.find({type: 'private'}).exec().then((meetup) => {

    return res.json({ meetups: meetup });

  }).catch((err) => {

    return res.json({ err: err });

  });
}