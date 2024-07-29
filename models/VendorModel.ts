import mongoose, {Schema, Document, Model} from 'mongoose';

interface VendorDocument extends Document {
    name: string;
    ownerName: string;
    foodType: [string];
    pinCode: string;
    address: string;
    phone: string;
    email: string;
    password: string;
    salt: string,
    serviceAvailable: boolean;
    coverImages: [string],
    rating: number,
    foods: any,
}

const VendorSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
    },
    ownerName: {
        type: Schema.Types.String,
        required: true,
    },
    foodType: {
        type: [Schema.Types.String],
    },
    pinCode: {
        type: Schema.Types.String,
        required: true,
    },
    address: {
        type: Schema.Types.String,
    },
    phone: {
        type: Schema.Types.String,
        required: true,
    },
    email: {
        type: Schema.Types.String,
        required: true,
    },
    password: {
        type: Schema.Types.String,
        required: true,
    },
    salt: {
        type: Schema.Types.String,
        required: true,
    },
    serviceAvailable: {
        type: Schema.Types.Boolean,
        required: true,
    },
    coverImages: {
        type: [Schema.Types.String],
    },
    rating: {
        type: Schema.Types.Number,
    },
    foods: [{
        type: Schema.Types.ObjectId,
        ref: 'food',
    }],
}, {
    toJSON: {
        transform(doc: any, ret) {
            delete ret.password;
            delete ret.salt;
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;

        }
    },
    timestamps: true,
});

const VendorModel = mongoose.model<VendorDocument>("vendor", VendorSchema);

export {
    VendorModel,
};