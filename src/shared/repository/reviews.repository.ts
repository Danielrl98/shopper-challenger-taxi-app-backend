import { IReviews } from '../entities';
import { prisma } from '../infra/database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReviewsRepository {
  async createReview(review: IReviews): Promise<IReviews> {
    return await prisma.reviews.create({
      data: review,
    });
  }

  async findManyReviews(rideId: number): Promise<IReviews[]> {
    return await prisma.reviews.findMany({
      where: {
        id: rideId,
      },
    });
  }
  async findFirstReview(driverId: number): Promise<IReviews> {
    return await prisma.reviews.findFirst({
      where: {
        driver_id: driverId,
      },
    });
  }
}
