export * from './utils'
import type { PostCategory as DatabasePostCategory } from 'database'
import type { Role as DatabaseRole } from 'database'

// due to some obscure typescript shenanigans I don't really care about
// we can't use the const enum exported directly from prisma or reexported from the types package
// in the frontend package
// In any case, we need a frontend user-friendly mapping regardless
// https://stackoverflow.com/questions/56854964/why-is-const-enum-allowed-with-isolatedmodules
// https://github.com/prisma/prisma/issues/14692
export const PostCategoryNames: Record<DatabasePostCategory, string> = {
  RANA: 'RANA',
  SIN_SONIDO: 'SIN SONIDO',
  MEME_ARTESANAL: 'MEME ARTESANAL',
  NO_SE_YO: 'NO SÉ YO',
  ORO: 'ORO',
  DIAMANTE: 'DIAMANTE',
}

export const RoleNames: Record<DatabaseRole, string> = {
  ADMIN: 'admin',
  MODERATOR: 'moderator',
  USER: 'user',
}

export type TwitchTokenValidateResponse = {
  client_id: string
  login: string
  scopes: string[]
  user_id: string
  expires_in: number
}

export type TwitchStreamResponse = {
  data: TwitchStream[]
}

export type TwitchUserFollowResponse = {
  data: TwitchUserFollow[]
}

export type TwitchUserSubscriptionResponse = {
  data: TwitchUserSubscription[]
}

export type TwitchUserResponse = {
  data: TwitchUser[]
}

export type TwitchStream = {
  id: string
  user_id: string
  user_login: string
  user_name: string
  game_id: string
  game_name: string
  type: string
  title: string
  viewer_count: number
  started_at: string
  language: string
  thumbnail_url: string
  tag_ids: string[]
  tags: string[]
  is_mature: boolean
}

export type TwitchUserFollow = {
  from_id: string
  from_login: string
  from_name: string
  to_id: string
  to_login: string
  to_name: string
  followed_at: string
}

export type TwitchUserSubscription = {
  broadcaster_id: string
  broadcaster_name: string
  broadcaster_login: string
  is_gift: boolean
  // e.g. "1000"
  tier: string
}
export type TwitchUser = {
  /**
   * User’s broadcaster type: "partner", "affiliate", or "".
   */
  broadcaster_type: string
  /**
   * User's channel description.
   */
  description: string
  /**
   * User's display name.
   */
  display_name: string
  /**
   * User’s email address. Returned if the request includes the user:read:edit scope.
   */
  email?: string
  /**
   * User's ID.
   */
  id: string
  /**
   * User's login name.
   */
  login: string
  /**
   * URL of the user's offline image.
   */
  offline_image_url: string
  /**
   * URL of the user's profile image.
   */
  profile_image_url: string
  /**
   * User’s type: "staff", "admin", "global_mod", or "".
   */
  type: string
  /**
   * Total number of views of the user’s channel.
   */
  view_count: number
}
