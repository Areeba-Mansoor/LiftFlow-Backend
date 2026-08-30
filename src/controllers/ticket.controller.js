import Ticket from '../models/Ticket.js';
import User from '../models/User.js';

// Create a new ticket (Customer)
export const createTicket = async (req, res) => {
  try {
    const { title, description, category, priority } = req.body;

    const ticket = await Ticket.create({
      title,
      description,
      category: category || 'General',
      priority: priority || 'Medium',
      customer: req.user._id,
      isAdminRead: false 
    });

    const populatedTicket = await Ticket.findById(ticket._id)
      .populate('customer', 'name email')
      .populate('assignedWorker', 'name email');

    res.status(201).json(populatedTicket);
  } catch (err) {
    console.error("Error creating ticket:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get tickets (All for Admin, assigned for Worker, own for Customer)
export const getTickets = async (req, res) => {
  try {
    let query = {};

    // Check if user exists from auth middleware
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized, user missing' });
    }

    if (req.user.role === 'customer') {
      query.customer = req.user._id;
    } else if (req.user.role === 'worker') {
      query.assignedWorker = req.user._id;
    }

    const tickets = await Ticket.find(query)
      .populate('customer', 'name email')
      .populate('assignedWorker', 'name email')
      .sort({ createdAt: -1 });

    res.json(tickets);
  } catch (err) {
    console.error("Error in getTickets:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getWorkers = async (req, res) => {
  try {
    const workers = await User.find({ role: 'worker' }).select('name email');
    res.json(workers);
  } catch (err) {
    console.error("Error fetching workers:", err);
    res.status(500).json({ message: err.message });
  }
};

// Admin updates ticket details, category, priority, and assigns worker
export const updateTicketAdmin = async (req, res) => {
  try {
    const { category, priority, assignedWorker, status } = req.body;
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    if (category !== undefined) ticket.category = category;
    if (priority !== undefined) ticket.priority = priority;
    if (assignedWorker !== undefined) ticket.assignedWorker = assignedWorker === '' ? null : assignedWorker;
    if (status !== undefined) ticket.status = status;

    await ticket.save();

    const updatedTicket = await Ticket.findById(ticket._id)
      .populate('customer', 'name email')
      .populate('assignedWorker', 'name email');

    res.json(updatedTicket);
  } catch (err) {
    console.error("Error updating ticket:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get latest tickets as notifications for Admin
export const getAdminNotifications = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate('customer', 'name email')
      .sort({ createdAt: -1 })
      .limit(10);

    const notifications = tickets.map(ticket => ({
      _id: ticket._id,
      title: `New Ticket: ${ticket.title}`,
      message: `Complaint by ${ticket.customer?.name || 'Customer'}: ${ticket.description?.substring(0, 40)}...`,
      read: ticket.isAdminRead || false,
      createdAt: ticket.createdAt
    }));

    res.json(notifications);
  } catch (err) {
    console.error("Error fetching notifications:", err);
    res.status(500).json({ message: err.message });
  }
};

// Mark notification as read
export const markNotificationAsRead = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: 'Notification not found' });

    ticket.isAdminRead = true;
    await ticket.save();

    res.json({ message: 'Marked as read' });
  } catch (err) {
    console.error("Error marking notification:", err);
    res.status(500).json({ message: err.message });
  }
};