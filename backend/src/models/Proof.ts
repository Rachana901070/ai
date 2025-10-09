import mongoose, { Schema, Types } from 'mongoose';

export interface ProofDoc extends mongoose.Document {
  pickupId: Types.ObjectId;
  photos: string[];
  geo: { lat: number; lng: number };
  signature?: string; // could be a base64 or name
  otp?: string; // stored for audit; in prod store hashed
  video?: string;
  beneficiaryCount?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProofSchema = new Schema<ProofDoc>(
  {
    pickupId: { type: Schema.Types.ObjectId, ref: 'Pickup', required: true, index: true },
    photos: [{ type: String, required: true }],
    geo: { lat: { type: Number, required: true }, lng: { type: Number, required: true } },
    signature: { type: String },
    otp: { type: String },
    video: { type: String },
    beneficiaryCount: { type: Number },
    notes: { type: String },
  },
  { timestamps: true }
);

export const Proof = mongoose.models.Proof || mongoose.model<ProofDoc>('Proof', ProofSchema);
