import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "#src/apps/models.js";
import globalConfig from "./index.js";

const configurePassport = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: globalConfig.googleClientId,
        clientSecret: globalConfig.googleClientSecret,
        callbackURL: `${globalConfig.backendUrl}/api/auth/google/callback`,
        proxy: true,
        scope: ["profile", "email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ googleId: profile.id });

          if (!user) {
            user = new User({
              googleId: profile.id,
              username: profile.displayName,
              email: profile.emails[0].value,
              profilePicture: profile.photos[0].value,
            });
            await user.save();
          }

          return done(null, user);
        } catch (err) {
          return done(err, null);
        }
      },
    ),
  );
};

export default configurePassport;
