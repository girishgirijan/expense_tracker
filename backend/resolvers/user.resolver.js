import { users } from "../dummyData/data.js";

const userResolver = {
  Query: {
    users: (_, args, context) => {
      return users;
    },
    user: (_, args) => {
      return users.find((user) => user._id === args.userId);
    },
  },
  Mutation: {},
};
export default userResolver;
