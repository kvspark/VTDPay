// services/OrdersService.js
const axios = require("axios");
const bcrypt = require("bcrypt");
require('dotenv').config();
const { User } = require('../../models');
const TransactionService = require("./TransactionService");



class OrdersService {
    static verifyPin = async (user, inputPin) => {
        if (!inputPin || typeof inputPin !== 'string' || inputPin.trim() === '') {
            throw new Error('PIN is required');
        }
    
        const isMatch = await bcrypt.compare(inputPin, user.pin);
        if (!isMatch) {
            throw new Error('Invalid PIN');
        }
    }
    

    static airtime = async (data) => {
        try {
            const user = await User.findOne({ where: { email: data.user.email } });
            if (!user) {
                throw new Error('Invalid user');
            }

            await OrdersService.verifyPin(user, data.body.pin);
    
            data.body.email = user.email;
    
            const amount = parseFloat(data.body.amount);
            if (isNaN(amount) || amount <= 0) {
                throw new Error('Invalid airtime amount');
            }
    
            if (user.balance < amount) {
                throw new Error('Your account balance is too low for this transaction');
            }
    
            const balanceAfter = user.balance - amount;
            const requestId = Math.random().toString(36).substring(2, 10);
            const callbackUrl = `${process.env.BASE_URL}/api/callback`;
    
            const response = await axios.get(
                `https://www.nellobytesystems.com/APIAirtimeV1.asp?UserID=${process.env.USERID}&APIKey=${process.env.APIKEY}&MobileNetwork=${data.body.network_id}&Amount=${amount}&MobileNumber=${data.body.phone_number}&RequestID=${requestId}&CallBackURL=${encodeURIComponent(callbackUrl)}`
            );
    
            const transactionPayload = {
                user_id: user.id,
                transaction_type: 'Airtime',
                amount: amount,
                reference: requestId,
                meta: data.body,
                channel: data.body.channel,
                balance_before: user.balance,
            };
    
            if (response.data.status === 'ORDER_RECEIVED') {
                await TransactionService.create({
                    ...transactionPayload,
                    status: 'successful',
                    description: `Purchase of ${data.body.network} ${amount} for ${data.body.phone_number} was successful.`,
                    is_credit: true,
                    balance_after: balanceAfter,
                    remark: response.data.status,
                });
    
                await user.update({ balance: balanceAfter });
    
                return {
                    success: true,
                    message: `Purchase of ${data.body.network} ${amount} for ${data.body.phone_number} was successful.`,
                };
            } else {
                await TransactionService.create({
                    ...transactionPayload,
                    status: 'failed',
                    description: `Purchase of ${data.body.network} ${amount} for ${data.body.phone_number} failed at the provider.`,
                    is_credit: false,
                    balance_after: user.balance,
                    remark: response.data.status,
                });
    
                return {
                    success: false,
                    message: `Purchase of ${data.body.network} ${amount} for ${data.body.phone_number} failed at the provider.`,
                };
            }
        } catch (error) {
            // Safely return the error message
            return {
                success: false,
                message: error.message || 'Something went wrong',
            };
        }
    };
        
        static dataBundle = async (data) => {
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
        
                const response = await axios.get(`https://www.nellobytesystems.com/APIDatabundleV1.asp?UserID=${process.env.USERID}&APIKey=${process.env.APIKEY}&MobileNetwork=${data.body.network_id}&DataPlan=${data.body.product_id}&MobileNumber=${data.body.phone_number}&RequestID=${requestId}&CallBackURL=${encodeURIComponent(callbackUrl)}`);
                
                if (response.data.status == "ORDER_RECEIVED") {
                    await TransactionService.create({
                            user_id: user.id,
                            transaction_type: 'Data Bundle',
                            amount: Math.round(data.body.product_amount),
                            status: "successful",
                            reference: requestId,
                            description: `Purchase of ${data.body.network} ${Math.round(data.body.product_amount)} for ${data.body.phone_number} was successful.`,
                            meta: data.body,
                            channel: data.body.channel,
                            is_credit: true,
                            balance_before: user.balance,
                            balance_after: balanceAfter,
                            remark: response.data.status,
                        });
        
                        await user.update({ balance: balanceAfter });
        
                        return { success: true, message: `Purchase of ${data.body.network} ${Math.round(data.body.product_amount)} for ${data.body.phone_number} was successful` };
                } else {
                    // If order not received at all
                    await TransactionService.create({
                        user_id: user.id,
                        transaction_type: "Data Bundle",
                        amount: Math.round(data.body.product_amount),
                        status: "failed",
                        reference: requestId,
                        description: `Purchase of ${data.body.network} ${Math.round(data.body.product_amount)} for ${data.body.phone_number} failed at the provider.`,
                        meta: data.body,
                        channel: data.body.channel,
                        is_credit: false,
                        balance_before: user.balance,
                        balance_after: user.balance,
                        remark: response.data.status,
                    });
        
                    return { success: false, message: `Purchase of ${data.body.network} ${Math.round(data.body.product_amount)} for ${data.body.phone_number} failed at the provider.` };
                }
            } catch (error) {
                throw error.message
                // throw new Error(error.message || 'Something went wrong');
            }
        }
        
        static cable = async (data) => {
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
        
                const response = await axios.get(`https://www.nellobytesystems.com/APICableTVV1.asp?UserID=${process.env.USERID}&APIKey=${process.env.APIKEY}&CableTV=${data.body.id}&Package=${data.body.product_id}&SmartCardNo=${data.body.recipient_smartcardno}&PhoneNo=${data.body.phone_number}&RequestID=${requestId}&CallBackURL=${encodeURIComponent(callbackUrl)}`);
                
                if (response.data.status == "ORDER_RECEIVED") {
                    await TransactionService.create({
                        user_id: user.id,
                        transaction_type: 'Cable',
                        amount: Math.round(data.body.product_amount),
                        status: "successful",
                        reference: requestId,
                        description: `Purchase of ${data.body.product_name}  for ${data.body.phone_number} was successful.`,
                        meta: data.body,
                        channel: data.body.channel,
                        is_credit: true,
                        balance_before: user.balance,
                        balance_after: balanceAfter,
                        remark: response.data.status,
                    });
        
                    await user.update({ balance: balanceAfter });
        
                    return { success: true, message: `Purchase of ${data.body.product_name} for ${data.body.phone_number} was successful` };
                } else {
                    // If order not received at all
                    await TransactionService.create({
                        user_id: user.id,
                        transaction_type: "Cable",
                        amount: Math.round(data.body.product_amount),
                        status: "failed",
                        reference: requestId,
                        description: `Purchase of ${data.body.product_name}  for ${data.body.phone_number} failed at the provider.`,
                        meta: data.body,
                        channel: data.body.channel,
                        is_credit: false,
                        balance_before: user.balance,
                        balance_after: user.balance,
                        remark: response.data.status,
                    });
        
                    return { success: false, message: `Purchase of ${data.body.product_name}  for ${data.body.phone_number} failed at the provider.` };
                }
            } catch (error) {
                throw new Error(error.message || 'Something went wrong');
            }
        }
        
        static electricity = async (data) => {
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
        
                const response = await axios.get(`https://www.nellobytesystems.com/APIElectricityV1.asp?UserID=${process.env.USERID}&APIKey=${process.env.APIKEY}key&ElectricCompany=${data.body.company_code}&MeterType=${data.body.meterType}&MeterNo=${data.body.meterNumber}&Amount=${data.body.product_amount}&PhoneNo=${data.body.phone_number}&RequestID=${requestId}&CallBackURL=${encodeURIComponent(callbackUrl)}`);
                
                if (response.data.status == "ORDER_RECEIVED") {
                    await TransactionService.create({
                        user_id: user.id,
                        transaction_type: 'Electricity Bill',
                        amount: Math.round(data.body.product_amount),
                        status: "successful",
                        reference: requestId,
                        description: `Purchase of ${data.body.product_name} ${data.body.product_amount}  for ${data.body.meterNumber} was successful` ,
                        meta: data.body,
                        channel: data.body.channel,
                        is_credit: true,
                        balance_before: user.balance,
                        balance_after: balanceAfter,
                        remark: response.data.status,
                    });
        
                    await user.update({ balance: balanceAfter });
        
                    return { success: true, message: `Purchase of ${data.body.product_name} ${data.body.product_amount}  for ${data.body.meterNumber} was successful` };
                } else {
                    // If order not received at all
                    await TransactionService.create({
                        user_id: user.id,
                        transaction_type: "Electricity Bill",
                        amount: Math.round(data.body.product_amount),
                        status: "failed",
                        reference: requestId,
                        description: response.data.remark || `Purchase of ${data.body.product_name} ${data.body.product_amount} for ${data.body.meterNumber} failed at the provider.`,
                        meta: data.body,
                        channel: data.body.channel,
                        is_credit: false,
                        balance_before: user.balance,
                        balance_after: user.balance,
                        remark: response.data.status,
                    });
        
                    return { success: false, message: `Purchase of ${data.body.product_name} ${data.body.product_amount} for ${data.body.meterNumber} failed at the provider.` };
                }
            } catch (error) {
                throw new Error(error.message || 'Something went wrong');
            }
        }
        
        static betting = async (data) => {
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
        
                const response = await axios.get(`https://www.nellobytesystems.com/APIBettingV1.asp?UserID=${process.env.USERID}&APIKey=${process.env.APIKEY}&BettingCompany=${data.body.product_code}&CustomerID=${data.body.customer_id}&Amount=${data.body.product_amount}&&RequestID=${requestId}&CallBackURL=${encodeURIComponent(callbackUrl)}`);
                
                if (response.data.status == "ORDER_RECEIVED") {
                    await TransactionService.create({
                        user_id: user.id,
                        transaction_type: 'Betting',
                        amount: Math.round(data.body.product_amount),
                        status: "successful",
                        reference: requestId,
                        description: `Purchase of ${data.body.product_name} ${data.body.product_amount}  for ${data.body.customer_id} was successful`,
                        meta: data.body,
                        channel: data.body.channel,
                        is_credit: true,
                        balance_before: user.balance,
                        balance_after: balanceAfter,
                        remark: response.data.status,
                    });
        
                    await user.update({ balance: balanceAfter });
        
                    return { success: true, message: `Purchase of ${data.body.product_name} ${data.body.product_amount}  for ${data.body.customer_id} was successful` };
                } else {
                    // If order not received at all
                    await TransactionService.create({
                        user_id: user.id,
                        transaction_type: "Betting",
                        amount: Math.round(data.body.product_amount),
                        status: "failed",
                        reference: requestId,
                        description: response.data.remark || `Purchase of ${data.body.product_name} ${data.body.product_amount} for ${data.body.customer_id} failed at the provider.`,
                        meta: data.body,
                        channel: data.body.channel,
                        is_credit: false,
                        balance_before: user.balance,
                        balance_after: user.balance,
                        remark: response.data.status,
                    });
        
                    return { success: false, message: `Purchase of ${data.body.product_name} ${data.body.product_amount} for ${data.body.customer_id} failed at the provider.` };
                }
            } catch (error) {
                throw new Error(error.message || 'Something went wrong');
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
