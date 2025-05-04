const { default: axios } = require("axios")
require('dotenv').config()





class ProductService {
    static airtime = async () => {
        try {
            const response = await axios.get(`https://www.nellobytesystems.com/APIAirtimeDiscountV2.asp?UserID=${process.env.UserID}`)
            return  response.data.MOBILE_NETWORK
        } catch (error) {
            throw error
        }
    }
    
    
    

    static dataBundle = async () => {
        try {
            const response = await axios.get(`https://www.nellobytesystems.com/APIDatabundlePlansV2.asp`)
            return  response.data
        } catch (error) {
            throw error
        }
    }

    static electricityBill = async () => {
        try {
            const response = await axios.get(`https://www.nellobytesystems.com/APIElectricityDiscosV1.asp`)
            return  response.data
        } catch (error) {
            throw error
        }
    }

    
    static betting = async () => {
        try {
            const response = await axios.get(`https://www.nellobytesystems.com/APIBettingCompaniesV2.asp`)
            return  response.data
        } catch (error) {
            throw error
        }
    }

    static jamb = async () => {
        try {
            const response = await axios.get(`https://www.nellobytesystems.com/APIJAMBPackagesV2.asp`)
            return  response.data
        } catch (error) {
            throw error
        }
    }

    static wace = async () => {
        try {
            const response = await axios.get(`https://www.nellobytesystems.com/APIWAECPackagesV2.asp`)
            return  response.data
        } catch (error) {
            throw error
        }
    }

    static cable = async () => {
        try {
            const response = await axios.get('https://www.nellobytesystems.com/APICableTVPackagesV2.asp')
            return  response.data
        } catch (error) {
            throw error
        }
    }

    static vtuBalance = async () => {
        try {
            const response = await axios.get(`https://www.nellobytesystems.com/APIWalletBalanceV1.asp?UserID=${process.env.USERID}&APIKey=${process.env.APIKey}`)
            return  response.data
        } catch (error) {
            throw error
        }
    }
}

module.exports = ProductService