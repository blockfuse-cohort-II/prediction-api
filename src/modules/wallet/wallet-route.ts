import { Request, Response, Router } from "express";
import { createWallet, getWallet } from "./wallet-controller";


const walletRoute = Router();

walletRoute.post("/create-wallet", async (req: Request, res: Response) => {
  createWallet(req, res);    
});

walletRoute.get("/get-wallet/:userName", async (req: Request, res: Response) => {
    getWallet(req, res);
})


export default walletRoute;
