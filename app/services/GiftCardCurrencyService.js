const { GiftCardCurrency } = require('../../models');

class GiftCardCurrencyService {
  static create = async (data) => {
    return await GiftCardCurrency.create(data);
  };

  static getAll = async () => {
    return await GiftCardCurrency.findAll();
  };

  static getById = async (id) => {
    const currency = await GiftCardCurrency.findByPk(id);
    if (!currency) throw new Error('GiftCardCurrency not found');
    return currency;
  };

  static update = async (id, data) => {
    const currency = await GiftCardCurrency.findByPk(id);
    if (!currency) throw new Error('GiftCardCurrency not found');
    await currency.update(data);
    return currency;
  };

  static delete = async (id) => {
    const currency = await GiftCardCurrency.findByPk(id);
    if (!currency) throw new Error('GiftCardCurrency not found');
    await currency.destroy();
    return { message: 'GiftCardCurrency deleted successfully' };
  };
}

module.exports = GiftCardCurrencyService;
