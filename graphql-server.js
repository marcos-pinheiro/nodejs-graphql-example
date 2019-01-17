const { ApolloServer, gql } = require('apollo-server');

const datasourceCustomers = [
    {id: 111, name: "João",   document: "41138920987", address: null},
    {id: 222, name: "Pedro",  document: "46638290873", address: null},
    {id: 333, name: "José",   document: "49122891872", address: {
        address: "Avenida os programadores", number: 666, postalCode: "04822987"
    }}
]
const datasourceOrders = [
    {id: 1, additionalInfo: null,       buyer: datasourceCustomers[0], items: [{sku: "#XSLLW122", quantity: 2}, {sku: "#LLO12201", quantity: 1}]},
    {id: 2, additionalInfo: "Político", buyer: datasourceCustomers[1], items: [{sku: "#002991SX", quantity: 4}]},
    {id: 3, additionalInfo: "Honesto",  buyer: datasourceCustomers[2], items: []}
]

const typeDefs = gql`
type Order {
    id: Int!
    additionalInfo: String,
    buyer: Customer,
    items: [Item]
}

type Customer {
    id: Int!
    document: String
    name: String
    address: Address
}

type Item {
    sku: String!
    quantity: Int
}

type Address {
    address: String!
    number: String
    postalCode: String
}

#Functions
type Query {
    listOrders: [Order]
    getOrder(id: Int): Order
    listCustomers: [Customer]
}
`;

const resolvers = {
  Query: {
    listOrders: () => {
        return datasourceOrders
    },

    getOrder: (root, args) => {
        let orders = datasourceOrders.filter(order => order.id == args.id)
        if(orders)
            return orders[0]

        return []
    },

    listCustomers: () => {
        return datasourceCustomers;
    }
  },
};

const server = new ApolloServer({typeDefs, resolvers});
server.listen().then(({ url }) => {
    console.log(url);
});