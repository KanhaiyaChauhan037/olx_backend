const mongoose = require("mongoose");

const classifiedSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ["Clothing", "Electronics", "Furniture", "Other"],
    required: true,
  },
  image: { type: String, required: true },
  location: { type: String, required: true },
  postedAt: { type: Date, required: true },
  price: { type: Number, required: true },
});

const Classified = mongoose.model("Classified", classifiedSchema);

module.exports = Classified;
