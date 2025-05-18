// services/CustomerCareService.js
const { CustomerCare } = require('../../models');

class CustomerCareService {
  static createCustomerCare = async (data) => {
    return await CustomerCare.create(data);
  };

  static getFirstCustomerCare = async () => {
    return await CustomerCare.findOne();
  };

  static getAllCustomerCare = async () => {
    return await CustomerCare.findAll();
  };

  static getCustomerCareById = async (id) => {
    return await CustomerCare.findByPk(id);
  };

  static updateCustomerCare = async (id, data) => {
    const care = await CustomerCare.findByPk(id);
    if (!care) {
      throw new Error('CustomerCare entry not found');
    }
    return await care.update(data);
  };

  static deleteCustomerCare = async (id) => {
    const care = await CustomerCare.findByPk(id);
    if (!care) {
      throw new Error('CustomerCare entry not found');
    }
    return await care.destroy();
  };
}

module.exports = CustomerCareService;
