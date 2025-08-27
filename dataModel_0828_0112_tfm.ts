// 代码生成时间: 2025-08-28 01:12:33
// Import necessary modules
import { Schema, model, Document } from 'mongoose';

// Define the schema for a User
interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// Create a User schema using mongoose
const userSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create the User model from the schema
const User = model<IUser>('User', userSchema);

// Export the User model
export { User as IUserModel };

/*
 * Error handling
 * Define custom error types for better control over error handling.
 */
class UserNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UserNotFoundError';
  }
}

class UserCreationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UserCreationError';
  }
}

// Export custom error classes
export { UserNotFoundError, UserCreationError };
