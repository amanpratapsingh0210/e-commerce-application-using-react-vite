const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

// POST /cart - Add item to cart
router.post('/', auth, async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let cart = await Cart.findOne({ userId: req.user.id });

    if (cart) {
      // Cart exists for user
      const itemIndex = cart.items.findIndex(p => p.productId == productId);

      if (itemIndex > -1) {
        // Product exists in cart, update quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Product does not exist in cart, add new item
        cart.items.push({ productId, quantity });
      }
    } else {
      // No cart for user, create new cart
      cart = new Cart({
        userId: req.user.id,
        items: [{ productId, quantity }]
      });
    }
    
    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /cart/:id - Update quantity
// Note: :id here refers to the product ID inside the cart
router.put('/:productId', auth, async (req, res) => {
  const { quantity } = req.body;
  
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const itemIndex = cart.items.findIndex(p => p.productId == req.params.productId);
    
    if (itemIndex > -1) {
        if(quantity > 0) {
            cart.items[itemIndex].quantity = quantity;
        } else {
             cart.items.splice(itemIndex, 1); // Remove if qty is 0
        }
        await cart.save();
        res.json(cart);
    } else {
        res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /cart/:id - Remove item
router.delete('/:productId', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(item => item.productId != req.params.productId);
    
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;