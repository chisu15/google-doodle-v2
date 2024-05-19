const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user.model");

passport.use(new LocalStrategy({
    usernameField: 'email', // Tùy chọn, định rõ trường sử dụng làm tên người dùng
    passwordField: 'password' // Tùy chọn, định rõ trường sử dụng làm mật khẩu
},
async function(email, password, done) {
    try {
        const user = await User.findOne({ email: email });
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}
));
module.exports = passport;