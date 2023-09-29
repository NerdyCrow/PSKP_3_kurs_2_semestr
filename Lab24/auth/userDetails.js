const GoogleStrategy = require('passport-google-oauth20').Strategy;
const {AUTH2_OPTIONS} = require('../common/config');

class UserDetails {
    static createStrategy() {
        return new GoogleStrategy(AUTH2_OPTIONS,
            (accessToken, refreshToken, profile, done) => {
            done(null, {accessToken, refreshToken, profile});
        });
    }

    static serializeUser() {
        return (user, done) => {
            done(null, user);
        }
    }

    static deserializeUser() {
        return (user, done) => {
            done(null, user);
        }
    }
}

module.exports = UserDetails;