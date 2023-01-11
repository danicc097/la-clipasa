import { User, PrismaClient, Prisma, Post, PostCategory } from '@prisma/client'
import { faker } from '@faker-js/faker'
import _, { uniq } from 'lodash'

const prisma = new PrismaClient()

export async function main() {
  // 2000 users -> ~1MB
  const users: User[] = []
  const posts: Post[] = []

  for (let i = 0; i < 10; i++) {
    const user: Prisma.UserCreateInput = {
      displayName: faker.name.fullName(),
      role: 'USER',
      twitchId: faker.finance.amount(),
    }
    const createdUser = await prisma.user.create({ data: user })
    users.push(createdUser)
  }
  for (let i = 0; i < 30; i++) {
    const post: Prisma.PostCreateArgs = {
      data: {
        userId: (_.sample(users) as User).id,
        title:
          _.sample(['calieamor2', 'calie13', 'caliebongo2', 'calietravieso', 'caliesusto1', 'calierana']) +
          ' ' +
          faker.lorem.sentence(),
        content: faker.internet.url(),
        link: faker.internet.url(),
        categories: _.uniq(
          Array(_.random(0, 5))
            .fill(null)
            .map((e) => _.sample(Object.values(PostCategory)) as PostCategory),
        ),
      },
    }
    const createdPost = await prisma.post.create(post)
    posts.push(createdPost)
  }
}

main()
