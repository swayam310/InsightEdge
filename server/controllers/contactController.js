const ContactMessage = require('../models/ContactMessage');

// Save contact message
exports.saveContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    const contactMessage = new ContactMessage({
      name,
      email,
      subject,
      message,
      userId: req.isAuthenticated() ? req.user._id : null
    });
    
    const savedMessage = await contactMessage.save();
    
    res.status(201).json({
      id: savedMessage._id,
      message: 'Message sent successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all contact messages (admin only)
exports.getContactMessages = async (req, res) => {
  try {
    // In a real app, add admin check here
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};