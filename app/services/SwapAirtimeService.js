const { SwapAirtime } = require('../../models');

class SwapAirtimeService {
  static createSwapAirtime = async (data) => {
    return await SwapAirtime.create(data);
  };

  static getAllSwapAirtime = async () => {
    return await SwapAirtime.findAll();
  };

  static getSwapAirtimeById = async (id) => {
    return await SwapAirtime.findByPk(id);
  };

  static updateSwapAirtime = async (id, data) => {
    const swap = await SwapAirtime.findByPk(id);
    if (!swap) throw new Error('SwapAirtime not found');
    return await swap.update(data);
  };

  static deleteSwapAirtime = async (id) => {
    const swap = await SwapAirtime.findByPk(id);
    if (!swap) throw new Error('SwapAirtime not found');
    return await swap.destroy();
  };

  static getFirstSwapAirtime = async () => {
    return await SwapAirtime.findOne();
  };
}

module.exports = SwapAirtimeService;
