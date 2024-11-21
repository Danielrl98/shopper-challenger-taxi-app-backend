import { IDrivers } from '../entities';
import { DriversRepository } from '../repository/drivers.repository';
import { prisma } from './database';

async function main() {
  await createDrivers();
}

async function createDrivers() {
  const drivers: IDrivers[] = [
    {
      name: 'Homer Simpson',
      description:
        'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).',
      car: 'Plymouth Valiant 1973 rosa e enferrujado',
      stars: 0,
      tax: 2.5,
      min_km: 1,
    },
  ];

  for (const driver of drivers) {
    await new DriversRepository().createDriver(driver);
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
