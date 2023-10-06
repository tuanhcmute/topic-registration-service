// import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import { keys } from "./keys";
// import { User } from "../models/user.model";

// passport.serializeUser((user: any, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id: string, done) => {
//   User.findByPk(id).then((user) => {
//     done(null, user?.id);
//   });
// });

// export const passportSetup = passport.use(
//   new GoogleStrategy(
//     {
//       clientID: keys.google.clientId,
//       clientSecret: keys.google.clientSecret,
//       callbackURL: keys.google.callbackURL,
//     },
//     (accessToken, refreshToken, profile, done) => {
//       User.findOne({
//         where: {
//           googleId: profile.id,
//         },
//       }).then((currentUser) => {
//         if (currentUser) {
//           done(null, currentUser);
//         } else {
//           User.create({
//             username: profile.displayName,
//             googleId: profile.id,
//             role: "student",
//             enable: true,
//           }).then((user) => {
//             console.log("account created " + user.googleId);
//             done(null, user);
//           });
//         }
//       });
//     }
//   )
// );
