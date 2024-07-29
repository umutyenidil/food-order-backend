import {NextFunction, Request, Response} from "express";
import {CreateVendorParams} from "../dto";
import {VendorModel} from "../models";
import {Error as MongooseError} from 'mongoose';
import {GeneratePassword, GenerateSalt} from "../utilities";


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
    const vendors = await VendorModel.find();

    if (vendors === null) {
        return res.status(404).json({
            message: "Vendors not found",
        });
    }

    return res.json({
        message: "Vendors has fetched successfully",
        data: {
            vendors: vendors,
        },
    });
};

export const ReadVendorById = async (req: Request, res: Response, next: NextFunction) => {
    const vendorId = req.params.id;

    const vendor = await VendorModel.findById(vendorId);

    if (vendor === null) {
        return res.status(404).json({
            message: "Vendor not found",
        });
    }

    return res.json({
        message: "Vendor has fetched successfully",
        data: {
            vendor: vendor,
        },
    });
};
