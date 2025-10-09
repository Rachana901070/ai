import mongoose, { Schema, Types } from 'mongoose';

export type PickupStatus = 'accepted' | 'en_route' | 'picked_up' | 'delivered' | 'cancelled';

export interface PickupDoc extends mongoose.Document {
  postId: Types.ObjectId;
  collectorId: Types.ObjectId;
  status: PickupStatus;
  createdAt: Date;
  updatedAt: Date;
}

const PickupSchema = new Schema<PickupDoc>(
  {
    postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true, index: true },
    collectorId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    status: { type: String, enum: ['accepted','en_route','picked_up','delivered','cancelled'], default: 'accepted', index: true },
  },
  { timestamps: true }
);

export const Pickup = mongoose.models.Pickup || mongoose.model<PickupDoc>('Pickup', PickupSchema);
