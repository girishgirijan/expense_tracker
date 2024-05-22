import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";
const transactionResolver = {
  Mutation: {
    createTranscation: async (_, { input }, context) => {
      try {
        //Checking whether user is logged in and authorized
        //if (!context.getUser()) throw new Error("Unauthorized");

        const newTransaction = new Transaction({
          ...input,
          userId: context.getUser()._id,
        });
        await newTransaction.save();
        return newTransaction;
      } catch (err) {
        console.log("Error in create transaction:", err);
        throw new Error(err.message || "Internal server error");
      }
    },
    updateTranscation: async (_, { input }, context) => {
      try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(
          input.transactionId,
          input,
          { new: true }
        );
        return updatedTransaction;
      } catch (err) {
        console.log("Error in update transaction:", err);
        throw new Error(err.message || "Internal server error");
      }
    },
    deleteTranscation: async (_, { transactionId }, context) => {
      try {
        const deletedTransaction = await Transaction.findByIdAndDelete(
          transactionId
        );
        return deletedTransaction;
      } catch (err) {
        console.log("Error in delete transaction:", err);
        throw new Error(err.message || "Internal server error");
      }
    },
  },
  Query: {
    transactions: async (_, __, context) => {
      try {
        //Checking whether user is logged in and authorized
        if (!context.getUser()) throw new Error("Unauthorized");

        const userId = await context.getUser()._id;
        const transactions = await Transaction.find({ userId });
        return transactions;
      } catch (err) {
        console.log("Error in transactions:", err);
        throw new Error(err.message || "Internal server error");
      }
    },
    transaction: async (_, { transactionId }, context) => {
      try {
        //Checking whether user is logged in and authorized
        if (!context.getUser()) throw new Error("Unauthorized");

        const transaction = await Transaction.findById(transactionId);
        return transaction;
      } catch (err) {
        console.log("Error in transaction:", err);
        throw new Error(err.message || "Internal server error");
      }
    },
    categoryStatistics: async (_, __, context) => {
      if (!context.getUser()) throw new Error("Unauthorized");

      const userId = context.getUser()._id;
      const transactions = await Transaction.find({ userId });
      const categoryMap = {};

      transactions.forEach((transaction) => {
        if (!categoryMap[transaction.category]) {
          categoryMap[transaction.category] = 0;
        }
        categoryMap[transaction.category] += transaction.amount;
      });

      return Object.entries(categoryMap).map(([category, totalAmount]) => ({
        category,
        totalAmount,
      }));
    },
  },
  Transaction: {
    user: async (parent, _, __) => {
      try {
        const user = await User.findById(parent.userId);
        return user;
      } catch (err) {
        console.log("Error in transaction.user:", err);
        throw new Error(err.message || "Internal server error");
      }
    },
  },
};

export default transactionResolver;
