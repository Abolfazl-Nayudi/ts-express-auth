import { model, Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  token: string;
}

const UserSchema: Schema<IUser> = new Schema({
  email: {
    type: String,
    required: [true, 'please enter an email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'please enter a password'],
    minlength: [5, 'the minimum number of character is 5'],
  },
  token: {
    type: String,
    default: null,
  },
});

const User = model<IUser>('user-model', UserSchema);

export { User };
