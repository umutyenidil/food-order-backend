import express, {Request, Response, NextFunction} from 'express';
import {VendorSignIn} from "../controllers";

const router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    return res.json({
        message: "VendorRoute initialized successfully",
    });
});

router.post("/sign-in", VendorSignIn);

export {router as VendorRoute};
