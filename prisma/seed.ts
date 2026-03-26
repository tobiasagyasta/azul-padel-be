import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { BookingStatus, PrismaClient, Role } from '@prisma/client';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set.');
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const seedBaseDate = new Date();

seedBaseDate.setUTCHours(0, 0, 0, 0);

const createTimeOfDay = (hours: number, minutes = 0) =>
  new Date(Date.UTC(1970, 0, 1, hours, minutes, 0, 0));

const createDateOffset = (dayOffset: number, hours: number, minutes = 0) => {
  const date = new Date(seedBaseDate);
  date.setUTCDate(seedBaseDate.getUTCDate() + dayOffset);
  date.setUTCHours(hours, minutes, 0, 0);
  return date;
};

async function main() {
  console.log('Starting database seed...');

  // Clear child tables first so the seed can be re-run safely in development.
  await prisma.booking.deleteMany();
  await prisma.blockedSlot.deleteMany();
  await prisma.schedule.deleteMany();
  await prisma.court.deleteMany();
  await prisma.user.deleteMany();

  const adminUser = await prisma.user.create({
    data: {
      name: 'Azul Admin',
      email: 'admin@azulpadel.dev',
      password: 'admin123',
      role: Role.ADMIN,
    },
  });

  const playerOne = await prisma.user.create({
    data: {
      name: 'Nadia Putri',
      email: 'nadia@azulpadel.dev',
      password: 'player123',
      role: Role.USER,
    },
  });

  const playerTwo = await prisma.user.create({
    data: {
      name: 'Rafi Pratama',
      email: 'rafi@azulpadel.dev',
      password: 'player123',
      role: Role.USER,
    },
  });

  const playerThree = await prisma.user.create({
    data: {
      name: 'Maya Saputra',
      email: 'maya@azulpadel.dev',
      password: 'player123',
      role: Role.USER,
    },
  });

  const centerCourt = await prisma.court.create({
    data: {
      name: 'Center Court',
      description: 'Main competition court with spectator seating.',
      location: 'Azul Padel Club - Ground Floor',
    },
  });

  const riversideCourt = await prisma.court.create({
    data: {
      name: 'Riverside Court',
      description: 'Outdoor court suited for casual evening matches.',
      location: 'Azul Padel Club - Riverside Deck',
    },
  });

  const academyCourt = await prisma.court.create({
    data: {
      name: 'Academy Court',
      description: 'Training court used for classes and private coaching.',
      location: 'Azul Padel Club - Training Wing',
    },
  });

  const courts = [centerCourt, riversideCourt, academyCourt];
  const weeklyHours = [
    { dayOfWeek: 0, openHour: 7, closeHour: 21 },
    { dayOfWeek: 1, openHour: 6, closeHour: 22 },
    { dayOfWeek: 2, openHour: 6, closeHour: 22 },
    { dayOfWeek: 3, openHour: 6, closeHour: 22 },
    { dayOfWeek: 4, openHour: 6, closeHour: 22 },
    { dayOfWeek: 5, openHour: 6, closeHour: 23 },
    { dayOfWeek: 6, openHour: 7, closeHour: 23 },
  ];

  await prisma.schedule.createMany({
    data: courts.flatMap((court) =>
      weeklyHours.map((hours) => ({
        courtId: court.id,
        dayOfWeek: hours.dayOfWeek,
        openTime: createTimeOfDay(hours.openHour),
        closeTime: createTimeOfDay(hours.closeHour),
      })),
    ),
  });

  await prisma.booking.createMany({
    data: [
      {
        userId: playerOne.id,
        courtId: centerCourt.id,
        startTime: createDateOffset(1, 8, 0),
        endTime: createDateOffset(1, 9, 0),
        status: BookingStatus.CONFIRMED,
      },
      {
        userId: playerTwo.id,
        courtId: riversideCourt.id,
        startTime: createDateOffset(2, 18, 0),
        endTime: createDateOffset(2, 19, 0),
        status: BookingStatus.CONFIRMED,
      },
      {
        userId: playerThree.id,
        courtId: academyCourt.id,
        startTime: createDateOffset(-2, 10, 0),
        endTime: createDateOffset(-2, 11, 0),
        status: BookingStatus.COMPLETED,
      },
      {
        userId: adminUser.id,
        courtId: centerCourt.id,
        startTime: createDateOffset(4, 20, 0),
        endTime: createDateOffset(4, 21, 0),
        status: BookingStatus.CANCELLED,
      },
    ],
  });

  await prisma.blockedSlot.createMany({
    data: [
      {
        courtId: centerCourt.id,
        startTime: createDateOffset(1, 14, 0),
        endTime: createDateOffset(1, 16, 0),
        reason: 'Court maintenance and net replacement',
      },
      {
        courtId: riversideCourt.id,
        startTime: createDateOffset(2, 12, 0),
        endTime: createDateOffset(2, 14, 0),
        reason: 'Private club event setup',
      },
      {
        courtId: academyCourt.id,
        startTime: createDateOffset(5, 9, 0),
        endTime: createDateOffset(5, 12, 0),
        reason: 'Junior academy training camp',
      },
    ],
  });

  console.log('Database seed completed.');
  console.log(
    `Created 4 users, 3 courts, ${courts.length * weeklyHours.length} schedules, 4 bookings, and 3 blocked slots.`,
  );
}

main()
  .catch((error) => {
    console.error('Database seed failed.');
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
