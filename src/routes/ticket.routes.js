import express from 'express';
import { 
  createTicket, 
  getTickets, 
  getWorkers, 
  updateTicketAdmin, 
  getAdminNotifications, 
  markNotificationAsRead 
} from '../controllers/ticket.controller.js';
import { protect, admin } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Workers list route (Admin ke liye)
router.get('/workers', protect, admin, getWorkers);

// Notifications routes
router.get('/notifications', protect, admin, getAdminNotifications);
router.put('/notifications/:id/read', protect, admin, markNotificationAsRead);

// Ticket CRUD routes
router.route('/')
  .get(protect, getTickets)
  .post(protect, createTicket);

// Admin ticket update/assignment route
router.route('/:id')
  .put(protect, admin, updateTicketAdmin);

export default router;