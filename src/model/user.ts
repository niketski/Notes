import mongoose from 'mongoose';

export interface IUserSchema {
    name: string,
    email: string,
    password: string,
    image: string
}

const userSchema = new mongoose.Schema<IUserSchema>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.models.User || mongoose.model('User', userSchema);