
/**
 * Client
**/

import * as runtime from './runtime/index';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model User
 * 
 */
export type User = {
  id: number
  displayName: string
  login: string
  twitchId: string
  isSubscriber: boolean
  isFollower: boolean
  role: Role
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

/**
 * Model Category
 * 
 */
export type Category = {
  id: number
  name: string
}

/**
 * Model PostCategory
 * 
 */
export type PostCategory = {
  postId: number
  categoryId: number
}

/**
 * Model Post
 * 
 */
export type Post = {
  id: number
  authorId: number
  title: string
  content: string
  link: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

/**
 * Model LikedPost
 * 
 */
export type LikedPost = {
  postId: number
  userId: number
}

/**
 * Model SavedPost
 * 
 */
export type SavedPost = {
  postId: number
  userId: number
}


/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export const Role: {
  USER: 'USER',
  ADMIN: 'ADMIN',
  MODERATOR: 'MODERATOR'
};

export type Role = (typeof Role)[keyof typeof Role]


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<UnwrapTuple<P>>;

  $transaction<R>(fn: (prisma: Prisma.TransactionClient) => Promise<R>, options?: {maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel}): Promise<R>;

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<GlobalReject>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<GlobalReject>;

  /**
   * `prisma.postCategory`: Exposes CRUD operations for the **PostCategory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PostCategories
    * const postCategories = await prisma.postCategory.findMany()
    * ```
    */
  get postCategory(): Prisma.PostCategoryDelegate<GlobalReject>;

  /**
   * `prisma.post`: Exposes CRUD operations for the **Post** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Posts
    * const posts = await prisma.post.findMany()
    * ```
    */
  get post(): Prisma.PostDelegate<GlobalReject>;

  /**
   * `prisma.likedPost`: Exposes CRUD operations for the **LikedPost** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LikedPosts
    * const likedPosts = await prisma.likedPost.findMany()
    * ```
    */
  get likedPost(): Prisma.LikedPostDelegate<GlobalReject>;

  /**
   * `prisma.savedPost`: Exposes CRUD operations for the **SavedPost** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SavedPosts
    * const savedPosts = await prisma.savedPost.findMany()
    * ```
    */
  get savedPost(): Prisma.SavedPostDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket


  /**
   * Prisma Client JS version: 4.8.0
   * Query Engine version: d6e67a83f971b175a593ccc12e15c4a757f93ffe
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    User: 'User',
    Category: 'Category',
    PostCategory: 'PostCategory',
    Post: 'Post',
    LikedPost: 'LikedPost',
    SavedPost: 'SavedPost'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type DefaultPrismaClient = PrismaClient
  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */


  export type UserCountOutputType = {
    posts: number
    likedPosts: number
    savedPosts: number
  }

  export type UserCountOutputTypeSelect = {
    posts?: boolean
    likedPosts?: boolean
    savedPosts?: boolean
  }

  export type UserCountOutputTypeGetPayload<S extends boolean | null | undefined | UserCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? UserCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (UserCountOutputTypeArgs)
    ? UserCountOutputType 
    : S extends { select: any } & (UserCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof UserCountOutputType ? UserCountOutputType[P] : never
  } 
      : UserCountOutputType




  // Custom InputTypes

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     * 
    **/
    select?: UserCountOutputTypeSelect | null
  }



  /**
   * Count Type CategoryCountOutputType
   */


  export type CategoryCountOutputType = {
    posts: number
  }

  export type CategoryCountOutputTypeSelect = {
    posts?: boolean
  }

  export type CategoryCountOutputTypeGetPayload<S extends boolean | null | undefined | CategoryCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? CategoryCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (CategoryCountOutputTypeArgs)
    ? CategoryCountOutputType 
    : S extends { select: any } & (CategoryCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof CategoryCountOutputType ? CategoryCountOutputType[P] : never
  } 
      : CategoryCountOutputType




  // Custom InputTypes

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     * 
    **/
    select?: CategoryCountOutputTypeSelect | null
  }



  /**
   * Count Type PostCountOutputType
   */


  export type PostCountOutputType = {
    categories: number
    LikedPost: number
    SavedPost: number
  }

  export type PostCountOutputTypeSelect = {
    categories?: boolean
    LikedPost?: boolean
    SavedPost?: boolean
  }

  export type PostCountOutputTypeGetPayload<S extends boolean | null | undefined | PostCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? PostCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (PostCountOutputTypeArgs)
    ? PostCountOutputType 
    : S extends { select: any } & (PostCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof PostCountOutputType ? PostCountOutputType[P] : never
  } 
      : PostCountOutputType




  // Custom InputTypes

  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the PostCountOutputType
     * 
    **/
    select?: PostCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model User
   */


  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    displayName: string | null
    login: string | null
    twitchId: string | null
    isSubscriber: boolean | null
    isFollower: boolean | null
    role: Role | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    displayName: string | null
    login: string | null
    twitchId: string | null
    isSubscriber: boolean | null
    isFollower: boolean | null
    role: Role | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    displayName: number
    login: number
    twitchId: number
    isSubscriber: number
    isFollower: number
    role: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    displayName?: true
    login?: true
    twitchId?: true
    isSubscriber?: true
    isFollower?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    displayName?: true
    login?: true
    twitchId?: true
    isSubscriber?: true
    isFollower?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    displayName?: true
    login?: true
    twitchId?: true
    isSubscriber?: true
    isFollower?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type UserAggregateArgs = {
    /**
     * Filter which User to aggregate.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs = {
    where?: UserWhereInput
    orderBy?: Enumerable<UserOrderByWithAggregationInput>
    by: Array<UserScalarFieldEnum>
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }


  export type UserGroupByOutputType = {
    id: number
    displayName: string
    login: string
    twitchId: string
    isSubscriber: boolean
    isFollower: boolean
    role: Role
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = PrismaPromise<
    Array<
      PickArray<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect = {
    id?: boolean
    displayName?: boolean
    login?: boolean
    twitchId?: boolean
    isSubscriber?: boolean
    isFollower?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    posts?: boolean | UserPostsArgs
    likedPosts?: boolean | UserLikedPostsArgs
    savedPosts?: boolean | UserSavedPostsArgs
    _count?: boolean | UserCountOutputTypeArgs
  }


  export type UserInclude = {
    posts?: boolean | UserPostsArgs
    likedPosts?: boolean | UserLikedPostsArgs
    savedPosts?: boolean | UserSavedPostsArgs
    _count?: boolean | UserCountOutputTypeArgs
  } 

  export type UserGetPayload<S extends boolean | null | undefined | UserArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? User :
    S extends undefined ? never :
    S extends { include: any } & (UserArgs | UserFindManyArgs)
    ? User  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'posts' ? Array < PostGetPayload<S['include'][P]>>  :
        P extends 'likedPosts' ? Array < LikedPostGetPayload<S['include'][P]>>  :
        P extends 'savedPosts' ? Array < SavedPostGetPayload<S['include'][P]>>  :
        P extends '_count' ? UserCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (UserArgs | UserFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'posts' ? Array < PostGetPayload<S['select'][P]>>  :
        P extends 'likedPosts' ? Array < LikedPostGetPayload<S['select'][P]>>  :
        P extends 'savedPosts' ? Array < SavedPostGetPayload<S['select'][P]>>  :
        P extends '_count' ? UserCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof User ? User[P] : never
  } 
      : User


  type UserCountArgs = Merge<
    Omit<UserFindManyArgs, 'select' | 'include'> & {
      select?: UserCountAggregateInputType | true
    }
  >

  export interface UserDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'User'> extends True ? Prisma__UserClient<UserGetPayload<T>> : Prisma__UserClient<UserGetPayload<T> | null, null>

    /**
     * Find one User that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, UserFindUniqueOrThrowArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'User'> extends True ? Prisma__UserClient<UserGetPayload<T>> : Prisma__UserClient<UserGetPayload<T> | null, null>

    /**
     * Find the first User that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs>
    ): PrismaPromise<Array<UserGetPayload<T>>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
    **/
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Create many Users.
     *     @param {UserCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const user = await prisma.user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
    **/
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
    **/
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    posts<T extends UserPostsArgs= {}>(args?: Subset<T, UserPostsArgs>): PrismaPromise<Array<PostGetPayload<T>>| Null>;

    likedPosts<T extends UserLikedPostsArgs= {}>(args?: Subset<T, UserLikedPostsArgs>): PrismaPromise<Array<LikedPostGetPayload<T>>| Null>;

    savedPosts<T extends UserSavedPostsArgs= {}>(args?: Subset<T, UserSavedPostsArgs>): PrismaPromise<Array<SavedPostGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * User base type for findUnique actions
   */
  export type UserFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where: UserWhereUniqueInput
  }

  /**
   * User findUnique
   */
  export interface UserFindUniqueArgs extends UserFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User base type for findFirst actions
   */
  export type UserFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     * 
    **/
    distinct?: Enumerable<UserScalarFieldEnum>
  }

  /**
   * User findFirst
   */
  export interface UserFindFirstArgs extends UserFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     * 
    **/
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User findMany
   */
  export type UserFindManyArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which Users to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User create
   */
  export type UserCreateArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The data needed to create a User.
     * 
    **/
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }


  /**
   * User createMany
   */
  export type UserCreateManyArgs = {
    /**
     * The data used to create many Users.
     * 
    **/
    data: Enumerable<UserCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * User update
   */
  export type UserUpdateArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The data needed to update a User.
     * 
    **/
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User updateMany
   */
  export type UserUpdateManyArgs = {
    /**
     * The data used to update Users.
     * 
    **/
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     * 
    **/
    where?: UserWhereInput
  }


  /**
   * User upsert
   */
  export type UserUpsertArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The filter to search for the User to update in case it exists.
     * 
    **/
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     * 
    **/
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }


  /**
   * User delete
   */
  export type UserDeleteArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter which User to delete.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs = {
    /**
     * Filter which Users to delete
     * 
    **/
    where?: UserWhereInput
  }


  /**
   * User.posts
   */
  export type UserPostsArgs = {
    /**
     * Select specific fields to fetch from the Post
     * 
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PostInclude | null
    where?: PostWhereInput
    orderBy?: Enumerable<PostOrderByWithRelationInput>
    cursor?: PostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<PostScalarFieldEnum>
  }


  /**
   * User.likedPosts
   */
  export type UserLikedPostsArgs = {
    /**
     * Select specific fields to fetch from the LikedPost
     * 
    **/
    select?: LikedPostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LikedPostInclude | null
    where?: LikedPostWhereInput
    orderBy?: Enumerable<LikedPostOrderByWithRelationInput>
    cursor?: LikedPostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<LikedPostScalarFieldEnum>
  }


  /**
   * User.savedPosts
   */
  export type UserSavedPostsArgs = {
    /**
     * Select specific fields to fetch from the SavedPost
     * 
    **/
    select?: SavedPostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SavedPostInclude | null
    where?: SavedPostWhereInput
    orderBy?: Enumerable<SavedPostOrderByWithRelationInput>
    cursor?: SavedPostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<SavedPostScalarFieldEnum>
  }


  /**
   * User without action
   */
  export type UserArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
  }



  /**
   * Model Category
   */


  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryAvgAggregateOutputType = {
    id: number | null
  }

  export type CategorySumAggregateOutputType = {
    id: number | null
  }

  export type CategoryMinAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type CategoryAvgAggregateInputType = {
    id?: true
  }

  export type CategorySumAggregateInputType = {
    id?: true
  }

  export type CategoryMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type CategoryAggregateArgs = {
    /**
     * Filter which Category to aggregate.
     * 
    **/
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     * 
    **/
    orderBy?: Enumerable<CategoryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs = {
    where?: CategoryWhereInput
    orderBy?: Enumerable<CategoryOrderByWithAggregationInput>
    by: Array<CategoryScalarFieldEnum>
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _avg?: CategoryAvgAggregateInputType
    _sum?: CategorySumAggregateInputType
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }


  export type CategoryGroupByOutputType = {
    id: number
    name: string
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = PrismaPromise<
    Array<
      PickArray<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect = {
    id?: boolean
    name?: boolean
    posts?: boolean | CategoryPostsArgs
    _count?: boolean | CategoryCountOutputTypeArgs
  }


  export type CategoryInclude = {
    posts?: boolean | CategoryPostsArgs
    _count?: boolean | CategoryCountOutputTypeArgs
  } 

  export type CategoryGetPayload<S extends boolean | null | undefined | CategoryArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Category :
    S extends undefined ? never :
    S extends { include: any } & (CategoryArgs | CategoryFindManyArgs)
    ? Category  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'posts' ? Array < PostCategoryGetPayload<S['include'][P]>>  :
        P extends '_count' ? CategoryCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (CategoryArgs | CategoryFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'posts' ? Array < PostCategoryGetPayload<S['select'][P]>>  :
        P extends '_count' ? CategoryCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Category ? Category[P] : never
  } 
      : Category


  type CategoryCountArgs = Merge<
    Omit<CategoryFindManyArgs, 'select' | 'include'> & {
      select?: CategoryCountAggregateInputType | true
    }
  >

  export interface CategoryDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends CategoryFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, CategoryFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Category'> extends True ? Prisma__CategoryClient<CategoryGetPayload<T>> : Prisma__CategoryClient<CategoryGetPayload<T> | null, null>

    /**
     * Find one Category that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, CategoryFindUniqueOrThrowArgs>
    ): Prisma__CategoryClient<CategoryGetPayload<T>>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends CategoryFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, CategoryFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Category'> extends True ? Prisma__CategoryClient<CategoryGetPayload<T>> : Prisma__CategoryClient<CategoryGetPayload<T> | null, null>

    /**
     * Find the first Category that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(
      args?: SelectSubset<T, CategoryFindFirstOrThrowArgs>
    ): Prisma__CategoryClient<CategoryGetPayload<T>>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends CategoryFindManyArgs>(
      args?: SelectSubset<T, CategoryFindManyArgs>
    ): PrismaPromise<Array<CategoryGetPayload<T>>>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
    **/
    create<T extends CategoryCreateArgs>(
      args: SelectSubset<T, CategoryCreateArgs>
    ): Prisma__CategoryClient<CategoryGetPayload<T>>

    /**
     * Create many Categories.
     *     @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     *     @example
     *     // Create many Categories
     *     const category = await prisma.category.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends CategoryCreateManyArgs>(
      args?: SelectSubset<T, CategoryCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
    **/
    delete<T extends CategoryDeleteArgs>(
      args: SelectSubset<T, CategoryDeleteArgs>
    ): Prisma__CategoryClient<CategoryGetPayload<T>>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends CategoryUpdateArgs>(
      args: SelectSubset<T, CategoryUpdateArgs>
    ): Prisma__CategoryClient<CategoryGetPayload<T>>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends CategoryDeleteManyArgs>(
      args?: SelectSubset<T, CategoryDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends CategoryUpdateManyArgs>(
      args: SelectSubset<T, CategoryUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
    **/
    upsert<T extends CategoryUpsertArgs>(
      args: SelectSubset<T, CategoryUpsertArgs>
    ): Prisma__CategoryClient<CategoryGetPayload<T>>

    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__CategoryClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    posts<T extends CategoryPostsArgs= {}>(args?: Subset<T, CategoryPostsArgs>): PrismaPromise<Array<PostCategoryGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Category base type for findUnique actions
   */
  export type CategoryFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Category
     * 
    **/
    select?: CategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CategoryInclude | null
    /**
     * Filter, which Category to fetch.
     * 
    **/
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUnique
   */
  export interface CategoryFindUniqueArgs extends CategoryFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Category
     * 
    **/
    select?: CategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CategoryInclude | null
    /**
     * Filter, which Category to fetch.
     * 
    **/
    where: CategoryWhereUniqueInput
  }


  /**
   * Category base type for findFirst actions
   */
  export type CategoryFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Category
     * 
    **/
    select?: CategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CategoryInclude | null
    /**
     * Filter, which Category to fetch.
     * 
    **/
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     * 
    **/
    orderBy?: Enumerable<CategoryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     * 
    **/
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     * 
    **/
    distinct?: Enumerable<CategoryScalarFieldEnum>
  }

  /**
   * Category findFirst
   */
  export interface CategoryFindFirstArgs extends CategoryFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Category
     * 
    **/
    select?: CategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CategoryInclude | null
    /**
     * Filter, which Category to fetch.
     * 
    **/
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     * 
    **/
    orderBy?: Enumerable<CategoryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     * 
    **/
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     * 
    **/
    distinct?: Enumerable<CategoryScalarFieldEnum>
  }


  /**
   * Category findMany
   */
  export type CategoryFindManyArgs = {
    /**
     * Select specific fields to fetch from the Category
     * 
    **/
    select?: CategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CategoryInclude | null
    /**
     * Filter, which Categories to fetch.
     * 
    **/
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     * 
    **/
    orderBy?: Enumerable<CategoryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     * 
    **/
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     * 
    **/
    skip?: number
    distinct?: Enumerable<CategoryScalarFieldEnum>
  }


  /**
   * Category create
   */
  export type CategoryCreateArgs = {
    /**
     * Select specific fields to fetch from the Category
     * 
    **/
    select?: CategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CategoryInclude | null
    /**
     * The data needed to create a Category.
     * 
    **/
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }


  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs = {
    /**
     * The data used to create many Categories.
     * 
    **/
    data: Enumerable<CategoryCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Category update
   */
  export type CategoryUpdateArgs = {
    /**
     * Select specific fields to fetch from the Category
     * 
    **/
    select?: CategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CategoryInclude | null
    /**
     * The data needed to update a Category.
     * 
    **/
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     * 
    **/
    where: CategoryWhereUniqueInput
  }


  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs = {
    /**
     * The data used to update Categories.
     * 
    **/
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     * 
    **/
    where?: CategoryWhereInput
  }


  /**
   * Category upsert
   */
  export type CategoryUpsertArgs = {
    /**
     * Select specific fields to fetch from the Category
     * 
    **/
    select?: CategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CategoryInclude | null
    /**
     * The filter to search for the Category to update in case it exists.
     * 
    **/
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     * 
    **/
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }


  /**
   * Category delete
   */
  export type CategoryDeleteArgs = {
    /**
     * Select specific fields to fetch from the Category
     * 
    **/
    select?: CategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CategoryInclude | null
    /**
     * Filter which Category to delete.
     * 
    **/
    where: CategoryWhereUniqueInput
  }


  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs = {
    /**
     * Filter which Categories to delete
     * 
    **/
    where?: CategoryWhereInput
  }


  /**
   * Category.posts
   */
  export type CategoryPostsArgs = {
    /**
     * Select specific fields to fetch from the PostCategory
     * 
    **/
    select?: PostCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PostCategoryInclude | null
    where?: PostCategoryWhereInput
    orderBy?: Enumerable<PostCategoryOrderByWithRelationInput>
    cursor?: PostCategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<PostCategoryScalarFieldEnum>
  }


  /**
   * Category without action
   */
  export type CategoryArgs = {
    /**
     * Select specific fields to fetch from the Category
     * 
    **/
    select?: CategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CategoryInclude | null
  }



  /**
   * Model PostCategory
   */


  export type AggregatePostCategory = {
    _count: PostCategoryCountAggregateOutputType | null
    _avg: PostCategoryAvgAggregateOutputType | null
    _sum: PostCategorySumAggregateOutputType | null
    _min: PostCategoryMinAggregateOutputType | null
    _max: PostCategoryMaxAggregateOutputType | null
  }

  export type PostCategoryAvgAggregateOutputType = {
    postId: number | null
    categoryId: number | null
  }

  export type PostCategorySumAggregateOutputType = {
    postId: number | null
    categoryId: number | null
  }

  export type PostCategoryMinAggregateOutputType = {
    postId: number | null
    categoryId: number | null
  }

  export type PostCategoryMaxAggregateOutputType = {
    postId: number | null
    categoryId: number | null
  }

  export type PostCategoryCountAggregateOutputType = {
    postId: number
    categoryId: number
    _all: number
  }


  export type PostCategoryAvgAggregateInputType = {
    postId?: true
    categoryId?: true
  }

  export type PostCategorySumAggregateInputType = {
    postId?: true
    categoryId?: true
  }

  export type PostCategoryMinAggregateInputType = {
    postId?: true
    categoryId?: true
  }

  export type PostCategoryMaxAggregateInputType = {
    postId?: true
    categoryId?: true
  }

  export type PostCategoryCountAggregateInputType = {
    postId?: true
    categoryId?: true
    _all?: true
  }

  export type PostCategoryAggregateArgs = {
    /**
     * Filter which PostCategory to aggregate.
     * 
    **/
    where?: PostCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostCategories to fetch.
     * 
    **/
    orderBy?: Enumerable<PostCategoryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: PostCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostCategories from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostCategories.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PostCategories
    **/
    _count?: true | PostCategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PostCategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PostCategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostCategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostCategoryMaxAggregateInputType
  }

  export type GetPostCategoryAggregateType<T extends PostCategoryAggregateArgs> = {
        [P in keyof T & keyof AggregatePostCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePostCategory[P]>
      : GetScalarType<T[P], AggregatePostCategory[P]>
  }




  export type PostCategoryGroupByArgs = {
    where?: PostCategoryWhereInput
    orderBy?: Enumerable<PostCategoryOrderByWithAggregationInput>
    by: Array<PostCategoryScalarFieldEnum>
    having?: PostCategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostCategoryCountAggregateInputType | true
    _avg?: PostCategoryAvgAggregateInputType
    _sum?: PostCategorySumAggregateInputType
    _min?: PostCategoryMinAggregateInputType
    _max?: PostCategoryMaxAggregateInputType
  }


  export type PostCategoryGroupByOutputType = {
    postId: number
    categoryId: number
    _count: PostCategoryCountAggregateOutputType | null
    _avg: PostCategoryAvgAggregateOutputType | null
    _sum: PostCategorySumAggregateOutputType | null
    _min: PostCategoryMinAggregateOutputType | null
    _max: PostCategoryMaxAggregateOutputType | null
  }

  type GetPostCategoryGroupByPayload<T extends PostCategoryGroupByArgs> = PrismaPromise<
    Array<
      PickArray<PostCategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostCategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostCategoryGroupByOutputType[P]>
            : GetScalarType<T[P], PostCategoryGroupByOutputType[P]>
        }
      >
    >


  export type PostCategorySelect = {
    post?: boolean | PostArgs
    postId?: boolean
    category?: boolean | CategoryArgs
    categoryId?: boolean
  }


  export type PostCategoryInclude = {
    post?: boolean | PostArgs
    category?: boolean | CategoryArgs
  } 

  export type PostCategoryGetPayload<S extends boolean | null | undefined | PostCategoryArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? PostCategory :
    S extends undefined ? never :
    S extends { include: any } & (PostCategoryArgs | PostCategoryFindManyArgs)
    ? PostCategory  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'post' ? PostGetPayload<S['include'][P]> :
        P extends 'category' ? CategoryGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (PostCategoryArgs | PostCategoryFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'post' ? PostGetPayload<S['select'][P]> :
        P extends 'category' ? CategoryGetPayload<S['select'][P]> :  P extends keyof PostCategory ? PostCategory[P] : never
  } 
      : PostCategory


  type PostCategoryCountArgs = Merge<
    Omit<PostCategoryFindManyArgs, 'select' | 'include'> & {
      select?: PostCategoryCountAggregateInputType | true
    }
  >

  export interface PostCategoryDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one PostCategory that matches the filter.
     * @param {PostCategoryFindUniqueArgs} args - Arguments to find a PostCategory
     * @example
     * // Get one PostCategory
     * const postCategory = await prisma.postCategory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends PostCategoryFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, PostCategoryFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'PostCategory'> extends True ? Prisma__PostCategoryClient<PostCategoryGetPayload<T>> : Prisma__PostCategoryClient<PostCategoryGetPayload<T> | null, null>

    /**
     * Find one PostCategory that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {PostCategoryFindUniqueOrThrowArgs} args - Arguments to find a PostCategory
     * @example
     * // Get one PostCategory
     * const postCategory = await prisma.postCategory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends PostCategoryFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, PostCategoryFindUniqueOrThrowArgs>
    ): Prisma__PostCategoryClient<PostCategoryGetPayload<T>>

    /**
     * Find the first PostCategory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCategoryFindFirstArgs} args - Arguments to find a PostCategory
     * @example
     * // Get one PostCategory
     * const postCategory = await prisma.postCategory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends PostCategoryFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, PostCategoryFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'PostCategory'> extends True ? Prisma__PostCategoryClient<PostCategoryGetPayload<T>> : Prisma__PostCategoryClient<PostCategoryGetPayload<T> | null, null>

    /**
     * Find the first PostCategory that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCategoryFindFirstOrThrowArgs} args - Arguments to find a PostCategory
     * @example
     * // Get one PostCategory
     * const postCategory = await prisma.postCategory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends PostCategoryFindFirstOrThrowArgs>(
      args?: SelectSubset<T, PostCategoryFindFirstOrThrowArgs>
    ): Prisma__PostCategoryClient<PostCategoryGetPayload<T>>

    /**
     * Find zero or more PostCategories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCategoryFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PostCategories
     * const postCategories = await prisma.postCategory.findMany()
     * 
     * // Get first 10 PostCategories
     * const postCategories = await prisma.postCategory.findMany({ take: 10 })
     * 
     * // Only select the `postId`
     * const postCategoryWithPostIdOnly = await prisma.postCategory.findMany({ select: { postId: true } })
     * 
    **/
    findMany<T extends PostCategoryFindManyArgs>(
      args?: SelectSubset<T, PostCategoryFindManyArgs>
    ): PrismaPromise<Array<PostCategoryGetPayload<T>>>

    /**
     * Create a PostCategory.
     * @param {PostCategoryCreateArgs} args - Arguments to create a PostCategory.
     * @example
     * // Create one PostCategory
     * const PostCategory = await prisma.postCategory.create({
     *   data: {
     *     // ... data to create a PostCategory
     *   }
     * })
     * 
    **/
    create<T extends PostCategoryCreateArgs>(
      args: SelectSubset<T, PostCategoryCreateArgs>
    ): Prisma__PostCategoryClient<PostCategoryGetPayload<T>>

    /**
     * Create many PostCategories.
     *     @param {PostCategoryCreateManyArgs} args - Arguments to create many PostCategories.
     *     @example
     *     // Create many PostCategories
     *     const postCategory = await prisma.postCategory.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends PostCategoryCreateManyArgs>(
      args?: SelectSubset<T, PostCategoryCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a PostCategory.
     * @param {PostCategoryDeleteArgs} args - Arguments to delete one PostCategory.
     * @example
     * // Delete one PostCategory
     * const PostCategory = await prisma.postCategory.delete({
     *   where: {
     *     // ... filter to delete one PostCategory
     *   }
     * })
     * 
    **/
    delete<T extends PostCategoryDeleteArgs>(
      args: SelectSubset<T, PostCategoryDeleteArgs>
    ): Prisma__PostCategoryClient<PostCategoryGetPayload<T>>

    /**
     * Update one PostCategory.
     * @param {PostCategoryUpdateArgs} args - Arguments to update one PostCategory.
     * @example
     * // Update one PostCategory
     * const postCategory = await prisma.postCategory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends PostCategoryUpdateArgs>(
      args: SelectSubset<T, PostCategoryUpdateArgs>
    ): Prisma__PostCategoryClient<PostCategoryGetPayload<T>>

    /**
     * Delete zero or more PostCategories.
     * @param {PostCategoryDeleteManyArgs} args - Arguments to filter PostCategories to delete.
     * @example
     * // Delete a few PostCategories
     * const { count } = await prisma.postCategory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends PostCategoryDeleteManyArgs>(
      args?: SelectSubset<T, PostCategoryDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more PostCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PostCategories
     * const postCategory = await prisma.postCategory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends PostCategoryUpdateManyArgs>(
      args: SelectSubset<T, PostCategoryUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one PostCategory.
     * @param {PostCategoryUpsertArgs} args - Arguments to update or create a PostCategory.
     * @example
     * // Update or create a PostCategory
     * const postCategory = await prisma.postCategory.upsert({
     *   create: {
     *     // ... data to create a PostCategory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PostCategory we want to update
     *   }
     * })
    **/
    upsert<T extends PostCategoryUpsertArgs>(
      args: SelectSubset<T, PostCategoryUpsertArgs>
    ): Prisma__PostCategoryClient<PostCategoryGetPayload<T>>

    /**
     * Count the number of PostCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCategoryCountArgs} args - Arguments to filter PostCategories to count.
     * @example
     * // Count the number of PostCategories
     * const count = await prisma.postCategory.count({
     *   where: {
     *     // ... the filter for the PostCategories we want to count
     *   }
     * })
    **/
    count<T extends PostCategoryCountArgs>(
      args?: Subset<T, PostCategoryCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostCategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PostCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PostCategoryAggregateArgs>(args: Subset<T, PostCategoryAggregateArgs>): PrismaPromise<GetPostCategoryAggregateType<T>>

    /**
     * Group by PostCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PostCategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostCategoryGroupByArgs['orderBy'] }
        : { orderBy?: PostCategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PostCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostCategoryGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for PostCategory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__PostCategoryClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    post<T extends PostArgs= {}>(args?: Subset<T, PostArgs>): Prisma__PostClient<PostGetPayload<T> | Null>;

    category<T extends CategoryArgs= {}>(args?: Subset<T, CategoryArgs>): Prisma__CategoryClient<CategoryGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * PostCategory base type for findUnique actions
   */
  export type PostCategoryFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the PostCategory
     * 
    **/
    select?: PostCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PostCategoryInclude | null
    /**
     * Filter, which PostCategory to fetch.
     * 
    **/
    where: PostCategoryWhereUniqueInput
  }

  /**
   * PostCategory findUnique
   */
  export interface PostCategoryFindUniqueArgs extends PostCategoryFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * PostCategory findUniqueOrThrow
   */
  export type PostCategoryFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the PostCategory
     * 
    **/
    select?: PostCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PostCategoryInclude | null
    /**
     * Filter, which PostCategory to fetch.
     * 
    **/
    where: PostCategoryWhereUniqueInput
  }


  /**
   * PostCategory base type for findFirst actions
   */
  export type PostCategoryFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the PostCategory
     * 
    **/
    select?: PostCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PostCategoryInclude | null
    /**
     * Filter, which PostCategory to fetch.
     * 
    **/
    where?: PostCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostCategories to fetch.
     * 
    **/
    orderBy?: Enumerable<PostCategoryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostCategories.
     * 
    **/
    cursor?: PostCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostCategories from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostCategories.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostCategories.
     * 
    **/
    distinct?: Enumerable<PostCategoryScalarFieldEnum>
  }

  /**
   * PostCategory findFirst
   */
  export interface PostCategoryFindFirstArgs extends PostCategoryFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * PostCategory findFirstOrThrow
   */
  export type PostCategoryFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the PostCategory
     * 
    **/
    select?: PostCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PostCategoryInclude | null
    /**
     * Filter, which PostCategory to fetch.
     * 
    **/
    where?: PostCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostCategories to fetch.
     * 
    **/
    orderBy?: Enumerable<PostCategoryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostCategories.
     * 
    **/
    cursor?: PostCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostCategories from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostCategories.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostCategories.
     * 
    **/
    distinct?: Enumerable<PostCategoryScalarFieldEnum>
  }


  /**
   * PostCategory findMany
   */
  export type PostCategoryFindManyArgs = {
    /**
     * Select specific fields to fetch from the PostCategory
     * 
    **/
    select?: PostCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PostCategoryInclude | null
    /**
     * Filter, which PostCategories to fetch.
     * 
    **/
    where?: PostCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostCategories to fetch.
     * 
    **/
    orderBy?: Enumerable<PostCategoryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PostCategories.
     * 
    **/
    cursor?: PostCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostCategories from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostCategories.
     * 
    **/
    skip?: number
    distinct?: Enumerable<PostCategoryScalarFieldEnum>
  }


  /**
   * PostCategory create
   */
  export type PostCategoryCreateArgs = {
    /**
     * Select specific fields to fetch from the PostCategory
     * 
    **/
    select?: PostCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PostCategoryInclude | null
    /**
     * The data needed to create a PostCategory.
     * 
    **/
    data: XOR<PostCategoryCreateInput, PostCategoryUncheckedCreateInput>
  }


  /**
   * PostCategory createMany
   */
  export type PostCategoryCreateManyArgs = {
    /**
     * The data used to create many PostCategories.
     * 
    **/
    data: Enumerable<PostCategoryCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * PostCategory update
   */
  export type PostCategoryUpdateArgs = {
    /**
     * Select specific fields to fetch from the PostCategory
     * 
    **/
    select?: PostCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PostCategoryInclude | null
    /**
     * The data needed to update a PostCategory.
     * 
    **/
    data: XOR<PostCategoryUpdateInput, PostCategoryUncheckedUpdateInput>
    /**
     * Choose, which PostCategory to update.
     * 
    **/
    where: PostCategoryWhereUniqueInput
  }


  /**
   * PostCategory updateMany
   */
  export type PostCategoryUpdateManyArgs = {
    /**
     * The data used to update PostCategories.
     * 
    **/
    data: XOR<PostCategoryUpdateManyMutationInput, PostCategoryUncheckedUpdateManyInput>
    /**
     * Filter which PostCategories to update
     * 
    **/
    where?: PostCategoryWhereInput
  }


  /**
   * PostCategory upsert
   */
  export type PostCategoryUpsertArgs = {
    /**
     * Select specific fields to fetch from the PostCategory
     * 
    **/
    select?: PostCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PostCategoryInclude | null
    /**
     * The filter to search for the PostCategory to update in case it exists.
     * 
    **/
    where: PostCategoryWhereUniqueInput
    /**
     * In case the PostCategory found by the `where` argument doesn't exist, create a new PostCategory with this data.
     * 
    **/
    create: XOR<PostCategoryCreateInput, PostCategoryUncheckedCreateInput>
    /**
     * In case the PostCategory was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<PostCategoryUpdateInput, PostCategoryUncheckedUpdateInput>
  }


  /**
   * PostCategory delete
   */
  export type PostCategoryDeleteArgs = {
    /**
     * Select specific fields to fetch from the PostCategory
     * 
    **/
    select?: PostCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PostCategoryInclude | null
    /**
     * Filter which PostCategory to delete.
     * 
    **/
    where: PostCategoryWhereUniqueInput
  }


  /**
   * PostCategory deleteMany
   */
  export type PostCategoryDeleteManyArgs = {
    /**
     * Filter which PostCategories to delete
     * 
    **/
    where?: PostCategoryWhereInput
  }


  /**
   * PostCategory without action
   */
  export type PostCategoryArgs = {
    /**
     * Select specific fields to fetch from the PostCategory
     * 
    **/
    select?: PostCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PostCategoryInclude | null
  }



  /**
   * Model Post
   */


  export type AggregatePost = {
    _count: PostCountAggregateOutputType | null
    _avg: PostAvgAggregateOutputType | null
    _sum: PostSumAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  export type PostAvgAggregateOutputType = {
    id: number | null
    authorId: number | null
  }

  export type PostSumAggregateOutputType = {
    id: number | null
    authorId: number | null
  }

  export type PostMinAggregateOutputType = {
    id: number | null
    authorId: number | null
    title: string | null
    content: string | null
    link: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type PostMaxAggregateOutputType = {
    id: number | null
    authorId: number | null
    title: string | null
    content: string | null
    link: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type PostCountAggregateOutputType = {
    id: number
    authorId: number
    title: number
    content: number
    link: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type PostAvgAggregateInputType = {
    id?: true
    authorId?: true
  }

  export type PostSumAggregateInputType = {
    id?: true
    authorId?: true
  }

  export type PostMinAggregateInputType = {
    id?: true
    authorId?: true
    title?: true
    content?: true
    link?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type PostMaxAggregateInputType = {
    id?: true
    authorId?: true
    title?: true
    content?: true
    link?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type PostCountAggregateInputType = {
    id?: true
    authorId?: true
    title?: true
    content?: true
    link?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type PostAggregateArgs = {
    /**
     * Filter which Post to aggregate.
     * 
    **/
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     * 
    **/
    orderBy?: Enumerable<PostOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Posts
    **/
    _count?: true | PostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PostAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PostSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostMaxAggregateInputType
  }

  export type GetPostAggregateType<T extends PostAggregateArgs> = {
        [P in keyof T & keyof AggregatePost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePost[P]>
      : GetScalarType<T[P], AggregatePost[P]>
  }




  export type PostGroupByArgs = {
    where?: PostWhereInput
    orderBy?: Enumerable<PostOrderByWithAggregationInput>
    by: Array<PostScalarFieldEnum>
    having?: PostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostCountAggregateInputType | true
    _avg?: PostAvgAggregateInputType
    _sum?: PostSumAggregateInputType
    _min?: PostMinAggregateInputType
    _max?: PostMaxAggregateInputType
  }


  export type PostGroupByOutputType = {
    id: number
    authorId: number
    title: string
    content: string
    link: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: PostCountAggregateOutputType | null
    _avg: PostAvgAggregateOutputType | null
    _sum: PostSumAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  type GetPostGroupByPayload<T extends PostGroupByArgs> = PrismaPromise<
    Array<
      PickArray<PostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostGroupByOutputType[P]>
            : GetScalarType<T[P], PostGroupByOutputType[P]>
        }
      >
    >


  export type PostSelect = {
    id?: boolean
    author?: boolean | UserArgs
    authorId?: boolean
    title?: boolean
    content?: boolean
    link?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    categories?: boolean | PostCategoriesArgs
    LikedPost?: boolean | PostLikedPostArgs
    SavedPost?: boolean | PostSavedPostArgs
    _count?: boolean | PostCountOutputTypeArgs
  }


  export type PostInclude = {
    author?: boolean | UserArgs
    categories?: boolean | PostCategoriesArgs
    LikedPost?: boolean | PostLikedPostArgs
    SavedPost?: boolean | PostSavedPostArgs
    _count?: boolean | PostCountOutputTypeArgs
  } 

  export type PostGetPayload<S extends boolean | null | undefined | PostArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Post :
    S extends undefined ? never :
    S extends { include: any } & (PostArgs | PostFindManyArgs)
    ? Post  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'author' ? UserGetPayload<S['include'][P]> :
        P extends 'categories' ? Array < PostCategoryGetPayload<S['include'][P]>>  :
        P extends 'LikedPost' ? Array < LikedPostGetPayload<S['include'][P]>>  :
        P extends 'SavedPost' ? Array < SavedPostGetPayload<S['include'][P]>>  :
        P extends '_count' ? PostCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (PostArgs | PostFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'author' ? UserGetPayload<S['select'][P]> :
        P extends 'categories' ? Array < PostCategoryGetPayload<S['select'][P]>>  :
        P extends 'LikedPost' ? Array < LikedPostGetPayload<S['select'][P]>>  :
        P extends 'SavedPost' ? Array < SavedPostGetPayload<S['select'][P]>>  :
        P extends '_count' ? PostCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Post ? Post[P] : never
  } 
      : Post


  type PostCountArgs = Merge<
    Omit<PostFindManyArgs, 'select' | 'include'> & {
      select?: PostCountAggregateInputType | true
    }
  >

  export interface PostDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Post that matches the filter.
     * @param {PostFindUniqueArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends PostFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, PostFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Post'> extends True ? Prisma__PostClient<PostGetPayload<T>> : Prisma__PostClient<PostGetPayload<T> | null, null>

    /**
     * Find one Post that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {PostFindUniqueOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends PostFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, PostFindUniqueOrThrowArgs>
    ): Prisma__PostClient<PostGetPayload<T>>

    /**
     * Find the first Post that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindFirstArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends PostFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, PostFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Post'> extends True ? Prisma__PostClient<PostGetPayload<T>> : Prisma__PostClient<PostGetPayload<T> | null, null>

    /**
     * Find the first Post that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindFirstOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends PostFindFirstOrThrowArgs>(
      args?: SelectSubset<T, PostFindFirstOrThrowArgs>
    ): Prisma__PostClient<PostGetPayload<T>>

    /**
     * Find zero or more Posts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Posts
     * const posts = await prisma.post.findMany()
     * 
     * // Get first 10 Posts
     * const posts = await prisma.post.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const postWithIdOnly = await prisma.post.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends PostFindManyArgs>(
      args?: SelectSubset<T, PostFindManyArgs>
    ): PrismaPromise<Array<PostGetPayload<T>>>

    /**
     * Create a Post.
     * @param {PostCreateArgs} args - Arguments to create a Post.
     * @example
     * // Create one Post
     * const Post = await prisma.post.create({
     *   data: {
     *     // ... data to create a Post
     *   }
     * })
     * 
    **/
    create<T extends PostCreateArgs>(
      args: SelectSubset<T, PostCreateArgs>
    ): Prisma__PostClient<PostGetPayload<T>>

    /**
     * Create many Posts.
     *     @param {PostCreateManyArgs} args - Arguments to create many Posts.
     *     @example
     *     // Create many Posts
     *     const post = await prisma.post.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends PostCreateManyArgs>(
      args?: SelectSubset<T, PostCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Post.
     * @param {PostDeleteArgs} args - Arguments to delete one Post.
     * @example
     * // Delete one Post
     * const Post = await prisma.post.delete({
     *   where: {
     *     // ... filter to delete one Post
     *   }
     * })
     * 
    **/
    delete<T extends PostDeleteArgs>(
      args: SelectSubset<T, PostDeleteArgs>
    ): Prisma__PostClient<PostGetPayload<T>>

    /**
     * Update one Post.
     * @param {PostUpdateArgs} args - Arguments to update one Post.
     * @example
     * // Update one Post
     * const post = await prisma.post.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends PostUpdateArgs>(
      args: SelectSubset<T, PostUpdateArgs>
    ): Prisma__PostClient<PostGetPayload<T>>

    /**
     * Delete zero or more Posts.
     * @param {PostDeleteManyArgs} args - Arguments to filter Posts to delete.
     * @example
     * // Delete a few Posts
     * const { count } = await prisma.post.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends PostDeleteManyArgs>(
      args?: SelectSubset<T, PostDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends PostUpdateManyArgs>(
      args: SelectSubset<T, PostUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Post.
     * @param {PostUpsertArgs} args - Arguments to update or create a Post.
     * @example
     * // Update or create a Post
     * const post = await prisma.post.upsert({
     *   create: {
     *     // ... data to create a Post
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Post we want to update
     *   }
     * })
    **/
    upsert<T extends PostUpsertArgs>(
      args: SelectSubset<T, PostUpsertArgs>
    ): Prisma__PostClient<PostGetPayload<T>>

    /**
     * Count the number of Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCountArgs} args - Arguments to filter Posts to count.
     * @example
     * // Count the number of Posts
     * const count = await prisma.post.count({
     *   where: {
     *     // ... the filter for the Posts we want to count
     *   }
     * })
    **/
    count<T extends PostCountArgs>(
      args?: Subset<T, PostCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PostAggregateArgs>(args: Subset<T, PostAggregateArgs>): PrismaPromise<GetPostAggregateType<T>>

    /**
     * Group by Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostGroupByArgs['orderBy'] }
        : { orderBy?: PostGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Post.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__PostClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    author<T extends UserArgs= {}>(args?: Subset<T, UserArgs>): Prisma__UserClient<UserGetPayload<T> | Null>;

    categories<T extends PostCategoriesArgs= {}>(args?: Subset<T, PostCategoriesArgs>): PrismaPromise<Array<PostCategoryGetPayload<T>>| Null>;

    LikedPost<T extends PostLikedPostArgs= {}>(args?: Subset<T, PostLikedPostArgs>): PrismaPromise<Array<LikedPostGetPayload<T>>| Null>;

    SavedPost<T extends PostSavedPostArgs= {}>(args?: Subset<T, PostSavedPostArgs>): PrismaPromise<Array<SavedPostGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Post base type for findUnique actions
   */
  export type PostFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Post
     * 
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PostInclude | null
    /**
     * Filter, which Post to fetch.
     * 
    **/
    where: PostWhereUniqueInput
  }

  /**
   * Post findUnique
   */
  export interface PostFindUniqueArgs extends PostFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Post findUniqueOrThrow
   */
  export type PostFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Post
     * 
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PostInclude | null
    /**
     * Filter, which Post to fetch.
     * 
    **/
    where: PostWhereUniqueInput
  }


  /**
   * Post base type for findFirst actions
   */
  export type PostFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Post
     * 
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PostInclude | null
    /**
     * Filter, which Post to fetch.
     * 
    **/
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     * 
    **/
    orderBy?: Enumerable<PostOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     * 
    **/
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     * 
    **/
    distinct?: Enumerable<PostScalarFieldEnum>
  }

  /**
   * Post findFirst
   */
  export interface PostFindFirstArgs extends PostFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Post findFirstOrThrow
   */
  export type PostFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Post
     * 
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PostInclude | null
    /**
     * Filter, which Post to fetch.
     * 
    **/
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     * 
    **/
    orderBy?: Enumerable<PostOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     * 
    **/
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     * 
    **/
    distinct?: Enumerable<PostScalarFieldEnum>
  }


  /**
   * Post findMany
   */
  export type PostFindManyArgs = {
    /**
     * Select specific fields to fetch from the Post
     * 
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PostInclude | null
    /**
     * Filter, which Posts to fetch.
     * 
    **/
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     * 
    **/
    orderBy?: Enumerable<PostOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Posts.
     * 
    **/
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     * 
    **/
    skip?: number
    distinct?: Enumerable<PostScalarFieldEnum>
  }


  /**
   * Post create
   */
  export type PostCreateArgs = {
    /**
     * Select specific fields to fetch from the Post
     * 
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PostInclude | null
    /**
     * The data needed to create a Post.
     * 
    **/
    data: XOR<PostCreateInput, PostUncheckedCreateInput>
  }


  /**
   * Post createMany
   */
  export type PostCreateManyArgs = {
    /**
     * The data used to create many Posts.
     * 
    **/
    data: Enumerable<PostCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Post update
   */
  export type PostUpdateArgs = {
    /**
     * Select specific fields to fetch from the Post
     * 
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PostInclude | null
    /**
     * The data needed to update a Post.
     * 
    **/
    data: XOR<PostUpdateInput, PostUncheckedUpdateInput>
    /**
     * Choose, which Post to update.
     * 
    **/
    where: PostWhereUniqueInput
  }


  /**
   * Post updateMany
   */
  export type PostUpdateManyArgs = {
    /**
     * The data used to update Posts.
     * 
    **/
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyInput>
    /**
     * Filter which Posts to update
     * 
    **/
    where?: PostWhereInput
  }


  /**
   * Post upsert
   */
  export type PostUpsertArgs = {
    /**
     * Select specific fields to fetch from the Post
     * 
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PostInclude | null
    /**
     * The filter to search for the Post to update in case it exists.
     * 
    **/
    where: PostWhereUniqueInput
    /**
     * In case the Post found by the `where` argument doesn't exist, create a new Post with this data.
     * 
    **/
    create: XOR<PostCreateInput, PostUncheckedCreateInput>
    /**
     * In case the Post was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<PostUpdateInput, PostUncheckedUpdateInput>
  }


  /**
   * Post delete
   */
  export type PostDeleteArgs = {
    /**
     * Select specific fields to fetch from the Post
     * 
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PostInclude | null
    /**
     * Filter which Post to delete.
     * 
    **/
    where: PostWhereUniqueInput
  }


  /**
   * Post deleteMany
   */
  export type PostDeleteManyArgs = {
    /**
     * Filter which Posts to delete
     * 
    **/
    where?: PostWhereInput
  }


  /**
   * Post.categories
   */
  export type PostCategoriesArgs = {
    /**
     * Select specific fields to fetch from the PostCategory
     * 
    **/
    select?: PostCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PostCategoryInclude | null
    where?: PostCategoryWhereInput
    orderBy?: Enumerable<PostCategoryOrderByWithRelationInput>
    cursor?: PostCategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<PostCategoryScalarFieldEnum>
  }


  /**
   * Post.LikedPost
   */
  export type PostLikedPostArgs = {
    /**
     * Select specific fields to fetch from the LikedPost
     * 
    **/
    select?: LikedPostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LikedPostInclude | null
    where?: LikedPostWhereInput
    orderBy?: Enumerable<LikedPostOrderByWithRelationInput>
    cursor?: LikedPostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<LikedPostScalarFieldEnum>
  }


  /**
   * Post.SavedPost
   */
  export type PostSavedPostArgs = {
    /**
     * Select specific fields to fetch from the SavedPost
     * 
    **/
    select?: SavedPostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SavedPostInclude | null
    where?: SavedPostWhereInput
    orderBy?: Enumerable<SavedPostOrderByWithRelationInput>
    cursor?: SavedPostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<SavedPostScalarFieldEnum>
  }


  /**
   * Post without action
   */
  export type PostArgs = {
    /**
     * Select specific fields to fetch from the Post
     * 
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PostInclude | null
  }



  /**
   * Model LikedPost
   */


  export type AggregateLikedPost = {
    _count: LikedPostCountAggregateOutputType | null
    _avg: LikedPostAvgAggregateOutputType | null
    _sum: LikedPostSumAggregateOutputType | null
    _min: LikedPostMinAggregateOutputType | null
    _max: LikedPostMaxAggregateOutputType | null
  }

  export type LikedPostAvgAggregateOutputType = {
    postId: number | null
    userId: number | null
  }

  export type LikedPostSumAggregateOutputType = {
    postId: number | null
    userId: number | null
  }

  export type LikedPostMinAggregateOutputType = {
    postId: number | null
    userId: number | null
  }

  export type LikedPostMaxAggregateOutputType = {
    postId: number | null
    userId: number | null
  }

  export type LikedPostCountAggregateOutputType = {
    postId: number
    userId: number
    _all: number
  }


  export type LikedPostAvgAggregateInputType = {
    postId?: true
    userId?: true
  }

  export type LikedPostSumAggregateInputType = {
    postId?: true
    userId?: true
  }

  export type LikedPostMinAggregateInputType = {
    postId?: true
    userId?: true
  }

  export type LikedPostMaxAggregateInputType = {
    postId?: true
    userId?: true
  }

  export type LikedPostCountAggregateInputType = {
    postId?: true
    userId?: true
    _all?: true
  }

  export type LikedPostAggregateArgs = {
    /**
     * Filter which LikedPost to aggregate.
     * 
    **/
    where?: LikedPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LikedPosts to fetch.
     * 
    **/
    orderBy?: Enumerable<LikedPostOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: LikedPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LikedPosts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LikedPosts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LikedPosts
    **/
    _count?: true | LikedPostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LikedPostAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LikedPostSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LikedPostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LikedPostMaxAggregateInputType
  }

  export type GetLikedPostAggregateType<T extends LikedPostAggregateArgs> = {
        [P in keyof T & keyof AggregateLikedPost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLikedPost[P]>
      : GetScalarType<T[P], AggregateLikedPost[P]>
  }




  export type LikedPostGroupByArgs = {
    where?: LikedPostWhereInput
    orderBy?: Enumerable<LikedPostOrderByWithAggregationInput>
    by: Array<LikedPostScalarFieldEnum>
    having?: LikedPostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LikedPostCountAggregateInputType | true
    _avg?: LikedPostAvgAggregateInputType
    _sum?: LikedPostSumAggregateInputType
    _min?: LikedPostMinAggregateInputType
    _max?: LikedPostMaxAggregateInputType
  }


  export type LikedPostGroupByOutputType = {
    postId: number
    userId: number
    _count: LikedPostCountAggregateOutputType | null
    _avg: LikedPostAvgAggregateOutputType | null
    _sum: LikedPostSumAggregateOutputType | null
    _min: LikedPostMinAggregateOutputType | null
    _max: LikedPostMaxAggregateOutputType | null
  }

  type GetLikedPostGroupByPayload<T extends LikedPostGroupByArgs> = PrismaPromise<
    Array<
      PickArray<LikedPostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LikedPostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LikedPostGroupByOutputType[P]>
            : GetScalarType<T[P], LikedPostGroupByOutputType[P]>
        }
      >
    >


  export type LikedPostSelect = {
    postId?: boolean
    userId?: boolean
    User?: boolean | UserArgs
    Post?: boolean | PostArgs
  }


  export type LikedPostInclude = {
    User?: boolean | UserArgs
    Post?: boolean | PostArgs
  } 

  export type LikedPostGetPayload<S extends boolean | null | undefined | LikedPostArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? LikedPost :
    S extends undefined ? never :
    S extends { include: any } & (LikedPostArgs | LikedPostFindManyArgs)
    ? LikedPost  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'User' ? UserGetPayload<S['include'][P]> :
        P extends 'Post' ? PostGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (LikedPostArgs | LikedPostFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'User' ? UserGetPayload<S['select'][P]> :
        P extends 'Post' ? PostGetPayload<S['select'][P]> :  P extends keyof LikedPost ? LikedPost[P] : never
  } 
      : LikedPost


  type LikedPostCountArgs = Merge<
    Omit<LikedPostFindManyArgs, 'select' | 'include'> & {
      select?: LikedPostCountAggregateInputType | true
    }
  >

  export interface LikedPostDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one LikedPost that matches the filter.
     * @param {LikedPostFindUniqueArgs} args - Arguments to find a LikedPost
     * @example
     * // Get one LikedPost
     * const likedPost = await prisma.likedPost.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends LikedPostFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, LikedPostFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'LikedPost'> extends True ? Prisma__LikedPostClient<LikedPostGetPayload<T>> : Prisma__LikedPostClient<LikedPostGetPayload<T> | null, null>

    /**
     * Find one LikedPost that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {LikedPostFindUniqueOrThrowArgs} args - Arguments to find a LikedPost
     * @example
     * // Get one LikedPost
     * const likedPost = await prisma.likedPost.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends LikedPostFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, LikedPostFindUniqueOrThrowArgs>
    ): Prisma__LikedPostClient<LikedPostGetPayload<T>>

    /**
     * Find the first LikedPost that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LikedPostFindFirstArgs} args - Arguments to find a LikedPost
     * @example
     * // Get one LikedPost
     * const likedPost = await prisma.likedPost.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends LikedPostFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, LikedPostFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'LikedPost'> extends True ? Prisma__LikedPostClient<LikedPostGetPayload<T>> : Prisma__LikedPostClient<LikedPostGetPayload<T> | null, null>

    /**
     * Find the first LikedPost that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LikedPostFindFirstOrThrowArgs} args - Arguments to find a LikedPost
     * @example
     * // Get one LikedPost
     * const likedPost = await prisma.likedPost.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends LikedPostFindFirstOrThrowArgs>(
      args?: SelectSubset<T, LikedPostFindFirstOrThrowArgs>
    ): Prisma__LikedPostClient<LikedPostGetPayload<T>>

    /**
     * Find zero or more LikedPosts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LikedPostFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LikedPosts
     * const likedPosts = await prisma.likedPost.findMany()
     * 
     * // Get first 10 LikedPosts
     * const likedPosts = await prisma.likedPost.findMany({ take: 10 })
     * 
     * // Only select the `postId`
     * const likedPostWithPostIdOnly = await prisma.likedPost.findMany({ select: { postId: true } })
     * 
    **/
    findMany<T extends LikedPostFindManyArgs>(
      args?: SelectSubset<T, LikedPostFindManyArgs>
    ): PrismaPromise<Array<LikedPostGetPayload<T>>>

    /**
     * Create a LikedPost.
     * @param {LikedPostCreateArgs} args - Arguments to create a LikedPost.
     * @example
     * // Create one LikedPost
     * const LikedPost = await prisma.likedPost.create({
     *   data: {
     *     // ... data to create a LikedPost
     *   }
     * })
     * 
    **/
    create<T extends LikedPostCreateArgs>(
      args: SelectSubset<T, LikedPostCreateArgs>
    ): Prisma__LikedPostClient<LikedPostGetPayload<T>>

    /**
     * Create many LikedPosts.
     *     @param {LikedPostCreateManyArgs} args - Arguments to create many LikedPosts.
     *     @example
     *     // Create many LikedPosts
     *     const likedPost = await prisma.likedPost.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends LikedPostCreateManyArgs>(
      args?: SelectSubset<T, LikedPostCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a LikedPost.
     * @param {LikedPostDeleteArgs} args - Arguments to delete one LikedPost.
     * @example
     * // Delete one LikedPost
     * const LikedPost = await prisma.likedPost.delete({
     *   where: {
     *     // ... filter to delete one LikedPost
     *   }
     * })
     * 
    **/
    delete<T extends LikedPostDeleteArgs>(
      args: SelectSubset<T, LikedPostDeleteArgs>
    ): Prisma__LikedPostClient<LikedPostGetPayload<T>>

    /**
     * Update one LikedPost.
     * @param {LikedPostUpdateArgs} args - Arguments to update one LikedPost.
     * @example
     * // Update one LikedPost
     * const likedPost = await prisma.likedPost.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends LikedPostUpdateArgs>(
      args: SelectSubset<T, LikedPostUpdateArgs>
    ): Prisma__LikedPostClient<LikedPostGetPayload<T>>

    /**
     * Delete zero or more LikedPosts.
     * @param {LikedPostDeleteManyArgs} args - Arguments to filter LikedPosts to delete.
     * @example
     * // Delete a few LikedPosts
     * const { count } = await prisma.likedPost.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends LikedPostDeleteManyArgs>(
      args?: SelectSubset<T, LikedPostDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more LikedPosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LikedPostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LikedPosts
     * const likedPost = await prisma.likedPost.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends LikedPostUpdateManyArgs>(
      args: SelectSubset<T, LikedPostUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one LikedPost.
     * @param {LikedPostUpsertArgs} args - Arguments to update or create a LikedPost.
     * @example
     * // Update or create a LikedPost
     * const likedPost = await prisma.likedPost.upsert({
     *   create: {
     *     // ... data to create a LikedPost
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LikedPost we want to update
     *   }
     * })
    **/
    upsert<T extends LikedPostUpsertArgs>(
      args: SelectSubset<T, LikedPostUpsertArgs>
    ): Prisma__LikedPostClient<LikedPostGetPayload<T>>

    /**
     * Count the number of LikedPosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LikedPostCountArgs} args - Arguments to filter LikedPosts to count.
     * @example
     * // Count the number of LikedPosts
     * const count = await prisma.likedPost.count({
     *   where: {
     *     // ... the filter for the LikedPosts we want to count
     *   }
     * })
    **/
    count<T extends LikedPostCountArgs>(
      args?: Subset<T, LikedPostCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LikedPostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LikedPost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LikedPostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LikedPostAggregateArgs>(args: Subset<T, LikedPostAggregateArgs>): PrismaPromise<GetLikedPostAggregateType<T>>

    /**
     * Group by LikedPost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LikedPostGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LikedPostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LikedPostGroupByArgs['orderBy'] }
        : { orderBy?: LikedPostGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LikedPostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLikedPostGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for LikedPost.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__LikedPostClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    User<T extends UserArgs= {}>(args?: Subset<T, UserArgs>): Prisma__UserClient<UserGetPayload<T> | Null>;

    Post<T extends PostArgs= {}>(args?: Subset<T, PostArgs>): Prisma__PostClient<PostGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * LikedPost base type for findUnique actions
   */
  export type LikedPostFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the LikedPost
     * 
    **/
    select?: LikedPostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LikedPostInclude | null
    /**
     * Filter, which LikedPost to fetch.
     * 
    **/
    where: LikedPostWhereUniqueInput
  }

  /**
   * LikedPost findUnique
   */
  export interface LikedPostFindUniqueArgs extends LikedPostFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * LikedPost findUniqueOrThrow
   */
  export type LikedPostFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the LikedPost
     * 
    **/
    select?: LikedPostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LikedPostInclude | null
    /**
     * Filter, which LikedPost to fetch.
     * 
    **/
    where: LikedPostWhereUniqueInput
  }


  /**
   * LikedPost base type for findFirst actions
   */
  export type LikedPostFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the LikedPost
     * 
    **/
    select?: LikedPostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LikedPostInclude | null
    /**
     * Filter, which LikedPost to fetch.
     * 
    **/
    where?: LikedPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LikedPosts to fetch.
     * 
    **/
    orderBy?: Enumerable<LikedPostOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LikedPosts.
     * 
    **/
    cursor?: LikedPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LikedPosts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LikedPosts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LikedPosts.
     * 
    **/
    distinct?: Enumerable<LikedPostScalarFieldEnum>
  }

  /**
   * LikedPost findFirst
   */
  export interface LikedPostFindFirstArgs extends LikedPostFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * LikedPost findFirstOrThrow
   */
  export type LikedPostFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the LikedPost
     * 
    **/
    select?: LikedPostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LikedPostInclude | null
    /**
     * Filter, which LikedPost to fetch.
     * 
    **/
    where?: LikedPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LikedPosts to fetch.
     * 
    **/
    orderBy?: Enumerable<LikedPostOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LikedPosts.
     * 
    **/
    cursor?: LikedPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LikedPosts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LikedPosts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LikedPosts.
     * 
    **/
    distinct?: Enumerable<LikedPostScalarFieldEnum>
  }


  /**
   * LikedPost findMany
   */
  export type LikedPostFindManyArgs = {
    /**
     * Select specific fields to fetch from the LikedPost
     * 
    **/
    select?: LikedPostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LikedPostInclude | null
    /**
     * Filter, which LikedPosts to fetch.
     * 
    **/
    where?: LikedPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LikedPosts to fetch.
     * 
    **/
    orderBy?: Enumerable<LikedPostOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LikedPosts.
     * 
    **/
    cursor?: LikedPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LikedPosts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LikedPosts.
     * 
    **/
    skip?: number
    distinct?: Enumerable<LikedPostScalarFieldEnum>
  }


  /**
   * LikedPost create
   */
  export type LikedPostCreateArgs = {
    /**
     * Select specific fields to fetch from the LikedPost
     * 
    **/
    select?: LikedPostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LikedPostInclude | null
    /**
     * The data needed to create a LikedPost.
     * 
    **/
    data: XOR<LikedPostCreateInput, LikedPostUncheckedCreateInput>
  }


  /**
   * LikedPost createMany
   */
  export type LikedPostCreateManyArgs = {
    /**
     * The data used to create many LikedPosts.
     * 
    **/
    data: Enumerable<LikedPostCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * LikedPost update
   */
  export type LikedPostUpdateArgs = {
    /**
     * Select specific fields to fetch from the LikedPost
     * 
    **/
    select?: LikedPostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LikedPostInclude | null
    /**
     * The data needed to update a LikedPost.
     * 
    **/
    data: XOR<LikedPostUpdateInput, LikedPostUncheckedUpdateInput>
    /**
     * Choose, which LikedPost to update.
     * 
    **/
    where: LikedPostWhereUniqueInput
  }


  /**
   * LikedPost updateMany
   */
  export type LikedPostUpdateManyArgs = {
    /**
     * The data used to update LikedPosts.
     * 
    **/
    data: XOR<LikedPostUpdateManyMutationInput, LikedPostUncheckedUpdateManyInput>
    /**
     * Filter which LikedPosts to update
     * 
    **/
    where?: LikedPostWhereInput
  }


  /**
   * LikedPost upsert
   */
  export type LikedPostUpsertArgs = {
    /**
     * Select specific fields to fetch from the LikedPost
     * 
    **/
    select?: LikedPostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LikedPostInclude | null
    /**
     * The filter to search for the LikedPost to update in case it exists.
     * 
    **/
    where: LikedPostWhereUniqueInput
    /**
     * In case the LikedPost found by the `where` argument doesn't exist, create a new LikedPost with this data.
     * 
    **/
    create: XOR<LikedPostCreateInput, LikedPostUncheckedCreateInput>
    /**
     * In case the LikedPost was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<LikedPostUpdateInput, LikedPostUncheckedUpdateInput>
  }


  /**
   * LikedPost delete
   */
  export type LikedPostDeleteArgs = {
    /**
     * Select specific fields to fetch from the LikedPost
     * 
    **/
    select?: LikedPostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LikedPostInclude | null
    /**
     * Filter which LikedPost to delete.
     * 
    **/
    where: LikedPostWhereUniqueInput
  }


  /**
   * LikedPost deleteMany
   */
  export type LikedPostDeleteManyArgs = {
    /**
     * Filter which LikedPosts to delete
     * 
    **/
    where?: LikedPostWhereInput
  }


  /**
   * LikedPost without action
   */
  export type LikedPostArgs = {
    /**
     * Select specific fields to fetch from the LikedPost
     * 
    **/
    select?: LikedPostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LikedPostInclude | null
  }



  /**
   * Model SavedPost
   */


  export type AggregateSavedPost = {
    _count: SavedPostCountAggregateOutputType | null
    _avg: SavedPostAvgAggregateOutputType | null
    _sum: SavedPostSumAggregateOutputType | null
    _min: SavedPostMinAggregateOutputType | null
    _max: SavedPostMaxAggregateOutputType | null
  }

  export type SavedPostAvgAggregateOutputType = {
    postId: number | null
    userId: number | null
  }

  export type SavedPostSumAggregateOutputType = {
    postId: number | null
    userId: number | null
  }

  export type SavedPostMinAggregateOutputType = {
    postId: number | null
    userId: number | null
  }

  export type SavedPostMaxAggregateOutputType = {
    postId: number | null
    userId: number | null
  }

  export type SavedPostCountAggregateOutputType = {
    postId: number
    userId: number
    _all: number
  }


  export type SavedPostAvgAggregateInputType = {
    postId?: true
    userId?: true
  }

  export type SavedPostSumAggregateInputType = {
    postId?: true
    userId?: true
  }

  export type SavedPostMinAggregateInputType = {
    postId?: true
    userId?: true
  }

  export type SavedPostMaxAggregateInputType = {
    postId?: true
    userId?: true
  }

  export type SavedPostCountAggregateInputType = {
    postId?: true
    userId?: true
    _all?: true
  }

  export type SavedPostAggregateArgs = {
    /**
     * Filter which SavedPost to aggregate.
     * 
    **/
    where?: SavedPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedPosts to fetch.
     * 
    **/
    orderBy?: Enumerable<SavedPostOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: SavedPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedPosts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedPosts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SavedPosts
    **/
    _count?: true | SavedPostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SavedPostAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SavedPostSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SavedPostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SavedPostMaxAggregateInputType
  }

  export type GetSavedPostAggregateType<T extends SavedPostAggregateArgs> = {
        [P in keyof T & keyof AggregateSavedPost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSavedPost[P]>
      : GetScalarType<T[P], AggregateSavedPost[P]>
  }




  export type SavedPostGroupByArgs = {
    where?: SavedPostWhereInput
    orderBy?: Enumerable<SavedPostOrderByWithAggregationInput>
    by: Array<SavedPostScalarFieldEnum>
    having?: SavedPostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SavedPostCountAggregateInputType | true
    _avg?: SavedPostAvgAggregateInputType
    _sum?: SavedPostSumAggregateInputType
    _min?: SavedPostMinAggregateInputType
    _max?: SavedPostMaxAggregateInputType
  }


  export type SavedPostGroupByOutputType = {
    postId: number
    userId: number
    _count: SavedPostCountAggregateOutputType | null
    _avg: SavedPostAvgAggregateOutputType | null
    _sum: SavedPostSumAggregateOutputType | null
    _min: SavedPostMinAggregateOutputType | null
    _max: SavedPostMaxAggregateOutputType | null
  }

  type GetSavedPostGroupByPayload<T extends SavedPostGroupByArgs> = PrismaPromise<
    Array<
      PickArray<SavedPostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SavedPostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SavedPostGroupByOutputType[P]>
            : GetScalarType<T[P], SavedPostGroupByOutputType[P]>
        }
      >
    >


  export type SavedPostSelect = {
    postId?: boolean
    userId?: boolean
    User?: boolean | UserArgs
    Post?: boolean | PostArgs
  }


  export type SavedPostInclude = {
    User?: boolean | UserArgs
    Post?: boolean | PostArgs
  } 

  export type SavedPostGetPayload<S extends boolean | null | undefined | SavedPostArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? SavedPost :
    S extends undefined ? never :
    S extends { include: any } & (SavedPostArgs | SavedPostFindManyArgs)
    ? SavedPost  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'User' ? UserGetPayload<S['include'][P]> :
        P extends 'Post' ? PostGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (SavedPostArgs | SavedPostFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'User' ? UserGetPayload<S['select'][P]> :
        P extends 'Post' ? PostGetPayload<S['select'][P]> :  P extends keyof SavedPost ? SavedPost[P] : never
  } 
      : SavedPost


  type SavedPostCountArgs = Merge<
    Omit<SavedPostFindManyArgs, 'select' | 'include'> & {
      select?: SavedPostCountAggregateInputType | true
    }
  >

  export interface SavedPostDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one SavedPost that matches the filter.
     * @param {SavedPostFindUniqueArgs} args - Arguments to find a SavedPost
     * @example
     * // Get one SavedPost
     * const savedPost = await prisma.savedPost.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends SavedPostFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, SavedPostFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'SavedPost'> extends True ? Prisma__SavedPostClient<SavedPostGetPayload<T>> : Prisma__SavedPostClient<SavedPostGetPayload<T> | null, null>

    /**
     * Find one SavedPost that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {SavedPostFindUniqueOrThrowArgs} args - Arguments to find a SavedPost
     * @example
     * // Get one SavedPost
     * const savedPost = await prisma.savedPost.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends SavedPostFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, SavedPostFindUniqueOrThrowArgs>
    ): Prisma__SavedPostClient<SavedPostGetPayload<T>>

    /**
     * Find the first SavedPost that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedPostFindFirstArgs} args - Arguments to find a SavedPost
     * @example
     * // Get one SavedPost
     * const savedPost = await prisma.savedPost.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends SavedPostFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, SavedPostFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'SavedPost'> extends True ? Prisma__SavedPostClient<SavedPostGetPayload<T>> : Prisma__SavedPostClient<SavedPostGetPayload<T> | null, null>

    /**
     * Find the first SavedPost that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedPostFindFirstOrThrowArgs} args - Arguments to find a SavedPost
     * @example
     * // Get one SavedPost
     * const savedPost = await prisma.savedPost.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends SavedPostFindFirstOrThrowArgs>(
      args?: SelectSubset<T, SavedPostFindFirstOrThrowArgs>
    ): Prisma__SavedPostClient<SavedPostGetPayload<T>>

    /**
     * Find zero or more SavedPosts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedPostFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SavedPosts
     * const savedPosts = await prisma.savedPost.findMany()
     * 
     * // Get first 10 SavedPosts
     * const savedPosts = await prisma.savedPost.findMany({ take: 10 })
     * 
     * // Only select the `postId`
     * const savedPostWithPostIdOnly = await prisma.savedPost.findMany({ select: { postId: true } })
     * 
    **/
    findMany<T extends SavedPostFindManyArgs>(
      args?: SelectSubset<T, SavedPostFindManyArgs>
    ): PrismaPromise<Array<SavedPostGetPayload<T>>>

    /**
     * Create a SavedPost.
     * @param {SavedPostCreateArgs} args - Arguments to create a SavedPost.
     * @example
     * // Create one SavedPost
     * const SavedPost = await prisma.savedPost.create({
     *   data: {
     *     // ... data to create a SavedPost
     *   }
     * })
     * 
    **/
    create<T extends SavedPostCreateArgs>(
      args: SelectSubset<T, SavedPostCreateArgs>
    ): Prisma__SavedPostClient<SavedPostGetPayload<T>>

    /**
     * Create many SavedPosts.
     *     @param {SavedPostCreateManyArgs} args - Arguments to create many SavedPosts.
     *     @example
     *     // Create many SavedPosts
     *     const savedPost = await prisma.savedPost.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends SavedPostCreateManyArgs>(
      args?: SelectSubset<T, SavedPostCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a SavedPost.
     * @param {SavedPostDeleteArgs} args - Arguments to delete one SavedPost.
     * @example
     * // Delete one SavedPost
     * const SavedPost = await prisma.savedPost.delete({
     *   where: {
     *     // ... filter to delete one SavedPost
     *   }
     * })
     * 
    **/
    delete<T extends SavedPostDeleteArgs>(
      args: SelectSubset<T, SavedPostDeleteArgs>
    ): Prisma__SavedPostClient<SavedPostGetPayload<T>>

    /**
     * Update one SavedPost.
     * @param {SavedPostUpdateArgs} args - Arguments to update one SavedPost.
     * @example
     * // Update one SavedPost
     * const savedPost = await prisma.savedPost.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends SavedPostUpdateArgs>(
      args: SelectSubset<T, SavedPostUpdateArgs>
    ): Prisma__SavedPostClient<SavedPostGetPayload<T>>

    /**
     * Delete zero or more SavedPosts.
     * @param {SavedPostDeleteManyArgs} args - Arguments to filter SavedPosts to delete.
     * @example
     * // Delete a few SavedPosts
     * const { count } = await prisma.savedPost.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends SavedPostDeleteManyArgs>(
      args?: SelectSubset<T, SavedPostDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more SavedPosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedPostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SavedPosts
     * const savedPost = await prisma.savedPost.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends SavedPostUpdateManyArgs>(
      args: SelectSubset<T, SavedPostUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one SavedPost.
     * @param {SavedPostUpsertArgs} args - Arguments to update or create a SavedPost.
     * @example
     * // Update or create a SavedPost
     * const savedPost = await prisma.savedPost.upsert({
     *   create: {
     *     // ... data to create a SavedPost
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SavedPost we want to update
     *   }
     * })
    **/
    upsert<T extends SavedPostUpsertArgs>(
      args: SelectSubset<T, SavedPostUpsertArgs>
    ): Prisma__SavedPostClient<SavedPostGetPayload<T>>

    /**
     * Count the number of SavedPosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedPostCountArgs} args - Arguments to filter SavedPosts to count.
     * @example
     * // Count the number of SavedPosts
     * const count = await prisma.savedPost.count({
     *   where: {
     *     // ... the filter for the SavedPosts we want to count
     *   }
     * })
    **/
    count<T extends SavedPostCountArgs>(
      args?: Subset<T, SavedPostCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SavedPostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SavedPost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedPostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SavedPostAggregateArgs>(args: Subset<T, SavedPostAggregateArgs>): PrismaPromise<GetSavedPostAggregateType<T>>

    /**
     * Group by SavedPost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedPostGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SavedPostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SavedPostGroupByArgs['orderBy'] }
        : { orderBy?: SavedPostGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SavedPostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSavedPostGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for SavedPost.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__SavedPostClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    User<T extends UserArgs= {}>(args?: Subset<T, UserArgs>): Prisma__UserClient<UserGetPayload<T> | Null>;

    Post<T extends PostArgs= {}>(args?: Subset<T, PostArgs>): Prisma__PostClient<PostGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * SavedPost base type for findUnique actions
   */
  export type SavedPostFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the SavedPost
     * 
    **/
    select?: SavedPostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SavedPostInclude | null
    /**
     * Filter, which SavedPost to fetch.
     * 
    **/
    where: SavedPostWhereUniqueInput
  }

  /**
   * SavedPost findUnique
   */
  export interface SavedPostFindUniqueArgs extends SavedPostFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * SavedPost findUniqueOrThrow
   */
  export type SavedPostFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the SavedPost
     * 
    **/
    select?: SavedPostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SavedPostInclude | null
    /**
     * Filter, which SavedPost to fetch.
     * 
    **/
    where: SavedPostWhereUniqueInput
  }


  /**
   * SavedPost base type for findFirst actions
   */
  export type SavedPostFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the SavedPost
     * 
    **/
    select?: SavedPostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SavedPostInclude | null
    /**
     * Filter, which SavedPost to fetch.
     * 
    **/
    where?: SavedPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedPosts to fetch.
     * 
    **/
    orderBy?: Enumerable<SavedPostOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SavedPosts.
     * 
    **/
    cursor?: SavedPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedPosts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedPosts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SavedPosts.
     * 
    **/
    distinct?: Enumerable<SavedPostScalarFieldEnum>
  }

  /**
   * SavedPost findFirst
   */
  export interface SavedPostFindFirstArgs extends SavedPostFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * SavedPost findFirstOrThrow
   */
  export type SavedPostFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the SavedPost
     * 
    **/
    select?: SavedPostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SavedPostInclude | null
    /**
     * Filter, which SavedPost to fetch.
     * 
    **/
    where?: SavedPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedPosts to fetch.
     * 
    **/
    orderBy?: Enumerable<SavedPostOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SavedPosts.
     * 
    **/
    cursor?: SavedPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedPosts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedPosts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SavedPosts.
     * 
    **/
    distinct?: Enumerable<SavedPostScalarFieldEnum>
  }


  /**
   * SavedPost findMany
   */
  export type SavedPostFindManyArgs = {
    /**
     * Select specific fields to fetch from the SavedPost
     * 
    **/
    select?: SavedPostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SavedPostInclude | null
    /**
     * Filter, which SavedPosts to fetch.
     * 
    **/
    where?: SavedPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedPosts to fetch.
     * 
    **/
    orderBy?: Enumerable<SavedPostOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SavedPosts.
     * 
    **/
    cursor?: SavedPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedPosts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedPosts.
     * 
    **/
    skip?: number
    distinct?: Enumerable<SavedPostScalarFieldEnum>
  }


  /**
   * SavedPost create
   */
  export type SavedPostCreateArgs = {
    /**
     * Select specific fields to fetch from the SavedPost
     * 
    **/
    select?: SavedPostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SavedPostInclude | null
    /**
     * The data needed to create a SavedPost.
     * 
    **/
    data: XOR<SavedPostCreateInput, SavedPostUncheckedCreateInput>
  }


  /**
   * SavedPost createMany
   */
  export type SavedPostCreateManyArgs = {
    /**
     * The data used to create many SavedPosts.
     * 
    **/
    data: Enumerable<SavedPostCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * SavedPost update
   */
  export type SavedPostUpdateArgs = {
    /**
     * Select specific fields to fetch from the SavedPost
     * 
    **/
    select?: SavedPostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SavedPostInclude | null
    /**
     * The data needed to update a SavedPost.
     * 
    **/
    data: XOR<SavedPostUpdateInput, SavedPostUncheckedUpdateInput>
    /**
     * Choose, which SavedPost to update.
     * 
    **/
    where: SavedPostWhereUniqueInput
  }


  /**
   * SavedPost updateMany
   */
  export type SavedPostUpdateManyArgs = {
    /**
     * The data used to update SavedPosts.
     * 
    **/
    data: XOR<SavedPostUpdateManyMutationInput, SavedPostUncheckedUpdateManyInput>
    /**
     * Filter which SavedPosts to update
     * 
    **/
    where?: SavedPostWhereInput
  }


  /**
   * SavedPost upsert
   */
  export type SavedPostUpsertArgs = {
    /**
     * Select specific fields to fetch from the SavedPost
     * 
    **/
    select?: SavedPostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SavedPostInclude | null
    /**
     * The filter to search for the SavedPost to update in case it exists.
     * 
    **/
    where: SavedPostWhereUniqueInput
    /**
     * In case the SavedPost found by the `where` argument doesn't exist, create a new SavedPost with this data.
     * 
    **/
    create: XOR<SavedPostCreateInput, SavedPostUncheckedCreateInput>
    /**
     * In case the SavedPost was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<SavedPostUpdateInput, SavedPostUncheckedUpdateInput>
  }


  /**
   * SavedPost delete
   */
  export type SavedPostDeleteArgs = {
    /**
     * Select specific fields to fetch from the SavedPost
     * 
    **/
    select?: SavedPostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SavedPostInclude | null
    /**
     * Filter which SavedPost to delete.
     * 
    **/
    where: SavedPostWhereUniqueInput
  }


  /**
   * SavedPost deleteMany
   */
  export type SavedPostDeleteManyArgs = {
    /**
     * Filter which SavedPosts to delete
     * 
    **/
    where?: SavedPostWhereInput
  }


  /**
   * SavedPost without action
   */
  export type SavedPostArgs = {
    /**
     * Select specific fields to fetch from the SavedPost
     * 
    **/
    select?: SavedPostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SavedPostInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const CategoryScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const LikedPostScalarFieldEnum: {
    postId: 'postId',
    userId: 'userId'
  };

  export type LikedPostScalarFieldEnum = (typeof LikedPostScalarFieldEnum)[keyof typeof LikedPostScalarFieldEnum]


  export const PostCategoryScalarFieldEnum: {
    postId: 'postId',
    categoryId: 'categoryId'
  };

  export type PostCategoryScalarFieldEnum = (typeof PostCategoryScalarFieldEnum)[keyof typeof PostCategoryScalarFieldEnum]


  export const PostScalarFieldEnum: {
    id: 'id',
    authorId: 'authorId',
    title: 'title',
    content: 'content',
    link: 'link',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type PostScalarFieldEnum = (typeof PostScalarFieldEnum)[keyof typeof PostScalarFieldEnum]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const SavedPostScalarFieldEnum: {
    postId: 'postId',
    userId: 'userId'
  };

  export type SavedPostScalarFieldEnum = (typeof SavedPostScalarFieldEnum)[keyof typeof SavedPostScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    displayName: 'displayName',
    login: 'login',
    twitchId: 'twitchId',
    isSubscriber: 'isSubscriber',
    isFollower: 'isFollower',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: Enumerable<UserWhereInput>
    OR?: Enumerable<UserWhereInput>
    NOT?: Enumerable<UserWhereInput>
    id?: IntFilter | number
    displayName?: StringFilter | string
    login?: StringFilter | string
    twitchId?: StringFilter | string
    isSubscriber?: BoolFilter | boolean
    isFollower?: BoolFilter | boolean
    role?: EnumRoleFilter | Role
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    deletedAt?: DateTimeNullableFilter | Date | string | null
    posts?: PostListRelationFilter
    likedPosts?: LikedPostListRelationFilter
    savedPosts?: SavedPostListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    displayName?: SortOrder
    login?: SortOrder
    twitchId?: SortOrder
    isSubscriber?: SortOrder
    isFollower?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    posts?: PostOrderByRelationAggregateInput
    likedPosts?: LikedPostOrderByRelationAggregateInput
    savedPosts?: SavedPostOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = {
    id?: number
  }

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    displayName?: SortOrder
    login?: SortOrder
    twitchId?: SortOrder
    isSubscriber?: SortOrder
    isFollower?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserScalarWhereWithAggregatesInput>
    OR?: Enumerable<UserScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UserScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    displayName?: StringWithAggregatesFilter | string
    login?: StringWithAggregatesFilter | string
    twitchId?: StringWithAggregatesFilter | string
    isSubscriber?: BoolWithAggregatesFilter | boolean
    isFollower?: BoolWithAggregatesFilter | boolean
    role?: EnumRoleWithAggregatesFilter | Role
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
  }

  export type CategoryWhereInput = {
    AND?: Enumerable<CategoryWhereInput>
    OR?: Enumerable<CategoryWhereInput>
    NOT?: Enumerable<CategoryWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    posts?: PostCategoryListRelationFilter
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    posts?: PostCategoryOrderByRelationAggregateInput
  }

  export type CategoryWhereUniqueInput = {
    id?: number
  }

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _avg?: CategoryAvgOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
    _sum?: CategorySumOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: Enumerable<CategoryScalarWhereWithAggregatesInput>
    OR?: Enumerable<CategoryScalarWhereWithAggregatesInput>
    NOT?: Enumerable<CategoryScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
  }

  export type PostCategoryWhereInput = {
    AND?: Enumerable<PostCategoryWhereInput>
    OR?: Enumerable<PostCategoryWhereInput>
    NOT?: Enumerable<PostCategoryWhereInput>
    post?: XOR<PostRelationFilter, PostWhereInput>
    postId?: IntFilter | number
    category?: XOR<CategoryRelationFilter, CategoryWhereInput>
    categoryId?: IntFilter | number
  }

  export type PostCategoryOrderByWithRelationInput = {
    post?: PostOrderByWithRelationInput
    postId?: SortOrder
    category?: CategoryOrderByWithRelationInput
    categoryId?: SortOrder
  }

  export type PostCategoryWhereUniqueInput = {
    postId_categoryId?: PostCategoryPostIdCategoryIdCompoundUniqueInput
  }

  export type PostCategoryOrderByWithAggregationInput = {
    postId?: SortOrder
    categoryId?: SortOrder
    _count?: PostCategoryCountOrderByAggregateInput
    _avg?: PostCategoryAvgOrderByAggregateInput
    _max?: PostCategoryMaxOrderByAggregateInput
    _min?: PostCategoryMinOrderByAggregateInput
    _sum?: PostCategorySumOrderByAggregateInput
  }

  export type PostCategoryScalarWhereWithAggregatesInput = {
    AND?: Enumerable<PostCategoryScalarWhereWithAggregatesInput>
    OR?: Enumerable<PostCategoryScalarWhereWithAggregatesInput>
    NOT?: Enumerable<PostCategoryScalarWhereWithAggregatesInput>
    postId?: IntWithAggregatesFilter | number
    categoryId?: IntWithAggregatesFilter | number
  }

  export type PostWhereInput = {
    AND?: Enumerable<PostWhereInput>
    OR?: Enumerable<PostWhereInput>
    NOT?: Enumerable<PostWhereInput>
    id?: IntFilter | number
    author?: XOR<UserRelationFilter, UserWhereInput>
    authorId?: IntFilter | number
    title?: StringFilter | string
    content?: StringFilter | string
    link?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    deletedAt?: DateTimeNullableFilter | Date | string | null
    categories?: PostCategoryListRelationFilter
    LikedPost?: LikedPostListRelationFilter
    SavedPost?: SavedPostListRelationFilter
  }

  export type PostOrderByWithRelationInput = {
    id?: SortOrder
    author?: UserOrderByWithRelationInput
    authorId?: SortOrder
    title?: SortOrder
    content?: SortOrder
    link?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    categories?: PostCategoryOrderByRelationAggregateInput
    LikedPost?: LikedPostOrderByRelationAggregateInput
    SavedPost?: SavedPostOrderByRelationAggregateInput
  }

  export type PostWhereUniqueInput = {
    id?: number
  }

  export type PostOrderByWithAggregationInput = {
    id?: SortOrder
    authorId?: SortOrder
    title?: SortOrder
    content?: SortOrder
    link?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
    _count?: PostCountOrderByAggregateInput
    _avg?: PostAvgOrderByAggregateInput
    _max?: PostMaxOrderByAggregateInput
    _min?: PostMinOrderByAggregateInput
    _sum?: PostSumOrderByAggregateInput
  }

  export type PostScalarWhereWithAggregatesInput = {
    AND?: Enumerable<PostScalarWhereWithAggregatesInput>
    OR?: Enumerable<PostScalarWhereWithAggregatesInput>
    NOT?: Enumerable<PostScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    authorId?: IntWithAggregatesFilter | number
    title?: StringWithAggregatesFilter | string
    content?: StringWithAggregatesFilter | string
    link?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
  }

  export type LikedPostWhereInput = {
    AND?: Enumerable<LikedPostWhereInput>
    OR?: Enumerable<LikedPostWhereInput>
    NOT?: Enumerable<LikedPostWhereInput>
    postId?: IntFilter | number
    userId?: IntFilter | number
    User?: XOR<UserRelationFilter, UserWhereInput>
    Post?: XOR<PostRelationFilter, PostWhereInput>
  }

  export type LikedPostOrderByWithRelationInput = {
    postId?: SortOrder
    userId?: SortOrder
    User?: UserOrderByWithRelationInput
    Post?: PostOrderByWithRelationInput
  }

  export type LikedPostWhereUniqueInput = {
    userId_postId?: LikedPostUserIdPostIdCompoundUniqueInput
  }

  export type LikedPostOrderByWithAggregationInput = {
    postId?: SortOrder
    userId?: SortOrder
    _count?: LikedPostCountOrderByAggregateInput
    _avg?: LikedPostAvgOrderByAggregateInput
    _max?: LikedPostMaxOrderByAggregateInput
    _min?: LikedPostMinOrderByAggregateInput
    _sum?: LikedPostSumOrderByAggregateInput
  }

  export type LikedPostScalarWhereWithAggregatesInput = {
    AND?: Enumerable<LikedPostScalarWhereWithAggregatesInput>
    OR?: Enumerable<LikedPostScalarWhereWithAggregatesInput>
    NOT?: Enumerable<LikedPostScalarWhereWithAggregatesInput>
    postId?: IntWithAggregatesFilter | number
    userId?: IntWithAggregatesFilter | number
  }

  export type SavedPostWhereInput = {
    AND?: Enumerable<SavedPostWhereInput>
    OR?: Enumerable<SavedPostWhereInput>
    NOT?: Enumerable<SavedPostWhereInput>
    postId?: IntFilter | number
    userId?: IntFilter | number
    User?: XOR<UserRelationFilter, UserWhereInput>
    Post?: XOR<PostRelationFilter, PostWhereInput>
  }

  export type SavedPostOrderByWithRelationInput = {
    postId?: SortOrder
    userId?: SortOrder
    User?: UserOrderByWithRelationInput
    Post?: PostOrderByWithRelationInput
  }

  export type SavedPostWhereUniqueInput = {
    userId_postId?: SavedPostUserIdPostIdCompoundUniqueInput
  }

  export type SavedPostOrderByWithAggregationInput = {
    postId?: SortOrder
    userId?: SortOrder
    _count?: SavedPostCountOrderByAggregateInput
    _avg?: SavedPostAvgOrderByAggregateInput
    _max?: SavedPostMaxOrderByAggregateInput
    _min?: SavedPostMinOrderByAggregateInput
    _sum?: SavedPostSumOrderByAggregateInput
  }

  export type SavedPostScalarWhereWithAggregatesInput = {
    AND?: Enumerable<SavedPostScalarWhereWithAggregatesInput>
    OR?: Enumerable<SavedPostScalarWhereWithAggregatesInput>
    NOT?: Enumerable<SavedPostScalarWhereWithAggregatesInput>
    postId?: IntWithAggregatesFilter | number
    userId?: IntWithAggregatesFilter | number
  }

  export type UserCreateInput = {
    displayName: string
    login: string
    twitchId: string
    isSubscriber: boolean
    isFollower: boolean
    role: Role
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    posts?: PostCreateNestedManyWithoutAuthorInput
    likedPosts?: LikedPostCreateNestedManyWithoutUserInput
    savedPosts?: SavedPostCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    displayName: string
    login: string
    twitchId: string
    isSubscriber: boolean
    isFollower: boolean
    role: Role
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    posts?: PostUncheckedCreateNestedManyWithoutAuthorInput
    likedPosts?: LikedPostUncheckedCreateNestedManyWithoutUserInput
    savedPosts?: SavedPostUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    displayName?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    twitchId?: StringFieldUpdateOperationsInput | string
    isSubscriber?: BoolFieldUpdateOperationsInput | boolean
    isFollower?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumRoleFieldUpdateOperationsInput | Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    posts?: PostUpdateManyWithoutAuthorNestedInput
    likedPosts?: LikedPostUpdateManyWithoutUserNestedInput
    savedPosts?: SavedPostUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    displayName?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    twitchId?: StringFieldUpdateOperationsInput | string
    isSubscriber?: BoolFieldUpdateOperationsInput | boolean
    isFollower?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumRoleFieldUpdateOperationsInput | Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    posts?: PostUncheckedUpdateManyWithoutAuthorNestedInput
    likedPosts?: LikedPostUncheckedUpdateManyWithoutUserNestedInput
    savedPosts?: SavedPostUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    displayName: string
    login: string
    twitchId: string
    isSubscriber: boolean
    isFollower: boolean
    role: Role
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    displayName?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    twitchId?: StringFieldUpdateOperationsInput | string
    isSubscriber?: BoolFieldUpdateOperationsInput | boolean
    isFollower?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumRoleFieldUpdateOperationsInput | Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    displayName?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    twitchId?: StringFieldUpdateOperationsInput | string
    isSubscriber?: BoolFieldUpdateOperationsInput | boolean
    isFollower?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumRoleFieldUpdateOperationsInput | Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CategoryCreateInput = {
    name: string
    posts?: PostCategoryCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateInput = {
    id?: number
    name: string
    posts?: PostCategoryUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    posts?: PostCategoryUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    posts?: PostCategoryUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateManyInput = {
    id?: number
    name: string
  }

  export type CategoryUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type PostCategoryCreateInput = {
    post: PostCreateNestedOneWithoutCategoriesInput
    category: CategoryCreateNestedOneWithoutPostsInput
  }

  export type PostCategoryUncheckedCreateInput = {
    postId: number
    categoryId: number
  }

  export type PostCategoryUpdateInput = {
    post?: PostUpdateOneRequiredWithoutCategoriesNestedInput
    category?: CategoryUpdateOneRequiredWithoutPostsNestedInput
  }

  export type PostCategoryUncheckedUpdateInput = {
    postId?: IntFieldUpdateOperationsInput | number
    categoryId?: IntFieldUpdateOperationsInput | number
  }

  export type PostCategoryCreateManyInput = {
    postId: number
    categoryId: number
  }

  export type PostCategoryUpdateManyMutationInput = {

  }

  export type PostCategoryUncheckedUpdateManyInput = {
    postId?: IntFieldUpdateOperationsInput | number
    categoryId?: IntFieldUpdateOperationsInput | number
  }

  export type PostCreateInput = {
    author: UserCreateNestedOneWithoutPostsInput
    title: string
    content: string
    link: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    categories?: PostCategoryCreateNestedManyWithoutPostInput
    LikedPost?: LikedPostCreateNestedManyWithoutPostInput
    SavedPost?: SavedPostCreateNestedManyWithoutPostInput
  }

  export type PostUncheckedCreateInput = {
    id?: number
    authorId: number
    title: string
    content: string
    link: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    categories?: PostCategoryUncheckedCreateNestedManyWithoutPostInput
    LikedPost?: LikedPostUncheckedCreateNestedManyWithoutPostInput
    SavedPost?: SavedPostUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostUpdateInput = {
    author?: UserUpdateOneRequiredWithoutPostsNestedInput
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    categories?: PostCategoryUpdateManyWithoutPostNestedInput
    LikedPost?: LikedPostUpdateManyWithoutPostNestedInput
    SavedPost?: SavedPostUpdateManyWithoutPostNestedInput
  }

  export type PostUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    authorId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    categories?: PostCategoryUncheckedUpdateManyWithoutPostNestedInput
    LikedPost?: LikedPostUncheckedUpdateManyWithoutPostNestedInput
    SavedPost?: SavedPostUncheckedUpdateManyWithoutPostNestedInput
  }

  export type PostCreateManyInput = {
    id?: number
    authorId: number
    title: string
    content: string
    link: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type PostUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PostUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    authorId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type LikedPostCreateInput = {
    User: UserCreateNestedOneWithoutLikedPostsInput
    Post: PostCreateNestedOneWithoutLikedPostInput
  }

  export type LikedPostUncheckedCreateInput = {
    postId: number
    userId: number
  }

  export type LikedPostUpdateInput = {
    User?: UserUpdateOneRequiredWithoutLikedPostsNestedInput
    Post?: PostUpdateOneRequiredWithoutLikedPostNestedInput
  }

  export type LikedPostUncheckedUpdateInput = {
    postId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type LikedPostCreateManyInput = {
    postId: number
    userId: number
  }

  export type LikedPostUpdateManyMutationInput = {

  }

  export type LikedPostUncheckedUpdateManyInput = {
    postId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type SavedPostCreateInput = {
    User: UserCreateNestedOneWithoutSavedPostsInput
    Post: PostCreateNestedOneWithoutSavedPostInput
  }

  export type SavedPostUncheckedCreateInput = {
    postId: number
    userId: number
  }

  export type SavedPostUpdateInput = {
    User?: UserUpdateOneRequiredWithoutSavedPostsNestedInput
    Post?: PostUpdateOneRequiredWithoutSavedPostNestedInput
  }

  export type SavedPostUncheckedUpdateInput = {
    postId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type SavedPostCreateManyInput = {
    postId: number
    userId: number
  }

  export type SavedPostUpdateManyMutationInput = {

  }

  export type SavedPostUncheckedUpdateManyInput = {
    postId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type EnumRoleFilter = {
    equals?: Role
    in?: Enumerable<Role>
    notIn?: Enumerable<Role>
    not?: NestedEnumRoleFilter | Role
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type DateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type PostListRelationFilter = {
    every?: PostWhereInput
    some?: PostWhereInput
    none?: PostWhereInput
  }

  export type LikedPostListRelationFilter = {
    every?: LikedPostWhereInput
    some?: LikedPostWhereInput
    none?: LikedPostWhereInput
  }

  export type SavedPostListRelationFilter = {
    every?: SavedPostWhereInput
    some?: SavedPostWhereInput
    none?: SavedPostWhereInput
  }

  export type PostOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LikedPostOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SavedPostOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    displayName?: SortOrder
    login?: SortOrder
    twitchId?: SortOrder
    isSubscriber?: SortOrder
    isFollower?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    displayName?: SortOrder
    login?: SortOrder
    twitchId?: SortOrder
    isSubscriber?: SortOrder
    isFollower?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    displayName?: SortOrder
    login?: SortOrder
    twitchId?: SortOrder
    isSubscriber?: SortOrder
    isFollower?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type BoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type EnumRoleWithAggregatesFilter = {
    equals?: Role
    in?: Enumerable<Role>
    notIn?: Enumerable<Role>
    not?: NestedEnumRoleWithAggregatesFilter | Role
    _count?: NestedIntFilter
    _min?: NestedEnumRoleFilter
    _max?: NestedEnumRoleFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type DateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type PostCategoryListRelationFilter = {
    every?: PostCategoryWhereInput
    some?: PostCategoryWhereInput
    none?: PostCategoryWhereInput
  }

  export type PostCategoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type CategoryAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type CategorySumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PostRelationFilter = {
    is?: PostWhereInput
    isNot?: PostWhereInput
  }

  export type CategoryRelationFilter = {
    is?: CategoryWhereInput
    isNot?: CategoryWhereInput
  }

  export type PostCategoryPostIdCategoryIdCompoundUniqueInput = {
    postId: number
    categoryId: number
  }

  export type PostCategoryCountOrderByAggregateInput = {
    postId?: SortOrder
    categoryId?: SortOrder
  }

  export type PostCategoryAvgOrderByAggregateInput = {
    postId?: SortOrder
    categoryId?: SortOrder
  }

  export type PostCategoryMaxOrderByAggregateInput = {
    postId?: SortOrder
    categoryId?: SortOrder
  }

  export type PostCategoryMinOrderByAggregateInput = {
    postId?: SortOrder
    categoryId?: SortOrder
  }

  export type PostCategorySumOrderByAggregateInput = {
    postId?: SortOrder
    categoryId?: SortOrder
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type PostCountOrderByAggregateInput = {
    id?: SortOrder
    authorId?: SortOrder
    title?: SortOrder
    content?: SortOrder
    link?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type PostAvgOrderByAggregateInput = {
    id?: SortOrder
    authorId?: SortOrder
  }

  export type PostMaxOrderByAggregateInput = {
    id?: SortOrder
    authorId?: SortOrder
    title?: SortOrder
    content?: SortOrder
    link?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type PostMinOrderByAggregateInput = {
    id?: SortOrder
    authorId?: SortOrder
    title?: SortOrder
    content?: SortOrder
    link?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type PostSumOrderByAggregateInput = {
    id?: SortOrder
    authorId?: SortOrder
  }

  export type LikedPostUserIdPostIdCompoundUniqueInput = {
    userId: number
    postId: number
  }

  export type LikedPostCountOrderByAggregateInput = {
    postId?: SortOrder
    userId?: SortOrder
  }

  export type LikedPostAvgOrderByAggregateInput = {
    postId?: SortOrder
    userId?: SortOrder
  }

  export type LikedPostMaxOrderByAggregateInput = {
    postId?: SortOrder
    userId?: SortOrder
  }

  export type LikedPostMinOrderByAggregateInput = {
    postId?: SortOrder
    userId?: SortOrder
  }

  export type LikedPostSumOrderByAggregateInput = {
    postId?: SortOrder
    userId?: SortOrder
  }

  export type SavedPostUserIdPostIdCompoundUniqueInput = {
    userId: number
    postId: number
  }

  export type SavedPostCountOrderByAggregateInput = {
    postId?: SortOrder
    userId?: SortOrder
  }

  export type SavedPostAvgOrderByAggregateInput = {
    postId?: SortOrder
    userId?: SortOrder
  }

  export type SavedPostMaxOrderByAggregateInput = {
    postId?: SortOrder
    userId?: SortOrder
  }

  export type SavedPostMinOrderByAggregateInput = {
    postId?: SortOrder
    userId?: SortOrder
  }

  export type SavedPostSumOrderByAggregateInput = {
    postId?: SortOrder
    userId?: SortOrder
  }

  export type PostCreateNestedManyWithoutAuthorInput = {
    create?: XOR<Enumerable<PostCreateWithoutAuthorInput>, Enumerable<PostUncheckedCreateWithoutAuthorInput>>
    connectOrCreate?: Enumerable<PostCreateOrConnectWithoutAuthorInput>
    createMany?: PostCreateManyAuthorInputEnvelope
    connect?: Enumerable<PostWhereUniqueInput>
  }

  export type LikedPostCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<LikedPostCreateWithoutUserInput>, Enumerable<LikedPostUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<LikedPostCreateOrConnectWithoutUserInput>
    createMany?: LikedPostCreateManyUserInputEnvelope
    connect?: Enumerable<LikedPostWhereUniqueInput>
  }

  export type SavedPostCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<SavedPostCreateWithoutUserInput>, Enumerable<SavedPostUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<SavedPostCreateOrConnectWithoutUserInput>
    createMany?: SavedPostCreateManyUserInputEnvelope
    connect?: Enumerable<SavedPostWhereUniqueInput>
  }

  export type PostUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<Enumerable<PostCreateWithoutAuthorInput>, Enumerable<PostUncheckedCreateWithoutAuthorInput>>
    connectOrCreate?: Enumerable<PostCreateOrConnectWithoutAuthorInput>
    createMany?: PostCreateManyAuthorInputEnvelope
    connect?: Enumerable<PostWhereUniqueInput>
  }

  export type LikedPostUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<LikedPostCreateWithoutUserInput>, Enumerable<LikedPostUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<LikedPostCreateOrConnectWithoutUserInput>
    createMany?: LikedPostCreateManyUserInputEnvelope
    connect?: Enumerable<LikedPostWhereUniqueInput>
  }

  export type SavedPostUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<SavedPostCreateWithoutUserInput>, Enumerable<SavedPostUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<SavedPostCreateOrConnectWithoutUserInput>
    createMany?: SavedPostCreateManyUserInputEnvelope
    connect?: Enumerable<SavedPostWhereUniqueInput>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type PostUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<Enumerable<PostCreateWithoutAuthorInput>, Enumerable<PostUncheckedCreateWithoutAuthorInput>>
    connectOrCreate?: Enumerable<PostCreateOrConnectWithoutAuthorInput>
    upsert?: Enumerable<PostUpsertWithWhereUniqueWithoutAuthorInput>
    createMany?: PostCreateManyAuthorInputEnvelope
    set?: Enumerable<PostWhereUniqueInput>
    disconnect?: Enumerable<PostWhereUniqueInput>
    delete?: Enumerable<PostWhereUniqueInput>
    connect?: Enumerable<PostWhereUniqueInput>
    update?: Enumerable<PostUpdateWithWhereUniqueWithoutAuthorInput>
    updateMany?: Enumerable<PostUpdateManyWithWhereWithoutAuthorInput>
    deleteMany?: Enumerable<PostScalarWhereInput>
  }

  export type LikedPostUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<LikedPostCreateWithoutUserInput>, Enumerable<LikedPostUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<LikedPostCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<LikedPostUpsertWithWhereUniqueWithoutUserInput>
    createMany?: LikedPostCreateManyUserInputEnvelope
    set?: Enumerable<LikedPostWhereUniqueInput>
    disconnect?: Enumerable<LikedPostWhereUniqueInput>
    delete?: Enumerable<LikedPostWhereUniqueInput>
    connect?: Enumerable<LikedPostWhereUniqueInput>
    update?: Enumerable<LikedPostUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<LikedPostUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<LikedPostScalarWhereInput>
  }

  export type SavedPostUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<SavedPostCreateWithoutUserInput>, Enumerable<SavedPostUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<SavedPostCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<SavedPostUpsertWithWhereUniqueWithoutUserInput>
    createMany?: SavedPostCreateManyUserInputEnvelope
    set?: Enumerable<SavedPostWhereUniqueInput>
    disconnect?: Enumerable<SavedPostWhereUniqueInput>
    delete?: Enumerable<SavedPostWhereUniqueInput>
    connect?: Enumerable<SavedPostWhereUniqueInput>
    update?: Enumerable<SavedPostUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<SavedPostUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<SavedPostScalarWhereInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PostUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<Enumerable<PostCreateWithoutAuthorInput>, Enumerable<PostUncheckedCreateWithoutAuthorInput>>
    connectOrCreate?: Enumerable<PostCreateOrConnectWithoutAuthorInput>
    upsert?: Enumerable<PostUpsertWithWhereUniqueWithoutAuthorInput>
    createMany?: PostCreateManyAuthorInputEnvelope
    set?: Enumerable<PostWhereUniqueInput>
    disconnect?: Enumerable<PostWhereUniqueInput>
    delete?: Enumerable<PostWhereUniqueInput>
    connect?: Enumerable<PostWhereUniqueInput>
    update?: Enumerable<PostUpdateWithWhereUniqueWithoutAuthorInput>
    updateMany?: Enumerable<PostUpdateManyWithWhereWithoutAuthorInput>
    deleteMany?: Enumerable<PostScalarWhereInput>
  }

  export type LikedPostUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<LikedPostCreateWithoutUserInput>, Enumerable<LikedPostUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<LikedPostCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<LikedPostUpsertWithWhereUniqueWithoutUserInput>
    createMany?: LikedPostCreateManyUserInputEnvelope
    set?: Enumerable<LikedPostWhereUniqueInput>
    disconnect?: Enumerable<LikedPostWhereUniqueInput>
    delete?: Enumerable<LikedPostWhereUniqueInput>
    connect?: Enumerable<LikedPostWhereUniqueInput>
    update?: Enumerable<LikedPostUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<LikedPostUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<LikedPostScalarWhereInput>
  }

  export type SavedPostUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<SavedPostCreateWithoutUserInput>, Enumerable<SavedPostUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<SavedPostCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<SavedPostUpsertWithWhereUniqueWithoutUserInput>
    createMany?: SavedPostCreateManyUserInputEnvelope
    set?: Enumerable<SavedPostWhereUniqueInput>
    disconnect?: Enumerable<SavedPostWhereUniqueInput>
    delete?: Enumerable<SavedPostWhereUniqueInput>
    connect?: Enumerable<SavedPostWhereUniqueInput>
    update?: Enumerable<SavedPostUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<SavedPostUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<SavedPostScalarWhereInput>
  }

  export type PostCategoryCreateNestedManyWithoutCategoryInput = {
    create?: XOR<Enumerable<PostCategoryCreateWithoutCategoryInput>, Enumerable<PostCategoryUncheckedCreateWithoutCategoryInput>>
    connectOrCreate?: Enumerable<PostCategoryCreateOrConnectWithoutCategoryInput>
    createMany?: PostCategoryCreateManyCategoryInputEnvelope
    connect?: Enumerable<PostCategoryWhereUniqueInput>
  }

  export type PostCategoryUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<Enumerable<PostCategoryCreateWithoutCategoryInput>, Enumerable<PostCategoryUncheckedCreateWithoutCategoryInput>>
    connectOrCreate?: Enumerable<PostCategoryCreateOrConnectWithoutCategoryInput>
    createMany?: PostCategoryCreateManyCategoryInputEnvelope
    connect?: Enumerable<PostCategoryWhereUniqueInput>
  }

  export type PostCategoryUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<Enumerable<PostCategoryCreateWithoutCategoryInput>, Enumerable<PostCategoryUncheckedCreateWithoutCategoryInput>>
    connectOrCreate?: Enumerable<PostCategoryCreateOrConnectWithoutCategoryInput>
    upsert?: Enumerable<PostCategoryUpsertWithWhereUniqueWithoutCategoryInput>
    createMany?: PostCategoryCreateManyCategoryInputEnvelope
    set?: Enumerable<PostCategoryWhereUniqueInput>
    disconnect?: Enumerable<PostCategoryWhereUniqueInput>
    delete?: Enumerable<PostCategoryWhereUniqueInput>
    connect?: Enumerable<PostCategoryWhereUniqueInput>
    update?: Enumerable<PostCategoryUpdateWithWhereUniqueWithoutCategoryInput>
    updateMany?: Enumerable<PostCategoryUpdateManyWithWhereWithoutCategoryInput>
    deleteMany?: Enumerable<PostCategoryScalarWhereInput>
  }

  export type PostCategoryUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<Enumerable<PostCategoryCreateWithoutCategoryInput>, Enumerable<PostCategoryUncheckedCreateWithoutCategoryInput>>
    connectOrCreate?: Enumerable<PostCategoryCreateOrConnectWithoutCategoryInput>
    upsert?: Enumerable<PostCategoryUpsertWithWhereUniqueWithoutCategoryInput>
    createMany?: PostCategoryCreateManyCategoryInputEnvelope
    set?: Enumerable<PostCategoryWhereUniqueInput>
    disconnect?: Enumerable<PostCategoryWhereUniqueInput>
    delete?: Enumerable<PostCategoryWhereUniqueInput>
    connect?: Enumerable<PostCategoryWhereUniqueInput>
    update?: Enumerable<PostCategoryUpdateWithWhereUniqueWithoutCategoryInput>
    updateMany?: Enumerable<PostCategoryUpdateManyWithWhereWithoutCategoryInput>
    deleteMany?: Enumerable<PostCategoryScalarWhereInput>
  }

  export type PostCreateNestedOneWithoutCategoriesInput = {
    create?: XOR<PostCreateWithoutCategoriesInput, PostUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: PostCreateOrConnectWithoutCategoriesInput
    connect?: PostWhereUniqueInput
  }

  export type CategoryCreateNestedOneWithoutPostsInput = {
    create?: XOR<CategoryCreateWithoutPostsInput, CategoryUncheckedCreateWithoutPostsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutPostsInput
    connect?: CategoryWhereUniqueInput
  }

  export type PostUpdateOneRequiredWithoutCategoriesNestedInput = {
    create?: XOR<PostCreateWithoutCategoriesInput, PostUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: PostCreateOrConnectWithoutCategoriesInput
    upsert?: PostUpsertWithoutCategoriesInput
    connect?: PostWhereUniqueInput
    update?: XOR<PostUpdateWithoutCategoriesInput, PostUncheckedUpdateWithoutCategoriesInput>
  }

  export type CategoryUpdateOneRequiredWithoutPostsNestedInput = {
    create?: XOR<CategoryCreateWithoutPostsInput, CategoryUncheckedCreateWithoutPostsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutPostsInput
    upsert?: CategoryUpsertWithoutPostsInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<CategoryUpdateWithoutPostsInput, CategoryUncheckedUpdateWithoutPostsInput>
  }

  export type UserCreateNestedOneWithoutPostsInput = {
    create?: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostsInput
    connect?: UserWhereUniqueInput
  }

  export type PostCategoryCreateNestedManyWithoutPostInput = {
    create?: XOR<Enumerable<PostCategoryCreateWithoutPostInput>, Enumerable<PostCategoryUncheckedCreateWithoutPostInput>>
    connectOrCreate?: Enumerable<PostCategoryCreateOrConnectWithoutPostInput>
    createMany?: PostCategoryCreateManyPostInputEnvelope
    connect?: Enumerable<PostCategoryWhereUniqueInput>
  }

  export type LikedPostCreateNestedManyWithoutPostInput = {
    create?: XOR<Enumerable<LikedPostCreateWithoutPostInput>, Enumerable<LikedPostUncheckedCreateWithoutPostInput>>
    connectOrCreate?: Enumerable<LikedPostCreateOrConnectWithoutPostInput>
    createMany?: LikedPostCreateManyPostInputEnvelope
    connect?: Enumerable<LikedPostWhereUniqueInput>
  }

  export type SavedPostCreateNestedManyWithoutPostInput = {
    create?: XOR<Enumerable<SavedPostCreateWithoutPostInput>, Enumerable<SavedPostUncheckedCreateWithoutPostInput>>
    connectOrCreate?: Enumerable<SavedPostCreateOrConnectWithoutPostInput>
    createMany?: SavedPostCreateManyPostInputEnvelope
    connect?: Enumerable<SavedPostWhereUniqueInput>
  }

  export type PostCategoryUncheckedCreateNestedManyWithoutPostInput = {
    create?: XOR<Enumerable<PostCategoryCreateWithoutPostInput>, Enumerable<PostCategoryUncheckedCreateWithoutPostInput>>
    connectOrCreate?: Enumerable<PostCategoryCreateOrConnectWithoutPostInput>
    createMany?: PostCategoryCreateManyPostInputEnvelope
    connect?: Enumerable<PostCategoryWhereUniqueInput>
  }

  export type LikedPostUncheckedCreateNestedManyWithoutPostInput = {
    create?: XOR<Enumerable<LikedPostCreateWithoutPostInput>, Enumerable<LikedPostUncheckedCreateWithoutPostInput>>
    connectOrCreate?: Enumerable<LikedPostCreateOrConnectWithoutPostInput>
    createMany?: LikedPostCreateManyPostInputEnvelope
    connect?: Enumerable<LikedPostWhereUniqueInput>
  }

  export type SavedPostUncheckedCreateNestedManyWithoutPostInput = {
    create?: XOR<Enumerable<SavedPostCreateWithoutPostInput>, Enumerable<SavedPostUncheckedCreateWithoutPostInput>>
    connectOrCreate?: Enumerable<SavedPostCreateOrConnectWithoutPostInput>
    createMany?: SavedPostCreateManyPostInputEnvelope
    connect?: Enumerable<SavedPostWhereUniqueInput>
  }

  export type UserUpdateOneRequiredWithoutPostsNestedInput = {
    create?: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostsInput
    upsert?: UserUpsertWithoutPostsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutPostsInput, UserUncheckedUpdateWithoutPostsInput>
  }

  export type PostCategoryUpdateManyWithoutPostNestedInput = {
    create?: XOR<Enumerable<PostCategoryCreateWithoutPostInput>, Enumerable<PostCategoryUncheckedCreateWithoutPostInput>>
    connectOrCreate?: Enumerable<PostCategoryCreateOrConnectWithoutPostInput>
    upsert?: Enumerable<PostCategoryUpsertWithWhereUniqueWithoutPostInput>
    createMany?: PostCategoryCreateManyPostInputEnvelope
    set?: Enumerable<PostCategoryWhereUniqueInput>
    disconnect?: Enumerable<PostCategoryWhereUniqueInput>
    delete?: Enumerable<PostCategoryWhereUniqueInput>
    connect?: Enumerable<PostCategoryWhereUniqueInput>
    update?: Enumerable<PostCategoryUpdateWithWhereUniqueWithoutPostInput>
    updateMany?: Enumerable<PostCategoryUpdateManyWithWhereWithoutPostInput>
    deleteMany?: Enumerable<PostCategoryScalarWhereInput>
  }

  export type LikedPostUpdateManyWithoutPostNestedInput = {
    create?: XOR<Enumerable<LikedPostCreateWithoutPostInput>, Enumerable<LikedPostUncheckedCreateWithoutPostInput>>
    connectOrCreate?: Enumerable<LikedPostCreateOrConnectWithoutPostInput>
    upsert?: Enumerable<LikedPostUpsertWithWhereUniqueWithoutPostInput>
    createMany?: LikedPostCreateManyPostInputEnvelope
    set?: Enumerable<LikedPostWhereUniqueInput>
    disconnect?: Enumerable<LikedPostWhereUniqueInput>
    delete?: Enumerable<LikedPostWhereUniqueInput>
    connect?: Enumerable<LikedPostWhereUniqueInput>
    update?: Enumerable<LikedPostUpdateWithWhereUniqueWithoutPostInput>
    updateMany?: Enumerable<LikedPostUpdateManyWithWhereWithoutPostInput>
    deleteMany?: Enumerable<LikedPostScalarWhereInput>
  }

  export type SavedPostUpdateManyWithoutPostNestedInput = {
    create?: XOR<Enumerable<SavedPostCreateWithoutPostInput>, Enumerable<SavedPostUncheckedCreateWithoutPostInput>>
    connectOrCreate?: Enumerable<SavedPostCreateOrConnectWithoutPostInput>
    upsert?: Enumerable<SavedPostUpsertWithWhereUniqueWithoutPostInput>
    createMany?: SavedPostCreateManyPostInputEnvelope
    set?: Enumerable<SavedPostWhereUniqueInput>
    disconnect?: Enumerable<SavedPostWhereUniqueInput>
    delete?: Enumerable<SavedPostWhereUniqueInput>
    connect?: Enumerable<SavedPostWhereUniqueInput>
    update?: Enumerable<SavedPostUpdateWithWhereUniqueWithoutPostInput>
    updateMany?: Enumerable<SavedPostUpdateManyWithWhereWithoutPostInput>
    deleteMany?: Enumerable<SavedPostScalarWhereInput>
  }

  export type PostCategoryUncheckedUpdateManyWithoutPostNestedInput = {
    create?: XOR<Enumerable<PostCategoryCreateWithoutPostInput>, Enumerable<PostCategoryUncheckedCreateWithoutPostInput>>
    connectOrCreate?: Enumerable<PostCategoryCreateOrConnectWithoutPostInput>
    upsert?: Enumerable<PostCategoryUpsertWithWhereUniqueWithoutPostInput>
    createMany?: PostCategoryCreateManyPostInputEnvelope
    set?: Enumerable<PostCategoryWhereUniqueInput>
    disconnect?: Enumerable<PostCategoryWhereUniqueInput>
    delete?: Enumerable<PostCategoryWhereUniqueInput>
    connect?: Enumerable<PostCategoryWhereUniqueInput>
    update?: Enumerable<PostCategoryUpdateWithWhereUniqueWithoutPostInput>
    updateMany?: Enumerable<PostCategoryUpdateManyWithWhereWithoutPostInput>
    deleteMany?: Enumerable<PostCategoryScalarWhereInput>
  }

  export type LikedPostUncheckedUpdateManyWithoutPostNestedInput = {
    create?: XOR<Enumerable<LikedPostCreateWithoutPostInput>, Enumerable<LikedPostUncheckedCreateWithoutPostInput>>
    connectOrCreate?: Enumerable<LikedPostCreateOrConnectWithoutPostInput>
    upsert?: Enumerable<LikedPostUpsertWithWhereUniqueWithoutPostInput>
    createMany?: LikedPostCreateManyPostInputEnvelope
    set?: Enumerable<LikedPostWhereUniqueInput>
    disconnect?: Enumerable<LikedPostWhereUniqueInput>
    delete?: Enumerable<LikedPostWhereUniqueInput>
    connect?: Enumerable<LikedPostWhereUniqueInput>
    update?: Enumerable<LikedPostUpdateWithWhereUniqueWithoutPostInput>
    updateMany?: Enumerable<LikedPostUpdateManyWithWhereWithoutPostInput>
    deleteMany?: Enumerable<LikedPostScalarWhereInput>
  }

  export type SavedPostUncheckedUpdateManyWithoutPostNestedInput = {
    create?: XOR<Enumerable<SavedPostCreateWithoutPostInput>, Enumerable<SavedPostUncheckedCreateWithoutPostInput>>
    connectOrCreate?: Enumerable<SavedPostCreateOrConnectWithoutPostInput>
    upsert?: Enumerable<SavedPostUpsertWithWhereUniqueWithoutPostInput>
    createMany?: SavedPostCreateManyPostInputEnvelope
    set?: Enumerable<SavedPostWhereUniqueInput>
    disconnect?: Enumerable<SavedPostWhereUniqueInput>
    delete?: Enumerable<SavedPostWhereUniqueInput>
    connect?: Enumerable<SavedPostWhereUniqueInput>
    update?: Enumerable<SavedPostUpdateWithWhereUniqueWithoutPostInput>
    updateMany?: Enumerable<SavedPostUpdateManyWithWhereWithoutPostInput>
    deleteMany?: Enumerable<SavedPostScalarWhereInput>
  }

  export type UserCreateNestedOneWithoutLikedPostsInput = {
    create?: XOR<UserCreateWithoutLikedPostsInput, UserUncheckedCreateWithoutLikedPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutLikedPostsInput
    connect?: UserWhereUniqueInput
  }

  export type PostCreateNestedOneWithoutLikedPostInput = {
    create?: XOR<PostCreateWithoutLikedPostInput, PostUncheckedCreateWithoutLikedPostInput>
    connectOrCreate?: PostCreateOrConnectWithoutLikedPostInput
    connect?: PostWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutLikedPostsNestedInput = {
    create?: XOR<UserCreateWithoutLikedPostsInput, UserUncheckedCreateWithoutLikedPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutLikedPostsInput
    upsert?: UserUpsertWithoutLikedPostsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutLikedPostsInput, UserUncheckedUpdateWithoutLikedPostsInput>
  }

  export type PostUpdateOneRequiredWithoutLikedPostNestedInput = {
    create?: XOR<PostCreateWithoutLikedPostInput, PostUncheckedCreateWithoutLikedPostInput>
    connectOrCreate?: PostCreateOrConnectWithoutLikedPostInput
    upsert?: PostUpsertWithoutLikedPostInput
    connect?: PostWhereUniqueInput
    update?: XOR<PostUpdateWithoutLikedPostInput, PostUncheckedUpdateWithoutLikedPostInput>
  }

  export type UserCreateNestedOneWithoutSavedPostsInput = {
    create?: XOR<UserCreateWithoutSavedPostsInput, UserUncheckedCreateWithoutSavedPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSavedPostsInput
    connect?: UserWhereUniqueInput
  }

  export type PostCreateNestedOneWithoutSavedPostInput = {
    create?: XOR<PostCreateWithoutSavedPostInput, PostUncheckedCreateWithoutSavedPostInput>
    connectOrCreate?: PostCreateOrConnectWithoutSavedPostInput
    connect?: PostWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSavedPostsNestedInput = {
    create?: XOR<UserCreateWithoutSavedPostsInput, UserUncheckedCreateWithoutSavedPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSavedPostsInput
    upsert?: UserUpsertWithoutSavedPostsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutSavedPostsInput, UserUncheckedUpdateWithoutSavedPostsInput>
  }

  export type PostUpdateOneRequiredWithoutSavedPostNestedInput = {
    create?: XOR<PostCreateWithoutSavedPostInput, PostUncheckedCreateWithoutSavedPostInput>
    connectOrCreate?: PostCreateOrConnectWithoutSavedPostInput
    upsert?: PostUpsertWithoutSavedPostInput
    connect?: PostWhereUniqueInput
    update?: XOR<PostUpdateWithoutSavedPostInput, PostUncheckedUpdateWithoutSavedPostInput>
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedBoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type NestedEnumRoleFilter = {
    equals?: Role
    in?: Enumerable<Role>
    notIn?: Enumerable<Role>
    not?: NestedEnumRoleFilter | Role
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedDateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedBoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type NestedEnumRoleWithAggregatesFilter = {
    equals?: Role
    in?: Enumerable<Role>
    notIn?: Enumerable<Role>
    not?: NestedEnumRoleWithAggregatesFilter | Role
    _count?: NestedIntFilter
    _min?: NestedEnumRoleFilter
    _max?: NestedEnumRoleFilter
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type NestedDateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type PostCreateWithoutAuthorInput = {
    title: string
    content: string
    link: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    categories?: PostCategoryCreateNestedManyWithoutPostInput
    LikedPost?: LikedPostCreateNestedManyWithoutPostInput
    SavedPost?: SavedPostCreateNestedManyWithoutPostInput
  }

  export type PostUncheckedCreateWithoutAuthorInput = {
    id?: number
    title: string
    content: string
    link: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    categories?: PostCategoryUncheckedCreateNestedManyWithoutPostInput
    LikedPost?: LikedPostUncheckedCreateNestedManyWithoutPostInput
    SavedPost?: SavedPostUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostCreateOrConnectWithoutAuthorInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutAuthorInput, PostUncheckedCreateWithoutAuthorInput>
  }

  export type PostCreateManyAuthorInputEnvelope = {
    data: Enumerable<PostCreateManyAuthorInput>
    skipDuplicates?: boolean
  }

  export type LikedPostCreateWithoutUserInput = {
    Post: PostCreateNestedOneWithoutLikedPostInput
  }

  export type LikedPostUncheckedCreateWithoutUserInput = {
    postId: number
  }

  export type LikedPostCreateOrConnectWithoutUserInput = {
    where: LikedPostWhereUniqueInput
    create: XOR<LikedPostCreateWithoutUserInput, LikedPostUncheckedCreateWithoutUserInput>
  }

  export type LikedPostCreateManyUserInputEnvelope = {
    data: Enumerable<LikedPostCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type SavedPostCreateWithoutUserInput = {
    Post: PostCreateNestedOneWithoutSavedPostInput
  }

  export type SavedPostUncheckedCreateWithoutUserInput = {
    postId: number
  }

  export type SavedPostCreateOrConnectWithoutUserInput = {
    where: SavedPostWhereUniqueInput
    create: XOR<SavedPostCreateWithoutUserInput, SavedPostUncheckedCreateWithoutUserInput>
  }

  export type SavedPostCreateManyUserInputEnvelope = {
    data: Enumerable<SavedPostCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type PostUpsertWithWhereUniqueWithoutAuthorInput = {
    where: PostWhereUniqueInput
    update: XOR<PostUpdateWithoutAuthorInput, PostUncheckedUpdateWithoutAuthorInput>
    create: XOR<PostCreateWithoutAuthorInput, PostUncheckedCreateWithoutAuthorInput>
  }

  export type PostUpdateWithWhereUniqueWithoutAuthorInput = {
    where: PostWhereUniqueInput
    data: XOR<PostUpdateWithoutAuthorInput, PostUncheckedUpdateWithoutAuthorInput>
  }

  export type PostUpdateManyWithWhereWithoutAuthorInput = {
    where: PostScalarWhereInput
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyWithoutPostsInput>
  }

  export type PostScalarWhereInput = {
    AND?: Enumerable<PostScalarWhereInput>
    OR?: Enumerable<PostScalarWhereInput>
    NOT?: Enumerable<PostScalarWhereInput>
    id?: IntFilter | number
    authorId?: IntFilter | number
    title?: StringFilter | string
    content?: StringFilter | string
    link?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    deletedAt?: DateTimeNullableFilter | Date | string | null
  }

  export type LikedPostUpsertWithWhereUniqueWithoutUserInput = {
    where: LikedPostWhereUniqueInput
    update: XOR<LikedPostUpdateWithoutUserInput, LikedPostUncheckedUpdateWithoutUserInput>
    create: XOR<LikedPostCreateWithoutUserInput, LikedPostUncheckedCreateWithoutUserInput>
  }

  export type LikedPostUpdateWithWhereUniqueWithoutUserInput = {
    where: LikedPostWhereUniqueInput
    data: XOR<LikedPostUpdateWithoutUserInput, LikedPostUncheckedUpdateWithoutUserInput>
  }

  export type LikedPostUpdateManyWithWhereWithoutUserInput = {
    where: LikedPostScalarWhereInput
    data: XOR<LikedPostUpdateManyMutationInput, LikedPostUncheckedUpdateManyWithoutLikedPostsInput>
  }

  export type LikedPostScalarWhereInput = {
    AND?: Enumerable<LikedPostScalarWhereInput>
    OR?: Enumerable<LikedPostScalarWhereInput>
    NOT?: Enumerable<LikedPostScalarWhereInput>
    postId?: IntFilter | number
    userId?: IntFilter | number
  }

  export type SavedPostUpsertWithWhereUniqueWithoutUserInput = {
    where: SavedPostWhereUniqueInput
    update: XOR<SavedPostUpdateWithoutUserInput, SavedPostUncheckedUpdateWithoutUserInput>
    create: XOR<SavedPostCreateWithoutUserInput, SavedPostUncheckedCreateWithoutUserInput>
  }

  export type SavedPostUpdateWithWhereUniqueWithoutUserInput = {
    where: SavedPostWhereUniqueInput
    data: XOR<SavedPostUpdateWithoutUserInput, SavedPostUncheckedUpdateWithoutUserInput>
  }

  export type SavedPostUpdateManyWithWhereWithoutUserInput = {
    where: SavedPostScalarWhereInput
    data: XOR<SavedPostUpdateManyMutationInput, SavedPostUncheckedUpdateManyWithoutSavedPostsInput>
  }

  export type SavedPostScalarWhereInput = {
    AND?: Enumerable<SavedPostScalarWhereInput>
    OR?: Enumerable<SavedPostScalarWhereInput>
    NOT?: Enumerable<SavedPostScalarWhereInput>
    postId?: IntFilter | number
    userId?: IntFilter | number
  }

  export type PostCategoryCreateWithoutCategoryInput = {
    post: PostCreateNestedOneWithoutCategoriesInput
  }

  export type PostCategoryUncheckedCreateWithoutCategoryInput = {
    postId: number
  }

  export type PostCategoryCreateOrConnectWithoutCategoryInput = {
    where: PostCategoryWhereUniqueInput
    create: XOR<PostCategoryCreateWithoutCategoryInput, PostCategoryUncheckedCreateWithoutCategoryInput>
  }

  export type PostCategoryCreateManyCategoryInputEnvelope = {
    data: Enumerable<PostCategoryCreateManyCategoryInput>
    skipDuplicates?: boolean
  }

  export type PostCategoryUpsertWithWhereUniqueWithoutCategoryInput = {
    where: PostCategoryWhereUniqueInput
    update: XOR<PostCategoryUpdateWithoutCategoryInput, PostCategoryUncheckedUpdateWithoutCategoryInput>
    create: XOR<PostCategoryCreateWithoutCategoryInput, PostCategoryUncheckedCreateWithoutCategoryInput>
  }

  export type PostCategoryUpdateWithWhereUniqueWithoutCategoryInput = {
    where: PostCategoryWhereUniqueInput
    data: XOR<PostCategoryUpdateWithoutCategoryInput, PostCategoryUncheckedUpdateWithoutCategoryInput>
  }

  export type PostCategoryUpdateManyWithWhereWithoutCategoryInput = {
    where: PostCategoryScalarWhereInput
    data: XOR<PostCategoryUpdateManyMutationInput, PostCategoryUncheckedUpdateManyWithoutPostsInput>
  }

  export type PostCategoryScalarWhereInput = {
    AND?: Enumerable<PostCategoryScalarWhereInput>
    OR?: Enumerable<PostCategoryScalarWhereInput>
    NOT?: Enumerable<PostCategoryScalarWhereInput>
    postId?: IntFilter | number
    categoryId?: IntFilter | number
  }

  export type PostCreateWithoutCategoriesInput = {
    author: UserCreateNestedOneWithoutPostsInput
    title: string
    content: string
    link: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    LikedPost?: LikedPostCreateNestedManyWithoutPostInput
    SavedPost?: SavedPostCreateNestedManyWithoutPostInput
  }

  export type PostUncheckedCreateWithoutCategoriesInput = {
    id?: number
    authorId: number
    title: string
    content: string
    link: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    LikedPost?: LikedPostUncheckedCreateNestedManyWithoutPostInput
    SavedPost?: SavedPostUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostCreateOrConnectWithoutCategoriesInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutCategoriesInput, PostUncheckedCreateWithoutCategoriesInput>
  }

  export type CategoryCreateWithoutPostsInput = {
    name: string
  }

  export type CategoryUncheckedCreateWithoutPostsInput = {
    id?: number
    name: string
  }

  export type CategoryCreateOrConnectWithoutPostsInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutPostsInput, CategoryUncheckedCreateWithoutPostsInput>
  }

  export type PostUpsertWithoutCategoriesInput = {
    update: XOR<PostUpdateWithoutCategoriesInput, PostUncheckedUpdateWithoutCategoriesInput>
    create: XOR<PostCreateWithoutCategoriesInput, PostUncheckedCreateWithoutCategoriesInput>
  }

  export type PostUpdateWithoutCategoriesInput = {
    author?: UserUpdateOneRequiredWithoutPostsNestedInput
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    LikedPost?: LikedPostUpdateManyWithoutPostNestedInput
    SavedPost?: SavedPostUpdateManyWithoutPostNestedInput
  }

  export type PostUncheckedUpdateWithoutCategoriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    authorId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    LikedPost?: LikedPostUncheckedUpdateManyWithoutPostNestedInput
    SavedPost?: SavedPostUncheckedUpdateManyWithoutPostNestedInput
  }

  export type CategoryUpsertWithoutPostsInput = {
    update: XOR<CategoryUpdateWithoutPostsInput, CategoryUncheckedUpdateWithoutPostsInput>
    create: XOR<CategoryCreateWithoutPostsInput, CategoryUncheckedCreateWithoutPostsInput>
  }

  export type CategoryUpdateWithoutPostsInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type CategoryUncheckedUpdateWithoutPostsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateWithoutPostsInput = {
    displayName: string
    login: string
    twitchId: string
    isSubscriber: boolean
    isFollower: boolean
    role: Role
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    likedPosts?: LikedPostCreateNestedManyWithoutUserInput
    savedPosts?: SavedPostCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPostsInput = {
    id?: number
    displayName: string
    login: string
    twitchId: string
    isSubscriber: boolean
    isFollower: boolean
    role: Role
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    likedPosts?: LikedPostUncheckedCreateNestedManyWithoutUserInput
    savedPosts?: SavedPostUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPostsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
  }

  export type PostCategoryCreateWithoutPostInput = {
    category: CategoryCreateNestedOneWithoutPostsInput
  }

  export type PostCategoryUncheckedCreateWithoutPostInput = {
    categoryId: number
  }

  export type PostCategoryCreateOrConnectWithoutPostInput = {
    where: PostCategoryWhereUniqueInput
    create: XOR<PostCategoryCreateWithoutPostInput, PostCategoryUncheckedCreateWithoutPostInput>
  }

  export type PostCategoryCreateManyPostInputEnvelope = {
    data: Enumerable<PostCategoryCreateManyPostInput>
    skipDuplicates?: boolean
  }

  export type LikedPostCreateWithoutPostInput = {
    User: UserCreateNestedOneWithoutLikedPostsInput
  }

  export type LikedPostUncheckedCreateWithoutPostInput = {
    userId: number
  }

  export type LikedPostCreateOrConnectWithoutPostInput = {
    where: LikedPostWhereUniqueInput
    create: XOR<LikedPostCreateWithoutPostInput, LikedPostUncheckedCreateWithoutPostInput>
  }

  export type LikedPostCreateManyPostInputEnvelope = {
    data: Enumerable<LikedPostCreateManyPostInput>
    skipDuplicates?: boolean
  }

  export type SavedPostCreateWithoutPostInput = {
    User: UserCreateNestedOneWithoutSavedPostsInput
  }

  export type SavedPostUncheckedCreateWithoutPostInput = {
    userId: number
  }

  export type SavedPostCreateOrConnectWithoutPostInput = {
    where: SavedPostWhereUniqueInput
    create: XOR<SavedPostCreateWithoutPostInput, SavedPostUncheckedCreateWithoutPostInput>
  }

  export type SavedPostCreateManyPostInputEnvelope = {
    data: Enumerable<SavedPostCreateManyPostInput>
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutPostsInput = {
    update: XOR<UserUpdateWithoutPostsInput, UserUncheckedUpdateWithoutPostsInput>
    create: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
  }

  export type UserUpdateWithoutPostsInput = {
    displayName?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    twitchId?: StringFieldUpdateOperationsInput | string
    isSubscriber?: BoolFieldUpdateOperationsInput | boolean
    isFollower?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumRoleFieldUpdateOperationsInput | Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    likedPosts?: LikedPostUpdateManyWithoutUserNestedInput
    savedPosts?: SavedPostUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPostsInput = {
    id?: IntFieldUpdateOperationsInput | number
    displayName?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    twitchId?: StringFieldUpdateOperationsInput | string
    isSubscriber?: BoolFieldUpdateOperationsInput | boolean
    isFollower?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumRoleFieldUpdateOperationsInput | Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    likedPosts?: LikedPostUncheckedUpdateManyWithoutUserNestedInput
    savedPosts?: SavedPostUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PostCategoryUpsertWithWhereUniqueWithoutPostInput = {
    where: PostCategoryWhereUniqueInput
    update: XOR<PostCategoryUpdateWithoutPostInput, PostCategoryUncheckedUpdateWithoutPostInput>
    create: XOR<PostCategoryCreateWithoutPostInput, PostCategoryUncheckedCreateWithoutPostInput>
  }

  export type PostCategoryUpdateWithWhereUniqueWithoutPostInput = {
    where: PostCategoryWhereUniqueInput
    data: XOR<PostCategoryUpdateWithoutPostInput, PostCategoryUncheckedUpdateWithoutPostInput>
  }

  export type PostCategoryUpdateManyWithWhereWithoutPostInput = {
    where: PostCategoryScalarWhereInput
    data: XOR<PostCategoryUpdateManyMutationInput, PostCategoryUncheckedUpdateManyWithoutCategoriesInput>
  }

  export type LikedPostUpsertWithWhereUniqueWithoutPostInput = {
    where: LikedPostWhereUniqueInput
    update: XOR<LikedPostUpdateWithoutPostInput, LikedPostUncheckedUpdateWithoutPostInput>
    create: XOR<LikedPostCreateWithoutPostInput, LikedPostUncheckedCreateWithoutPostInput>
  }

  export type LikedPostUpdateWithWhereUniqueWithoutPostInput = {
    where: LikedPostWhereUniqueInput
    data: XOR<LikedPostUpdateWithoutPostInput, LikedPostUncheckedUpdateWithoutPostInput>
  }

  export type LikedPostUpdateManyWithWhereWithoutPostInput = {
    where: LikedPostScalarWhereInput
    data: XOR<LikedPostUpdateManyMutationInput, LikedPostUncheckedUpdateManyWithoutLikedPostInput>
  }

  export type SavedPostUpsertWithWhereUniqueWithoutPostInput = {
    where: SavedPostWhereUniqueInput
    update: XOR<SavedPostUpdateWithoutPostInput, SavedPostUncheckedUpdateWithoutPostInput>
    create: XOR<SavedPostCreateWithoutPostInput, SavedPostUncheckedCreateWithoutPostInput>
  }

  export type SavedPostUpdateWithWhereUniqueWithoutPostInput = {
    where: SavedPostWhereUniqueInput
    data: XOR<SavedPostUpdateWithoutPostInput, SavedPostUncheckedUpdateWithoutPostInput>
  }

  export type SavedPostUpdateManyWithWhereWithoutPostInput = {
    where: SavedPostScalarWhereInput
    data: XOR<SavedPostUpdateManyMutationInput, SavedPostUncheckedUpdateManyWithoutSavedPostInput>
  }

  export type UserCreateWithoutLikedPostsInput = {
    displayName: string
    login: string
    twitchId: string
    isSubscriber: boolean
    isFollower: boolean
    role: Role
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    posts?: PostCreateNestedManyWithoutAuthorInput
    savedPosts?: SavedPostCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutLikedPostsInput = {
    id?: number
    displayName: string
    login: string
    twitchId: string
    isSubscriber: boolean
    isFollower: boolean
    role: Role
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    posts?: PostUncheckedCreateNestedManyWithoutAuthorInput
    savedPosts?: SavedPostUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutLikedPostsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLikedPostsInput, UserUncheckedCreateWithoutLikedPostsInput>
  }

  export type PostCreateWithoutLikedPostInput = {
    author: UserCreateNestedOneWithoutPostsInput
    title: string
    content: string
    link: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    categories?: PostCategoryCreateNestedManyWithoutPostInput
    SavedPost?: SavedPostCreateNestedManyWithoutPostInput
  }

  export type PostUncheckedCreateWithoutLikedPostInput = {
    id?: number
    authorId: number
    title: string
    content: string
    link: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    categories?: PostCategoryUncheckedCreateNestedManyWithoutPostInput
    SavedPost?: SavedPostUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostCreateOrConnectWithoutLikedPostInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutLikedPostInput, PostUncheckedCreateWithoutLikedPostInput>
  }

  export type UserUpsertWithoutLikedPostsInput = {
    update: XOR<UserUpdateWithoutLikedPostsInput, UserUncheckedUpdateWithoutLikedPostsInput>
    create: XOR<UserCreateWithoutLikedPostsInput, UserUncheckedCreateWithoutLikedPostsInput>
  }

  export type UserUpdateWithoutLikedPostsInput = {
    displayName?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    twitchId?: StringFieldUpdateOperationsInput | string
    isSubscriber?: BoolFieldUpdateOperationsInput | boolean
    isFollower?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumRoleFieldUpdateOperationsInput | Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    posts?: PostUpdateManyWithoutAuthorNestedInput
    savedPosts?: SavedPostUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutLikedPostsInput = {
    id?: IntFieldUpdateOperationsInput | number
    displayName?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    twitchId?: StringFieldUpdateOperationsInput | string
    isSubscriber?: BoolFieldUpdateOperationsInput | boolean
    isFollower?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumRoleFieldUpdateOperationsInput | Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    posts?: PostUncheckedUpdateManyWithoutAuthorNestedInput
    savedPosts?: SavedPostUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PostUpsertWithoutLikedPostInput = {
    update: XOR<PostUpdateWithoutLikedPostInput, PostUncheckedUpdateWithoutLikedPostInput>
    create: XOR<PostCreateWithoutLikedPostInput, PostUncheckedCreateWithoutLikedPostInput>
  }

  export type PostUpdateWithoutLikedPostInput = {
    author?: UserUpdateOneRequiredWithoutPostsNestedInput
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    categories?: PostCategoryUpdateManyWithoutPostNestedInput
    SavedPost?: SavedPostUpdateManyWithoutPostNestedInput
  }

  export type PostUncheckedUpdateWithoutLikedPostInput = {
    id?: IntFieldUpdateOperationsInput | number
    authorId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    categories?: PostCategoryUncheckedUpdateManyWithoutPostNestedInput
    SavedPost?: SavedPostUncheckedUpdateManyWithoutPostNestedInput
  }

  export type UserCreateWithoutSavedPostsInput = {
    displayName: string
    login: string
    twitchId: string
    isSubscriber: boolean
    isFollower: boolean
    role: Role
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    posts?: PostCreateNestedManyWithoutAuthorInput
    likedPosts?: LikedPostCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSavedPostsInput = {
    id?: number
    displayName: string
    login: string
    twitchId: string
    isSubscriber: boolean
    isFollower: boolean
    role: Role
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    posts?: PostUncheckedCreateNestedManyWithoutAuthorInput
    likedPosts?: LikedPostUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSavedPostsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSavedPostsInput, UserUncheckedCreateWithoutSavedPostsInput>
  }

  export type PostCreateWithoutSavedPostInput = {
    author: UserCreateNestedOneWithoutPostsInput
    title: string
    content: string
    link: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    categories?: PostCategoryCreateNestedManyWithoutPostInput
    LikedPost?: LikedPostCreateNestedManyWithoutPostInput
  }

  export type PostUncheckedCreateWithoutSavedPostInput = {
    id?: number
    authorId: number
    title: string
    content: string
    link: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    categories?: PostCategoryUncheckedCreateNestedManyWithoutPostInput
    LikedPost?: LikedPostUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostCreateOrConnectWithoutSavedPostInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutSavedPostInput, PostUncheckedCreateWithoutSavedPostInput>
  }

  export type UserUpsertWithoutSavedPostsInput = {
    update: XOR<UserUpdateWithoutSavedPostsInput, UserUncheckedUpdateWithoutSavedPostsInput>
    create: XOR<UserCreateWithoutSavedPostsInput, UserUncheckedCreateWithoutSavedPostsInput>
  }

  export type UserUpdateWithoutSavedPostsInput = {
    displayName?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    twitchId?: StringFieldUpdateOperationsInput | string
    isSubscriber?: BoolFieldUpdateOperationsInput | boolean
    isFollower?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumRoleFieldUpdateOperationsInput | Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    posts?: PostUpdateManyWithoutAuthorNestedInput
    likedPosts?: LikedPostUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSavedPostsInput = {
    id?: IntFieldUpdateOperationsInput | number
    displayName?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    twitchId?: StringFieldUpdateOperationsInput | string
    isSubscriber?: BoolFieldUpdateOperationsInput | boolean
    isFollower?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumRoleFieldUpdateOperationsInput | Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    posts?: PostUncheckedUpdateManyWithoutAuthorNestedInput
    likedPosts?: LikedPostUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PostUpsertWithoutSavedPostInput = {
    update: XOR<PostUpdateWithoutSavedPostInput, PostUncheckedUpdateWithoutSavedPostInput>
    create: XOR<PostCreateWithoutSavedPostInput, PostUncheckedCreateWithoutSavedPostInput>
  }

  export type PostUpdateWithoutSavedPostInput = {
    author?: UserUpdateOneRequiredWithoutPostsNestedInput
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    categories?: PostCategoryUpdateManyWithoutPostNestedInput
    LikedPost?: LikedPostUpdateManyWithoutPostNestedInput
  }

  export type PostUncheckedUpdateWithoutSavedPostInput = {
    id?: IntFieldUpdateOperationsInput | number
    authorId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    categories?: PostCategoryUncheckedUpdateManyWithoutPostNestedInput
    LikedPost?: LikedPostUncheckedUpdateManyWithoutPostNestedInput
  }

  export type PostCreateManyAuthorInput = {
    id?: number
    title: string
    content: string
    link: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type LikedPostCreateManyUserInput = {
    postId: number
  }

  export type SavedPostCreateManyUserInput = {
    postId: number
  }

  export type PostUpdateWithoutAuthorInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    categories?: PostCategoryUpdateManyWithoutPostNestedInput
    LikedPost?: LikedPostUpdateManyWithoutPostNestedInput
    SavedPost?: SavedPostUpdateManyWithoutPostNestedInput
  }

  export type PostUncheckedUpdateWithoutAuthorInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    categories?: PostCategoryUncheckedUpdateManyWithoutPostNestedInput
    LikedPost?: LikedPostUncheckedUpdateManyWithoutPostNestedInput
    SavedPost?: SavedPostUncheckedUpdateManyWithoutPostNestedInput
  }

  export type PostUncheckedUpdateManyWithoutPostsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    link?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type LikedPostUpdateWithoutUserInput = {
    Post?: PostUpdateOneRequiredWithoutLikedPostNestedInput
  }

  export type LikedPostUncheckedUpdateWithoutUserInput = {
    postId?: IntFieldUpdateOperationsInput | number
  }

  export type LikedPostUncheckedUpdateManyWithoutLikedPostsInput = {
    postId?: IntFieldUpdateOperationsInput | number
  }

  export type SavedPostUpdateWithoutUserInput = {
    Post?: PostUpdateOneRequiredWithoutSavedPostNestedInput
  }

  export type SavedPostUncheckedUpdateWithoutUserInput = {
    postId?: IntFieldUpdateOperationsInput | number
  }

  export type SavedPostUncheckedUpdateManyWithoutSavedPostsInput = {
    postId?: IntFieldUpdateOperationsInput | number
  }

  export type PostCategoryCreateManyCategoryInput = {
    postId: number
  }

  export type PostCategoryUpdateWithoutCategoryInput = {
    post?: PostUpdateOneRequiredWithoutCategoriesNestedInput
  }

  export type PostCategoryUncheckedUpdateWithoutCategoryInput = {
    postId?: IntFieldUpdateOperationsInput | number
  }

  export type PostCategoryUncheckedUpdateManyWithoutPostsInput = {
    postId?: IntFieldUpdateOperationsInput | number
  }

  export type PostCategoryCreateManyPostInput = {
    categoryId: number
  }

  export type LikedPostCreateManyPostInput = {
    userId: number
  }

  export type SavedPostCreateManyPostInput = {
    userId: number
  }

  export type PostCategoryUpdateWithoutPostInput = {
    category?: CategoryUpdateOneRequiredWithoutPostsNestedInput
  }

  export type PostCategoryUncheckedUpdateWithoutPostInput = {
    categoryId?: IntFieldUpdateOperationsInput | number
  }

  export type PostCategoryUncheckedUpdateManyWithoutCategoriesInput = {
    categoryId?: IntFieldUpdateOperationsInput | number
  }

  export type LikedPostUpdateWithoutPostInput = {
    User?: UserUpdateOneRequiredWithoutLikedPostsNestedInput
  }

  export type LikedPostUncheckedUpdateWithoutPostInput = {
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type LikedPostUncheckedUpdateManyWithoutLikedPostInput = {
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type SavedPostUpdateWithoutPostInput = {
    User?: UserUpdateOneRequiredWithoutSavedPostsNestedInput
  }

  export type SavedPostUncheckedUpdateWithoutPostInput = {
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type SavedPostUncheckedUpdateManyWithoutSavedPostInput = {
    userId?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}