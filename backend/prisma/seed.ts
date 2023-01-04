import { PrismaClient } from '@prisma/client'
import { User } from 'shared-types'
// import quotes from './data.json'
const prisma = new PrismaClient()

export async function main() {
  for (let i = 0; i < 2000; i++) {
    const user: User =
  }
  for (const quote of quotes) {
    await prisma.quote.create({
      data: {
        author: quote.author,
        content: quote.content,
      },
    })
  }
}

main()
