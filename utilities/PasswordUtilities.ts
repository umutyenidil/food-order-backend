import bcrypt from 'bcrypt';

export const GenerateSalt = async () => {
    return await bcrypt.genSalt();
};

export const GeneratePassword = async (password: string, salt: string) => {
    return await bcrypt.hash(password, salt);
};

export const ValidatePassword = async (password: string, hashedPassword: string, salt: string) => {
    return (await GeneratePassword(password, salt)) === hashedPassword;
};