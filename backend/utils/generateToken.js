import jwt from "jsonwebtoken";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "2h" });
};

export const generateId = () => {
  return Math.floor(10000 + Math.random() * 90000);
  };

export default generateToken;