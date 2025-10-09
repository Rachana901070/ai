import mongoose, { Schema, Types } from 'mongoose';

export type PostStatus = 'pending' | 'matched' | 'picked_up' | 'delivered' | 'cancelled' | 'expired';

export interface Location {
  lat: number;
  lng: number;
  address?: string;
}

export interface PostDoc extends mongoose.Document {
  createdBy: Types.ObjectId;
  photos: string[];
  foodType: string;
  quantity: string;
  expiryTime: Date;
  location: Location;
  notes?: string;
  anonymous?: boolean;
  status: PostStatus;
  assignedCollector?: Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

const LocationSchema = new Schema<Location>({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  address: { type: String },
});

const PostSchema = new Schema<PostDoc>(
  {
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    photos: [{ type: String }],
    foodType: { type: String, required: true },
    quantity: { type: String, required: true },
    expiryTime: { type: Date, required: true, index: true },
    location: { type: LocationSchema, required: true },
    notes: { type: String },
    anonymous: { type: Boolean, default: false },
    status: { type: String, enum: ['pending','matched','picked_up','delivered','cancelled','expired'], default: 'pending', index: true },
    assignedCollector: { type: Schema.Types.ObjectId, ref: 'User', default: null, index: true },
  },
  { timestamps: true }
);

export const Post = mongoose.models.Post || mongoose.model<PostDoc>('Post', PostSchema);
