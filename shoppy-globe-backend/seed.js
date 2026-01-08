const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected for Seeding'));

const sampleProducts = [
  {
    title: "Essence Mascara Lash Princess",
    price: 9.99,
    description: "The Lash Princess False Lash Effect Mascara gives you an instant false lash look.",
    stock: 50,
    thumbnail: "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png"
  },
  {
    title: "Eyeshadow Palette with Mirror",
    price: 19.99,
    description: "The Eyeshadow Palette with Mirror offers a versatile range of shades for creating stunning eye looks.",
    stock: 40,
    thumbnail: "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/thumbnail.png"
  },
   {
    title: "Powder Canister",
    price: 14.99,
    description: "The Powder Canister is a finely milled setting powder designed to set makeup and control shine.",
    stock: 30,
    thumbnail: "https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/thumbnail.png"
  }
];

const seedDB = async () => {
  await Product.deleteMany({});
  await Product.insertMany(sampleProducts);
  console.log('Database Seeded!');
  mongoose.connection.close();
};

seedDB();