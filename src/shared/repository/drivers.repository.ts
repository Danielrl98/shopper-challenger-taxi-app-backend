import { IDrivers } from '../entities';
import { prisma } from '../infra/database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DriversRepository {
  async createDriver(driver: IDrivers): Promise<IDrivers> {
    return await prisma.drivers.create({
      data: {
        ...driver,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
  }
  async findManyIDrivers(): Promise<IDrivers[]> {
    return await prisma.drivers.findMany();
  }

  async findDriverById(id: number): Promise<IDrivers | null> {
    return await prisma.drivers.findUnique({
      where: { id },
    });
  }

  async updateDriver(id: number, driver: IDrivers): Promise<IDrivers | null> {
    return await prisma.drivers.update({
      where: { id },
      data: {
        ...driver,
        updated_at: new Date(),
      },
    });
  }
}
