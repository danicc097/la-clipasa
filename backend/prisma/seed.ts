import { PrismaClient } from '@prisma/client'
// import quotes from './data.json'
const prisma = new PrismaClient()

export async function main() {
  // for (const quote of quotes) {
  //   await prisma.quote.create({
  //     data: {
  //       author: quote.author,
  //       content: quote.content,
  //     },
  //   })
  // }
}

main()
