import User from "../models/user";

export async function createUser(email: string, password: string) {
  try {
    const user = new User({ email, password });
    await user.save();
    return user;
  } catch (err) {
    console.log(err);
  }
}

export async function findUser(email: string) {
  try {
    const user = await User.findOne({ email }).exec();
    return user;
  } catch (err) {
    console.log(err);
  }
}


