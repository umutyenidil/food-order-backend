import express, {Request, Response, NextFunction} from 'express';
import {CreateVendor, ReadVendorById, ReadVendors} from "../controllers";

const router = express.Router();

router.post("/vendors", CreateVendor);

router.get('/vendors', ReadVendors);

router.get('/vendors/:id', ReadVendorById);

export {router as AdminRoute};
