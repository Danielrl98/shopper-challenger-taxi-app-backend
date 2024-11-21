import { Injectable } from '@nestjs/common';
import { ICustomers } from '../entities';
import { prisma } from '../infra/database';

@Injectable()
export class CustomersRepository {
  async createCustomer(customer: ICustomers): Promise<ICustomers> {
    return await prisma.customers.create({
      data: customer,
    });
  }
  async getAllCustomers(): Promise<ICustomers[]> {
    return await prisma.customers.findMany();
  }
  async getCustomerById(id: number): Promise<ICustomers | null> {
    return await prisma.customers.findUnique({ where: { id } });
  }
  async updateCustomer(id: number, customer: ICustomers): Promise<ICustomers> {
    return await prisma.customers.update({ where: { id }, data: customer });
  }
}
