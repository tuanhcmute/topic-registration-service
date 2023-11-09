import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { v4 as uuidv4 } from "uuid";
import { keys } from "./keys";
import { User } from "../models/user.model";

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser((id: string, done) => {
  User.findByPk(id)
    .then((user) => {
      done(null, user); // Return the entire user object
    })
    .catch((err) => {
      done(err, null); // Handle errors if any
    });
});

export const passportSetup = passport.use(
  new GoogleStrategy(
    {
      clientID: keys.google.clientId,
      clientSecret: keys.google.clientSecret,
      callbackURL: keys.google.callbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile._json.email;
      let ntid = uuidv4();
      if (email?.includes("@student.hcmute.edu.vn")) {
        ntid = email.substring(0, 7);
      }
      try {
        // Find or create if user doesnt exist
        const [user, created] = await User.findOrCreate({
          where: { email: profile._json.email },
          defaults: {
            ntid: ntid,
            providerId: profile._json.sub,
            email: profile._json.email,
            imageUrl: profile._json.picture,
            name: profile._json.name,
            provider: profile.provider.toUpperCase(),
            emailVerified: true,
          },
        });
        // Validate created
        if (created) {
          console.log("New account created for " + user.email);
        } else {
          // Update some field of the user
          if (!user.imageUrl) {
            user.imageUrl = profile._json.picture;
            user.providerId = profile._json.sub;
            await user.save();
          }
          console.log("Existing user logged in: " + user.email);
        }
        done(null, user);
      } catch (err) {
        console.error("Error finding or creating user:", err);
        throw err;
      }
    }
  )
);
