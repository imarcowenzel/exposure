import User from "@/lib/models/user.model";

export async function validateUsername(username: string) {
  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    throw new Error("Username already in use!");
  }
}

export async function validateEmail(email: string) {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already in use!");
  }
}

export async function generateUniqueUsername(firstName: string) {
  let username = `${firstName.toLowerCase()}${Math.floor(
    Math.random() * 10000,
  )}`;
  const usernameExists = await User.findOne({ username });

  while (usernameExists) {
    username = `${firstName.toLowerCase()}${Math.floor(Math.random() * 10000)}`;
  }

  return username;
}
