import bcrypt from "bcrypt";

// create hash password
export async function hashPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash: string) => {
        if (err) {
          reject(err);
        } else {
          console.log(hash);
          resolve(hash);
        }
      });
    });
  });
}

// this function to compare password
export async function comparePasswords(plaintextPassword: string, hashedPassword: string): Promise<boolean> {
  try {
    const match = await bcrypt.compare(plaintextPassword, hashedPassword);
    return match;
  } catch (error) {
    // Handle any errors that may occur during the comparison
    throw new Error("Password comparison failed");
  }
}
