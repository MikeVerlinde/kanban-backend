import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from '../src/generated/prisma/client.js'

const prisma = new PrismaClient({
    adapter: new PrismaMariaDb({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
    })
})

const usersData = [
    {
        username: "Mike",
        password: "$argon2id$v=19$m=65536,t=3,p=4$0+hyWH2JTmQmFsFAEyupzg$2Wzba0lvhdxnI2F4pZHi9WpZVKEPKX8c4TjZRRWABq0"
    },
    {
        username: "Victor",
        password: "$argon2id$v=19$m=65536,t=3,p=4$Nn+4zgSuv/e5y9kMYtCESA$ahJO4jalUjXtT/QyO3JASeFyEuy/nL8A/JaV4axVhqI"
    },
    {
        username: "Andy",
        password: "$argon2id$v=19$m=65536,t=3,p=4$IDVccMAFJnJmjDjxOGhJrA$PHd0MERAh5Y5VeLinpmgraH0sGOlqTzQyBl0pconeXY"
    },
]

async function main() {
    console.log('Start seeding...')

    // Clear existing data
    await prisma.user.deleteMany()

    // Create users (separately to get IDs)
    for (const data of usersData) {
        const user = await prisma.user.create({
            data
        })
        console.log(`Created user with id: ${user.id}`);
    }

    console.log('Finished seeding')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })