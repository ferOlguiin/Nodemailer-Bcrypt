import bcrypt from 'bcryptjs';


export const encryptPassword = async (password) => {
    const securePassword = await bcrypt.hash(password, 10)
    return securePassword;    
}

export const comparePassword = async (password, secretPassword) => {
    return await bcrypt.compare(password, secretPassword);
}