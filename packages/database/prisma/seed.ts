import { PrismaClient, Prisma, PostCategory } from '@prisma/client'
import { faker } from '@faker-js/faker'
import _ from 'lodash'
import crypto from 'crypto'

const prisma = new PrismaClient()

export async function main() {
  // 2000 users -> ~1MB
  const postCreates: Prisma.PostCreateArgs[] = []

  const createUser = () =>
    ({
      id: crypto.randomUUID(),
      displayName: faker.name.fullName(),
      role: 'USER',
      twitchId: faker.finance.amount(),
    } as Prisma.UserCreateArgs['data'])

  const users = Array(10)
    .fill(null)
    .map(() => createUser())

  const dev: Prisma.UserCreateArgs['data'] = {
    id: crypto.randomUUID(),
    displayName: process.env.TWITCH_DEV_USERNAME,
    role: 'ADMIN',
    twitchId: process.env.TWITCH_DEV_ID,
  }
  users.push(dev)
  users.push({
    id: crypto.randomUUID(),
    displayName: 'caliebre',
    role: 'ADMIN',
    twitchId: '52341091',
  })

  await prisma.user.createMany({
    data: users,
  })

  let postId = 0
  const createPost = () => {
    const createdAt = new Date(new Date().getTime() - postId * 1000 * 3600)

    return {
      id: ++postId,
      userId: _.sample(users.slice(8, -1))?.id,
      title:
        _.sample(['calieamor2', 'calie13', 'caliebongo2', 'calietravieso', 'caliesusto1', 'calierana']) +
        ' ' +
        faker.lorem.sentence(),
      isModerated: _.random(0, 1, true) > 0.5,
      link: faker.internet.url(),
      categories: _.uniq(
        Array(_.random(0, 5))
          .fill(null)
          .map((e) => _.sample(Object.values(PostCategory)) as PostCategory),
      ),
      createdAt: createdAt, // unique constraint
      updatedAt: createdAt,
    } as Prisma.PostCreateArgs['data']
  }

  const posts = Array(100)
    .fill(null)
    .map(() => createPost())

  let createdAt = new Date(new Date().getTime() - postId * 1000 * 1)
  posts.push({
    id: ++postId,
    userId: _.sample(users.slice(8, -1))?.id,
    title: 'calie13 Twitter test',
    isModerated: true,
    link: 'https://twitter.com/Animalesybichos/status/1612982747685081088',
    categories: ['MEH'],
    createdAt: createdAt, // unique constraint
    updatedAt: createdAt,
  } as Prisma.PostCreateArgs['data'])

  createdAt = new Date(new Date().getTime() - postId * 1000 * 2)
  posts.push({
    id: ++postId,
    userId: _.sample(users.slice(8, -1))?.id,
    title: 'calie13 Youtube test',
    isModerated: true,
    link: 'https://www.youtube.com/watch?v=KY2eBrm5pT4&t=1s',
    categories: ['MEH'],
    createdAt: createdAt, // unique constraint
    updatedAt: createdAt,
  } as Prisma.PostCreateArgs['data'])

  createdAt = new Date(new Date().getTime() - postId * 1000 * 3)
  posts.push({
    id: ++postId,
    userId: _.sample(users.slice(8, -1))?.id,
    title: 'calie13 Instagram test',
    isModerated: true,
    link: 'https://www.instagram.com/p/CjxXTbmISOd/',
    categories: ['MEH'],
    createdAt: createdAt, // unique constraint
    updatedAt: createdAt,
  } as Prisma.PostCreateArgs['data'])

  await prisma.post.createMany({
    data: posts as any,
  })

  // if prepared statement error - restart supabase db. cant disable
  // prep stmts in prisma
  await prisma.$executeRaw`SELECT setval('"Post_id_seq"', ${posts.length + 10}, true);`

  let likedPostId = 0
  const createLikedPost = (userId: string) =>
    ({
      postId: ++likedPostId,
      userId: userId,
    } as Prisma.LikedPostCreateArgs['data'])

  let savedPostId = 0
  const createSavedPost = (userId: string) =>
    ({
      postId: ++savedPostId,
      userId: userId,
    } as Prisma.SavedPostCreateArgs['data'])

  const devLikedPosts = Array(5)
    .fill(null)
    .map(() => createLikedPost(dev.id))

  await prisma.likedPost.createMany({
    data: devLikedPosts as any,
  })

  const devSavedPosts = Array(5)
    .fill(null)
    .map(() => createSavedPost(dev.id))

  await prisma.savedPost.createMany({
    data: devSavedPosts as any,
  })

  likedPostId = 0
  const likedPosts = Array(5)
    .fill(null)
    .map(() => createLikedPost(_.sample(users.slice(0, -3)).id))

  await prisma.likedPost.createMany({
    data: likedPosts as any,
  })
}
main()
