import { mergeTypeDefs } from "@graphql-tools/merge";

//typeDefs
import userTypeDef from "./user.typeDef.js";
import transactionTypDef from "./transaction.typeDef.js";

const mergedTypeDefs = mergeTypeDefs([userTypeDef, transactionTypDef]);

export default mergedTypeDefs;