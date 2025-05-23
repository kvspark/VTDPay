const express = require('express');
const cors = require('cors')
const UserRoute = require('./app/routes/UserRoute')
const ProductRoute = require('./app/routes/ProductRoute')
const TransactionRoute = require('./app/routes/TransactionRoute')
const CallBackRoute = require('./app/routes/CallBackRoute')
const OrdersRoute = require('./app/routes/OrdersRoute')
const TransactRoute = require('./app/routes/TransactRoute')
const AccountRoute = require('./app/routes/AccountRoute')
const SwapAirtimeRoute = require('./app/routes/SwapAirtimeRoute')
const CustomerCareRoute = require('./app/routes/CustomerCareRoute')
const GiftCardRoute = require('./app/routes/GiftCardRoute')
const GiftCardCurrencyRoute = require('./app/routes/GiftCardCurrencyRoute')




const app = express();

app.use(express.json());
app.use(cors())


// Routes
app.use('/api/user',UserRoute)
app.use('/api/products',ProductRoute)
app.use('/api/transaction',TransactionRoute)
app.use('/api/callback',CallBackRoute)
app.use('/api/order',OrdersRoute)
app.use('/api/transact',TransactRoute)
app.use('/api/account-details',AccountRoute)
app.use('/api/swap-airtime',SwapAirtimeRoute)
app.use('/api/customer-care',CustomerCareRoute)
app.use('/api/gift-card',GiftCardRoute)
app.use('/api/gift-card-currency',GiftCardCurrencyRoute)



const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
