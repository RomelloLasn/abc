import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {

  const todos = Array.from({ length: 50 }).map(() => ({
    title: faker.lorem.sentence().slice(0, 255),
    description: faker.lorem.paragraph().slice(0, 1000),
    completed: faker.datatype.boolean(),
    userId: testUser.id,
  }))

  await prisma.todo.createMany({
    data: todos,
  })

  console.log('Seed data inserted successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })