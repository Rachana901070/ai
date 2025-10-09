import mongoose, { Schema } from 'mongoose';

export type UserRole = 'donor' | 'collector' | 'admin';

export interface UserDoc extends mongoose.Document {
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  phone?: string;
  languages?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<UserDoc>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['donor', 'collector', 'admin'], default: 'donor', index: true },
    phone: { type: String },
    languages: [{ type: String }],
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model<UserDoc>('User', UserSchema);
