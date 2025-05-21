const { GiftCard, GiftCardCurrency } = require('../../models');

class GiftCardService {
  static createGiftCard = async (data) => {
    return await GiftCard.create(data);
  };

  static getAllGiftCards = async () => {
    return await GiftCard.findAll({
        include: { model: GiftCardCurrency, as: 'currencies' }
    });
  };

  static getGiftCardById = async (id) => {
    const giftCard = await GiftCard.findByPk(id, {
      include: {
        model: GiftCardCurrency,
        as: 'currencies'
      }
    });
    if (!giftCard) throw new Error('Gift card not found');
    return giftCard;
  };

  static updateGiftCard = async (id, data) => {
    const giftCard = await GiftCard.findByPk(id);
    if (!giftCard) throw new Error('Gift card not found');
    await giftCard.update(data);
    return giftCard;
  };

  static deleteGiftCard = async (id) => {
    const giftCard = await GiftCard.findByPk(id);
    if (!giftCard) throw new Error('Gift card not found');
    await giftCard.destroy();
    return { message: 'Gift card deleted successfully' };
  };
}

module.exports = GiftCardService;
