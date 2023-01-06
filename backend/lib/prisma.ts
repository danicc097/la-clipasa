import { PrismaClient } from '@prisma/client/edge'

// Avoid instantiating too many instances of Prisma in development
// https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices#problem
let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({ errorFormat: 'colorless', log: ['error', 'info', 'query', 'warn'] })
} else {
  if (!(global as any).prisma) {
    ;(global as any).prisma = new PrismaClient({ errorFormat: 'colorless', log: ['error', 'info', 'query', 'warn'] })
  }
  prisma = (global as any).prisma
}

export default prisma
