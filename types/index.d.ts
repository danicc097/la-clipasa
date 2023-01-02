export type TwitchUserFollowResponse = {
  data: TwitchUserFollow[]
}
export type TwitchUserSubscriptionResponse = {
  data: TwitchUserSubscription[]
}

export type TwitchUserResponse = {
  data: TwitchUser[]
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


export type DiscordPostUpload = {
  twitchUserId: TwitchUser["id"]
  twitchUserName: TwitchUser["display_name"]
  title: string
  initialCategories: string[]
  description: string
}
