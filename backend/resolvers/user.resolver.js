import { users } from "../dummyData/data.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const userResolver = {
  Mutation: {
    signUp: async (_, { input }, context) => {
      try {
        const { username, name, password, gender } = input;

        //Checking whether all fields are provided
        if (!username || !name || !password || !gender) {
          throw new Error("All fields are required");
        }

        //Checking whether the user with provided username is existing or not
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          throw new Error("Username is already taken");
        }

        //Hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Profilepic
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        //Creating a new user
        const newUser = new User({
          username,
          name,
          password: hashedPassword,
          gender,
          profilePicture: gender === "male" ? boyProfilePic : girlProfilePic,
        });
        await newUser.save();
        await context.login(newUser);
        return newUser;
      } catch (err) {
        console.log("Error in signup:", err);
        throw new Error(err.message || "Internal server error");
      }
    },
    login: async (_, { input }, context) => {
      try {
        const { username, password } = input;
        //Checking whether all fields are provided
        if (!username || !password) {
          throw new Error("All fields are required");
        }
        const { user } = await context.authenticate("graphql-local", {
          username,
          password,
        });
        await context.login(user);
        return user;
      } catch (err) {
        console.log("Error in login:", err);
        throw new Error(err.message || "Internal server error");
      }
    },
    logout: async (_, __, context) => {
      try {
        await context.logout();
        context.req.session.destroy((err) => {
          if (err) throw err;
        });
        context.res.clearCookie("connect.sid");
        return { message: "Logged out successfully" };
      } catch (err) {
        console.log("Error in logout:", err);
        throw new Error(err.message || "Internal server error");
      }
    },
  },
  Query: {
    authUser: async (_, __, context) => {
      try {
        const user = await context.getUser();
        return user;
      } catch (err) {
        console.log("Error in authUser:", err);
        throw new Error(err.message || "Internal server error");
      }
    },
    user: async (_, { userId }) => {
      try {
        const user = await User.findById(userId);
        return user;
      } catch (err) {
        console.log("Error in user query:", err);
        throw new Error(err.message || "Internal server error");
      }
    },
  },
  //TODO => add user/transaction relation
};
export default userResolver;
