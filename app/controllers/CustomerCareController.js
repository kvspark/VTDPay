// controllers/CustomerCareController.js
const CustomerCareService = require('../services/CustomerCareService');

class CustomerCareController {
  static create = async (req, res) => {
    try {
      const data = req.body;
      const result = await CustomerCareService.createCustomerCare(data);
      return res.status(201).json({ success: true, message: 'Customer care created successfully', data: result });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };

  static getFirst = async (req, res) => {
    try {
      const result = await CustomerCareService.getFirstCustomerCare();
      return res.status(200).json(result || {});
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };

  static update = async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
      await CustomerCareService.updateCustomerCare(id, data);
      return res.json({ success: true, message: "Customer care updated successfully" });
    } catch (error) {
      console.error("Update error:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  };
}

module.exports = CustomerCareController;
