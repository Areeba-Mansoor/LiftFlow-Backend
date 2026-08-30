// // // // import User from '../models/AppUser.js';
// // // // import bcrypt from 'bcryptjs';
// // // // import jwt from 'jsonwebtoken';

// // // // // Register User
// // // // export const register = async (req, res) => {
// // // //   try {
// // // //     const { name, email, password, role, phone } = req.body;

// // // //     const existingUser = await User.findOne({ email });
// // // //     if (existingUser) {
// // // //       return res.status(400).json({ message: 'User already exists with this email.' });
// // // //     }

// // // //     const salt = await bcrypt.genSalt(10);
// // // //     const hashedPassword = await bcrypt.hash(password, salt);

// // // //     const newUser = new User({
// // // //       name,
// // // //       email,
// // // //       password: hashedPassword,
// // // //       role: role || 'customer',
// // // //       phone
// // // //     });

// // // //     await newUser.save();
// // // //     res.status(201).json({ message: 'User registered successfully!' });
// // // //   } catch (error) {
// // // //     res.status(500).json({ message: 'Server error', error: error.message });
// // // //   }
// // // // };

// // // // // Login User
// // // // export const login = async (req, res) => {
// // // //   try {
// // // //     const { email, password } = req.body;

// // // //     const user = await User.findOne({ email });
// // // //     if (!user) {
// // // //       return res.status(400).json({ message: 'Invalid email or password.' });
// // // //     }

// // // //     const isMatch = await bcrypt.compare(password, user.password);
// // // //     if (!isMatch) {
// // // //       return res.status(400).json({ message: 'Invalid email or password.' });
// // // //     }

// // // //     const token = jwt.sign(
// // // //       { id: user._id, role: user.role },
// // // //       process.env.JWT_SECRET || 'secret_key_here',
// // // //       { expiresIn: '7d' }
// // // //     );

// // // //     res.status(200).json({
// // // //       message: 'Logged in successfully',
// // // //       token,
// // // //       user: { id: user._id, name: user.name, email: user.email, role: user.role }
// // // //     });
// // // //   } catch (error) {
// // // //     res.status(500).json({ message: 'Server error', error: error.message });
// // // //   }
// // // // };


// // // import User from '../models/AppUser.js';
// // // import bcrypt from 'bcryptjs';
// // // import jwt from 'jsonwebtoken';
// // // import crypto from 'crypto';

// // // // Register User
// // // export const register = async (req, res) => {
// // //   try {
// // //     const { name, email, password, role, phone } = req.body;

// // //     const existingUser = await User.findOne({ email });
// // //     if (existingUser) {
// // //       return res.status(400).json({ message: 'User already exists with this email.' });
// // //     }

// // //     const salt = await bcrypt.genSalt(10);
// // //     const hashedPassword = await bcrypt.hash(password, salt);

// // //     const newUser = new User({
// // //       name,
// // //       email,
// // //       password: hashedPassword,
// // //       role: role || 'customer',
// // //       phone
// // //     });

// // //     await newUser.save();
// // //     res.status(201).json({ message: 'User registered successfully!' });
// // //   } catch (error) {
// // //     res.status(500).json({ message: 'Server error', error: error.message });
// // //   }
// // // };

// // // // Login User
// // // export const login = async (req, res) => {
// // //   try {
// // //     const { email, password } = req.body;

// // //     const user = await User.findOne({ email });
// // //     if (!user) {
// // //       return res.status(400).json({ message: 'Invalid email or password.' });
// // //     }

// // //     const isMatch = await bcrypt.compare(password, user.password);
// // //     if (!isMatch) {
// // //       return res.status(400).json({ message: 'Invalid email or password.' });
// // //     }

// // //     const token = jwt.sign(
// // //       { id: user._id, role: user.role },
// // //       process.env.JWT_SECRET || 'secret_key_here',
// // //       { expiresIn: '7d' }
// // //     );

// // //     res.status(200).json({
// // //       message: 'Logged in successfully',
// // //       token,
// // //       user: { id: user._id, name: user.name, email: user.email, role: user.role }
// // //     });
// // //   } catch (error) {
// // //     res.status(500).json({ message: 'Server error', error: error.message });
// // //   }
// // // };

// // // // Forgot Password - generate reset token
// // // export const forgotPassword = async (req, res) => {
// // //   try {
// // //     const { email } = req.body;
// // //     const user = await User.findOne({ email });

// // //     if (!user) {
// // //       return res.status(404).json({ message: 'No account found with this email.' });
// // //     }

// // //     const rawToken = crypto.randomBytes(32).toString('hex');
// // //     const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');

// // //     user.resetPasswordToken = hashedToken;
// // //     user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
// // //     await user.save();

// // //     const resetLink = `${process.env.FRONTEND_URL}/reset-password/${rawToken}`;

// // //     // TODO: Replace with real email service (Nodemailer) later.
// // //     console.log('Password reset link:', resetLink);

// // //     res.status(200).json({
// // //       message: 'Reset link generated.',
// // //       resetLink // demo mode: sent in response instead of email
// // //     });
// // //   } catch (error) {
// // //     res.status(500).json({ message: 'Server error', error: error.message });
// // //   }
// // // };

// // // // Reset Password - verify token and set new password
// // // export const resetPassword = async (req, res) => {
// // //   try {
// // //     const { token } = req.params;
// // //     const { password } = req.body;

// // //     const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

// // //     const user = await User.findOne({
// // //       resetPasswordToken: hashedToken,
// // //       resetPasswordExpires: { $gt: Date.now() }
// // //     });

// // //     if (!user) {
// // //       return res.status(400).json({ message: 'Invalid or expired reset link.' });
// // //     }

// // //     const salt = await bcrypt.genSalt(10);
// // //     user.password = await bcrypt.hash(password, salt);
// // //     user.resetPasswordToken = undefined;
// // //     user.resetPasswordExpires = undefined;
// // //     await user.save();

// // //     res.status(200).json({ message: 'Password reset successful. You can now log in.' });
// // //   } catch (error) {
// // //     res.status(500).json({ message: 'Server error', error: error.message });
// // //   }
// // // };


// // // import User from '../models/AppUser.js';
// // // import bcrypt from 'bcryptjs';
// // // import jwt from 'jsonwebtoken';

// // // // Register User
// // // export const register = async (req, res) => {
// // //   try {
// // //     const { name, email, password, role, phone } = req.body;

// // //     const existingUser = await User.findOne({ email });
// // //     if (existingUser) {
// // //       return res.status(400).json({ message: 'User already exists with this email.' });
// // //     }

// // //     const salt = await bcrypt.genSalt(10);
// // //     const hashedPassword = await bcrypt.hash(password, salt);

// // //     const newUser = new User({
// // //       name,
// // //       email,
// // //       password: hashedPassword,
// // //       role: role || 'customer',
// // //       phone
// // //     });

// // //     await newUser.save();
// // //     res.status(201).json({ message: 'User registered successfully!' });
// // //   } catch (error) {
// // //     res.status(500).json({ message: 'Server error', error: error.message });
// // //   }
// // // };

// // // // Login User
// // // export const login = async (req, res) => {
// // //   try {
// // //     const { email, password } = req.body;

// // //     const user = await User.findOne({ email });
// // //     if (!user) {
// // //       return res.status(400).json({ message: 'Invalid email or password.' });
// // //     }

// // //     const isMatch = await bcrypt.compare(password, user.password);
// // //     if (!isMatch) {
// // //       return res.status(400).json({ message: 'Invalid email or password.' });
// // //     }

// // //     const token = jwt.sign(
// // //       { id: user._id, role: user.role },
// // //       process.env.JWT_SECRET || 'secret_key_here',
// // //       { expiresIn: '7d' }
// // //     );

// // //     res.status(200).json({
// // //       message: 'Logged in successfully',
// // //       token,
// // //       user: { id: user._id, name: user.name, email: user.email, role: user.role }
// // //     });
// // //   } catch (error) {
// // //     res.status(500).json({ message: 'Server error', error: error.message });
// // //   }
// // // };


// // import User from '../models/AppUser.js';
// // import bcrypt from 'bcryptjs';
// // import jwt from 'jsonwebtoken';
// // import crypto from 'crypto';

// // // Register User
// // export const register = async (req, res) => {
// //   try {
// //     const { name, email, password, role, phone } = req.body;

// //     const existingUser = await User.findOne({ email });
// //     if (existingUser) {
// //       return res.status(400).json({ message: 'User already exists with this email.' });
// //     }

// //     const salt = await bcrypt.genSalt(10);
// //     const hashedPassword = await bcrypt.hash(password, salt);

// //     const newUser = new User({
// //       name,
// //       email,
// //       password: hashedPassword,
// //       role: role || 'customer',
// //       phone
// //     });

// //     await newUser.save();
// //     res.status(201).json({ message: 'User registered successfully!' });
// //   } catch (error) {
// //     res.status(500).json({ message: 'Server error', error: error.message });
// //   }
// // };

// // // Login User
// // export const login = async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     const user = await User.findOne({ email });
// //     if (!user) {
// //       return res.status(400).json({ message: 'Invalid email or password.' });
// //     }

// //     const isMatch = await bcrypt.compare(password, user.password);
// //     if (!isMatch) {
// //       return res.status(400).json({ message: 'Invalid email or password.' });
// //     }

// //     const token = jwt.sign(
// //       { id: user._id, role: user.role },
// //       process.env.JWT_SECRET || 'secret_key_here',
// //       { expiresIn: '7d' }
// //     );

// //     res.status(200).json({
// //       message: 'Logged in successfully',
// //       token,
// //       user: { id: user._id, name: user.name, email: user.email, role: user.role }
// //     });
// //   } catch (error) {
// //     res.status(500).json({ message: 'Server error', error: error.message });
// //   }
// // };

// // // Forgot Password - generate reset token
// // export const forgotPassword = async (req, res) => {
// //   try {
// //     const { email } = req.body;
// //     const user = await User.findOne({ email });

// //     if (!user) {
// //       return res.status(404).json({ message: 'No account found with this email.' });
// //     }

// //     const rawToken = crypto.randomBytes(32).toString('hex');
// //     const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');

// //     user.resetPasswordToken = hashedToken;
// //     user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
// //     await user.save();

// //     const resetLink = `${process.env.FRONTEND_URL}/reset-password/${rawToken}`;

// //     // TODO: Replace with real email service (Nodemailer) later.
// //     console.log('Password reset link:', resetLink);

// //     res.status(200).json({
// //       message: 'Reset link generated.',
// //       resetLink // demo mode: sent in response instead of email
// //     });
// //   } catch (error) {
// //     res.status(500).json({ message: 'Server error', error: error.message });
// //   }
// // };

// // // Reset Password - verify token and set new password
// // export const resetPassword = async (req, res) => {
// //   try {
// //     const { token } = req.params;
// //     const { password } = req.body;

// //     const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

// //     const user = await User.findOne({
// //       resetPasswordToken: hashedToken,
// //       resetPasswordExpires: { $gt: Date.now() }
// //     });

// //     if (!user) {
// //       return res.status(400).json({ message: 'Invalid or expired reset link.' });
// //     }

// //     const salt = await bcrypt.genSalt(10);
// //     user.password = await bcrypt.hash(password, salt);
// //     user.resetPasswordToken = undefined;
// //     user.resetPasswordExpires = undefined;
// //     await user.save();

// //     res.status(200).json({ message: 'Password reset successful. You can now log in.' });
// //   } catch (error) {
// //     res.status(500).json({ message: 'Server error', error: error.message });
// //   }
// // };

// // import User from '../models/AppUser.js';
// // import bcrypt from 'bcryptjs';
// // import jwt from 'jsonwebtoken';
// // import nodemailer from 'nodemailer';

// // // Nodemailer Transporter Setup
// // const transporter = nodemailer.createTransport({
// //   service: 'gmail',
// //   auth: {
// //     user: process.env.EMAIL_USER, // Apni email (.env file mein dein)
// //     pass: process.env.EMAIL_PASS  // Gmail App Password (.env file mein dein)
// //   }
// // });

// // // Register User
// // export const register = async (req, res) => {
// //   try {
// //     const { name, email, password, role, phone } = req.body;

// //     const existingUser = await User.findOne({ email });
// //     if (existingUser) {
// //       return res.status(400).json({ message: 'User already exists with this email.' });
// //     }

// //     const salt = await bcrypt.genSalt(10);
// //     const hashedPassword = await bcrypt.hash(password, salt);

// //     const newUser = new User({
// //       name,
// //       email,
// //       password: hashedPassword,
// //       role: role || 'customer',
// //       phone
// //     });

// //     await newUser.save();
// //     res.status(201).json({ message: 'User registered successfully!' });
// //   } catch (error) {
// //     res.status(500).json({ message: 'Server error', error: error.message });
// //   }
// // };

// // // Login User
// // export const login = async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     const user = await User.findOne({ email });
// //     if (!user) {
// //       return res.status(400).json({ message: 'Invalid email or password.' });
// //     }

// //     const isMatch = await bcrypt.compare(password, user.password);
// //     if (!isMatch) {
// //       return res.status(400).json({ message: 'Invalid email or password.' });
// //     }

// //     const token = jwt.sign(
// //       { id: user._id, role: user.role },
// //       process.env.JWT_SECRET || 'secret_key_here',
// //       { expiresIn: '7d' }
// //     );

// //     res.status(200).json({
// //       message: 'Logged in successfully',
// //       token,
// //       user: { id: user._id, name: user.name, email: user.email, role: user.role }
// //     });
// //   } catch (error) {
// //     res.status(500).json({ message: 'Server error', error: error.message });
// //   }
// // };

// // // Forgot Password - Generate & Send 6-Digit OTP via Email
// // export const forgotPassword = async (req, res) => {
// //   try {
// //     const { email } = req.body;
// //     const user = await User.findOne({ email });

// //     if (!user) {
// //       return res.status(404).json({ message: 'No account found with this email.' });
// //     }

// //     // 6-digit random OTP generate karein
// //     const otp = Math.floor(100000 + Math.random() * 900000).toString();

// //     user.resetPasswordOtp = otp;
// //     user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes expiry
// //     await user.save();

// //     // Email content options
// //     const mailOptions = {
// //       from: process.env.EMAIL_USER,
// //       to: user.email,
// //       subject: 'Password Recovery OTP - LiftFlow',
// //       html: `
// //         <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 500px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px;">
// //           <h2 style="color: #0f172a;">Password Recovery</h2>
// //           <p>You requested to reset your password. Use the verification code below:</p>
// //           <div style="background: #f8fafc; padding: 15px; text-align: center; border-radius: 6px; margin: 20px 0;">
// //             <h1 style="color: #d97706; letter-spacing: 6px; margin: 0; font-size: 32px;">${otp}</h1>
// //           </div>
// //           <p style="font-size: 12px; color: #64748b;">This code is valid for 10 minutes. If you didn't request this, please ignore this email.</p>
// //         </div>
// //       `
// //     };

// //     await transporter.sendMail(mailOptions);

// //     res.status(200).json({ message: 'OTP sent successfully to your email.' });
// //   } catch (error) {
// //     console.error('Email send error:', error);
// //     res.status(500).json({ message: 'Failed to send email. Please check server configuration.', error: error.message });
// //   }
// // };

// // // Verify OTP
// // export const verifyOtp = async (req, res) => {
// //   try {
// //     const { otp } = req.body;

// //     const user = await User.findOne({
// //       resetPasswordOtp: otp,
// //       resetPasswordExpires: { $gt: Date.now() }
// //     });

// //     if (!user) {
// //       return res.status(400).json({ message: 'Invalid or expired OTP code.' });
// //     }

// //     res.status(200).json({ message: 'OTP verified successfully.' });
// //   } catch (error) {
// //     res.status(500).json({ message: 'Server error', error: error.message });
// //   }
// // };

// // // Reset Password - Verify OTP and Set New Password
// // export const resetPassword = async (req, res) => {
// //   try {
// //     const { otp, password } = req.body;

// //     const user = importantUserQuery: await User.findOne({
// //       resetPasswordOtp: otp,
// //       resetPasswordExpires: { $gt: Date.now() }
// //     });

// //     const validUser = await User.findOne({
// //       resetPasswordOtp: otp,
// //       resetPasswordExpires: { $gt: Date.now() }
// //     });

// //     if (!validUser) {
// //       return res.status(400).json({ message: 'Invalid or expired OTP code.' });
// //     }

// //     const salt = await bcrypt.genSalt(10);
// //     validUser.password = await bcrypt.hash(password, salt);
    
// //     // Clear OTP fields after use
// //     validUser.resetPasswordOtp = undefined;
// //     validUser.resetPasswordExpires = undefined;
// //     await validUser.save();

// //     res.status(200).json({ message: 'Password reset successful. You can now log in.' });
// //   } catch (error) {
// //     res.status(500).json({ message: 'Server error', error: error.message });
// //   }
// // };


// import User from '../models/AppUser.js';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import nodemailer from 'nodemailer';

// // Nodemailer Transporter Setup
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER, // Apni email (.env file mein dein)
//     pass: process.env.EMAIL_PASS  // Gmail App Password (.env file mein dein)
//   }
// });

// // Register User
// export const register = async (req, res) => {
//   try {
//     const { name, email, password, role, phone } = req.body;

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists with this email.' });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//       role: role || 'customer',
//       phone
//     });

//     await newUser.save();
//     res.status(201).json({ message: 'User registered successfully!' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// // Login User
// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid email or password.' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid email or password.' });
//     }

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET || 'secret_key_here',
//       { expiresIn: '7d' }
//     );

//     res.status(200).json({
//       message: 'Logged in successfully',
//       token,
//       user: { id: user._id, name: user.name, email: user.email, role: user.role }
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// // Forgot Password - Generate & Send 6-Digit OTP via Email
// export const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: 'No account found with this email.' });
//     }

//     // 6-digit random OTP generate karein
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     user.resetPasswordOtp = otp;
//     user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes expiry
//     await user.save();

//     // Email content options
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: user.email,
//       subject: 'Password Recovery OTP - LiftFlow',
//       html: `
//         <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 500px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px;">
//           <h2 style="color: #0f172a;">Password Recovery</h2>
//           <p>You requested to reset your password. Use the verification code below:</p>
//           <div style="background: #f8fafc; padding: 15px; text-align: center; border-radius: 6px; margin: 20px 0;">
//             <h1 style="color: #d97706; letter-spacing: 6px; margin: 0; font-size: 32px;">${otp}</h1>
//           </div>
//           <p style="font-size: 12px; color: #64748b;">This code is valid for 10 minutes. If you didn't request this, please ignore this email.</p>
//         </div>
//       `
//     };

//     await transporter.sendMail(mailOptions);

//     res.status(200).json({ message: 'OTP sent successfully to your email.' });
//   } catch (error) {
//     console.error('Email send error:', error);
//     res.status(500).json({ message: 'Failed to send email. Please check server configuration.', error: error.message });
//   }
// };

// // Verify OTP
// export const verifyOtp = async (req, res) => {
//   try {
//     const { otp } = req.body;

//     const user = await User.findOne({
//       resetPasswordOtp: otp,
//       resetPasswordExpires: { $gt: Date.now() }
//     });

//     if (!user) {
//       return res.status(400).json({ message: 'Invalid or expired OTP code.' });
//     }

//     res.status(200).json({ message: 'OTP verified successfully.' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// // Reset Password - Verify OTP and Set New Password
// export const resetPassword = async (req, res) => {
//   try {
//     const { otp, password } = req.body;

//     const validUser = await User.findOne({
//       resetPasswordOtp: otp,
//       resetPasswordExpires: { $gt: Date.now() }
//     });

//     if (!validUser) {
//       return res.status(400).json({ message: 'Invalid or expired OTP code.' });
//     }

//     const salt = await bcrypt.genSalt(10);
//     validUser.password = await bcrypt.hash(password, salt);
    
//     // Clear OTP fields after use
//     validUser.resetPasswordOtp = undefined;
//     validUser.resetPasswordExpires = undefined;
//     await validUser.save();

//     res.status(200).json({ message: 'Password reset successful. You can now log in.' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };


import User from '../models/AppUser.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

// Register User
export const register = async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'customer',
      phone
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login User
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'secret_key_here',
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Logged in successfully',
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Forgot Password - Generate & Send 6-Digit OTP via Email
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'No account found with this email.' });
    }

    // 6-digit random OTP generate karein
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetPasswordOtp = otp;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes expiry
    await user.save();

    // Transporter ko function ke andar banaya gaya hai taake .env values correctly load hon
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email content options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Recovery OTP - LiftFlow',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 500px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #0f172a;">Password Recovery</h2>
          <p>You requested to reset your password. Use the verification code below:</p>
          <div style="background: #f8fafc; padding: 15px; text-align: center; border-radius: 6px; margin: 20px 0;">
            <h1 style="color: #d97706; letter-spacing: 6px; margin: 0; font-size: 32px;">${otp}</h1>
          </div>
          <p style="font-size: 12px; color: #64748b;">This code is valid for 10 minutes. If you didn't request this, please ignore this email.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'OTP sent successfully to your email.' });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ message: 'Failed to send email. Please check server configuration.', error: error.message });
  }
};

// Verify OTP
export const verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;

    const user = await User.findOne({
      resetPasswordOtp: otp,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired OTP code.' });
    }

    res.status(200).json({ message: 'OTP verified successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Reset Password - Verify OTP and Set New Password
export const resetPassword = async (req, res) => {
  try {
    const { otp, password } = req.body;

    const validUser = await User.findOne({
      resetPasswordOtp: otp,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!validUser) {
      return res.status(400).json({ message: 'Invalid or expired OTP code.' });
    }

    const salt = await bcrypt.genSalt(10);
    validUser.password = await bcrypt.hash(password, salt);
    
    // Clear OTP fields after use
    validUser.resetPasswordOtp = undefined;
    validUser.resetPasswordExpires = undefined;
    await validUser.save();

    res.status(200).json({ message: 'Password reset successful. You can now log in.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};