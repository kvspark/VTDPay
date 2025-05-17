// services/SwapAirtimeService.js

const { SwapAirtime } = require('../../models');

class SwapAirtimeService {
  static createSwapAirtime = async (data) => {
    return await SwapAirtime.create(data);
  };

  static getFirstSwapAirtime = async () => {
    return await SwapAirtime.findOne();
  };

  static updateSwapAirtime = async (id, data) => {
    const swap = await SwapAirtime.findByPk(id);
    if (!swap) {
      throw new Error('SwapAirtime record not found');
    }
    return await swap.update(data);
  };
}

module.exports = SwapAirtimeService;
