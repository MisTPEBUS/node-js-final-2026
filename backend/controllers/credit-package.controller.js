import responseHelper from "../utils/responseHelper.js";
import creditPackageService from "../services/credit-package.service.js";
const creditPackageController = {
  async getCreditPages(req, res) {
    const creditPackages = await creditPackageService.getAll();
    return responseHelper.ok(res, creditPackages);
  },
  async createCreditPackage(req, res) {
    const body = req.validated.body;
    const result = await creditPackageService.createAsync(body);
    return responseHelper.ok(res, {
      id: result.id,
      name: result.name,
      credit_amount: result.credit_amount,
      price: result.price,
      createdAt: result.created_at,
    });
  },
  async deleteCreditPackage(req, res) {
    const { creditPackageId } = req.validated.params;
    await creditPackageService.deleteAsyncById(creditPackageId);
    return responseHelper.ok(res, null);
  },
};

export default creditPackageController;
