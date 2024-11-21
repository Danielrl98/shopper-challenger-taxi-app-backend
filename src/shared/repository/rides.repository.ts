import { IRides } from '../entities';
import { prisma } from '../infra/database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RidesRepository {
  async createRide(ride: IRides): Promise<IRides> {
    const data = {
      ...ride,
      created_at: new Date(),
      updated_at: new Date(),
    };

    return await prisma.rides.create({
      data,
      include: { customer: true, driver: true },
    });
  }
  async updateRide(ride: IRides): Promise<IRides> {
    return await prisma.rides.update({
      where: { id: ride.id },
      data: {
        status: ride.status,
        updated_at: new Date(),
      },
      include: { customer: true, driver: true },
    });
  }

  async findManyRides(): Promise<IRides[]> {
    return await prisma.rides.findMany({
      include: { customer: true, driver: true },
    });
  }

  async findUniqueRides(id: number): Promise<IRides | null> {
    return await prisma.rides.findUnique({
      where: { id: id },
      include: { customer: true, driver: true },
    });
  }
}
