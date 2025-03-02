import mongoose, { Schema, Document } from "mongoose";

interface IWallet extends Document {
 name: string;
 publicKey: string;
 privateKey: string;
}


const WalletSchema: Schema = new Schema(
  {
    
    name: {
        type: String,
        required: true,
        unique: true
    },
    publicKey: {
        type: String,
        required: true
    },
    privateKey: {
        type: String,
        required: true
    }
  },
  { timestamps: true }
);


const Wallet = mongoose.model<IWallet>("Wallet", WalletSchema);
export default Wallet;