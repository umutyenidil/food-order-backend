import {Request, Response, NextFunction} from "express";

export const CreateVendor = async (req: Request, res: Response, next: NextFunction) => {
    return res.json({
        message: "CreateVendor initialized successfully",
    });
};


export const ReadVendors = async (req: Request, res: Response, next: NextFunction) => {
    return res.json({
        message: "ReadVendors initialized successfully",
    });
};

export const ReadVendorById = async (req: Request, res: Response, next: NextFunction) => {
    return res.json({
        message: "ReadVendorById initialized successfully",
    });
};
