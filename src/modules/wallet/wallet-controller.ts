import { ethers } from "ethers";
import { Request, Response } from "express";
import secret from "../../config/secret-config";
import { encrypt } from "../../utils/encryption";
import Wallet from "./wallet-modal";

export const createWallet = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { userName } = req.body;
  try {
    const existingUsername = await Wallet.findOne({ name: userName });
    if (existingUsername) {
      return res.status(400).json({ message: "User already exist!" });
    }
    const { privateKey, address } = ethers.Wallet.createRandom();
    const encryptedKey = encrypt(privateKey, secret.PRIVATE_KEY_SALT);

    const newWallet = await Wallet.create({
      name: userName,
      publicKey: address,
      privateKey: encryptedKey,
    });

    await newWallet.save();
    return res.status(201).json({ message: "Question created successfully", newWallet });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};


export const getWallet = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const { userName } = req.params;
    try {
      const wallet = await Wallet.findOne({ name: userName });
      if (!wallet) {
        return res.status(404).json({ message: "Question not found" });
      }
      return res.status(200).json({ wallet });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };
  