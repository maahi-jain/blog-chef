import User from "../models/user";
import jwt from "jsonwebtoken";

const sign = (obj) =>
  new Promise((resolve, reject) => {
    jwt.sign(
      obj,
      process.env.jwtPrivateKey,
      {
        expiresIn: 18000,
      },
      (error, token) => {
        if (error) return reject(error);
        return resolve(token);
      }
    );
  });

export const signUpAdmin = async ({ name, email, password }) => {
  try {
    console.log("Creating User..");
    await User.create({ name, email, password, isAdmin: true });
    console.log("User created");
    return Promise.resolve();
  } catch (error) {
    return Promise.reject({ error });
  }
};

export const loginAdmin = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email, isAdmin: true });
    console.log(user);
    await user.checkPassword(password);
    await user.updateLoggedIn();
    return Promise.resolve(user);
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

export const signUpUser = async ({ name, email, password }) => {
  try {
    const user = await User.create({ email, name, password });

    // Generate JWT token
    const token = await sign({ email, name, id: user._id });
    return Promise.resolve({
      user: {
        id: user._id,
        name: user.name,
        lastLoggedIn: user.lastLoggedIn,
        token,
      },
    });
  } catch (error) {
    return Promise.reject({ error });
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    await user.checkPassword(password);
    await user.updateLoggedIn();
    const token = await sign({
      id: user._id,
      name: user.name,
      email: user.email,
    });
    return Promise.resolve({
      user: {
        id: user._id,
        name: user.name,
        lastLoggedIn: user.lastLoggedIn,
      },
      token,
    });
  } catch (error) {
    return Promise.reject({ error });
  }
};

const verify = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.jwtPrivateKey, (error) => {
      if (error) return reject();
      return resolve();
    });
  });
};

export const verifyToken = async (token) => {
  try {
    const user = jwt.decode(token);
    const findUser = await User.findOne({ email: user.email });
    if (!findUser) {
      return Promise.reject({ error: "Unauthorized" });
    }
    // verify token and resolve
    await verify(token);
    return Promise.resolve();
  } catch (error) {
    return Promise.reject({ error: "Unauthorized" });
  }
};

export const verifyUser = async (email) => {
  try {
    const findUser = await User.findOne({ email });
    return Promise.resolve(findUser);
  } catch (error) {
    return Promise.reject({ error });
  }
};
