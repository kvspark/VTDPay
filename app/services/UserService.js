const { symbol } = require("joi")
const {User} = require("../../models")
const { default: slugify } = require("slugify")
const bcrypt = require('bcrypt')
const { Sequelize } = require('sequelize');
const jwt = require('jsonwebtoken');
const { default: axios } = require("axios");
require('dotenv').config()




class UserService {
    static getUser = async () => {
        try {
            return await User.findAll()
        } catch (error) {
            return {success: false, message: error.message || error}
        }
    }

    // Create User
    static createUser = async (data) => {
        try {
        // Hash the password before saving to the database
        data.password = await bcrypt.hash(data.password, 10);
            
        
        // Try to create a new user
        const user = await User.create(data);
    
        if (user) {
            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '720h' });
            return { success: true, message: "Account Created successfully", token: token };
        }
    
        } catch (error) {
        // Handle different types of errors
    
        // Sequelize validation error (e.g., missing required fields)
        if (error instanceof Sequelize.ValidationError) {
            let messages = error.errors.map(err => err.message); // Collect all validation error messages
            throw { success: false, message: `Validation Error: ${messages.join(', ')}` };
        }
    
        // Sequelize unique constraint error (e.g., email or username already exists)
        if (error instanceof Sequelize.UniqueConstraintError) {
            throw { success: false, message: `Duplicate entry error: ${error.errors[0].message}` };
        }

        console.log('ps', error)
    
        // Other errors (generic or unexpected)
        throw { success: false, message: error.message || 'An unexpected error occurred.' };
        }
    };

    static findUser = async (data) => {
        try {
            return await User.findOne({
                where: {
                    email: data.user.email
                }
            })
        } catch (error) {
            return {success: false, message: error.message}
        }
    }

    static loginUser = async (data) => {
        try {
            const user = await User.findOne({
                where:{
                    email: data.email
                }
            })
            if(!user)
            {
                throw new Error('Invalid Username or Password')
            }
            const hash = await bcrypt.compare(data.password, user.password)
            if(!hash)
            {
                throw new Error('Invalid Login Credentials')
            }
            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '720h' });
            return { success: true, message: "Login Successfully successfully", token: token };
        } catch (error) {
            throw {success:false, message: error.message}
        }
    }

    static getReferralCode = async (data) => {
        
        const MAX_RETRIES = 10;
        const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        
        try {
            // Check if user already has a referral code
            const existingUser = await User.findOne({where:{email: data?.user?.email}});
            // const existingUser = await User.findOne({where:{email: "joy@gmail.com"}});
            if (existingUser && existingUser.my_referral_code) {
                return { 
                    success: true, 
                    message: 'User already has a referral code',
                    code: existingUser.my_referral_code
                };
            }
    
            let code;
            let attempts = 0;
            let codeExists = true;
    
            // Generate unique code with retry logic
            while (codeExists && attempts < MAX_RETRIES) {
                // Generate new code
                code = '';
                for (let i = 0; i < 5; i++) {
                    const randomIndex = Math.floor(Math.random() * CHARACTERS.length);
                    code += CHARACTERS[randomIndex];
                }
    
                // Check if code exists in database
                const userWithCode = await User.findOne({
                    where: { my_referral_code: code }
                });
                
                codeExists = !!userWithCode;
                attempts++;
            }
    
            if (codeExists) {
                throw new Error('Failed to generate unique referral code after multiple attempts');
            }
    
            // Update the user with the new referral code
            await User.update(
                { my_referral_code: code },
                { where: { email: data?.user?.email } }
            );
    
            return { 
                success: true, 
                message: 'Referral code generated successfully',
                code: code
            };
    
        } catch (error) {
            console.error('Error generating referral code:', error);
            return { 
                success: false, 
                message: error.message || 'Failed to generate referral code'
            };
        }
    }
}

module.exports = UserService