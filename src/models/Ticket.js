import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, default: 'General' },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  status: { type: String, enum: ['Pending', 'In Progress', 'Resolved', 'Closed'], default: 'Pending' },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assignedWorker: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  isAdminRead: { type: Boolean, default: false }, // Yeh field add ki gayi hai notifications ke liye
  responses: [{
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: String,
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

export default mongoose.model('Ticket', ticketSchema);