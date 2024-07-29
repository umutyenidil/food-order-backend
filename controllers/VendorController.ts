import {NextFunction, Request, Response} from "express";
import {VendorSignInParams} from "../dto";
import {VendorModel} from "../models";
import {ValidatePassword} from "../utilities";

export const VendorSignIn = async (req: Request, res: Response, next: NextFunction) => {
    const {
        email,
        password
    } = <VendorSignInParams>req.body;

    const existingVendor = await VendorModel.findOne({email: email});

    if (existingVendor === null) {
        return res.status(401).json({
            message: "Invalid credentials",
        });
    }

    const passwordMatched = await ValidatePassword(password, existingVendor.password, existingVendor.salt);

    if (!passwordMatched) {
        return res.status(401).json({
            message: "Invalid credentials",
        });
    }

    return res.json({
        message: "Sign in successful",
        data: {
            vendor: existingVendor,
        },
    });
};