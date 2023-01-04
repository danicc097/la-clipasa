import { User, PrismaClient, Prisma } from 'database'
const prisma = new PrismaClient()

export async function main() {
  // 2000 users -> ~1MB
  // const user: Prisma.UserCreateInput = {
  //   login: 'aaaaaaaaa',
  //   displayName: 'aaaaaaaaa',
  //   role: 'USER',
  //   twitchId: '52342f2423fr4f2',
  // }
  // for (let i = 0; i < 2000; i++) {
  //   await prisma.user.create({ data: user })
  // }

}

main()
