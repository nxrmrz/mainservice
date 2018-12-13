const LocalStrategy = require("passport-local").Strategy;

// Load User Model
const User = require("../../models/User");
// Load User Profile
const UserProfile = require("../../models/UserProfile");

module.exports = passport => {
  /* ====================================== PASSPORT SESSION SETUP ====================================== */

  // Required for persistent login sessions
  // Passport needs ability to serialize and unserialize users out of session

  // Used to serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Used to deserialize the user
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  /* =========================================== LOCAL SIGNUP =========================================== */

  // We are using named strategies since we have one for login and one for signup
  // By default, if there was no name, it would just be called 'local'

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        // By default, local strategy uses username and password, we will override with email
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true // Allows us to pass back the entire request to the callback
      },
      (req, email, password, done) => {
        // Asynchronous
        // User.findOne won't fire unless data is sent back
        process.nextTick(() => {
          // Find a user whose email is the same as the forms email
          // We are checking to see if the user trying to login already exists
          User.findOne({ email }, (err, user) => {
            // If there are any errors, return the error
            if (err) return done;

            // Check to see if theres already a user with that email
            if (user) {
              return done(null, false);
            } else {
              // If there is no user with that email
              // Create the user
              let newUser = new User();

              // Set user credentials
              newUser.accountType = "normal";
              newUser.username = req.body.username;
              newUser.email = email;
              newUser.password = newUser.generateHash(password);

              // Save the user
              newUser.save((err, user) => {
                if (err) throw err;

                // Create user profile
                let newUserProfile = new UserProfile();
                // Set user profile values
                newUserProfile.ownerId = user._id;
                newUserProfile.firstName = req.body.firstName;
                newUserProfile.lastName = req.body.lastName;
                newUserProfile.shippingAddress.streetNumber =
                  req.body.streetNumber;
                newUserProfile.shippingAddress.streetName = req.body.streetName;
                newUserProfile.shippingAddress.suburb = req.body.suburb;
                newUserProfile.shippingAddress.city = req.body.city;
                newUserProfile.shippingAddress.postcode = req.body.postcode;
                newUserProfile.shippingAddress.country = req.body.country;
                // Save user profile
                newUserProfile.save(err => {
                  if (err) throw err;
                });

                return done(null, newUser);
              });
            }
          });
        });
      }
    )
  );

  /* =========================================== LOCAL LOGIN ============================================ */

  // We are using named strategies since we have one for login and one for signup
  // By default, if there was no name, it would just be called 'local'

  passport.use(
    "local-login",
    new LocalStrategy(
      {
        // By default, local strategy uses username and password, we will override with email
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true // Allows us to pass back the entire request to the callback
      },
      (req, email, password, done) => {
        // Find a user whose email is the same as the forms email
        // We are checking to see if the user trying to login already exists
        User.findOne({ email }, (err, user) => {
          // If there are any errors, return the error before anything else
          if (err) return done(err);
          // If no user is found, return the message
          if (!user) return done(null, false);
          // If the user is found but the password is wrong
          if (!user.validatePassword(password)) return done(null, false);
          // all is well, return successful user
          return done(null, user);
        });
      }
    )
  );
};
