import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date(),
  },
})

userSchema.pre("save", async function() {
    this.password = await bcrypt.hash(this.password, 8);
})

const User = new model("User", userSchema);
export default User;