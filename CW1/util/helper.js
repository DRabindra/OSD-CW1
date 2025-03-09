const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (res, user) => {
  try {
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        profile: user.profile,
        bio: user.bio,
      },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Failed to generate token");
  }
};

module.exports = generateTokenAndSetCookie;
