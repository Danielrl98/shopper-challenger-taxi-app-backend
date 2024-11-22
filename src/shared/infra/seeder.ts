import { ICustomers, IDrivers, IReviews, IRides } from '../entities';
import { DriversRepository } from '../repository/drivers.repository';
import {
  CustomersRepository,
  ReviewsRepository,
  RidesRepository,
} from '../repository';
import { prisma } from './database';

async function main() {
  await createDrivers();
  await createdCustomer();
  await createRides();
  await createReviews();
}

async function createDrivers() {
  const drivers: IDrivers[] = [
    {
      name: 'Homer Simpson',
      description:
        'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).',
      car: 'Plymouth Valiant 1973 rosa e enferrujado',
      tax: 2.5,
      min_km: 1,
    },
    {
      name: 'Dominic Toretto',
      description:
        'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.',
      car: 'Dodge Charger R/T 1970 modificado',
      tax: 5,
      min_km: 5,
    },
    {
      name: 'James Bond',
      description:
        'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.',
      car: 'Aston Martin DB5 clássico',
      tax: 10,
      min_km: 10,
    },
  ];

  for (const driver of drivers) {
    await new DriversRepository().createDriver(driver);
  }
}

async function createdCustomer() {
  const users: ICustomers[] = [
    {
      name: 'User',
    },
    {
      name: 'Bart simpson',
    },
    {
      name: "Brian O'Conner",
    },
  ];

  for (const user of users) {
    await new CustomersRepository().createCustomer(user);
  }
}

async function createRides() {
  const rides: IRides[] = [
    {
      driver_id: 1,
      customer_id: 2,
      origin: '134 Main St',
      destination: '456 Elm St',
      distance: 10,
      amount: 10.0,
      duration: '1h 30min',
    },
    {
      driver_id: 2,
      customer_id: 3,
      origin: '113 Main St',
      destination: '476 Elm St',
      distance: 12,
      amount: 15.0,
      duration: '1h 50min',
    },
    {
      driver_id: 3,
      customer_id: 3,
      origin: '129 Main St',
      destination: '496 Elm St',
      distance: 15,
      amount: 20.0,
      duration: '2h 30min',
    },
  ];

  for (const ride of rides) {
    await new RidesRepository().createRide(ride);
  }
}

async function createReviews() {
  const reviews: IReviews[] = [
    {
      driver_id: 1,
      ride_id: 1,
      customer_id: 2,
      comment:
        'Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.',
      stars: 2.5,
    },
    {
      driver_id: 2,
      ride_id: 2,
      customer_id: 2,
      comment:
        'Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!',
      stars: 4.5,
    },
    {
      driver_id: 3,
      ride_id: 3,
      customer_id: 3,
      comment:
        'Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.',
      stars: 5.0,
    },
  ];

  for (const review of reviews) {
    await new ReviewsRepository().createReview(review);
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    console.log('finished...');
    await prisma.$disconnect();
  });
