import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { keys } from "./keys";
import { User } from "../models/user.model";
import { v4 as uuidv4 } from "uuid";

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
      try {
        const [user, created] = await User.findOrCreate({
          where: { providerId: profile.id },
          defaults: {
            id: uuidv4(),
            providerId: profile.id,
            code: "123456",
            email: profile.emails ? profile.emails[0].value : "",
            imageUrl: profile._json.picture || "",
            fullname: profile.displayName,
          },
        });

        if (created) {
          console.log("New account created for " + user.providerId);
        } else {
          console.log("Existing user logged in: " + user.providerId);
        }

        done(null, user);
      } catch (err) {
        console.error("Error finding or creating user:", err);
      }
    }
  )
);
