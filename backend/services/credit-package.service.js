import dataSource from "../db/data-source.js";
import { CreditPackage } from "../entities/CreditPackage.js";
import { CreditPurchase } from "../entities/CreditPurchase.js";
import { BadRequestError } from "../utils/AppError.js";

const creditPackageRepo = dataSource.getRepository(CreditPackage);
const creditPurchaseRepo = dataSource.getRepository(CreditPurchase);

const creditPackageService = {
  getAll() {
    return creditPackageRepo.find({
      select: {
        id: true,
        name: true,
        credit_amount: true,
        price: true,
      },
      order: {
        created_at: "ASC",
      },
    });
  },
  async createAsync({ name, credit_amount, price }) {
    const existing = await creditPackageRepo.findOneBy({ name });

    if (existing) {
      throw new AppError(409, "資料重複");
    }

    return await creditPackageRepo.save(
      creditPackageRepo.create({ name, credit_amount, price }),
    );
  },
  async deleteAsyncById(creditPackageId) {
    const result = await creditPackageRepo.delete(creditPackageId);
    if (!result.affected) {
      throw new AppError(400, "ID錯誤");
    }
  },
  // M5
  async purchaseCreditPackage(userId, creditPackageId) {
    const creditPackage = await creditPackageRepo.findOneBy({
      id: creditPackageId,
    });

    if (!creditPackage) {
      throw new BadRequestError("ID錯誤");
    }

    const purchase = creditPurchaseRepo.create({
      user_id: userId,
      credit_package_id: creditPackage.id,
      purchased_credits: creditPackage.credit_amount,
      price_paid: creditPackage.price,
    });

    await creditPurchaseRepo.save(purchase);
  },
};

export default creditPackageService;
