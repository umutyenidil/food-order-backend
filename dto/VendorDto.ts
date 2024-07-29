export interface CreateVendorParams {
    name: string;
    ownerName: string;
    foodType: [string];
    pinCode: string;
    address: string;
    phone: string;
    email: string;
    password: string;
}

export interface VendorSignInParams {
    email: string;
    password: string;
}