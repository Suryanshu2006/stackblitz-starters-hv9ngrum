const express = require('express');
const router = express.Router();
const MenuItem = require('./menuItem'); // Import MenuItem schema

// POST /menu - Create a new menu item
router.post('/menu', async (req, res) => {
  try {
    const { name, description, price } = req.body;

    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price are required.' });
    }

    const newItem = new MenuItem({ name, description, price });
    const savedItem = await newItem.save();
    res.status(201).json({ message: 'Menu item created successfully.', item: savedItem });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the menu item.' });
  }
});

// GET /menu - Fetch all menu items
router.get('/menu', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the menu items.' });
  }
});

// PUT /menu/:id - Update an existing menu item
router.put('/menu/:id', async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { name, description, price },
      { new: true, runValidators: true } // Return updated document and validate input
    );

    if (!updatedItem) {
      return res.status(404).json({ error: 'Menu item not found.' });
    }

    res.status(200).json({ message: 'Menu item updated successfully.', item: updatedItem });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the menu item.' });
  }
});

// DELETE /menu/:id - Delete an existing menu item
router.delete('/menu/:id', async (req, res) => {
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ error: 'Menu item not found.' });
    }

    res.status(200).json({ message: 'Menu item deleted successfully.', item: deletedItem });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the menu item.' });
  }
});

module.exports = router;