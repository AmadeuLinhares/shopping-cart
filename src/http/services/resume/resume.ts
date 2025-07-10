import { UserNotFound } from "@/http/errors/users/users-error";
import { CartRepository } from "@/http/repositories/interfaces/cart";
import { UsersRepository } from "@/http/repositories/interfaces/user";

type ResumeRequest = {
  userId: string;
};

export interface ResumeResponse {
  total: number;
  discount: number;
}

export class ResumeService {
  constructor(
    private cartRepository: CartRepository,
    private userRepository: UsersRepository,
  ) {}

  async execute({ userId }: ResumeRequest): Promise<ResumeResponse> {
    const cart = await this.cartRepository.fetch();
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UserNotFound();
    }

    if (!cart?.products || !cart?.products.length) {
      return {
        discount: 0,
        total: 0,
      };
    }

    const quantityOfproducts = cart.products.reduce(
      (previous, current) => previous + current.amount,
      0,
    );

    const totalToPay = cart.products.reduce(
      (previous, current) => previous + current.amount * current.price,
      0,
    );

    if (quantityOfproducts < 3) {
      return {
        discount: 0,
        total: totalToPay,
      };
    }

    const cheapestProduct = cart.products.reduce((min, product) =>
      product.price < min.price ? product : min,
    );

    const isUserVip = user?.roles.includes("VIP");

    if (isUserVip) {
      const vipDiscount = totalToPay * 0.15;

      return {
        total: totalToPay,
        discount:
          vipDiscount > cheapestProduct.price
            ? vipDiscount
            : cheapestProduct.price,
      };
    }

    return {
      total: totalToPay,
      discount: cheapestProduct.price,
    };
  }
}
