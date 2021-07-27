import User from "../models/user.js";
import Event from "../models/events.js";
import Organization from "../models/organization.js";
import Image from "../functions/image.js";

const getCurrentUserData = async (req, res) => {
  var jsonResult = {};
  jsonResult = {
    user: req.user,
    state: true,
  };

  if (req.user.organization) {
    var organization = await Organization.findById(req.user.organization, {
      blockStatus: 0,
    });
    jsonResult.organization = organization;
  }
  const events = await Event.find({}, { registeredUsers: 0 }).sort({
    "dateTime.dates.0": 1,
  });
  console.log(events.length);
  if (events) jsonResult.event_list = events;
  return res.json(jsonResult);
};

const getMyEvents = async (req, res) => {
  try {
    const myEvents = req.user.registeredEvents;
    const events = await Event.find({ _id: { $in: myEvents } });
    if (!events)
      return res.json({
        message: "You do not have any registered events.",
        state: true,
      });

    return res.json({ event_list: events, state: true });
  } catch (error) {
    return res.json({ message: error, state: false });
  }
};

const getMyFavourites = async (req, res) => {
  try {
    const favs = req.user.favourites;
    const events = await Event.find({ _id: { $in: favs } });
    if (!events)
      return res.json({
        message: "You do not have any events on your favourites list.",
        state: true,
      });

    return res.json({ event_list: events, state: true });
  } catch (error) {
    return res.json({ message: error, state: false });
  }
};

const addtoFavourites = async (req, res) => {
  try {
    const event = req.params.id;
    const user = req.user;
    console.log(user.favourites.includes(event));
    if (!user.favourites.includes(event)) {
      user.favourites.push(event);
      message = "Added to favourites.";
    } else {
      console.log(user.favourites.indexOf(event));
      user.favourites.splice(user.favourites.indexOf(event), 1);
      console.log(`length: ${user.favorites.length}`);
      message = "Removed from favourites";
    }
    print("hello");
    await user.save();
    console.log(message);
    return res.json({
      message: message,
      state: true,
    });
  } catch (error) {
    return res.json({ message: error, state: false });
  }
};

const uploadProfile = async (req, res) => {
  try {
    //TODO:Save `url` to req.user
    var url = await Image.uploadImage(req.file.path, {
      rootFolder: "users",
      // folder: "temp",
      folder: req.user.name + "-" + req.user._id,
      name: req.file.originalname,
    });
    res.json({ message: "Profile Picture Updated.\nURL: " + url, state: true });
  } catch (error) {
    res.json({ message: error, state: false });
  }
};

export default {
  getMyEvents,
  getCurrentUserData,
  getMyFavourites,
  addtoFavourites,
  uploadProfile,
};
