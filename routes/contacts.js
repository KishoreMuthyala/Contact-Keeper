const express = require("express");
const router = express.Router();

const Contact = require("../models/contact");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

//add contact
router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is Required").not().isEmpty(),
      check("email", "Email is Required").isEmail(),
      check("phone", "Contact Number is Required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user._id,
      });

      const contact = await newContact.save();

      res.json(contact);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//get all contacts of individual persons
//private
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user._id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Internal Server Error");
  }
});

//delete
//private
router.delete("/:contactId", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.contactId);

    if (!contact) {
      return res.status(404).json({ msg: "Contact not found" });
    }

    //make sure user owns conatct to be deleted

    if (contact.user.toString() !== req.user._id) {
      return res.status(401).json({ msg: "Not Authorized" });
    }

    await Contact.findByIdAndRemove(req.params.contactId);

    res.json({ msg: "Contact Deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Internal Server Error");
  }
});

//private
//update
router.put("/:contactId", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  const contactFields = {};

  if (name) contactFields.name = name;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;
  if (email) contactFields.email = email;

  try {
    let contact = await Contact.findById(req.params.contactId);

    if (!contact) {
      return res.status(404).json({ msg: "Contact not found" });
    }

    if (contact.user.toString() !== req.user._id) {
      return res.status(401).json({ msg: "Not Authorized" });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.contactId,
      { $set: contactFields },
      { new: true }
    );

    res.json(contact);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
