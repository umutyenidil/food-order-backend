import {Request, Response, NextFunction} from "express";
import {CreateVendorParams} from "../dto";
import {VendorModel} from "../models";
import mongoose, {Error as MongooseError} from 'mongoose';
import {GeneratePassword, GenerateSalt} from "../utilities";
import bcrypt from "bcrypt";

export const CreateVendor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            name,
            ownerName,
            foodType,
            pinCode,
            address,
            phone,
            email,
            password,
        } = <CreateVendorParams>req.body;

        const existingVendor = await VendorModel.findOne({email: email});

        if (existingVendor !== null) {
            return res.json({
                message: "vendor already exists",
            });
        }

        const generatedSalt = await GenerateSalt();
        const hashedPassword = await GeneratePassword(password, generatedSalt);

        const createdVendor = await VendorModel.create({
            name,
            ownerName,
            foodType,
            pinCode,
            address,
            phone,
            email,
            serviceAvailable: false,
            salt: generatedSalt,
            password: hashedPassword,
        });

        return res.json(createdVendor);
    } catch (err) {
        if (err instanceof MongooseError.ValidationError) {
            const errors: { [key: string]: string } = {};
            for (const field in err.errors) {
                if (err.errors.hasOwnProperty(field)) {
                    errors[field] = err.errors[field].message;
                }
            }
            return res.status(400).json({message: 'Validation Error', errors});
        }
    }
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
