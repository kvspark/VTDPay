// services/OrdersService.js
const axios = require("axios");
const bcrypt = require("bcrypt");
require('dotenv').config();
const { User } = require('../../models');
const TransactionService = require("./TransactionService");



class OrdersService {
    static verifyPin = async (user, inputPin) => {
        if (!inputPin || typeof inputPin !== 'string' || inputPin.trim() === '') {
            throw {success: false, message: 'PIN is required'};
        }
    
        const isMatch = await bcrypt.compare(inputPin, user.pin);
        if (!isMatch) {
            throw {success: false, message: 'Invalid PIN'};
        }
    }
    

    static airtime = async (data) => {
        try {
            const user = await User.findOne({ where: { email: data.user.email } });
            if (!user) throw new Error('Invalid User');

            await OrdersService.verifyPin(user, data.body.pin); // 🔐 Verify PIN

            data.body.email = user.email;

            if (user.balance < data.body.amount) {
                throw new Error('Your account balance is too low for this transaction');
            }

            const result = await axios.post(`${process.env.UTILITY_URL}/orders/airtime`, data.body, {
                headers: {
                    'Authorization': `Bearer ${process.env.UTILITY_TOKEN}`,
                    'Content-Type': 'application/json',
                },
            });

            if (result.data.status === true) {
                await TransactionService.creditVendor(result.data.data);
                return result.data;
            }

            throw new Error(result.data.message || "Failed to process transaction");
        } catch (err) {
            throw new Error(err.message);
        }
    }

    static dataBundle = async (data) => {
        try {
            const user = await User.findOne({ where: { email: data.user.email } });
            if (!user) throw new Error('Invalid User');

            await OrdersService.verifyPin(user, data.body.pin);

            data.body.email = user.email;

            if (user.balance < data.body.amount) {
                throw new Error('Your account balance is too low for this transaction');
            }

            const result = await axios.post(`${process.env.UTILITY_URL}/orders/data`, data.body, {
                headers: {
                    'Authorization': `Bearer ${process.env.UTILITY_TOKEN}`,
                    'Content-Type': 'application/json',
                },
            });

            if (result.data.status === true) {
                await TransactionService.creditVendor(result.data.data);
                return result.data;
            }

            throw new Error(result.data.message || "Failed to process transaction");
        } catch (err) {
            throw new Error(err.message);
        }
    }

    static cable = async (data) => {
        try {
            const user = await User.findOne({ where: { email: data.user.email } });
            if (!user) throw new Error('Invalid User');

            await OrdersService.verifyPin(user, data.body.pin);

            data.body.email = user.email;

            if (user.balance < data.body.amount) {
                throw new Error('Your account balance is too low for this transaction');
            }

            const result = await axios.post(`${process.env.UTILITY_URL}/orders/cable`, data.body, {
                headers: {
                    'Authorization': `Bearer ${process.env.UTILITY_TOKEN}`,
                    'Content-Type': 'application/json',
                },
            });

            if (result.data.status === true) {
                await TransactionService.creditVendor(result.data.data);
                return result.data;
            }

            throw new Error(result.data.message || "Failed to process transaction");
        } catch (err) {
            throw new Error(err.message);
        }
    }

    static electricity = async (data) => {
        try {
            const user = await User.findOne({ where: { email: data.user.email } });
            if (!user) throw new Error('Invalid User');

            await OrdersService.verifyPin(user, data.body.pin);

            data.body.email = user.email;

            if (user.balance < data.body.amount) {
                throw new Error('Your account balance is too low for this transaction');
            }

            const result = await axios.post(`${process.env.UTILITY_URL}/orders/electricity`, data.body, {
                headers: {
                    'Authorization': `Bearer ${process.env.UTILITY_TOKEN}`,
                    'Content-Type': 'application/json',
                },
            });

            if (result.data.status === true) {
                await TransactionService.creditVendor(result.data.data);
                return result.data;
            }

            throw new Error(result.data.message || "Failed to process transaction");
        } catch (err) {
            throw new Error(err.message);
        }
    }

    static betting = async (data) => {
        try {
            const user = await User.findOne({ where: { email: data.user.email } });
            if (!user) throw new Error('Invalid User');

            await OrdersService.verifyPin(user, data.body.pin);

            data.body.email = user.email;

            if (user.balance < data.body.amount) {
                throw new Error('Your account balance is too low for this transaction');
            }

            const result = await axios.post(`${process.env.UTILITY_URL}/orders/betting`, data.body, {
                headers: {
                    'Authorization': `Bearer ${process.env.UTILITY_TOKEN}`,
                    'Content-Type': 'application/json',
                },
            });

            if (result.data.status === true) {
                await TransactionService.creditVendor(result.data.data);
                return result.data;
            }

            throw new Error(result.data.message || "Failed to process transaction");
        } catch (err) {
            throw new Error(err.message);
        }
    }

    static jamb = async (data) => {
        try {
            const user = await User.findOne({ where: { email: data.user.email } });
            if (!user) {
                throw new Error('Invalid User');
            }


            await OrdersService.verifyPin(user, data.body.pin);
    
            data.body.email = user.email
    
            console.log(data.body)
            // return data.body
    
            if (user.balance < parseFloat(data.body.product_amount) ) {
                throw new Error('Your account balance is too low for this transaction');
            }
    
            const balanceAfter = user.balance - data.body.product_amount;
            const requestId = Math.random().toString(36).substring(2, 10);
            
            const callbackUrl = `${process.env.BASE_URL}/api/callback`;
    
            const response = await axios.get(`https://www.nellobytesystems.com/APIJAMBV1.asp?UserID=${process.env.USERID}&APIKey=${process.env.APIKEY}&ExamType=${data.body.product_code}&PhoneNo=${data.body.phone_number}&RequestID=${requestId}&CallBackURL=${encodeURIComponent(callbackUrl)}`);
            
            if (response.data.status == "ORDER_RECEIVED") {
                await TransactionService.create({
                    user_id: user.id,
                    transaction_type: 'JAMB',
                    amount: Math.round(data.body.product_amount),
                    status: "successful",
                    reference: requestId,
                    description: `Purchase of ${data.body.product_name} ${data.body.product_amount}  was successful`,
                    meta: data.body,
                    channel: data.body.channel,
                    is_credit: true,
                    balance_before: user.balance,
                    balance_after: balanceAfter,
                    remark: response.data.status,
                });
    
                await user.update({ balance: balanceAfter });
    
                return { success: true, message: `Purchase of ${data.body.product_name} ${data.body.product_amount}  was successful` };
            } else {
                // If order not received at all
                await TransactionService.create({
                    user_id: user.id,
                    transaction_type: "JAMB",
                    amount: Math.round(data.body.product_amount),
                    status: "failed",
                    reference: requestId,
                    description: response.data.remark || `Purchase of ${data.body.product_name} ${data.body.product_amount} failed at the provider.`,
                    meta: data.body,
                    channel: data.body.channel,
                    is_credit: false,
                    balance_before: user.balance,
                    balance_after: user.balance,
                    remark: response.data.status,
                });
    
                return { success: false, message: `Purchase of ${data.body.product_name} ${data.body.product_amount} failed at the provider.` };
            }
        } catch (error) {
            throw new Error(error.message || 'Something went wrong');
        }
    }
    
    static wace = async (data) => {
        try {
            const user = await User.findOne({ where: { email: data.user.email } });
            if (!user) {
                throw new Error('Invalid User');
            }

            await OrdersService.verifyPin(user, data.body.pin);
    
            data.body.email = user.email
    
            console.log(data.body)
            // return data.body
    
            if (user.balance < parseFloat(data.body.product_amount) ) {
                throw new Error('Your account balance is too low for this transaction');
            }
    
            const balanceAfter = user.balance - data.body.product_amount;
            const requestId = Math.random().toString(36).substring(2, 10);
            
            const callbackUrl = `${process.env.BASE_URL}/api/callback`;
    
            const response = await axios.get(`https://www.nellobytesystems.com/APIJAMBV1.asp?UserID=${process.env.USERID}&APIKey=${process.env.APIKEY}&ExamType=${data.body.product_code}&PhoneNo=${data.body.phone_number}&RequestID=${requestId}&CallBackURL=${encodeURIComponent(callbackUrl)}`);
            // const response = await axios.get(`https://www.nellobytesystems.com/APIWAECV1.asp?UserID=your_userid&APIKey=your_apikey&ExamType=${data.body.}&PhoneNo=${data.body.phone_number}&RequestID=${requestId}&CallBackURL=${encodeURIComponent(callbackUrl)}`);
            
            if (response.data.status == "ORDER_RECEIVED") {
                await TransactionService.create({
                    user_id: user.id,
                    transaction_type: 'WACE',
                    amount: Math.round(data.body.product_amount),
                    status: "successful",
                    reference: requestId,
                    description: `Purchase of ${data.body.product_name} ${data.body.product_amount}  was successful`,
                    meta: data.body,
                    channel: data.body.channel,
                    is_credit: true,
                    balance_before: user.balance,
                    balance_after: balanceAfter,
                    remark: response.data.status,
                });
    
                await user.update({ balance: balanceAfter });
    
                return { success: true, message: `Purchase of ${data.body.product_name} ${data.body.product_amount}  was successful` };
            } else {
                // If order not received at all
                await TransactionService.create({
                    user_id: user.id,
                    transaction_type: "WACE",
                    amount: Math.round(data.body.product_amount),
                    status: "failed",
                    reference: requestId,
                    description: response.data.remark || `Purchase of ${data.body.product_name} ${data.body.product_amount} failed at the provider.`,
                    meta: data.body,
                    channel: data.body.channel,
                    is_credit: false,
                    balance_before: user.balance,
                    balance_after: user.balance,
                    remark: response.data.status,
                });
    
                return { success: false, message: `Purchase of ${data.body.product_name} ${data.body.product_amount} failed at the provider.` };
            }
        } catch (error) {
            throw new Error(error.message || 'Something went wrong');
        }
    }
}

module.exports = OrdersService;
