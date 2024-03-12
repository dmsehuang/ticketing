import mongoose, { Model, Schema, Document } from 'mongoose';
import { Password } from '../libs/password';

// An interface that describes the properties
// that are required to create a new User
interface UserAttrs {
  email: string;
  password: string;
}

// An interafce that describes the properties
// that a User Model has
interface UserModel extends Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends Document {
  email: string;
  password: string;
}

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

// // Use an interface to make sure we pass the correct type
// // Use the typescript for type checking
// buildUser({ email: 'dmsehuang@yahoo.com', password: 'yo' });

// // Now it's time to convert buildUser() to User.build()

// const buildUser = (attrs: UserAttrs) => {};

export { User };
