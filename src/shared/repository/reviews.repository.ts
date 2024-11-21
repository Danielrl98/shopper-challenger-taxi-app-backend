import { IReviews } from '../entities';
import { prisma } from '../infra/database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReviewsRepository {
  async createReview(review: IReviews): Promise<IReviews> {
    return await prisma.reviews.create({
      data: review,
      include: {
        driver: true,
        ride: true,
        customer: true,
      },
    });
  }

  async findManyReviews(rideId: number): Promise<IReviews[]> {
    return await prisma.reviews.findMany({
      where: {
        id: rideId,
      },
      include: {
        driver: true,
        ride: true,
        customer: true,
      },
    });
  }
  async findOneReview(rideId: number): Promise<IReviews> {
    return await prisma.reviews.findFirst({
      where: {
        id: rideId,
      },
      include: {
        driver: true,
        ride: true,
        customer: true,
      },
    });
  }
}
