import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  theme: 'light' | 'dark';
  emailNotifications: boolean;
  pushNotifications: boolean;
  language: string;
  currency: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  theme: { type: String, enum: ['light', 'dark'], default: 'light' },
  emailNotifications: { type: Boolean, default: true },
  pushNotifications: { type: Boolean, default: true },
  language: { type: String, default: 'English' },
  currency: { type: String, default: 'USD' },
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

UserSchema.virtual('expenses', {
  ref: 'Expense',
  localField: '_id',
  foreignField: 'user'
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
