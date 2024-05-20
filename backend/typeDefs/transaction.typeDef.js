const transactionTypDef = `#graphql
    type Transaction {
        _id: ID!
        userId: ID!
        description: String!
        paymentType: String!
        category: String!
        amount: Float!
        location: String
        date: String
    }

    type Query{
        transactions: [Transaction!]
        transaction(transactionId: ID!): Transaction
        # TODO => add categoryStatistics query
    }

    type Mutation {
        createTranscation(input: CreateTranscationInput!): Transaction!
        updateTranscation(input: UpdateTranscationInput!): Transaction!
        deleteTranscation(transactionId: ID!): Transaction!
    }

    input CreateTranscationInput{
        description: String!
        paymentType: String!
        category: String!
        amount: Float!
        location: String
        date: String
    }

    input UpdateTranscationInput{
        transactionId: ID!
        description: String
        paymentType: String
        category: String
        amount: Float
        location: String
        date: String
    }
`;

export default transactionTypDef;