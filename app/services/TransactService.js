const { User } = require('../../models');
const TransactionService = require('./TransactionService');

class TransactService {
    static deposit = async (data) => {
        try {
            const user = await User.findOne({
                where:{email: data.email}
            })
            if(!user)
            {
                return {success: false, message: 'Fail to deposit to User'}
            }
            const newBalance = parseFloat(user.balance) + parseFloat(data.amount);

            await TransactionService.create({
                user_id: user.id,
                transaction_type: 'Deposit',
                amount: newBalance,
                status: "successful",
                reference: Math.random(10000000,99999999),
                description: `Deposit of N${data.amount}`,
                meta: data,
                channel: "web",
                is_credit: true,
                balance_before: user.balance,
                balance_after: newBalance,
                remark: "Deposit Successful",
            });

            await user.update({ balance: newBalance })
            return {success: true, message: 'Deposited Successfully'}
        } catch (error) {
            throw data
        }
    }

    static withdraw = async (data) => {
        try {
            const user = await User.findOne({
                where: { email: data.user.email }
            });
    
            if (!user) {
                throw {success:false, message: 'Invalid user'};
            }
    
            const amount = Number(data.body.amount);
            if (isNaN(amount) || amount <= 0) {
                throw {success: false, message: 'Invalid withdrawal amount'};
            }
    
            if (user.balance < amount) {
                throw {success: false, message: 'Account balance is too low for this transaction'};
            }

            data.body.email = user.email
    
            const newBalance = user.balance - amount;
    
            const reference = Math.floor(10000000 + Math.random() * 90000000).toString();
    
            await TransactionService.create({
                user_id: user.id,
                transaction_type: 'Withdrawal',
                amount: amount,
                status: "pending",
                reference: reference,
                description: `Withdrawal request of ₦${amount} to ${data.body.bank_name}, Account No. ${data.body.account_number}, is being processed.`,
                meta: data.body,
                channel: "mobile",
                is_credit: false,
                balance_before: user.balance,
                balance_after: newBalance,
                remark: "Withdrawal",
            });
    
            await user.update({ balance: newBalance });
    
            return {
                success: true,
                message: 'Withdrawal request submitted successfully. Check your transaction history for updates.'
            };
    
        } catch (error) {
            throw error;
        }
    }
     
}

module.exports = TransactService