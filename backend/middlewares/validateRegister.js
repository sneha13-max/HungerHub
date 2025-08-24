// middlewares/validateRegister.js
export const validateRegister = (req, res, next) => {
  const { name, email, password, checkboxMarked } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (!checkboxMarked) {
    return res
      .status(400)
      .json({ error: "You must agree to the terms & privacy policy" });
  }

  // Simple email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  // Password must be min 6 chars
  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters long" });
  }

  next(); // ✅ move to API if validation passed
};
