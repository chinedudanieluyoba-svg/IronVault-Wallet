
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Wallet
 * 
 */
export type Wallet = $Result.DefaultSelection<Prisma.$WalletPayload>
/**
 * Model Transaction
 * 
 */
export type Transaction = $Result.DefaultSelection<Prisma.$TransactionPayload>
/**
 * Model WalletLedgerEntry
 * 
 */
export type WalletLedgerEntry = $Result.DefaultSelection<Prisma.$WalletLedgerEntryPayload>
/**
 * Model OnRamp
 * 
 */
export type OnRamp = $Result.DefaultSelection<Prisma.$OnRampPayload>
/**
 * Model WebhookEvent
 * 
 */
export type WebhookEvent = $Result.DefaultSelection<Prisma.$WebhookEventPayload>
/**
 * Model AdminAccessLog
 * 
 */
export type AdminAccessLog = $Result.DefaultSelection<Prisma.$AdminAccessLogPayload>
/**
 * Model MissingWebhookAlert
 * 
 */
export type MissingWebhookAlert = $Result.DefaultSelection<Prisma.$MissingWebhookAlertPayload>
/**
 * Model DeadLetterQueue
 * 
 */
export type DeadLetterQueue = $Result.DefaultSelection<Prisma.$DeadLetterQueuePayload>
/**
 * Model AlertLog
 * 
 */
export type AlertLog = $Result.DefaultSelection<Prisma.$AlertLogPayload>

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
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

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
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.wallet`: Exposes CRUD operations for the **Wallet** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Wallets
    * const wallets = await prisma.wallet.findMany()
    * ```
    */
  get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.transaction`: Exposes CRUD operations for the **Transaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transactions
    * const transactions = await prisma.transaction.findMany()
    * ```
    */
  get transaction(): Prisma.TransactionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.walletLedgerEntry`: Exposes CRUD operations for the **WalletLedgerEntry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WalletLedgerEntries
    * const walletLedgerEntries = await prisma.walletLedgerEntry.findMany()
    * ```
    */
  get walletLedgerEntry(): Prisma.WalletLedgerEntryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.onRamp`: Exposes CRUD operations for the **OnRamp** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OnRamps
    * const onRamps = await prisma.onRamp.findMany()
    * ```
    */
  get onRamp(): Prisma.OnRampDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.webhookEvent`: Exposes CRUD operations for the **WebhookEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WebhookEvents
    * const webhookEvents = await prisma.webhookEvent.findMany()
    * ```
    */
  get webhookEvent(): Prisma.WebhookEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.adminAccessLog`: Exposes CRUD operations for the **AdminAccessLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AdminAccessLogs
    * const adminAccessLogs = await prisma.adminAccessLog.findMany()
    * ```
    */
  get adminAccessLog(): Prisma.AdminAccessLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.missingWebhookAlert`: Exposes CRUD operations for the **MissingWebhookAlert** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MissingWebhookAlerts
    * const missingWebhookAlerts = await prisma.missingWebhookAlert.findMany()
    * ```
    */
  get missingWebhookAlert(): Prisma.MissingWebhookAlertDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.deadLetterQueue`: Exposes CRUD operations for the **DeadLetterQueue** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DeadLetterQueues
    * const deadLetterQueues = await prisma.deadLetterQueue.findMany()
    * ```
    */
  get deadLetterQueue(): Prisma.DeadLetterQueueDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.alertLog`: Exposes CRUD operations for the **AlertLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AlertLogs
    * const alertLogs = await prisma.alertLog.findMany()
    * ```
    */
  get alertLog(): Prisma.AlertLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.3.0
   * Query Engine version: 9d6ad21cbbceab97458517b147a6a09ff43aa735
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

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

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

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
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
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
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
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

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



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
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Wallet: 'Wallet',
    Transaction: 'Transaction',
    WalletLedgerEntry: 'WalletLedgerEntry',
    OnRamp: 'OnRamp',
    WebhookEvent: 'WebhookEvent',
    AdminAccessLog: 'AdminAccessLog',
    MissingWebhookAlert: 'MissingWebhookAlert',
    DeadLetterQueue: 'DeadLetterQueue',
    AlertLog: 'AlertLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "wallet" | "transaction" | "walletLedgerEntry" | "onRamp" | "webhookEvent" | "adminAccessLog" | "missingWebhookAlert" | "deadLetterQueue" | "alertLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Wallet: {
        payload: Prisma.$WalletPayload<ExtArgs>
        fields: Prisma.WalletFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WalletFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WalletFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          findFirst: {
            args: Prisma.WalletFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WalletFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          findMany: {
            args: Prisma.WalletFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>[]
          }
          create: {
            args: Prisma.WalletCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          createMany: {
            args: Prisma.WalletCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WalletCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>[]
          }
          delete: {
            args: Prisma.WalletDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          update: {
            args: Prisma.WalletUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          deleteMany: {
            args: Prisma.WalletDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WalletUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WalletUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>[]
          }
          upsert: {
            args: Prisma.WalletUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          aggregate: {
            args: Prisma.WalletAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWallet>
          }
          groupBy: {
            args: Prisma.WalletGroupByArgs<ExtArgs>
            result: $Utils.Optional<WalletGroupByOutputType>[]
          }
          count: {
            args: Prisma.WalletCountArgs<ExtArgs>
            result: $Utils.Optional<WalletCountAggregateOutputType> | number
          }
        }
      }
      Transaction: {
        payload: Prisma.$TransactionPayload<ExtArgs>
        fields: Prisma.TransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findFirst: {
            args: Prisma.TransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findMany: {
            args: Prisma.TransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          create: {
            args: Prisma.TransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          createMany: {
            args: Prisma.TransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          delete: {
            args: Prisma.TransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          update: {
            args: Prisma.TransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          deleteMany: {
            args: Prisma.TransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          upsert: {
            args: Prisma.TransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          aggregate: {
            args: Prisma.TransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransaction>
          }
          groupBy: {
            args: Prisma.TransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TransactionCountArgs<ExtArgs>
            result: $Utils.Optional<TransactionCountAggregateOutputType> | number
          }
        }
      }
      WalletLedgerEntry: {
        payload: Prisma.$WalletLedgerEntryPayload<ExtArgs>
        fields: Prisma.WalletLedgerEntryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WalletLedgerEntryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletLedgerEntryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WalletLedgerEntryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletLedgerEntryPayload>
          }
          findFirst: {
            args: Prisma.WalletLedgerEntryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletLedgerEntryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WalletLedgerEntryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletLedgerEntryPayload>
          }
          findMany: {
            args: Prisma.WalletLedgerEntryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletLedgerEntryPayload>[]
          }
          create: {
            args: Prisma.WalletLedgerEntryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletLedgerEntryPayload>
          }
          createMany: {
            args: Prisma.WalletLedgerEntryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WalletLedgerEntryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletLedgerEntryPayload>[]
          }
          delete: {
            args: Prisma.WalletLedgerEntryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletLedgerEntryPayload>
          }
          update: {
            args: Prisma.WalletLedgerEntryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletLedgerEntryPayload>
          }
          deleteMany: {
            args: Prisma.WalletLedgerEntryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WalletLedgerEntryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WalletLedgerEntryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletLedgerEntryPayload>[]
          }
          upsert: {
            args: Prisma.WalletLedgerEntryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletLedgerEntryPayload>
          }
          aggregate: {
            args: Prisma.WalletLedgerEntryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWalletLedgerEntry>
          }
          groupBy: {
            args: Prisma.WalletLedgerEntryGroupByArgs<ExtArgs>
            result: $Utils.Optional<WalletLedgerEntryGroupByOutputType>[]
          }
          count: {
            args: Prisma.WalletLedgerEntryCountArgs<ExtArgs>
            result: $Utils.Optional<WalletLedgerEntryCountAggregateOutputType> | number
          }
        }
      }
      OnRamp: {
        payload: Prisma.$OnRampPayload<ExtArgs>
        fields: Prisma.OnRampFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OnRampFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnRampPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OnRampFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnRampPayload>
          }
          findFirst: {
            args: Prisma.OnRampFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnRampPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OnRampFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnRampPayload>
          }
          findMany: {
            args: Prisma.OnRampFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnRampPayload>[]
          }
          create: {
            args: Prisma.OnRampCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnRampPayload>
          }
          createMany: {
            args: Prisma.OnRampCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OnRampCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnRampPayload>[]
          }
          delete: {
            args: Prisma.OnRampDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnRampPayload>
          }
          update: {
            args: Prisma.OnRampUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnRampPayload>
          }
          deleteMany: {
            args: Prisma.OnRampDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OnRampUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OnRampUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnRampPayload>[]
          }
          upsert: {
            args: Prisma.OnRampUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnRampPayload>
          }
          aggregate: {
            args: Prisma.OnRampAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOnRamp>
          }
          groupBy: {
            args: Prisma.OnRampGroupByArgs<ExtArgs>
            result: $Utils.Optional<OnRampGroupByOutputType>[]
          }
          count: {
            args: Prisma.OnRampCountArgs<ExtArgs>
            result: $Utils.Optional<OnRampCountAggregateOutputType> | number
          }
        }
      }
      WebhookEvent: {
        payload: Prisma.$WebhookEventPayload<ExtArgs>
        fields: Prisma.WebhookEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WebhookEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WebhookEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>
          }
          findFirst: {
            args: Prisma.WebhookEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WebhookEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>
          }
          findMany: {
            args: Prisma.WebhookEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>[]
          }
          create: {
            args: Prisma.WebhookEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>
          }
          createMany: {
            args: Prisma.WebhookEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WebhookEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>[]
          }
          delete: {
            args: Prisma.WebhookEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>
          }
          update: {
            args: Prisma.WebhookEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>
          }
          deleteMany: {
            args: Prisma.WebhookEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WebhookEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WebhookEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>[]
          }
          upsert: {
            args: Prisma.WebhookEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEventPayload>
          }
          aggregate: {
            args: Prisma.WebhookEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWebhookEvent>
          }
          groupBy: {
            args: Prisma.WebhookEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<WebhookEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.WebhookEventCountArgs<ExtArgs>
            result: $Utils.Optional<WebhookEventCountAggregateOutputType> | number
          }
        }
      }
      AdminAccessLog: {
        payload: Prisma.$AdminAccessLogPayload<ExtArgs>
        fields: Prisma.AdminAccessLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminAccessLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminAccessLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminAccessLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminAccessLogPayload>
          }
          findFirst: {
            args: Prisma.AdminAccessLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminAccessLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminAccessLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminAccessLogPayload>
          }
          findMany: {
            args: Prisma.AdminAccessLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminAccessLogPayload>[]
          }
          create: {
            args: Prisma.AdminAccessLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminAccessLogPayload>
          }
          createMany: {
            args: Prisma.AdminAccessLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdminAccessLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminAccessLogPayload>[]
          }
          delete: {
            args: Prisma.AdminAccessLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminAccessLogPayload>
          }
          update: {
            args: Prisma.AdminAccessLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminAccessLogPayload>
          }
          deleteMany: {
            args: Prisma.AdminAccessLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminAccessLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AdminAccessLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminAccessLogPayload>[]
          }
          upsert: {
            args: Prisma.AdminAccessLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminAccessLogPayload>
          }
          aggregate: {
            args: Prisma.AdminAccessLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdminAccessLog>
          }
          groupBy: {
            args: Prisma.AdminAccessLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminAccessLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminAccessLogCountArgs<ExtArgs>
            result: $Utils.Optional<AdminAccessLogCountAggregateOutputType> | number
          }
        }
      }
      MissingWebhookAlert: {
        payload: Prisma.$MissingWebhookAlertPayload<ExtArgs>
        fields: Prisma.MissingWebhookAlertFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MissingWebhookAlertFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissingWebhookAlertPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MissingWebhookAlertFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissingWebhookAlertPayload>
          }
          findFirst: {
            args: Prisma.MissingWebhookAlertFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissingWebhookAlertPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MissingWebhookAlertFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissingWebhookAlertPayload>
          }
          findMany: {
            args: Prisma.MissingWebhookAlertFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissingWebhookAlertPayload>[]
          }
          create: {
            args: Prisma.MissingWebhookAlertCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissingWebhookAlertPayload>
          }
          createMany: {
            args: Prisma.MissingWebhookAlertCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MissingWebhookAlertCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissingWebhookAlertPayload>[]
          }
          delete: {
            args: Prisma.MissingWebhookAlertDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissingWebhookAlertPayload>
          }
          update: {
            args: Prisma.MissingWebhookAlertUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissingWebhookAlertPayload>
          }
          deleteMany: {
            args: Prisma.MissingWebhookAlertDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MissingWebhookAlertUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MissingWebhookAlertUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissingWebhookAlertPayload>[]
          }
          upsert: {
            args: Prisma.MissingWebhookAlertUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MissingWebhookAlertPayload>
          }
          aggregate: {
            args: Prisma.MissingWebhookAlertAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMissingWebhookAlert>
          }
          groupBy: {
            args: Prisma.MissingWebhookAlertGroupByArgs<ExtArgs>
            result: $Utils.Optional<MissingWebhookAlertGroupByOutputType>[]
          }
          count: {
            args: Prisma.MissingWebhookAlertCountArgs<ExtArgs>
            result: $Utils.Optional<MissingWebhookAlertCountAggregateOutputType> | number
          }
        }
      }
      DeadLetterQueue: {
        payload: Prisma.$DeadLetterQueuePayload<ExtArgs>
        fields: Prisma.DeadLetterQueueFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DeadLetterQueueFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeadLetterQueuePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DeadLetterQueueFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeadLetterQueuePayload>
          }
          findFirst: {
            args: Prisma.DeadLetterQueueFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeadLetterQueuePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DeadLetterQueueFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeadLetterQueuePayload>
          }
          findMany: {
            args: Prisma.DeadLetterQueueFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeadLetterQueuePayload>[]
          }
          create: {
            args: Prisma.DeadLetterQueueCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeadLetterQueuePayload>
          }
          createMany: {
            args: Prisma.DeadLetterQueueCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DeadLetterQueueCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeadLetterQueuePayload>[]
          }
          delete: {
            args: Prisma.DeadLetterQueueDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeadLetterQueuePayload>
          }
          update: {
            args: Prisma.DeadLetterQueueUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeadLetterQueuePayload>
          }
          deleteMany: {
            args: Prisma.DeadLetterQueueDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DeadLetterQueueUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DeadLetterQueueUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeadLetterQueuePayload>[]
          }
          upsert: {
            args: Prisma.DeadLetterQueueUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeadLetterQueuePayload>
          }
          aggregate: {
            args: Prisma.DeadLetterQueueAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDeadLetterQueue>
          }
          groupBy: {
            args: Prisma.DeadLetterQueueGroupByArgs<ExtArgs>
            result: $Utils.Optional<DeadLetterQueueGroupByOutputType>[]
          }
          count: {
            args: Prisma.DeadLetterQueueCountArgs<ExtArgs>
            result: $Utils.Optional<DeadLetterQueueCountAggregateOutputType> | number
          }
        }
      }
      AlertLog: {
        payload: Prisma.$AlertLogPayload<ExtArgs>
        fields: Prisma.AlertLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AlertLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AlertLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertLogPayload>
          }
          findFirst: {
            args: Prisma.AlertLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AlertLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertLogPayload>
          }
          findMany: {
            args: Prisma.AlertLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertLogPayload>[]
          }
          create: {
            args: Prisma.AlertLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertLogPayload>
          }
          createMany: {
            args: Prisma.AlertLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AlertLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertLogPayload>[]
          }
          delete: {
            args: Prisma.AlertLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertLogPayload>
          }
          update: {
            args: Prisma.AlertLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertLogPayload>
          }
          deleteMany: {
            args: Prisma.AlertLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AlertLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AlertLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertLogPayload>[]
          }
          upsert: {
            args: Prisma.AlertLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertLogPayload>
          }
          aggregate: {
            args: Prisma.AlertLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAlertLog>
          }
          groupBy: {
            args: Prisma.AlertLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AlertLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AlertLogCountArgs<ExtArgs>
            result: $Utils.Optional<AlertLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    wallet?: WalletOmit
    transaction?: TransactionOmit
    walletLedgerEntry?: WalletLedgerEntryOmit
    onRamp?: OnRampOmit
    webhookEvent?: WebhookEventOmit
    adminAccessLog?: AdminAccessLogOmit
    missingWebhookAlert?: MissingWebhookAlertOmit
    deadLetterQueue?: DeadLetterQueueOmit
    alertLog?: AlertLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type WalletCountOutputType
   */

  export type WalletCountOutputType = {
    transactions: number
    onRamps: number
    ledger: number
  }

  export type WalletCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transactions?: boolean | WalletCountOutputTypeCountTransactionsArgs
    onRamps?: boolean | WalletCountOutputTypeCountOnRampsArgs
    ledger?: boolean | WalletCountOutputTypeCountLedgerArgs
  }

  // Custom InputTypes
  /**
   * WalletCountOutputType without action
   */
  export type WalletCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletCountOutputType
     */
    select?: WalletCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WalletCountOutputType without action
   */
  export type WalletCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }

  /**
   * WalletCountOutputType without action
   */
  export type WalletCountOutputTypeCountOnRampsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OnRampWhereInput
  }

  /**
   * WalletCountOutputType without action
   */
  export type WalletCountOutputTypeCountLedgerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WalletLedgerEntryWhereInput
  }


  /**
   * Count Type TransactionCountOutputType
   */

  export type TransactionCountOutputType = {
    webhookEvents: number
  }

  export type TransactionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    webhookEvents?: boolean | TransactionCountOutputTypeCountWebhookEventsArgs
  }

  // Custom InputTypes
  /**
   * TransactionCountOutputType without action
   */
  export type TransactionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionCountOutputType
     */
    select?: TransactionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TransactionCountOutputType without action
   */
  export type TransactionCountOutputTypeCountWebhookEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WebhookEventWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    role: string | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    role: string | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    role: number
    createdAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
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




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    role: string
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    wallet?: boolean | User$walletArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "role" | "createdAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wallet?: boolean | User$walletArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      wallet: Prisma.$WalletPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      role: string
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
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
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
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
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
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
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

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
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

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
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

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
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

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
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


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
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

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
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    wallet<T extends User$walletArgs<ExtArgs> = {}>(args?: Subset<T, User$walletArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.wallet
   */
  export type User$walletArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    where?: WalletWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Wallet
   */

  export type AggregateWallet = {
    _count: WalletCountAggregateOutputType | null
    _avg: WalletAvgAggregateOutputType | null
    _sum: WalletSumAggregateOutputType | null
    _min: WalletMinAggregateOutputType | null
    _max: WalletMaxAggregateOutputType | null
  }

  export type WalletAvgAggregateOutputType = {
    balance: number | null
    flaggedDelta: number | null
  }

  export type WalletSumAggregateOutputType = {
    balance: number | null
    flaggedDelta: number | null
  }

  export type WalletMinAggregateOutputType = {
    id: string | null
    userId: string | null
    balance: number | null
    currency: string | null
    createdAt: Date | null
    updatedAt: Date | null
    flaggedForReview: boolean | null
    flaggedReason: string | null
    flaggedAt: Date | null
    flaggedDelta: number | null
  }

  export type WalletMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    balance: number | null
    currency: string | null
    createdAt: Date | null
    updatedAt: Date | null
    flaggedForReview: boolean | null
    flaggedReason: string | null
    flaggedAt: Date | null
    flaggedDelta: number | null
  }

  export type WalletCountAggregateOutputType = {
    id: number
    userId: number
    balance: number
    currency: number
    createdAt: number
    updatedAt: number
    flaggedForReview: number
    flaggedReason: number
    flaggedAt: number
    flaggedDelta: number
    _all: number
  }


  export type WalletAvgAggregateInputType = {
    balance?: true
    flaggedDelta?: true
  }

  export type WalletSumAggregateInputType = {
    balance?: true
    flaggedDelta?: true
  }

  export type WalletMinAggregateInputType = {
    id?: true
    userId?: true
    balance?: true
    currency?: true
    createdAt?: true
    updatedAt?: true
    flaggedForReview?: true
    flaggedReason?: true
    flaggedAt?: true
    flaggedDelta?: true
  }

  export type WalletMaxAggregateInputType = {
    id?: true
    userId?: true
    balance?: true
    currency?: true
    createdAt?: true
    updatedAt?: true
    flaggedForReview?: true
    flaggedReason?: true
    flaggedAt?: true
    flaggedDelta?: true
  }

  export type WalletCountAggregateInputType = {
    id?: true
    userId?: true
    balance?: true
    currency?: true
    createdAt?: true
    updatedAt?: true
    flaggedForReview?: true
    flaggedReason?: true
    flaggedAt?: true
    flaggedDelta?: true
    _all?: true
  }

  export type WalletAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Wallet to aggregate.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Wallets
    **/
    _count?: true | WalletCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WalletAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WalletSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WalletMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WalletMaxAggregateInputType
  }

  export type GetWalletAggregateType<T extends WalletAggregateArgs> = {
        [P in keyof T & keyof AggregateWallet]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWallet[P]>
      : GetScalarType<T[P], AggregateWallet[P]>
  }




  export type WalletGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WalletWhereInput
    orderBy?: WalletOrderByWithAggregationInput | WalletOrderByWithAggregationInput[]
    by: WalletScalarFieldEnum[] | WalletScalarFieldEnum
    having?: WalletScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WalletCountAggregateInputType | true
    _avg?: WalletAvgAggregateInputType
    _sum?: WalletSumAggregateInputType
    _min?: WalletMinAggregateInputType
    _max?: WalletMaxAggregateInputType
  }

  export type WalletGroupByOutputType = {
    id: string
    userId: string
    balance: number
    currency: string
    createdAt: Date
    updatedAt: Date
    flaggedForReview: boolean
    flaggedReason: string | null
    flaggedAt: Date | null
    flaggedDelta: number | null
    _count: WalletCountAggregateOutputType | null
    _avg: WalletAvgAggregateOutputType | null
    _sum: WalletSumAggregateOutputType | null
    _min: WalletMinAggregateOutputType | null
    _max: WalletMaxAggregateOutputType | null
  }

  type GetWalletGroupByPayload<T extends WalletGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WalletGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WalletGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WalletGroupByOutputType[P]>
            : GetScalarType<T[P], WalletGroupByOutputType[P]>
        }
      >
    >


  export type WalletSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    balance?: boolean
    currency?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    flaggedForReview?: boolean
    flaggedReason?: boolean
    flaggedAt?: boolean
    flaggedDelta?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    transactions?: boolean | Wallet$transactionsArgs<ExtArgs>
    onRamps?: boolean | Wallet$onRampsArgs<ExtArgs>
    ledger?: boolean | Wallet$ledgerArgs<ExtArgs>
    _count?: boolean | WalletCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wallet"]>

  export type WalletSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    balance?: boolean
    currency?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    flaggedForReview?: boolean
    flaggedReason?: boolean
    flaggedAt?: boolean
    flaggedDelta?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wallet"]>

  export type WalletSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    balance?: boolean
    currency?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    flaggedForReview?: boolean
    flaggedReason?: boolean
    flaggedAt?: boolean
    flaggedDelta?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wallet"]>

  export type WalletSelectScalar = {
    id?: boolean
    userId?: boolean
    balance?: boolean
    currency?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    flaggedForReview?: boolean
    flaggedReason?: boolean
    flaggedAt?: boolean
    flaggedDelta?: boolean
  }

  export type WalletOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "balance" | "currency" | "createdAt" | "updatedAt" | "flaggedForReview" | "flaggedReason" | "flaggedAt" | "flaggedDelta", ExtArgs["result"]["wallet"]>
  export type WalletInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    transactions?: boolean | Wallet$transactionsArgs<ExtArgs>
    onRamps?: boolean | Wallet$onRampsArgs<ExtArgs>
    ledger?: boolean | Wallet$ledgerArgs<ExtArgs>
    _count?: boolean | WalletCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type WalletIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WalletIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $WalletPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Wallet"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      transactions: Prisma.$TransactionPayload<ExtArgs>[]
      onRamps: Prisma.$OnRampPayload<ExtArgs>[]
      ledger: Prisma.$WalletLedgerEntryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      balance: number
      currency: string
      createdAt: Date
      updatedAt: Date
      flaggedForReview: boolean
      flaggedReason: string | null
      flaggedAt: Date | null
      flaggedDelta: number | null
    }, ExtArgs["result"]["wallet"]>
    composites: {}
  }

  type WalletGetPayload<S extends boolean | null | undefined | WalletDefaultArgs> = $Result.GetResult<Prisma.$WalletPayload, S>

  type WalletCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WalletFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WalletCountAggregateInputType | true
    }

  export interface WalletDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Wallet'], meta: { name: 'Wallet' } }
    /**
     * Find zero or one Wallet that matches the filter.
     * @param {WalletFindUniqueArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WalletFindUniqueArgs>(args: SelectSubset<T, WalletFindUniqueArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Wallet that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WalletFindUniqueOrThrowArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WalletFindUniqueOrThrowArgs>(args: SelectSubset<T, WalletFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Wallet that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletFindFirstArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WalletFindFirstArgs>(args?: SelectSubset<T, WalletFindFirstArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Wallet that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletFindFirstOrThrowArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WalletFindFirstOrThrowArgs>(args?: SelectSubset<T, WalletFindFirstOrThrowArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Wallets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Wallets
     * const wallets = await prisma.wallet.findMany()
     * 
     * // Get first 10 Wallets
     * const wallets = await prisma.wallet.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const walletWithIdOnly = await prisma.wallet.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WalletFindManyArgs>(args?: SelectSubset<T, WalletFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Wallet.
     * @param {WalletCreateArgs} args - Arguments to create a Wallet.
     * @example
     * // Create one Wallet
     * const Wallet = await prisma.wallet.create({
     *   data: {
     *     // ... data to create a Wallet
     *   }
     * })
     * 
     */
    create<T extends WalletCreateArgs>(args: SelectSubset<T, WalletCreateArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Wallets.
     * @param {WalletCreateManyArgs} args - Arguments to create many Wallets.
     * @example
     * // Create many Wallets
     * const wallet = await prisma.wallet.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WalletCreateManyArgs>(args?: SelectSubset<T, WalletCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Wallets and returns the data saved in the database.
     * @param {WalletCreateManyAndReturnArgs} args - Arguments to create many Wallets.
     * @example
     * // Create many Wallets
     * const wallet = await prisma.wallet.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Wallets and only return the `id`
     * const walletWithIdOnly = await prisma.wallet.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WalletCreateManyAndReturnArgs>(args?: SelectSubset<T, WalletCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Wallet.
     * @param {WalletDeleteArgs} args - Arguments to delete one Wallet.
     * @example
     * // Delete one Wallet
     * const Wallet = await prisma.wallet.delete({
     *   where: {
     *     // ... filter to delete one Wallet
     *   }
     * })
     * 
     */
    delete<T extends WalletDeleteArgs>(args: SelectSubset<T, WalletDeleteArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Wallet.
     * @param {WalletUpdateArgs} args - Arguments to update one Wallet.
     * @example
     * // Update one Wallet
     * const wallet = await prisma.wallet.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WalletUpdateArgs>(args: SelectSubset<T, WalletUpdateArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Wallets.
     * @param {WalletDeleteManyArgs} args - Arguments to filter Wallets to delete.
     * @example
     * // Delete a few Wallets
     * const { count } = await prisma.wallet.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WalletDeleteManyArgs>(args?: SelectSubset<T, WalletDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Wallets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Wallets
     * const wallet = await prisma.wallet.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WalletUpdateManyArgs>(args: SelectSubset<T, WalletUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Wallets and returns the data updated in the database.
     * @param {WalletUpdateManyAndReturnArgs} args - Arguments to update many Wallets.
     * @example
     * // Update many Wallets
     * const wallet = await prisma.wallet.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Wallets and only return the `id`
     * const walletWithIdOnly = await prisma.wallet.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WalletUpdateManyAndReturnArgs>(args: SelectSubset<T, WalletUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Wallet.
     * @param {WalletUpsertArgs} args - Arguments to update or create a Wallet.
     * @example
     * // Update or create a Wallet
     * const wallet = await prisma.wallet.upsert({
     *   create: {
     *     // ... data to create a Wallet
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Wallet we want to update
     *   }
     * })
     */
    upsert<T extends WalletUpsertArgs>(args: SelectSubset<T, WalletUpsertArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Wallets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletCountArgs} args - Arguments to filter Wallets to count.
     * @example
     * // Count the number of Wallets
     * const count = await prisma.wallet.count({
     *   where: {
     *     // ... the filter for the Wallets we want to count
     *   }
     * })
    **/
    count<T extends WalletCountArgs>(
      args?: Subset<T, WalletCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WalletCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Wallet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WalletAggregateArgs>(args: Subset<T, WalletAggregateArgs>): Prisma.PrismaPromise<GetWalletAggregateType<T>>

    /**
     * Group by Wallet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletGroupByArgs} args - Group by arguments.
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
      T extends WalletGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WalletGroupByArgs['orderBy'] }
        : { orderBy?: WalletGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, WalletGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWalletGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Wallet model
   */
  readonly fields: WalletFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Wallet.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WalletClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    transactions<T extends Wallet$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, Wallet$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    onRamps<T extends Wallet$onRampsArgs<ExtArgs> = {}>(args?: Subset<T, Wallet$onRampsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OnRampPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ledger<T extends Wallet$ledgerArgs<ExtArgs> = {}>(args?: Subset<T, Wallet$ledgerArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletLedgerEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Wallet model
   */
  interface WalletFieldRefs {
    readonly id: FieldRef<"Wallet", 'String'>
    readonly userId: FieldRef<"Wallet", 'String'>
    readonly balance: FieldRef<"Wallet", 'Float'>
    readonly currency: FieldRef<"Wallet", 'String'>
    readonly createdAt: FieldRef<"Wallet", 'DateTime'>
    readonly updatedAt: FieldRef<"Wallet", 'DateTime'>
    readonly flaggedForReview: FieldRef<"Wallet", 'Boolean'>
    readonly flaggedReason: FieldRef<"Wallet", 'String'>
    readonly flaggedAt: FieldRef<"Wallet", 'DateTime'>
    readonly flaggedDelta: FieldRef<"Wallet", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * Wallet findUnique
   */
  export type WalletFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet findUniqueOrThrow
   */
  export type WalletFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet findFirst
   */
  export type WalletFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Wallets.
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Wallets.
     */
    distinct?: WalletScalarFieldEnum | WalletScalarFieldEnum[]
  }

  /**
   * Wallet findFirstOrThrow
   */
  export type WalletFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Wallets.
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Wallets.
     */
    distinct?: WalletScalarFieldEnum | WalletScalarFieldEnum[]
  }

  /**
   * Wallet findMany
   */
  export type WalletFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallets to fetch.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Wallets.
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    distinct?: WalletScalarFieldEnum | WalletScalarFieldEnum[]
  }

  /**
   * Wallet create
   */
  export type WalletCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * The data needed to create a Wallet.
     */
    data: XOR<WalletCreateInput, WalletUncheckedCreateInput>
  }

  /**
   * Wallet createMany
   */
  export type WalletCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Wallets.
     */
    data: WalletCreateManyInput | WalletCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Wallet createManyAndReturn
   */
  export type WalletCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * The data used to create many Wallets.
     */
    data: WalletCreateManyInput | WalletCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Wallet update
   */
  export type WalletUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * The data needed to update a Wallet.
     */
    data: XOR<WalletUpdateInput, WalletUncheckedUpdateInput>
    /**
     * Choose, which Wallet to update.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet updateMany
   */
  export type WalletUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Wallets.
     */
    data: XOR<WalletUpdateManyMutationInput, WalletUncheckedUpdateManyInput>
    /**
     * Filter which Wallets to update
     */
    where?: WalletWhereInput
    /**
     * Limit how many Wallets to update.
     */
    limit?: number
  }

  /**
   * Wallet updateManyAndReturn
   */
  export type WalletUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * The data used to update Wallets.
     */
    data: XOR<WalletUpdateManyMutationInput, WalletUncheckedUpdateManyInput>
    /**
     * Filter which Wallets to update
     */
    where?: WalletWhereInput
    /**
     * Limit how many Wallets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Wallet upsert
   */
  export type WalletUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * The filter to search for the Wallet to update in case it exists.
     */
    where: WalletWhereUniqueInput
    /**
     * In case the Wallet found by the `where` argument doesn't exist, create a new Wallet with this data.
     */
    create: XOR<WalletCreateInput, WalletUncheckedCreateInput>
    /**
     * In case the Wallet was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WalletUpdateInput, WalletUncheckedUpdateInput>
  }

  /**
   * Wallet delete
   */
  export type WalletDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter which Wallet to delete.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet deleteMany
   */
  export type WalletDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Wallets to delete
     */
    where?: WalletWhereInput
    /**
     * Limit how many Wallets to delete.
     */
    limit?: number
  }

  /**
   * Wallet.transactions
   */
  export type Wallet$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Wallet.onRamps
   */
  export type Wallet$onRampsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnRamp
     */
    select?: OnRampSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OnRamp
     */
    omit?: OnRampOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnRampInclude<ExtArgs> | null
    where?: OnRampWhereInput
    orderBy?: OnRampOrderByWithRelationInput | OnRampOrderByWithRelationInput[]
    cursor?: OnRampWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OnRampScalarFieldEnum | OnRampScalarFieldEnum[]
  }

  /**
   * Wallet.ledger
   */
  export type Wallet$ledgerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletLedgerEntry
     */
    select?: WalletLedgerEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WalletLedgerEntry
     */
    omit?: WalletLedgerEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletLedgerEntryInclude<ExtArgs> | null
    where?: WalletLedgerEntryWhereInput
    orderBy?: WalletLedgerEntryOrderByWithRelationInput | WalletLedgerEntryOrderByWithRelationInput[]
    cursor?: WalletLedgerEntryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WalletLedgerEntryScalarFieldEnum | WalletLedgerEntryScalarFieldEnum[]
  }

  /**
   * Wallet without action
   */
  export type WalletDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
  }


  /**
   * Model Transaction
   */

  export type AggregateTransaction = {
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  export type TransactionAvgAggregateOutputType = {
    amount: number | null
  }

  export type TransactionSumAggregateOutputType = {
    amount: number | null
  }

  export type TransactionMinAggregateOutputType = {
    id: string | null
    walletId: string | null
    type: string | null
    amount: number | null
    idempotencyKey: string | null
    createdAt: Date | null
  }

  export type TransactionMaxAggregateOutputType = {
    id: string | null
    walletId: string | null
    type: string | null
    amount: number | null
    idempotencyKey: string | null
    createdAt: Date | null
  }

  export type TransactionCountAggregateOutputType = {
    id: number
    walletId: number
    type: number
    amount: number
    idempotencyKey: number
    createdAt: number
    _all: number
  }


  export type TransactionAvgAggregateInputType = {
    amount?: true
  }

  export type TransactionSumAggregateInputType = {
    amount?: true
  }

  export type TransactionMinAggregateInputType = {
    id?: true
    walletId?: true
    type?: true
    amount?: true
    idempotencyKey?: true
    createdAt?: true
  }

  export type TransactionMaxAggregateInputType = {
    id?: true
    walletId?: true
    type?: true
    amount?: true
    idempotencyKey?: true
    createdAt?: true
  }

  export type TransactionCountAggregateInputType = {
    id?: true
    walletId?: true
    type?: true
    amount?: true
    idempotencyKey?: true
    createdAt?: true
    _all?: true
  }

  export type TransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transaction to aggregate.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Transactions
    **/
    _count?: true | TransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransactionMaxAggregateInputType
  }

  export type GetTransactionAggregateType<T extends TransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransaction[P]>
      : GetScalarType<T[P], AggregateTransaction[P]>
  }




  export type TransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithAggregationInput | TransactionOrderByWithAggregationInput[]
    by: TransactionScalarFieldEnum[] | TransactionScalarFieldEnum
    having?: TransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransactionCountAggregateInputType | true
    _avg?: TransactionAvgAggregateInputType
    _sum?: TransactionSumAggregateInputType
    _min?: TransactionMinAggregateInputType
    _max?: TransactionMaxAggregateInputType
  }

  export type TransactionGroupByOutputType = {
    id: string
    walletId: string
    type: string
    amount: number
    idempotencyKey: string | null
    createdAt: Date
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  type GetTransactionGroupByPayload<T extends TransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransactionGroupByOutputType[P]>
            : GetScalarType<T[P], TransactionGroupByOutputType[P]>
        }
      >
    >


  export type TransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    walletId?: boolean
    type?: boolean
    amount?: boolean
    idempotencyKey?: boolean
    createdAt?: boolean
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
    webhookEvents?: boolean | Transaction$webhookEventsArgs<ExtArgs>
    _count?: boolean | TransactionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    walletId?: boolean
    type?: boolean
    amount?: boolean
    idempotencyKey?: boolean
    createdAt?: boolean
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    walletId?: boolean
    type?: boolean
    amount?: boolean
    idempotencyKey?: boolean
    createdAt?: boolean
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectScalar = {
    id?: boolean
    walletId?: boolean
    type?: boolean
    amount?: boolean
    idempotencyKey?: boolean
    createdAt?: boolean
  }

  export type TransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "walletId" | "type" | "amount" | "idempotencyKey" | "createdAt", ExtArgs["result"]["transaction"]>
  export type TransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
    webhookEvents?: boolean | Transaction$webhookEventsArgs<ExtArgs>
    _count?: boolean | TransactionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
  }
  export type TransactionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
  }

  export type $TransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Transaction"
    objects: {
      wallet: Prisma.$WalletPayload<ExtArgs>
      webhookEvents: Prisma.$WebhookEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      walletId: string
      type: string
      amount: number
      idempotencyKey: string | null
      createdAt: Date
    }, ExtArgs["result"]["transaction"]>
    composites: {}
  }

  type TransactionGetPayload<S extends boolean | null | undefined | TransactionDefaultArgs> = $Result.GetResult<Prisma.$TransactionPayload, S>

  type TransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TransactionCountAggregateInputType | true
    }

  export interface TransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Transaction'], meta: { name: 'Transaction' } }
    /**
     * Find zero or one Transaction that matches the filter.
     * @param {TransactionFindUniqueArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TransactionFindUniqueArgs>(args: SelectSubset<T, TransactionFindUniqueArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Transaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TransactionFindUniqueOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, TransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TransactionFindFirstArgs>(args?: SelectSubset<T, TransactionFindFirstArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, TransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Transactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transactions
     * const transactions = await prisma.transaction.findMany()
     * 
     * // Get first 10 Transactions
     * const transactions = await prisma.transaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transactionWithIdOnly = await prisma.transaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TransactionFindManyArgs>(args?: SelectSubset<T, TransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Transaction.
     * @param {TransactionCreateArgs} args - Arguments to create a Transaction.
     * @example
     * // Create one Transaction
     * const Transaction = await prisma.transaction.create({
     *   data: {
     *     // ... data to create a Transaction
     *   }
     * })
     * 
     */
    create<T extends TransactionCreateArgs>(args: SelectSubset<T, TransactionCreateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Transactions.
     * @param {TransactionCreateManyArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TransactionCreateManyArgs>(args?: SelectSubset<T, TransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Transactions and returns the data saved in the database.
     * @param {TransactionCreateManyAndReturnArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, TransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Transaction.
     * @param {TransactionDeleteArgs} args - Arguments to delete one Transaction.
     * @example
     * // Delete one Transaction
     * const Transaction = await prisma.transaction.delete({
     *   where: {
     *     // ... filter to delete one Transaction
     *   }
     * })
     * 
     */
    delete<T extends TransactionDeleteArgs>(args: SelectSubset<T, TransactionDeleteArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Transaction.
     * @param {TransactionUpdateArgs} args - Arguments to update one Transaction.
     * @example
     * // Update one Transaction
     * const transaction = await prisma.transaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TransactionUpdateArgs>(args: SelectSubset<T, TransactionUpdateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Transactions.
     * @param {TransactionDeleteManyArgs} args - Arguments to filter Transactions to delete.
     * @example
     * // Delete a few Transactions
     * const { count } = await prisma.transaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TransactionDeleteManyArgs>(args?: SelectSubset<T, TransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TransactionUpdateManyArgs>(args: SelectSubset<T, TransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions and returns the data updated in the database.
     * @param {TransactionUpdateManyAndReturnArgs} args - Arguments to update many Transactions.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, TransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Transaction.
     * @param {TransactionUpsertArgs} args - Arguments to update or create a Transaction.
     * @example
     * // Update or create a Transaction
     * const transaction = await prisma.transaction.upsert({
     *   create: {
     *     // ... data to create a Transaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transaction we want to update
     *   }
     * })
     */
    upsert<T extends TransactionUpsertArgs>(args: SelectSubset<T, TransactionUpsertArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionCountArgs} args - Arguments to filter Transactions to count.
     * @example
     * // Count the number of Transactions
     * const count = await prisma.transaction.count({
     *   where: {
     *     // ... the filter for the Transactions we want to count
     *   }
     * })
    **/
    count<T extends TransactionCountArgs>(
      args?: Subset<T, TransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TransactionAggregateArgs>(args: Subset<T, TransactionAggregateArgs>): Prisma.PrismaPromise<GetTransactionAggregateType<T>>

    /**
     * Group by Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionGroupByArgs} args - Group by arguments.
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
      T extends TransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransactionGroupByArgs['orderBy'] }
        : { orderBy?: TransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, TransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Transaction model
   */
  readonly fields: TransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Transaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    wallet<T extends WalletDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WalletDefaultArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    webhookEvents<T extends Transaction$webhookEventsArgs<ExtArgs> = {}>(args?: Subset<T, Transaction$webhookEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Transaction model
   */
  interface TransactionFieldRefs {
    readonly id: FieldRef<"Transaction", 'String'>
    readonly walletId: FieldRef<"Transaction", 'String'>
    readonly type: FieldRef<"Transaction", 'String'>
    readonly amount: FieldRef<"Transaction", 'Float'>
    readonly idempotencyKey: FieldRef<"Transaction", 'String'>
    readonly createdAt: FieldRef<"Transaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Transaction findUnique
   */
  export type TransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findUniqueOrThrow
   */
  export type TransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findFirst
   */
  export type TransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findFirstOrThrow
   */
  export type TransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findMany
   */
  export type TransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transactions to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction create
   */
  export type TransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a Transaction.
     */
    data: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
  }

  /**
   * Transaction createMany
   */
  export type TransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Transaction createManyAndReturn
   */
  export type TransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transaction update
   */
  export type TransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a Transaction.
     */
    data: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
    /**
     * Choose, which Transaction to update.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction updateMany
   */
  export type TransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
  }

  /**
   * Transaction updateManyAndReturn
   */
  export type TransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transaction upsert
   */
  export type TransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the Transaction to update in case it exists.
     */
    where: TransactionWhereUniqueInput
    /**
     * In case the Transaction found by the `where` argument doesn't exist, create a new Transaction with this data.
     */
    create: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
    /**
     * In case the Transaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
  }

  /**
   * Transaction delete
   */
  export type TransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter which Transaction to delete.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction deleteMany
   */
  export type TransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transactions to delete
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to delete.
     */
    limit?: number
  }

  /**
   * Transaction.webhookEvents
   */
  export type Transaction$webhookEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookEventInclude<ExtArgs> | null
    where?: WebhookEventWhereInput
    orderBy?: WebhookEventOrderByWithRelationInput | WebhookEventOrderByWithRelationInput[]
    cursor?: WebhookEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WebhookEventScalarFieldEnum | WebhookEventScalarFieldEnum[]
  }

  /**
   * Transaction without action
   */
  export type TransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
  }


  /**
   * Model WalletLedgerEntry
   */

  export type AggregateWalletLedgerEntry = {
    _count: WalletLedgerEntryCountAggregateOutputType | null
    _avg: WalletLedgerEntryAvgAggregateOutputType | null
    _sum: WalletLedgerEntrySumAggregateOutputType | null
    _min: WalletLedgerEntryMinAggregateOutputType | null
    _max: WalletLedgerEntryMaxAggregateOutputType | null
  }

  export type WalletLedgerEntryAvgAggregateOutputType = {
    amount: number | null
    balanceBefore: number | null
    balanceAfter: number | null
  }

  export type WalletLedgerEntrySumAggregateOutputType = {
    amount: number | null
    balanceBefore: number | null
    balanceAfter: number | null
  }

  export type WalletLedgerEntryMinAggregateOutputType = {
    id: string | null
    walletId: string | null
    type: string | null
    amount: number | null
    balanceBefore: number | null
    balanceAfter: number | null
    reference: string | null
    description: string | null
    source: string | null
    providerEventId: string | null
    idempotencyKey: string | null
    createdAt: Date | null
  }

  export type WalletLedgerEntryMaxAggregateOutputType = {
    id: string | null
    walletId: string | null
    type: string | null
    amount: number | null
    balanceBefore: number | null
    balanceAfter: number | null
    reference: string | null
    description: string | null
    source: string | null
    providerEventId: string | null
    idempotencyKey: string | null
    createdAt: Date | null
  }

  export type WalletLedgerEntryCountAggregateOutputType = {
    id: number
    walletId: number
    type: number
    amount: number
    balanceBefore: number
    balanceAfter: number
    reference: number
    description: number
    source: number
    providerEventId: number
    idempotencyKey: number
    createdAt: number
    _all: number
  }


  export type WalletLedgerEntryAvgAggregateInputType = {
    amount?: true
    balanceBefore?: true
    balanceAfter?: true
  }

  export type WalletLedgerEntrySumAggregateInputType = {
    amount?: true
    balanceBefore?: true
    balanceAfter?: true
  }

  export type WalletLedgerEntryMinAggregateInputType = {
    id?: true
    walletId?: true
    type?: true
    amount?: true
    balanceBefore?: true
    balanceAfter?: true
    reference?: true
    description?: true
    source?: true
    providerEventId?: true
    idempotencyKey?: true
    createdAt?: true
  }

  export type WalletLedgerEntryMaxAggregateInputType = {
    id?: true
    walletId?: true
    type?: true
    amount?: true
    balanceBefore?: true
    balanceAfter?: true
    reference?: true
    description?: true
    source?: true
    providerEventId?: true
    idempotencyKey?: true
    createdAt?: true
  }

  export type WalletLedgerEntryCountAggregateInputType = {
    id?: true
    walletId?: true
    type?: true
    amount?: true
    balanceBefore?: true
    balanceAfter?: true
    reference?: true
    description?: true
    source?: true
    providerEventId?: true
    idempotencyKey?: true
    createdAt?: true
    _all?: true
  }

  export type WalletLedgerEntryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WalletLedgerEntry to aggregate.
     */
    where?: WalletLedgerEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WalletLedgerEntries to fetch.
     */
    orderBy?: WalletLedgerEntryOrderByWithRelationInput | WalletLedgerEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WalletLedgerEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WalletLedgerEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WalletLedgerEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WalletLedgerEntries
    **/
    _count?: true | WalletLedgerEntryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WalletLedgerEntryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WalletLedgerEntrySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WalletLedgerEntryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WalletLedgerEntryMaxAggregateInputType
  }

  export type GetWalletLedgerEntryAggregateType<T extends WalletLedgerEntryAggregateArgs> = {
        [P in keyof T & keyof AggregateWalletLedgerEntry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWalletLedgerEntry[P]>
      : GetScalarType<T[P], AggregateWalletLedgerEntry[P]>
  }




  export type WalletLedgerEntryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WalletLedgerEntryWhereInput
    orderBy?: WalletLedgerEntryOrderByWithAggregationInput | WalletLedgerEntryOrderByWithAggregationInput[]
    by: WalletLedgerEntryScalarFieldEnum[] | WalletLedgerEntryScalarFieldEnum
    having?: WalletLedgerEntryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WalletLedgerEntryCountAggregateInputType | true
    _avg?: WalletLedgerEntryAvgAggregateInputType
    _sum?: WalletLedgerEntrySumAggregateInputType
    _min?: WalletLedgerEntryMinAggregateInputType
    _max?: WalletLedgerEntryMaxAggregateInputType
  }

  export type WalletLedgerEntryGroupByOutputType = {
    id: string
    walletId: string
    type: string
    amount: number
    balanceBefore: number
    balanceAfter: number
    reference: string | null
    description: string | null
    source: string | null
    providerEventId: string | null
    idempotencyKey: string | null
    createdAt: Date
    _count: WalletLedgerEntryCountAggregateOutputType | null
    _avg: WalletLedgerEntryAvgAggregateOutputType | null
    _sum: WalletLedgerEntrySumAggregateOutputType | null
    _min: WalletLedgerEntryMinAggregateOutputType | null
    _max: WalletLedgerEntryMaxAggregateOutputType | null
  }

  type GetWalletLedgerEntryGroupByPayload<T extends WalletLedgerEntryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WalletLedgerEntryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WalletLedgerEntryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WalletLedgerEntryGroupByOutputType[P]>
            : GetScalarType<T[P], WalletLedgerEntryGroupByOutputType[P]>
        }
      >
    >


  export type WalletLedgerEntrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    walletId?: boolean
    type?: boolean
    amount?: boolean
    balanceBefore?: boolean
    balanceAfter?: boolean
    reference?: boolean
    description?: boolean
    source?: boolean
    providerEventId?: boolean
    idempotencyKey?: boolean
    createdAt?: boolean
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["walletLedgerEntry"]>

  export type WalletLedgerEntrySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    walletId?: boolean
    type?: boolean
    amount?: boolean
    balanceBefore?: boolean
    balanceAfter?: boolean
    reference?: boolean
    description?: boolean
    source?: boolean
    providerEventId?: boolean
    idempotencyKey?: boolean
    createdAt?: boolean
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["walletLedgerEntry"]>

  export type WalletLedgerEntrySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    walletId?: boolean
    type?: boolean
    amount?: boolean
    balanceBefore?: boolean
    balanceAfter?: boolean
    reference?: boolean
    description?: boolean
    source?: boolean
    providerEventId?: boolean
    idempotencyKey?: boolean
    createdAt?: boolean
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["walletLedgerEntry"]>

  export type WalletLedgerEntrySelectScalar = {
    id?: boolean
    walletId?: boolean
    type?: boolean
    amount?: boolean
    balanceBefore?: boolean
    balanceAfter?: boolean
    reference?: boolean
    description?: boolean
    source?: boolean
    providerEventId?: boolean
    idempotencyKey?: boolean
    createdAt?: boolean
  }

  export type WalletLedgerEntryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "walletId" | "type" | "amount" | "balanceBefore" | "balanceAfter" | "reference" | "description" | "source" | "providerEventId" | "idempotencyKey" | "createdAt", ExtArgs["result"]["walletLedgerEntry"]>
  export type WalletLedgerEntryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
  }
  export type WalletLedgerEntryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
  }
  export type WalletLedgerEntryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
  }

  export type $WalletLedgerEntryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WalletLedgerEntry"
    objects: {
      wallet: Prisma.$WalletPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      walletId: string
      type: string
      amount: number
      balanceBefore: number
      balanceAfter: number
      reference: string | null
      description: string | null
      source: string | null
      providerEventId: string | null
      idempotencyKey: string | null
      createdAt: Date
    }, ExtArgs["result"]["walletLedgerEntry"]>
    composites: {}
  }

  type WalletLedgerEntryGetPayload<S extends boolean | null | undefined | WalletLedgerEntryDefaultArgs> = $Result.GetResult<Prisma.$WalletLedgerEntryPayload, S>

  type WalletLedgerEntryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WalletLedgerEntryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WalletLedgerEntryCountAggregateInputType | true
    }

  export interface WalletLedgerEntryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WalletLedgerEntry'], meta: { name: 'WalletLedgerEntry' } }
    /**
     * Find zero or one WalletLedgerEntry that matches the filter.
     * @param {WalletLedgerEntryFindUniqueArgs} args - Arguments to find a WalletLedgerEntry
     * @example
     * // Get one WalletLedgerEntry
     * const walletLedgerEntry = await prisma.walletLedgerEntry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WalletLedgerEntryFindUniqueArgs>(args: SelectSubset<T, WalletLedgerEntryFindUniqueArgs<ExtArgs>>): Prisma__WalletLedgerEntryClient<$Result.GetResult<Prisma.$WalletLedgerEntryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WalletLedgerEntry that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WalletLedgerEntryFindUniqueOrThrowArgs} args - Arguments to find a WalletLedgerEntry
     * @example
     * // Get one WalletLedgerEntry
     * const walletLedgerEntry = await prisma.walletLedgerEntry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WalletLedgerEntryFindUniqueOrThrowArgs>(args: SelectSubset<T, WalletLedgerEntryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WalletLedgerEntryClient<$Result.GetResult<Prisma.$WalletLedgerEntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WalletLedgerEntry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletLedgerEntryFindFirstArgs} args - Arguments to find a WalletLedgerEntry
     * @example
     * // Get one WalletLedgerEntry
     * const walletLedgerEntry = await prisma.walletLedgerEntry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WalletLedgerEntryFindFirstArgs>(args?: SelectSubset<T, WalletLedgerEntryFindFirstArgs<ExtArgs>>): Prisma__WalletLedgerEntryClient<$Result.GetResult<Prisma.$WalletLedgerEntryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WalletLedgerEntry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletLedgerEntryFindFirstOrThrowArgs} args - Arguments to find a WalletLedgerEntry
     * @example
     * // Get one WalletLedgerEntry
     * const walletLedgerEntry = await prisma.walletLedgerEntry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WalletLedgerEntryFindFirstOrThrowArgs>(args?: SelectSubset<T, WalletLedgerEntryFindFirstOrThrowArgs<ExtArgs>>): Prisma__WalletLedgerEntryClient<$Result.GetResult<Prisma.$WalletLedgerEntryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WalletLedgerEntries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletLedgerEntryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WalletLedgerEntries
     * const walletLedgerEntries = await prisma.walletLedgerEntry.findMany()
     * 
     * // Get first 10 WalletLedgerEntries
     * const walletLedgerEntries = await prisma.walletLedgerEntry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const walletLedgerEntryWithIdOnly = await prisma.walletLedgerEntry.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WalletLedgerEntryFindManyArgs>(args?: SelectSubset<T, WalletLedgerEntryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletLedgerEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WalletLedgerEntry.
     * @param {WalletLedgerEntryCreateArgs} args - Arguments to create a WalletLedgerEntry.
     * @example
     * // Create one WalletLedgerEntry
     * const WalletLedgerEntry = await prisma.walletLedgerEntry.create({
     *   data: {
     *     // ... data to create a WalletLedgerEntry
     *   }
     * })
     * 
     */
    create<T extends WalletLedgerEntryCreateArgs>(args: SelectSubset<T, WalletLedgerEntryCreateArgs<ExtArgs>>): Prisma__WalletLedgerEntryClient<$Result.GetResult<Prisma.$WalletLedgerEntryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WalletLedgerEntries.
     * @param {WalletLedgerEntryCreateManyArgs} args - Arguments to create many WalletLedgerEntries.
     * @example
     * // Create many WalletLedgerEntries
     * const walletLedgerEntry = await prisma.walletLedgerEntry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WalletLedgerEntryCreateManyArgs>(args?: SelectSubset<T, WalletLedgerEntryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WalletLedgerEntries and returns the data saved in the database.
     * @param {WalletLedgerEntryCreateManyAndReturnArgs} args - Arguments to create many WalletLedgerEntries.
     * @example
     * // Create many WalletLedgerEntries
     * const walletLedgerEntry = await prisma.walletLedgerEntry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WalletLedgerEntries and only return the `id`
     * const walletLedgerEntryWithIdOnly = await prisma.walletLedgerEntry.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WalletLedgerEntryCreateManyAndReturnArgs>(args?: SelectSubset<T, WalletLedgerEntryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletLedgerEntryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WalletLedgerEntry.
     * @param {WalletLedgerEntryDeleteArgs} args - Arguments to delete one WalletLedgerEntry.
     * @example
     * // Delete one WalletLedgerEntry
     * const WalletLedgerEntry = await prisma.walletLedgerEntry.delete({
     *   where: {
     *     // ... filter to delete one WalletLedgerEntry
     *   }
     * })
     * 
     */
    delete<T extends WalletLedgerEntryDeleteArgs>(args: SelectSubset<T, WalletLedgerEntryDeleteArgs<ExtArgs>>): Prisma__WalletLedgerEntryClient<$Result.GetResult<Prisma.$WalletLedgerEntryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WalletLedgerEntry.
     * @param {WalletLedgerEntryUpdateArgs} args - Arguments to update one WalletLedgerEntry.
     * @example
     * // Update one WalletLedgerEntry
     * const walletLedgerEntry = await prisma.walletLedgerEntry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WalletLedgerEntryUpdateArgs>(args: SelectSubset<T, WalletLedgerEntryUpdateArgs<ExtArgs>>): Prisma__WalletLedgerEntryClient<$Result.GetResult<Prisma.$WalletLedgerEntryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WalletLedgerEntries.
     * @param {WalletLedgerEntryDeleteManyArgs} args - Arguments to filter WalletLedgerEntries to delete.
     * @example
     * // Delete a few WalletLedgerEntries
     * const { count } = await prisma.walletLedgerEntry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WalletLedgerEntryDeleteManyArgs>(args?: SelectSubset<T, WalletLedgerEntryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WalletLedgerEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletLedgerEntryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WalletLedgerEntries
     * const walletLedgerEntry = await prisma.walletLedgerEntry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WalletLedgerEntryUpdateManyArgs>(args: SelectSubset<T, WalletLedgerEntryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WalletLedgerEntries and returns the data updated in the database.
     * @param {WalletLedgerEntryUpdateManyAndReturnArgs} args - Arguments to update many WalletLedgerEntries.
     * @example
     * // Update many WalletLedgerEntries
     * const walletLedgerEntry = await prisma.walletLedgerEntry.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WalletLedgerEntries and only return the `id`
     * const walletLedgerEntryWithIdOnly = await prisma.walletLedgerEntry.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WalletLedgerEntryUpdateManyAndReturnArgs>(args: SelectSubset<T, WalletLedgerEntryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletLedgerEntryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WalletLedgerEntry.
     * @param {WalletLedgerEntryUpsertArgs} args - Arguments to update or create a WalletLedgerEntry.
     * @example
     * // Update or create a WalletLedgerEntry
     * const walletLedgerEntry = await prisma.walletLedgerEntry.upsert({
     *   create: {
     *     // ... data to create a WalletLedgerEntry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WalletLedgerEntry we want to update
     *   }
     * })
     */
    upsert<T extends WalletLedgerEntryUpsertArgs>(args: SelectSubset<T, WalletLedgerEntryUpsertArgs<ExtArgs>>): Prisma__WalletLedgerEntryClient<$Result.GetResult<Prisma.$WalletLedgerEntryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WalletLedgerEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletLedgerEntryCountArgs} args - Arguments to filter WalletLedgerEntries to count.
     * @example
     * // Count the number of WalletLedgerEntries
     * const count = await prisma.walletLedgerEntry.count({
     *   where: {
     *     // ... the filter for the WalletLedgerEntries we want to count
     *   }
     * })
    **/
    count<T extends WalletLedgerEntryCountArgs>(
      args?: Subset<T, WalletLedgerEntryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WalletLedgerEntryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WalletLedgerEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletLedgerEntryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WalletLedgerEntryAggregateArgs>(args: Subset<T, WalletLedgerEntryAggregateArgs>): Prisma.PrismaPromise<GetWalletLedgerEntryAggregateType<T>>

    /**
     * Group by WalletLedgerEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletLedgerEntryGroupByArgs} args - Group by arguments.
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
      T extends WalletLedgerEntryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WalletLedgerEntryGroupByArgs['orderBy'] }
        : { orderBy?: WalletLedgerEntryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, WalletLedgerEntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWalletLedgerEntryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WalletLedgerEntry model
   */
  readonly fields: WalletLedgerEntryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WalletLedgerEntry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WalletLedgerEntryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    wallet<T extends WalletDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WalletDefaultArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WalletLedgerEntry model
   */
  interface WalletLedgerEntryFieldRefs {
    readonly id: FieldRef<"WalletLedgerEntry", 'String'>
    readonly walletId: FieldRef<"WalletLedgerEntry", 'String'>
    readonly type: FieldRef<"WalletLedgerEntry", 'String'>
    readonly amount: FieldRef<"WalletLedgerEntry", 'Float'>
    readonly balanceBefore: FieldRef<"WalletLedgerEntry", 'Float'>
    readonly balanceAfter: FieldRef<"WalletLedgerEntry", 'Float'>
    readonly reference: FieldRef<"WalletLedgerEntry", 'String'>
    readonly description: FieldRef<"WalletLedgerEntry", 'String'>
    readonly source: FieldRef<"WalletLedgerEntry", 'String'>
    readonly providerEventId: FieldRef<"WalletLedgerEntry", 'String'>
    readonly idempotencyKey: FieldRef<"WalletLedgerEntry", 'String'>
    readonly createdAt: FieldRef<"WalletLedgerEntry", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WalletLedgerEntry findUnique
   */
  export type WalletLedgerEntryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletLedgerEntry
     */
    select?: WalletLedgerEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WalletLedgerEntry
     */
    omit?: WalletLedgerEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletLedgerEntryInclude<ExtArgs> | null
    /**
     * Filter, which WalletLedgerEntry to fetch.
     */
    where: WalletLedgerEntryWhereUniqueInput
  }

  /**
   * WalletLedgerEntry findUniqueOrThrow
   */
  export type WalletLedgerEntryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletLedgerEntry
     */
    select?: WalletLedgerEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WalletLedgerEntry
     */
    omit?: WalletLedgerEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletLedgerEntryInclude<ExtArgs> | null
    /**
     * Filter, which WalletLedgerEntry to fetch.
     */
    where: WalletLedgerEntryWhereUniqueInput
  }

  /**
   * WalletLedgerEntry findFirst
   */
  export type WalletLedgerEntryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletLedgerEntry
     */
    select?: WalletLedgerEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WalletLedgerEntry
     */
    omit?: WalletLedgerEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletLedgerEntryInclude<ExtArgs> | null
    /**
     * Filter, which WalletLedgerEntry to fetch.
     */
    where?: WalletLedgerEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WalletLedgerEntries to fetch.
     */
    orderBy?: WalletLedgerEntryOrderByWithRelationInput | WalletLedgerEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WalletLedgerEntries.
     */
    cursor?: WalletLedgerEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WalletLedgerEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WalletLedgerEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WalletLedgerEntries.
     */
    distinct?: WalletLedgerEntryScalarFieldEnum | WalletLedgerEntryScalarFieldEnum[]
  }

  /**
   * WalletLedgerEntry findFirstOrThrow
   */
  export type WalletLedgerEntryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletLedgerEntry
     */
    select?: WalletLedgerEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WalletLedgerEntry
     */
    omit?: WalletLedgerEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletLedgerEntryInclude<ExtArgs> | null
    /**
     * Filter, which WalletLedgerEntry to fetch.
     */
    where?: WalletLedgerEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WalletLedgerEntries to fetch.
     */
    orderBy?: WalletLedgerEntryOrderByWithRelationInput | WalletLedgerEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WalletLedgerEntries.
     */
    cursor?: WalletLedgerEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WalletLedgerEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WalletLedgerEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WalletLedgerEntries.
     */
    distinct?: WalletLedgerEntryScalarFieldEnum | WalletLedgerEntryScalarFieldEnum[]
  }

  /**
   * WalletLedgerEntry findMany
   */
  export type WalletLedgerEntryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletLedgerEntry
     */
    select?: WalletLedgerEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WalletLedgerEntry
     */
    omit?: WalletLedgerEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletLedgerEntryInclude<ExtArgs> | null
    /**
     * Filter, which WalletLedgerEntries to fetch.
     */
    where?: WalletLedgerEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WalletLedgerEntries to fetch.
     */
    orderBy?: WalletLedgerEntryOrderByWithRelationInput | WalletLedgerEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WalletLedgerEntries.
     */
    cursor?: WalletLedgerEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WalletLedgerEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WalletLedgerEntries.
     */
    skip?: number
    distinct?: WalletLedgerEntryScalarFieldEnum | WalletLedgerEntryScalarFieldEnum[]
  }

  /**
   * WalletLedgerEntry create
   */
  export type WalletLedgerEntryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletLedgerEntry
     */
    select?: WalletLedgerEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WalletLedgerEntry
     */
    omit?: WalletLedgerEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletLedgerEntryInclude<ExtArgs> | null
    /**
     * The data needed to create a WalletLedgerEntry.
     */
    data: XOR<WalletLedgerEntryCreateInput, WalletLedgerEntryUncheckedCreateInput>
  }

  /**
   * WalletLedgerEntry createMany
   */
  export type WalletLedgerEntryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WalletLedgerEntries.
     */
    data: WalletLedgerEntryCreateManyInput | WalletLedgerEntryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WalletLedgerEntry createManyAndReturn
   */
  export type WalletLedgerEntryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletLedgerEntry
     */
    select?: WalletLedgerEntrySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WalletLedgerEntry
     */
    omit?: WalletLedgerEntryOmit<ExtArgs> | null
    /**
     * The data used to create many WalletLedgerEntries.
     */
    data: WalletLedgerEntryCreateManyInput | WalletLedgerEntryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletLedgerEntryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WalletLedgerEntry update
   */
  export type WalletLedgerEntryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletLedgerEntry
     */
    select?: WalletLedgerEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WalletLedgerEntry
     */
    omit?: WalletLedgerEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletLedgerEntryInclude<ExtArgs> | null
    /**
     * The data needed to update a WalletLedgerEntry.
     */
    data: XOR<WalletLedgerEntryUpdateInput, WalletLedgerEntryUncheckedUpdateInput>
    /**
     * Choose, which WalletLedgerEntry to update.
     */
    where: WalletLedgerEntryWhereUniqueInput
  }

  /**
   * WalletLedgerEntry updateMany
   */
  export type WalletLedgerEntryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WalletLedgerEntries.
     */
    data: XOR<WalletLedgerEntryUpdateManyMutationInput, WalletLedgerEntryUncheckedUpdateManyInput>
    /**
     * Filter which WalletLedgerEntries to update
     */
    where?: WalletLedgerEntryWhereInput
    /**
     * Limit how many WalletLedgerEntries to update.
     */
    limit?: number
  }

  /**
   * WalletLedgerEntry updateManyAndReturn
   */
  export type WalletLedgerEntryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletLedgerEntry
     */
    select?: WalletLedgerEntrySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WalletLedgerEntry
     */
    omit?: WalletLedgerEntryOmit<ExtArgs> | null
    /**
     * The data used to update WalletLedgerEntries.
     */
    data: XOR<WalletLedgerEntryUpdateManyMutationInput, WalletLedgerEntryUncheckedUpdateManyInput>
    /**
     * Filter which WalletLedgerEntries to update
     */
    where?: WalletLedgerEntryWhereInput
    /**
     * Limit how many WalletLedgerEntries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletLedgerEntryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WalletLedgerEntry upsert
   */
  export type WalletLedgerEntryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletLedgerEntry
     */
    select?: WalletLedgerEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WalletLedgerEntry
     */
    omit?: WalletLedgerEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletLedgerEntryInclude<ExtArgs> | null
    /**
     * The filter to search for the WalletLedgerEntry to update in case it exists.
     */
    where: WalletLedgerEntryWhereUniqueInput
    /**
     * In case the WalletLedgerEntry found by the `where` argument doesn't exist, create a new WalletLedgerEntry with this data.
     */
    create: XOR<WalletLedgerEntryCreateInput, WalletLedgerEntryUncheckedCreateInput>
    /**
     * In case the WalletLedgerEntry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WalletLedgerEntryUpdateInput, WalletLedgerEntryUncheckedUpdateInput>
  }

  /**
   * WalletLedgerEntry delete
   */
  export type WalletLedgerEntryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletLedgerEntry
     */
    select?: WalletLedgerEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WalletLedgerEntry
     */
    omit?: WalletLedgerEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletLedgerEntryInclude<ExtArgs> | null
    /**
     * Filter which WalletLedgerEntry to delete.
     */
    where: WalletLedgerEntryWhereUniqueInput
  }

  /**
   * WalletLedgerEntry deleteMany
   */
  export type WalletLedgerEntryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WalletLedgerEntries to delete
     */
    where?: WalletLedgerEntryWhereInput
    /**
     * Limit how many WalletLedgerEntries to delete.
     */
    limit?: number
  }

  /**
   * WalletLedgerEntry without action
   */
  export type WalletLedgerEntryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletLedgerEntry
     */
    select?: WalletLedgerEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WalletLedgerEntry
     */
    omit?: WalletLedgerEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletLedgerEntryInclude<ExtArgs> | null
  }


  /**
   * Model OnRamp
   */

  export type AggregateOnRamp = {
    _count: OnRampCountAggregateOutputType | null
    _avg: OnRampAvgAggregateOutputType | null
    _sum: OnRampSumAggregateOutputType | null
    _min: OnRampMinAggregateOutputType | null
    _max: OnRampMaxAggregateOutputType | null
  }

  export type OnRampAvgAggregateOutputType = {
    amount: number | null
    cryptoAmount: number | null
  }

  export type OnRampSumAggregateOutputType = {
    amount: number | null
    cryptoAmount: number | null
  }

  export type OnRampMinAggregateOutputType = {
    id: string | null
    walletId: string | null
    provider: string | null
    providerTxId: string | null
    amount: number | null
    cryptoAmount: number | null
    currency: string | null
    status: string | null
    createdAt: Date | null
    completedAt: Date | null
  }

  export type OnRampMaxAggregateOutputType = {
    id: string | null
    walletId: string | null
    provider: string | null
    providerTxId: string | null
    amount: number | null
    cryptoAmount: number | null
    currency: string | null
    status: string | null
    createdAt: Date | null
    completedAt: Date | null
  }

  export type OnRampCountAggregateOutputType = {
    id: number
    walletId: number
    provider: number
    providerTxId: number
    amount: number
    cryptoAmount: number
    currency: number
    status: number
    metadata: number
    createdAt: number
    completedAt: number
    _all: number
  }


  export type OnRampAvgAggregateInputType = {
    amount?: true
    cryptoAmount?: true
  }

  export type OnRampSumAggregateInputType = {
    amount?: true
    cryptoAmount?: true
  }

  export type OnRampMinAggregateInputType = {
    id?: true
    walletId?: true
    provider?: true
    providerTxId?: true
    amount?: true
    cryptoAmount?: true
    currency?: true
    status?: true
    createdAt?: true
    completedAt?: true
  }

  export type OnRampMaxAggregateInputType = {
    id?: true
    walletId?: true
    provider?: true
    providerTxId?: true
    amount?: true
    cryptoAmount?: true
    currency?: true
    status?: true
    createdAt?: true
    completedAt?: true
  }

  export type OnRampCountAggregateInputType = {
    id?: true
    walletId?: true
    provider?: true
    providerTxId?: true
    amount?: true
    cryptoAmount?: true
    currency?: true
    status?: true
    metadata?: true
    createdAt?: true
    completedAt?: true
    _all?: true
  }

  export type OnRampAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OnRamp to aggregate.
     */
    where?: OnRampWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OnRamps to fetch.
     */
    orderBy?: OnRampOrderByWithRelationInput | OnRampOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OnRampWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OnRamps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OnRamps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OnRamps
    **/
    _count?: true | OnRampCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OnRampAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OnRampSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OnRampMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OnRampMaxAggregateInputType
  }

  export type GetOnRampAggregateType<T extends OnRampAggregateArgs> = {
        [P in keyof T & keyof AggregateOnRamp]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOnRamp[P]>
      : GetScalarType<T[P], AggregateOnRamp[P]>
  }




  export type OnRampGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OnRampWhereInput
    orderBy?: OnRampOrderByWithAggregationInput | OnRampOrderByWithAggregationInput[]
    by: OnRampScalarFieldEnum[] | OnRampScalarFieldEnum
    having?: OnRampScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OnRampCountAggregateInputType | true
    _avg?: OnRampAvgAggregateInputType
    _sum?: OnRampSumAggregateInputType
    _min?: OnRampMinAggregateInputType
    _max?: OnRampMaxAggregateInputType
  }

  export type OnRampGroupByOutputType = {
    id: string
    walletId: string
    provider: string
    providerTxId: string | null
    amount: number
    cryptoAmount: number | null
    currency: string
    status: string
    metadata: JsonValue | null
    createdAt: Date
    completedAt: Date | null
    _count: OnRampCountAggregateOutputType | null
    _avg: OnRampAvgAggregateOutputType | null
    _sum: OnRampSumAggregateOutputType | null
    _min: OnRampMinAggregateOutputType | null
    _max: OnRampMaxAggregateOutputType | null
  }

  type GetOnRampGroupByPayload<T extends OnRampGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OnRampGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OnRampGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OnRampGroupByOutputType[P]>
            : GetScalarType<T[P], OnRampGroupByOutputType[P]>
        }
      >
    >


  export type OnRampSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    walletId?: boolean
    provider?: boolean
    providerTxId?: boolean
    amount?: boolean
    cryptoAmount?: boolean
    currency?: boolean
    status?: boolean
    metadata?: boolean
    createdAt?: boolean
    completedAt?: boolean
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
    missingWebhook?: boolean | OnRamp$missingWebhookArgs<ExtArgs>
  }, ExtArgs["result"]["onRamp"]>

  export type OnRampSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    walletId?: boolean
    provider?: boolean
    providerTxId?: boolean
    amount?: boolean
    cryptoAmount?: boolean
    currency?: boolean
    status?: boolean
    metadata?: boolean
    createdAt?: boolean
    completedAt?: boolean
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["onRamp"]>

  export type OnRampSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    walletId?: boolean
    provider?: boolean
    providerTxId?: boolean
    amount?: boolean
    cryptoAmount?: boolean
    currency?: boolean
    status?: boolean
    metadata?: boolean
    createdAt?: boolean
    completedAt?: boolean
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["onRamp"]>

  export type OnRampSelectScalar = {
    id?: boolean
    walletId?: boolean
    provider?: boolean
    providerTxId?: boolean
    amount?: boolean
    cryptoAmount?: boolean
    currency?: boolean
    status?: boolean
    metadata?: boolean
    createdAt?: boolean
    completedAt?: boolean
  }

  export type OnRampOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "walletId" | "provider" | "providerTxId" | "amount" | "cryptoAmount" | "currency" | "status" | "metadata" | "createdAt" | "completedAt", ExtArgs["result"]["onRamp"]>
  export type OnRampInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
    missingWebhook?: boolean | OnRamp$missingWebhookArgs<ExtArgs>
  }
  export type OnRampIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
  }
  export type OnRampIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
  }

  export type $OnRampPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OnRamp"
    objects: {
      wallet: Prisma.$WalletPayload<ExtArgs>
      missingWebhook: Prisma.$MissingWebhookAlertPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      walletId: string
      provider: string
      providerTxId: string | null
      amount: number
      cryptoAmount: number | null
      currency: string
      status: string
      metadata: Prisma.JsonValue | null
      createdAt: Date
      completedAt: Date | null
    }, ExtArgs["result"]["onRamp"]>
    composites: {}
  }

  type OnRampGetPayload<S extends boolean | null | undefined | OnRampDefaultArgs> = $Result.GetResult<Prisma.$OnRampPayload, S>

  type OnRampCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OnRampFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OnRampCountAggregateInputType | true
    }

  export interface OnRampDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OnRamp'], meta: { name: 'OnRamp' } }
    /**
     * Find zero or one OnRamp that matches the filter.
     * @param {OnRampFindUniqueArgs} args - Arguments to find a OnRamp
     * @example
     * // Get one OnRamp
     * const onRamp = await prisma.onRamp.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OnRampFindUniqueArgs>(args: SelectSubset<T, OnRampFindUniqueArgs<ExtArgs>>): Prisma__OnRampClient<$Result.GetResult<Prisma.$OnRampPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OnRamp that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OnRampFindUniqueOrThrowArgs} args - Arguments to find a OnRamp
     * @example
     * // Get one OnRamp
     * const onRamp = await prisma.onRamp.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OnRampFindUniqueOrThrowArgs>(args: SelectSubset<T, OnRampFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OnRampClient<$Result.GetResult<Prisma.$OnRampPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OnRamp that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OnRampFindFirstArgs} args - Arguments to find a OnRamp
     * @example
     * // Get one OnRamp
     * const onRamp = await prisma.onRamp.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OnRampFindFirstArgs>(args?: SelectSubset<T, OnRampFindFirstArgs<ExtArgs>>): Prisma__OnRampClient<$Result.GetResult<Prisma.$OnRampPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OnRamp that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OnRampFindFirstOrThrowArgs} args - Arguments to find a OnRamp
     * @example
     * // Get one OnRamp
     * const onRamp = await prisma.onRamp.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OnRampFindFirstOrThrowArgs>(args?: SelectSubset<T, OnRampFindFirstOrThrowArgs<ExtArgs>>): Prisma__OnRampClient<$Result.GetResult<Prisma.$OnRampPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OnRamps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OnRampFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OnRamps
     * const onRamps = await prisma.onRamp.findMany()
     * 
     * // Get first 10 OnRamps
     * const onRamps = await prisma.onRamp.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const onRampWithIdOnly = await prisma.onRamp.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OnRampFindManyArgs>(args?: SelectSubset<T, OnRampFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OnRampPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OnRamp.
     * @param {OnRampCreateArgs} args - Arguments to create a OnRamp.
     * @example
     * // Create one OnRamp
     * const OnRamp = await prisma.onRamp.create({
     *   data: {
     *     // ... data to create a OnRamp
     *   }
     * })
     * 
     */
    create<T extends OnRampCreateArgs>(args: SelectSubset<T, OnRampCreateArgs<ExtArgs>>): Prisma__OnRampClient<$Result.GetResult<Prisma.$OnRampPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OnRamps.
     * @param {OnRampCreateManyArgs} args - Arguments to create many OnRamps.
     * @example
     * // Create many OnRamps
     * const onRamp = await prisma.onRamp.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OnRampCreateManyArgs>(args?: SelectSubset<T, OnRampCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OnRamps and returns the data saved in the database.
     * @param {OnRampCreateManyAndReturnArgs} args - Arguments to create many OnRamps.
     * @example
     * // Create many OnRamps
     * const onRamp = await prisma.onRamp.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OnRamps and only return the `id`
     * const onRampWithIdOnly = await prisma.onRamp.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OnRampCreateManyAndReturnArgs>(args?: SelectSubset<T, OnRampCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OnRampPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OnRamp.
     * @param {OnRampDeleteArgs} args - Arguments to delete one OnRamp.
     * @example
     * // Delete one OnRamp
     * const OnRamp = await prisma.onRamp.delete({
     *   where: {
     *     // ... filter to delete one OnRamp
     *   }
     * })
     * 
     */
    delete<T extends OnRampDeleteArgs>(args: SelectSubset<T, OnRampDeleteArgs<ExtArgs>>): Prisma__OnRampClient<$Result.GetResult<Prisma.$OnRampPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OnRamp.
     * @param {OnRampUpdateArgs} args - Arguments to update one OnRamp.
     * @example
     * // Update one OnRamp
     * const onRamp = await prisma.onRamp.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OnRampUpdateArgs>(args: SelectSubset<T, OnRampUpdateArgs<ExtArgs>>): Prisma__OnRampClient<$Result.GetResult<Prisma.$OnRampPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OnRamps.
     * @param {OnRampDeleteManyArgs} args - Arguments to filter OnRamps to delete.
     * @example
     * // Delete a few OnRamps
     * const { count } = await prisma.onRamp.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OnRampDeleteManyArgs>(args?: SelectSubset<T, OnRampDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OnRamps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OnRampUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OnRamps
     * const onRamp = await prisma.onRamp.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OnRampUpdateManyArgs>(args: SelectSubset<T, OnRampUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OnRamps and returns the data updated in the database.
     * @param {OnRampUpdateManyAndReturnArgs} args - Arguments to update many OnRamps.
     * @example
     * // Update many OnRamps
     * const onRamp = await prisma.onRamp.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OnRamps and only return the `id`
     * const onRampWithIdOnly = await prisma.onRamp.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OnRampUpdateManyAndReturnArgs>(args: SelectSubset<T, OnRampUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OnRampPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OnRamp.
     * @param {OnRampUpsertArgs} args - Arguments to update or create a OnRamp.
     * @example
     * // Update or create a OnRamp
     * const onRamp = await prisma.onRamp.upsert({
     *   create: {
     *     // ... data to create a OnRamp
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OnRamp we want to update
     *   }
     * })
     */
    upsert<T extends OnRampUpsertArgs>(args: SelectSubset<T, OnRampUpsertArgs<ExtArgs>>): Prisma__OnRampClient<$Result.GetResult<Prisma.$OnRampPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OnRamps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OnRampCountArgs} args - Arguments to filter OnRamps to count.
     * @example
     * // Count the number of OnRamps
     * const count = await prisma.onRamp.count({
     *   where: {
     *     // ... the filter for the OnRamps we want to count
     *   }
     * })
    **/
    count<T extends OnRampCountArgs>(
      args?: Subset<T, OnRampCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OnRampCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OnRamp.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OnRampAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OnRampAggregateArgs>(args: Subset<T, OnRampAggregateArgs>): Prisma.PrismaPromise<GetOnRampAggregateType<T>>

    /**
     * Group by OnRamp.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OnRampGroupByArgs} args - Group by arguments.
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
      T extends OnRampGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OnRampGroupByArgs['orderBy'] }
        : { orderBy?: OnRampGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, OnRampGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOnRampGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OnRamp model
   */
  readonly fields: OnRampFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OnRamp.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OnRampClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    wallet<T extends WalletDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WalletDefaultArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    missingWebhook<T extends OnRamp$missingWebhookArgs<ExtArgs> = {}>(args?: Subset<T, OnRamp$missingWebhookArgs<ExtArgs>>): Prisma__MissingWebhookAlertClient<$Result.GetResult<Prisma.$MissingWebhookAlertPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OnRamp model
   */
  interface OnRampFieldRefs {
    readonly id: FieldRef<"OnRamp", 'String'>
    readonly walletId: FieldRef<"OnRamp", 'String'>
    readonly provider: FieldRef<"OnRamp", 'String'>
    readonly providerTxId: FieldRef<"OnRamp", 'String'>
    readonly amount: FieldRef<"OnRamp", 'Float'>
    readonly cryptoAmount: FieldRef<"OnRamp", 'Float'>
    readonly currency: FieldRef<"OnRamp", 'String'>
    readonly status: FieldRef<"OnRamp", 'String'>
    readonly metadata: FieldRef<"OnRamp", 'Json'>
    readonly createdAt: FieldRef<"OnRamp", 'DateTime'>
    readonly completedAt: FieldRef<"OnRamp", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OnRamp findUnique
   */
  export type OnRampFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnRamp
     */
    select?: OnRampSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OnRamp
     */
    omit?: OnRampOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnRampInclude<ExtArgs> | null
    /**
     * Filter, which OnRamp to fetch.
     */
    where: OnRampWhereUniqueInput
  }

  /**
   * OnRamp findUniqueOrThrow
   */
  export type OnRampFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnRamp
     */
    select?: OnRampSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OnRamp
     */
    omit?: OnRampOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnRampInclude<ExtArgs> | null
    /**
     * Filter, which OnRamp to fetch.
     */
    where: OnRampWhereUniqueInput
  }

  /**
   * OnRamp findFirst
   */
  export type OnRampFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnRamp
     */
    select?: OnRampSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OnRamp
     */
    omit?: OnRampOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnRampInclude<ExtArgs> | null
    /**
     * Filter, which OnRamp to fetch.
     */
    where?: OnRampWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OnRamps to fetch.
     */
    orderBy?: OnRampOrderByWithRelationInput | OnRampOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OnRamps.
     */
    cursor?: OnRampWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OnRamps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OnRamps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OnRamps.
     */
    distinct?: OnRampScalarFieldEnum | OnRampScalarFieldEnum[]
  }

  /**
   * OnRamp findFirstOrThrow
   */
  export type OnRampFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnRamp
     */
    select?: OnRampSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OnRamp
     */
    omit?: OnRampOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnRampInclude<ExtArgs> | null
    /**
     * Filter, which OnRamp to fetch.
     */
    where?: OnRampWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OnRamps to fetch.
     */
    orderBy?: OnRampOrderByWithRelationInput | OnRampOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OnRamps.
     */
    cursor?: OnRampWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OnRamps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OnRamps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OnRamps.
     */
    distinct?: OnRampScalarFieldEnum | OnRampScalarFieldEnum[]
  }

  /**
   * OnRamp findMany
   */
  export type OnRampFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnRamp
     */
    select?: OnRampSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OnRamp
     */
    omit?: OnRampOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnRampInclude<ExtArgs> | null
    /**
     * Filter, which OnRamps to fetch.
     */
    where?: OnRampWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OnRamps to fetch.
     */
    orderBy?: OnRampOrderByWithRelationInput | OnRampOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OnRamps.
     */
    cursor?: OnRampWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OnRamps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OnRamps.
     */
    skip?: number
    distinct?: OnRampScalarFieldEnum | OnRampScalarFieldEnum[]
  }

  /**
   * OnRamp create
   */
  export type OnRampCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnRamp
     */
    select?: OnRampSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OnRamp
     */
    omit?: OnRampOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnRampInclude<ExtArgs> | null
    /**
     * The data needed to create a OnRamp.
     */
    data: XOR<OnRampCreateInput, OnRampUncheckedCreateInput>
  }

  /**
   * OnRamp createMany
   */
  export type OnRampCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OnRamps.
     */
    data: OnRampCreateManyInput | OnRampCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OnRamp createManyAndReturn
   */
  export type OnRampCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnRamp
     */
    select?: OnRampSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OnRamp
     */
    omit?: OnRampOmit<ExtArgs> | null
    /**
     * The data used to create many OnRamps.
     */
    data: OnRampCreateManyInput | OnRampCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnRampIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OnRamp update
   */
  export type OnRampUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnRamp
     */
    select?: OnRampSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OnRamp
     */
    omit?: OnRampOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnRampInclude<ExtArgs> | null
    /**
     * The data needed to update a OnRamp.
     */
    data: XOR<OnRampUpdateInput, OnRampUncheckedUpdateInput>
    /**
     * Choose, which OnRamp to update.
     */
    where: OnRampWhereUniqueInput
  }

  /**
   * OnRamp updateMany
   */
  export type OnRampUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OnRamps.
     */
    data: XOR<OnRampUpdateManyMutationInput, OnRampUncheckedUpdateManyInput>
    /**
     * Filter which OnRamps to update
     */
    where?: OnRampWhereInput
    /**
     * Limit how many OnRamps to update.
     */
    limit?: number
  }

  /**
   * OnRamp updateManyAndReturn
   */
  export type OnRampUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnRamp
     */
    select?: OnRampSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OnRamp
     */
    omit?: OnRampOmit<ExtArgs> | null
    /**
     * The data used to update OnRamps.
     */
    data: XOR<OnRampUpdateManyMutationInput, OnRampUncheckedUpdateManyInput>
    /**
     * Filter which OnRamps to update
     */
    where?: OnRampWhereInput
    /**
     * Limit how many OnRamps to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnRampIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OnRamp upsert
   */
  export type OnRampUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnRamp
     */
    select?: OnRampSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OnRamp
     */
    omit?: OnRampOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnRampInclude<ExtArgs> | null
    /**
     * The filter to search for the OnRamp to update in case it exists.
     */
    where: OnRampWhereUniqueInput
    /**
     * In case the OnRamp found by the `where` argument doesn't exist, create a new OnRamp with this data.
     */
    create: XOR<OnRampCreateInput, OnRampUncheckedCreateInput>
    /**
     * In case the OnRamp was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OnRampUpdateInput, OnRampUncheckedUpdateInput>
  }

  /**
   * OnRamp delete
   */
  export type OnRampDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnRamp
     */
    select?: OnRampSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OnRamp
     */
    omit?: OnRampOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnRampInclude<ExtArgs> | null
    /**
     * Filter which OnRamp to delete.
     */
    where: OnRampWhereUniqueInput
  }

  /**
   * OnRamp deleteMany
   */
  export type OnRampDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OnRamps to delete
     */
    where?: OnRampWhereInput
    /**
     * Limit how many OnRamps to delete.
     */
    limit?: number
  }

  /**
   * OnRamp.missingWebhook
   */
  export type OnRamp$missingWebhookArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MissingWebhookAlert
     */
    select?: MissingWebhookAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MissingWebhookAlert
     */
    omit?: MissingWebhookAlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissingWebhookAlertInclude<ExtArgs> | null
    where?: MissingWebhookAlertWhereInput
  }

  /**
   * OnRamp without action
   */
  export type OnRampDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnRamp
     */
    select?: OnRampSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OnRamp
     */
    omit?: OnRampOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnRampInclude<ExtArgs> | null
  }


  /**
   * Model WebhookEvent
   */

  export type AggregateWebhookEvent = {
    _count: WebhookEventCountAggregateOutputType | null
    _avg: WebhookEventAvgAggregateOutputType | null
    _sum: WebhookEventSumAggregateOutputType | null
    _min: WebhookEventMinAggregateOutputType | null
    _max: WebhookEventMaxAggregateOutputType | null
  }

  export type WebhookEventAvgAggregateOutputType = {
    retryCount: number | null
    maxRetries: number | null
  }

  export type WebhookEventSumAggregateOutputType = {
    retryCount: number | null
    maxRetries: number | null
  }

  export type WebhookEventMinAggregateOutputType = {
    id: string | null
    provider: string | null
    externalId: string | null
    payloadHash: string | null
    status: string | null
    transactionId: string | null
    errorMessage: string | null
    receivedAt: Date | null
    processedAt: Date | null
    retryCount: number | null
    maxRetries: number | null
    lastRetryAt: Date | null
    deadLetterAt: Date | null
  }

  export type WebhookEventMaxAggregateOutputType = {
    id: string | null
    provider: string | null
    externalId: string | null
    payloadHash: string | null
    status: string | null
    transactionId: string | null
    errorMessage: string | null
    receivedAt: Date | null
    processedAt: Date | null
    retryCount: number | null
    maxRetries: number | null
    lastRetryAt: Date | null
    deadLetterAt: Date | null
  }

  export type WebhookEventCountAggregateOutputType = {
    id: number
    provider: number
    externalId: number
    payloadHash: number
    status: number
    transactionId: number
    errorMessage: number
    receivedAt: number
    processedAt: number
    retryCount: number
    maxRetries: number
    lastRetryAt: number
    deadLetterAt: number
    _all: number
  }


  export type WebhookEventAvgAggregateInputType = {
    retryCount?: true
    maxRetries?: true
  }

  export type WebhookEventSumAggregateInputType = {
    retryCount?: true
    maxRetries?: true
  }

  export type WebhookEventMinAggregateInputType = {
    id?: true
    provider?: true
    externalId?: true
    payloadHash?: true
    status?: true
    transactionId?: true
    errorMessage?: true
    receivedAt?: true
    processedAt?: true
    retryCount?: true
    maxRetries?: true
    lastRetryAt?: true
    deadLetterAt?: true
  }

  export type WebhookEventMaxAggregateInputType = {
    id?: true
    provider?: true
    externalId?: true
    payloadHash?: true
    status?: true
    transactionId?: true
    errorMessage?: true
    receivedAt?: true
    processedAt?: true
    retryCount?: true
    maxRetries?: true
    lastRetryAt?: true
    deadLetterAt?: true
  }

  export type WebhookEventCountAggregateInputType = {
    id?: true
    provider?: true
    externalId?: true
    payloadHash?: true
    status?: true
    transactionId?: true
    errorMessage?: true
    receivedAt?: true
    processedAt?: true
    retryCount?: true
    maxRetries?: true
    lastRetryAt?: true
    deadLetterAt?: true
    _all?: true
  }

  export type WebhookEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WebhookEvent to aggregate.
     */
    where?: WebhookEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookEvents to fetch.
     */
    orderBy?: WebhookEventOrderByWithRelationInput | WebhookEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WebhookEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WebhookEvents
    **/
    _count?: true | WebhookEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WebhookEventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WebhookEventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WebhookEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WebhookEventMaxAggregateInputType
  }

  export type GetWebhookEventAggregateType<T extends WebhookEventAggregateArgs> = {
        [P in keyof T & keyof AggregateWebhookEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWebhookEvent[P]>
      : GetScalarType<T[P], AggregateWebhookEvent[P]>
  }




  export type WebhookEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WebhookEventWhereInput
    orderBy?: WebhookEventOrderByWithAggregationInput | WebhookEventOrderByWithAggregationInput[]
    by: WebhookEventScalarFieldEnum[] | WebhookEventScalarFieldEnum
    having?: WebhookEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WebhookEventCountAggregateInputType | true
    _avg?: WebhookEventAvgAggregateInputType
    _sum?: WebhookEventSumAggregateInputType
    _min?: WebhookEventMinAggregateInputType
    _max?: WebhookEventMaxAggregateInputType
  }

  export type WebhookEventGroupByOutputType = {
    id: string
    provider: string
    externalId: string
    payloadHash: string
    status: string
    transactionId: string | null
    errorMessage: string | null
    receivedAt: Date
    processedAt: Date | null
    retryCount: number
    maxRetries: number
    lastRetryAt: Date | null
    deadLetterAt: Date | null
    _count: WebhookEventCountAggregateOutputType | null
    _avg: WebhookEventAvgAggregateOutputType | null
    _sum: WebhookEventSumAggregateOutputType | null
    _min: WebhookEventMinAggregateOutputType | null
    _max: WebhookEventMaxAggregateOutputType | null
  }

  type GetWebhookEventGroupByPayload<T extends WebhookEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WebhookEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WebhookEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WebhookEventGroupByOutputType[P]>
            : GetScalarType<T[P], WebhookEventGroupByOutputType[P]>
        }
      >
    >


  export type WebhookEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    externalId?: boolean
    payloadHash?: boolean
    status?: boolean
    transactionId?: boolean
    errorMessage?: boolean
    receivedAt?: boolean
    processedAt?: boolean
    retryCount?: boolean
    maxRetries?: boolean
    lastRetryAt?: boolean
    deadLetterAt?: boolean
    transaction?: boolean | WebhookEvent$transactionArgs<ExtArgs>
  }, ExtArgs["result"]["webhookEvent"]>

  export type WebhookEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    externalId?: boolean
    payloadHash?: boolean
    status?: boolean
    transactionId?: boolean
    errorMessage?: boolean
    receivedAt?: boolean
    processedAt?: boolean
    retryCount?: boolean
    maxRetries?: boolean
    lastRetryAt?: boolean
    deadLetterAt?: boolean
    transaction?: boolean | WebhookEvent$transactionArgs<ExtArgs>
  }, ExtArgs["result"]["webhookEvent"]>

  export type WebhookEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    externalId?: boolean
    payloadHash?: boolean
    status?: boolean
    transactionId?: boolean
    errorMessage?: boolean
    receivedAt?: boolean
    processedAt?: boolean
    retryCount?: boolean
    maxRetries?: boolean
    lastRetryAt?: boolean
    deadLetterAt?: boolean
    transaction?: boolean | WebhookEvent$transactionArgs<ExtArgs>
  }, ExtArgs["result"]["webhookEvent"]>

  export type WebhookEventSelectScalar = {
    id?: boolean
    provider?: boolean
    externalId?: boolean
    payloadHash?: boolean
    status?: boolean
    transactionId?: boolean
    errorMessage?: boolean
    receivedAt?: boolean
    processedAt?: boolean
    retryCount?: boolean
    maxRetries?: boolean
    lastRetryAt?: boolean
    deadLetterAt?: boolean
  }

  export type WebhookEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "provider" | "externalId" | "payloadHash" | "status" | "transactionId" | "errorMessage" | "receivedAt" | "processedAt" | "retryCount" | "maxRetries" | "lastRetryAt" | "deadLetterAt", ExtArgs["result"]["webhookEvent"]>
  export type WebhookEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transaction?: boolean | WebhookEvent$transactionArgs<ExtArgs>
  }
  export type WebhookEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transaction?: boolean | WebhookEvent$transactionArgs<ExtArgs>
  }
  export type WebhookEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transaction?: boolean | WebhookEvent$transactionArgs<ExtArgs>
  }

  export type $WebhookEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WebhookEvent"
    objects: {
      transaction: Prisma.$TransactionPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      provider: string
      externalId: string
      payloadHash: string
      status: string
      transactionId: string | null
      errorMessage: string | null
      receivedAt: Date
      processedAt: Date | null
      retryCount: number
      maxRetries: number
      lastRetryAt: Date | null
      deadLetterAt: Date | null
    }, ExtArgs["result"]["webhookEvent"]>
    composites: {}
  }

  type WebhookEventGetPayload<S extends boolean | null | undefined | WebhookEventDefaultArgs> = $Result.GetResult<Prisma.$WebhookEventPayload, S>

  type WebhookEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WebhookEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WebhookEventCountAggregateInputType | true
    }

  export interface WebhookEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WebhookEvent'], meta: { name: 'WebhookEvent' } }
    /**
     * Find zero or one WebhookEvent that matches the filter.
     * @param {WebhookEventFindUniqueArgs} args - Arguments to find a WebhookEvent
     * @example
     * // Get one WebhookEvent
     * const webhookEvent = await prisma.webhookEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WebhookEventFindUniqueArgs>(args: SelectSubset<T, WebhookEventFindUniqueArgs<ExtArgs>>): Prisma__WebhookEventClient<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WebhookEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WebhookEventFindUniqueOrThrowArgs} args - Arguments to find a WebhookEvent
     * @example
     * // Get one WebhookEvent
     * const webhookEvent = await prisma.webhookEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WebhookEventFindUniqueOrThrowArgs>(args: SelectSubset<T, WebhookEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WebhookEventClient<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WebhookEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEventFindFirstArgs} args - Arguments to find a WebhookEvent
     * @example
     * // Get one WebhookEvent
     * const webhookEvent = await prisma.webhookEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WebhookEventFindFirstArgs>(args?: SelectSubset<T, WebhookEventFindFirstArgs<ExtArgs>>): Prisma__WebhookEventClient<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WebhookEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEventFindFirstOrThrowArgs} args - Arguments to find a WebhookEvent
     * @example
     * // Get one WebhookEvent
     * const webhookEvent = await prisma.webhookEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WebhookEventFindFirstOrThrowArgs>(args?: SelectSubset<T, WebhookEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__WebhookEventClient<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WebhookEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WebhookEvents
     * const webhookEvents = await prisma.webhookEvent.findMany()
     * 
     * // Get first 10 WebhookEvents
     * const webhookEvents = await prisma.webhookEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const webhookEventWithIdOnly = await prisma.webhookEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WebhookEventFindManyArgs>(args?: SelectSubset<T, WebhookEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WebhookEvent.
     * @param {WebhookEventCreateArgs} args - Arguments to create a WebhookEvent.
     * @example
     * // Create one WebhookEvent
     * const WebhookEvent = await prisma.webhookEvent.create({
     *   data: {
     *     // ... data to create a WebhookEvent
     *   }
     * })
     * 
     */
    create<T extends WebhookEventCreateArgs>(args: SelectSubset<T, WebhookEventCreateArgs<ExtArgs>>): Prisma__WebhookEventClient<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WebhookEvents.
     * @param {WebhookEventCreateManyArgs} args - Arguments to create many WebhookEvents.
     * @example
     * // Create many WebhookEvents
     * const webhookEvent = await prisma.webhookEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WebhookEventCreateManyArgs>(args?: SelectSubset<T, WebhookEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WebhookEvents and returns the data saved in the database.
     * @param {WebhookEventCreateManyAndReturnArgs} args - Arguments to create many WebhookEvents.
     * @example
     * // Create many WebhookEvents
     * const webhookEvent = await prisma.webhookEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WebhookEvents and only return the `id`
     * const webhookEventWithIdOnly = await prisma.webhookEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WebhookEventCreateManyAndReturnArgs>(args?: SelectSubset<T, WebhookEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WebhookEvent.
     * @param {WebhookEventDeleteArgs} args - Arguments to delete one WebhookEvent.
     * @example
     * // Delete one WebhookEvent
     * const WebhookEvent = await prisma.webhookEvent.delete({
     *   where: {
     *     // ... filter to delete one WebhookEvent
     *   }
     * })
     * 
     */
    delete<T extends WebhookEventDeleteArgs>(args: SelectSubset<T, WebhookEventDeleteArgs<ExtArgs>>): Prisma__WebhookEventClient<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WebhookEvent.
     * @param {WebhookEventUpdateArgs} args - Arguments to update one WebhookEvent.
     * @example
     * // Update one WebhookEvent
     * const webhookEvent = await prisma.webhookEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WebhookEventUpdateArgs>(args: SelectSubset<T, WebhookEventUpdateArgs<ExtArgs>>): Prisma__WebhookEventClient<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WebhookEvents.
     * @param {WebhookEventDeleteManyArgs} args - Arguments to filter WebhookEvents to delete.
     * @example
     * // Delete a few WebhookEvents
     * const { count } = await prisma.webhookEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WebhookEventDeleteManyArgs>(args?: SelectSubset<T, WebhookEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WebhookEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WebhookEvents
     * const webhookEvent = await prisma.webhookEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WebhookEventUpdateManyArgs>(args: SelectSubset<T, WebhookEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WebhookEvents and returns the data updated in the database.
     * @param {WebhookEventUpdateManyAndReturnArgs} args - Arguments to update many WebhookEvents.
     * @example
     * // Update many WebhookEvents
     * const webhookEvent = await prisma.webhookEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WebhookEvents and only return the `id`
     * const webhookEventWithIdOnly = await prisma.webhookEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WebhookEventUpdateManyAndReturnArgs>(args: SelectSubset<T, WebhookEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WebhookEvent.
     * @param {WebhookEventUpsertArgs} args - Arguments to update or create a WebhookEvent.
     * @example
     * // Update or create a WebhookEvent
     * const webhookEvent = await prisma.webhookEvent.upsert({
     *   create: {
     *     // ... data to create a WebhookEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WebhookEvent we want to update
     *   }
     * })
     */
    upsert<T extends WebhookEventUpsertArgs>(args: SelectSubset<T, WebhookEventUpsertArgs<ExtArgs>>): Prisma__WebhookEventClient<$Result.GetResult<Prisma.$WebhookEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WebhookEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEventCountArgs} args - Arguments to filter WebhookEvents to count.
     * @example
     * // Count the number of WebhookEvents
     * const count = await prisma.webhookEvent.count({
     *   where: {
     *     // ... the filter for the WebhookEvents we want to count
     *   }
     * })
    **/
    count<T extends WebhookEventCountArgs>(
      args?: Subset<T, WebhookEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WebhookEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WebhookEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WebhookEventAggregateArgs>(args: Subset<T, WebhookEventAggregateArgs>): Prisma.PrismaPromise<GetWebhookEventAggregateType<T>>

    /**
     * Group by WebhookEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEventGroupByArgs} args - Group by arguments.
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
      T extends WebhookEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WebhookEventGroupByArgs['orderBy'] }
        : { orderBy?: WebhookEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, WebhookEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWebhookEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WebhookEvent model
   */
  readonly fields: WebhookEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WebhookEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WebhookEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    transaction<T extends WebhookEvent$transactionArgs<ExtArgs> = {}>(args?: Subset<T, WebhookEvent$transactionArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WebhookEvent model
   */
  interface WebhookEventFieldRefs {
    readonly id: FieldRef<"WebhookEvent", 'String'>
    readonly provider: FieldRef<"WebhookEvent", 'String'>
    readonly externalId: FieldRef<"WebhookEvent", 'String'>
    readonly payloadHash: FieldRef<"WebhookEvent", 'String'>
    readonly status: FieldRef<"WebhookEvent", 'String'>
    readonly transactionId: FieldRef<"WebhookEvent", 'String'>
    readonly errorMessage: FieldRef<"WebhookEvent", 'String'>
    readonly receivedAt: FieldRef<"WebhookEvent", 'DateTime'>
    readonly processedAt: FieldRef<"WebhookEvent", 'DateTime'>
    readonly retryCount: FieldRef<"WebhookEvent", 'Int'>
    readonly maxRetries: FieldRef<"WebhookEvent", 'Int'>
    readonly lastRetryAt: FieldRef<"WebhookEvent", 'DateTime'>
    readonly deadLetterAt: FieldRef<"WebhookEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WebhookEvent findUnique
   */
  export type WebhookEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookEventInclude<ExtArgs> | null
    /**
     * Filter, which WebhookEvent to fetch.
     */
    where: WebhookEventWhereUniqueInput
  }

  /**
   * WebhookEvent findUniqueOrThrow
   */
  export type WebhookEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookEventInclude<ExtArgs> | null
    /**
     * Filter, which WebhookEvent to fetch.
     */
    where: WebhookEventWhereUniqueInput
  }

  /**
   * WebhookEvent findFirst
   */
  export type WebhookEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookEventInclude<ExtArgs> | null
    /**
     * Filter, which WebhookEvent to fetch.
     */
    where?: WebhookEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookEvents to fetch.
     */
    orderBy?: WebhookEventOrderByWithRelationInput | WebhookEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebhookEvents.
     */
    cursor?: WebhookEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebhookEvents.
     */
    distinct?: WebhookEventScalarFieldEnum | WebhookEventScalarFieldEnum[]
  }

  /**
   * WebhookEvent findFirstOrThrow
   */
  export type WebhookEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookEventInclude<ExtArgs> | null
    /**
     * Filter, which WebhookEvent to fetch.
     */
    where?: WebhookEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookEvents to fetch.
     */
    orderBy?: WebhookEventOrderByWithRelationInput | WebhookEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebhookEvents.
     */
    cursor?: WebhookEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebhookEvents.
     */
    distinct?: WebhookEventScalarFieldEnum | WebhookEventScalarFieldEnum[]
  }

  /**
   * WebhookEvent findMany
   */
  export type WebhookEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookEventInclude<ExtArgs> | null
    /**
     * Filter, which WebhookEvents to fetch.
     */
    where?: WebhookEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookEvents to fetch.
     */
    orderBy?: WebhookEventOrderByWithRelationInput | WebhookEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WebhookEvents.
     */
    cursor?: WebhookEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookEvents.
     */
    skip?: number
    distinct?: WebhookEventScalarFieldEnum | WebhookEventScalarFieldEnum[]
  }

  /**
   * WebhookEvent create
   */
  export type WebhookEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookEventInclude<ExtArgs> | null
    /**
     * The data needed to create a WebhookEvent.
     */
    data: XOR<WebhookEventCreateInput, WebhookEventUncheckedCreateInput>
  }

  /**
   * WebhookEvent createMany
   */
  export type WebhookEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WebhookEvents.
     */
    data: WebhookEventCreateManyInput | WebhookEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WebhookEvent createManyAndReturn
   */
  export type WebhookEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * The data used to create many WebhookEvents.
     */
    data: WebhookEventCreateManyInput | WebhookEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WebhookEvent update
   */
  export type WebhookEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookEventInclude<ExtArgs> | null
    /**
     * The data needed to update a WebhookEvent.
     */
    data: XOR<WebhookEventUpdateInput, WebhookEventUncheckedUpdateInput>
    /**
     * Choose, which WebhookEvent to update.
     */
    where: WebhookEventWhereUniqueInput
  }

  /**
   * WebhookEvent updateMany
   */
  export type WebhookEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WebhookEvents.
     */
    data: XOR<WebhookEventUpdateManyMutationInput, WebhookEventUncheckedUpdateManyInput>
    /**
     * Filter which WebhookEvents to update
     */
    where?: WebhookEventWhereInput
    /**
     * Limit how many WebhookEvents to update.
     */
    limit?: number
  }

  /**
   * WebhookEvent updateManyAndReturn
   */
  export type WebhookEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * The data used to update WebhookEvents.
     */
    data: XOR<WebhookEventUpdateManyMutationInput, WebhookEventUncheckedUpdateManyInput>
    /**
     * Filter which WebhookEvents to update
     */
    where?: WebhookEventWhereInput
    /**
     * Limit how many WebhookEvents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookEventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WebhookEvent upsert
   */
  export type WebhookEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookEventInclude<ExtArgs> | null
    /**
     * The filter to search for the WebhookEvent to update in case it exists.
     */
    where: WebhookEventWhereUniqueInput
    /**
     * In case the WebhookEvent found by the `where` argument doesn't exist, create a new WebhookEvent with this data.
     */
    create: XOR<WebhookEventCreateInput, WebhookEventUncheckedCreateInput>
    /**
     * In case the WebhookEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WebhookEventUpdateInput, WebhookEventUncheckedUpdateInput>
  }

  /**
   * WebhookEvent delete
   */
  export type WebhookEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookEventInclude<ExtArgs> | null
    /**
     * Filter which WebhookEvent to delete.
     */
    where: WebhookEventWhereUniqueInput
  }

  /**
   * WebhookEvent deleteMany
   */
  export type WebhookEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WebhookEvents to delete
     */
    where?: WebhookEventWhereInput
    /**
     * Limit how many WebhookEvents to delete.
     */
    limit?: number
  }

  /**
   * WebhookEvent.transaction
   */
  export type WebhookEvent$transactionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
  }

  /**
   * WebhookEvent without action
   */
  export type WebhookEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEvent
     */
    select?: WebhookEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEvent
     */
    omit?: WebhookEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookEventInclude<ExtArgs> | null
  }


  /**
   * Model AdminAccessLog
   */

  export type AggregateAdminAccessLog = {
    _count: AdminAccessLogCountAggregateOutputType | null
    _min: AdminAccessLogMinAggregateOutputType | null
    _max: AdminAccessLogMaxAggregateOutputType | null
  }

  export type AdminAccessLogMinAggregateOutputType = {
    id: string | null
    adminUserId: string | null
    action: string | null
    resource: string | null
    resourceId: string | null
    status: string | null
    requestId: string | null
    ipAddress: string | null
    userAgent: string | null
    timestamp: Date | null
  }

  export type AdminAccessLogMaxAggregateOutputType = {
    id: string | null
    adminUserId: string | null
    action: string | null
    resource: string | null
    resourceId: string | null
    status: string | null
    requestId: string | null
    ipAddress: string | null
    userAgent: string | null
    timestamp: Date | null
  }

  export type AdminAccessLogCountAggregateOutputType = {
    id: number
    adminUserId: number
    action: number
    resource: number
    resourceId: number
    status: number
    requestId: number
    ipAddress: number
    userAgent: number
    metadata: number
    timestamp: number
    _all: number
  }


  export type AdminAccessLogMinAggregateInputType = {
    id?: true
    adminUserId?: true
    action?: true
    resource?: true
    resourceId?: true
    status?: true
    requestId?: true
    ipAddress?: true
    userAgent?: true
    timestamp?: true
  }

  export type AdminAccessLogMaxAggregateInputType = {
    id?: true
    adminUserId?: true
    action?: true
    resource?: true
    resourceId?: true
    status?: true
    requestId?: true
    ipAddress?: true
    userAgent?: true
    timestamp?: true
  }

  export type AdminAccessLogCountAggregateInputType = {
    id?: true
    adminUserId?: true
    action?: true
    resource?: true
    resourceId?: true
    status?: true
    requestId?: true
    ipAddress?: true
    userAgent?: true
    metadata?: true
    timestamp?: true
    _all?: true
  }

  export type AdminAccessLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminAccessLog to aggregate.
     */
    where?: AdminAccessLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminAccessLogs to fetch.
     */
    orderBy?: AdminAccessLogOrderByWithRelationInput | AdminAccessLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminAccessLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminAccessLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminAccessLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AdminAccessLogs
    **/
    _count?: true | AdminAccessLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminAccessLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminAccessLogMaxAggregateInputType
  }

  export type GetAdminAccessLogAggregateType<T extends AdminAccessLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAdminAccessLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdminAccessLog[P]>
      : GetScalarType<T[P], AggregateAdminAccessLog[P]>
  }




  export type AdminAccessLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminAccessLogWhereInput
    orderBy?: AdminAccessLogOrderByWithAggregationInput | AdminAccessLogOrderByWithAggregationInput[]
    by: AdminAccessLogScalarFieldEnum[] | AdminAccessLogScalarFieldEnum
    having?: AdminAccessLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminAccessLogCountAggregateInputType | true
    _min?: AdminAccessLogMinAggregateInputType
    _max?: AdminAccessLogMaxAggregateInputType
  }

  export type AdminAccessLogGroupByOutputType = {
    id: string
    adminUserId: string
    action: string
    resource: string
    resourceId: string | null
    status: string
    requestId: string | null
    ipAddress: string | null
    userAgent: string | null
    metadata: JsonValue | null
    timestamp: Date
    _count: AdminAccessLogCountAggregateOutputType | null
    _min: AdminAccessLogMinAggregateOutputType | null
    _max: AdminAccessLogMaxAggregateOutputType | null
  }

  type GetAdminAccessLogGroupByPayload<T extends AdminAccessLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminAccessLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminAccessLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminAccessLogGroupByOutputType[P]>
            : GetScalarType<T[P], AdminAccessLogGroupByOutputType[P]>
        }
      >
    >


  export type AdminAccessLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    adminUserId?: boolean
    action?: boolean
    resource?: boolean
    resourceId?: boolean
    status?: boolean
    requestId?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    metadata?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["adminAccessLog"]>

  export type AdminAccessLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    adminUserId?: boolean
    action?: boolean
    resource?: boolean
    resourceId?: boolean
    status?: boolean
    requestId?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    metadata?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["adminAccessLog"]>

  export type AdminAccessLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    adminUserId?: boolean
    action?: boolean
    resource?: boolean
    resourceId?: boolean
    status?: boolean
    requestId?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    metadata?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["adminAccessLog"]>

  export type AdminAccessLogSelectScalar = {
    id?: boolean
    adminUserId?: boolean
    action?: boolean
    resource?: boolean
    resourceId?: boolean
    status?: boolean
    requestId?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    metadata?: boolean
    timestamp?: boolean
  }

  export type AdminAccessLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "adminUserId" | "action" | "resource" | "resourceId" | "status" | "requestId" | "ipAddress" | "userAgent" | "metadata" | "timestamp", ExtArgs["result"]["adminAccessLog"]>

  export type $AdminAccessLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AdminAccessLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      adminUserId: string
      action: string
      resource: string
      resourceId: string | null
      status: string
      requestId: string | null
      ipAddress: string | null
      userAgent: string | null
      metadata: Prisma.JsonValue | null
      timestamp: Date
    }, ExtArgs["result"]["adminAccessLog"]>
    composites: {}
  }

  type AdminAccessLogGetPayload<S extends boolean | null | undefined | AdminAccessLogDefaultArgs> = $Result.GetResult<Prisma.$AdminAccessLogPayload, S>

  type AdminAccessLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdminAccessLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdminAccessLogCountAggregateInputType | true
    }

  export interface AdminAccessLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AdminAccessLog'], meta: { name: 'AdminAccessLog' } }
    /**
     * Find zero or one AdminAccessLog that matches the filter.
     * @param {AdminAccessLogFindUniqueArgs} args - Arguments to find a AdminAccessLog
     * @example
     * // Get one AdminAccessLog
     * const adminAccessLog = await prisma.adminAccessLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminAccessLogFindUniqueArgs>(args: SelectSubset<T, AdminAccessLogFindUniqueArgs<ExtArgs>>): Prisma__AdminAccessLogClient<$Result.GetResult<Prisma.$AdminAccessLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AdminAccessLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdminAccessLogFindUniqueOrThrowArgs} args - Arguments to find a AdminAccessLog
     * @example
     * // Get one AdminAccessLog
     * const adminAccessLog = await prisma.adminAccessLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminAccessLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminAccessLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminAccessLogClient<$Result.GetResult<Prisma.$AdminAccessLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AdminAccessLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAccessLogFindFirstArgs} args - Arguments to find a AdminAccessLog
     * @example
     * // Get one AdminAccessLog
     * const adminAccessLog = await prisma.adminAccessLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminAccessLogFindFirstArgs>(args?: SelectSubset<T, AdminAccessLogFindFirstArgs<ExtArgs>>): Prisma__AdminAccessLogClient<$Result.GetResult<Prisma.$AdminAccessLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AdminAccessLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAccessLogFindFirstOrThrowArgs} args - Arguments to find a AdminAccessLog
     * @example
     * // Get one AdminAccessLog
     * const adminAccessLog = await prisma.adminAccessLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminAccessLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminAccessLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminAccessLogClient<$Result.GetResult<Prisma.$AdminAccessLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AdminAccessLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAccessLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AdminAccessLogs
     * const adminAccessLogs = await prisma.adminAccessLog.findMany()
     * 
     * // Get first 10 AdminAccessLogs
     * const adminAccessLogs = await prisma.adminAccessLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminAccessLogWithIdOnly = await prisma.adminAccessLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminAccessLogFindManyArgs>(args?: SelectSubset<T, AdminAccessLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminAccessLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AdminAccessLog.
     * @param {AdminAccessLogCreateArgs} args - Arguments to create a AdminAccessLog.
     * @example
     * // Create one AdminAccessLog
     * const AdminAccessLog = await prisma.adminAccessLog.create({
     *   data: {
     *     // ... data to create a AdminAccessLog
     *   }
     * })
     * 
     */
    create<T extends AdminAccessLogCreateArgs>(args: SelectSubset<T, AdminAccessLogCreateArgs<ExtArgs>>): Prisma__AdminAccessLogClient<$Result.GetResult<Prisma.$AdminAccessLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AdminAccessLogs.
     * @param {AdminAccessLogCreateManyArgs} args - Arguments to create many AdminAccessLogs.
     * @example
     * // Create many AdminAccessLogs
     * const adminAccessLog = await prisma.adminAccessLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminAccessLogCreateManyArgs>(args?: SelectSubset<T, AdminAccessLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AdminAccessLogs and returns the data saved in the database.
     * @param {AdminAccessLogCreateManyAndReturnArgs} args - Arguments to create many AdminAccessLogs.
     * @example
     * // Create many AdminAccessLogs
     * const adminAccessLog = await prisma.adminAccessLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AdminAccessLogs and only return the `id`
     * const adminAccessLogWithIdOnly = await prisma.adminAccessLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdminAccessLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AdminAccessLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminAccessLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AdminAccessLog.
     * @param {AdminAccessLogDeleteArgs} args - Arguments to delete one AdminAccessLog.
     * @example
     * // Delete one AdminAccessLog
     * const AdminAccessLog = await prisma.adminAccessLog.delete({
     *   where: {
     *     // ... filter to delete one AdminAccessLog
     *   }
     * })
     * 
     */
    delete<T extends AdminAccessLogDeleteArgs>(args: SelectSubset<T, AdminAccessLogDeleteArgs<ExtArgs>>): Prisma__AdminAccessLogClient<$Result.GetResult<Prisma.$AdminAccessLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AdminAccessLog.
     * @param {AdminAccessLogUpdateArgs} args - Arguments to update one AdminAccessLog.
     * @example
     * // Update one AdminAccessLog
     * const adminAccessLog = await prisma.adminAccessLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminAccessLogUpdateArgs>(args: SelectSubset<T, AdminAccessLogUpdateArgs<ExtArgs>>): Prisma__AdminAccessLogClient<$Result.GetResult<Prisma.$AdminAccessLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AdminAccessLogs.
     * @param {AdminAccessLogDeleteManyArgs} args - Arguments to filter AdminAccessLogs to delete.
     * @example
     * // Delete a few AdminAccessLogs
     * const { count } = await prisma.adminAccessLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminAccessLogDeleteManyArgs>(args?: SelectSubset<T, AdminAccessLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdminAccessLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAccessLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AdminAccessLogs
     * const adminAccessLog = await prisma.adminAccessLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminAccessLogUpdateManyArgs>(args: SelectSubset<T, AdminAccessLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdminAccessLogs and returns the data updated in the database.
     * @param {AdminAccessLogUpdateManyAndReturnArgs} args - Arguments to update many AdminAccessLogs.
     * @example
     * // Update many AdminAccessLogs
     * const adminAccessLog = await prisma.adminAccessLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AdminAccessLogs and only return the `id`
     * const adminAccessLogWithIdOnly = await prisma.adminAccessLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AdminAccessLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AdminAccessLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminAccessLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AdminAccessLog.
     * @param {AdminAccessLogUpsertArgs} args - Arguments to update or create a AdminAccessLog.
     * @example
     * // Update or create a AdminAccessLog
     * const adminAccessLog = await prisma.adminAccessLog.upsert({
     *   create: {
     *     // ... data to create a AdminAccessLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AdminAccessLog we want to update
     *   }
     * })
     */
    upsert<T extends AdminAccessLogUpsertArgs>(args: SelectSubset<T, AdminAccessLogUpsertArgs<ExtArgs>>): Prisma__AdminAccessLogClient<$Result.GetResult<Prisma.$AdminAccessLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AdminAccessLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAccessLogCountArgs} args - Arguments to filter AdminAccessLogs to count.
     * @example
     * // Count the number of AdminAccessLogs
     * const count = await prisma.adminAccessLog.count({
     *   where: {
     *     // ... the filter for the AdminAccessLogs we want to count
     *   }
     * })
    **/
    count<T extends AdminAccessLogCountArgs>(
      args?: Subset<T, AdminAccessLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminAccessLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AdminAccessLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAccessLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AdminAccessLogAggregateArgs>(args: Subset<T, AdminAccessLogAggregateArgs>): Prisma.PrismaPromise<GetAdminAccessLogAggregateType<T>>

    /**
     * Group by AdminAccessLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAccessLogGroupByArgs} args - Group by arguments.
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
      T extends AdminAccessLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminAccessLogGroupByArgs['orderBy'] }
        : { orderBy?: AdminAccessLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, AdminAccessLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminAccessLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AdminAccessLog model
   */
  readonly fields: AdminAccessLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AdminAccessLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminAccessLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AdminAccessLog model
   */
  interface AdminAccessLogFieldRefs {
    readonly id: FieldRef<"AdminAccessLog", 'String'>
    readonly adminUserId: FieldRef<"AdminAccessLog", 'String'>
    readonly action: FieldRef<"AdminAccessLog", 'String'>
    readonly resource: FieldRef<"AdminAccessLog", 'String'>
    readonly resourceId: FieldRef<"AdminAccessLog", 'String'>
    readonly status: FieldRef<"AdminAccessLog", 'String'>
    readonly requestId: FieldRef<"AdminAccessLog", 'String'>
    readonly ipAddress: FieldRef<"AdminAccessLog", 'String'>
    readonly userAgent: FieldRef<"AdminAccessLog", 'String'>
    readonly metadata: FieldRef<"AdminAccessLog", 'Json'>
    readonly timestamp: FieldRef<"AdminAccessLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AdminAccessLog findUnique
   */
  export type AdminAccessLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAccessLog
     */
    select?: AdminAccessLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminAccessLog
     */
    omit?: AdminAccessLogOmit<ExtArgs> | null
    /**
     * Filter, which AdminAccessLog to fetch.
     */
    where: AdminAccessLogWhereUniqueInput
  }

  /**
   * AdminAccessLog findUniqueOrThrow
   */
  export type AdminAccessLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAccessLog
     */
    select?: AdminAccessLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminAccessLog
     */
    omit?: AdminAccessLogOmit<ExtArgs> | null
    /**
     * Filter, which AdminAccessLog to fetch.
     */
    where: AdminAccessLogWhereUniqueInput
  }

  /**
   * AdminAccessLog findFirst
   */
  export type AdminAccessLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAccessLog
     */
    select?: AdminAccessLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminAccessLog
     */
    omit?: AdminAccessLogOmit<ExtArgs> | null
    /**
     * Filter, which AdminAccessLog to fetch.
     */
    where?: AdminAccessLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminAccessLogs to fetch.
     */
    orderBy?: AdminAccessLogOrderByWithRelationInput | AdminAccessLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminAccessLogs.
     */
    cursor?: AdminAccessLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminAccessLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminAccessLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminAccessLogs.
     */
    distinct?: AdminAccessLogScalarFieldEnum | AdminAccessLogScalarFieldEnum[]
  }

  /**
   * AdminAccessLog findFirstOrThrow
   */
  export type AdminAccessLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAccessLog
     */
    select?: AdminAccessLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminAccessLog
     */
    omit?: AdminAccessLogOmit<ExtArgs> | null
    /**
     * Filter, which AdminAccessLog to fetch.
     */
    where?: AdminAccessLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminAccessLogs to fetch.
     */
    orderBy?: AdminAccessLogOrderByWithRelationInput | AdminAccessLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminAccessLogs.
     */
    cursor?: AdminAccessLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminAccessLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminAccessLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminAccessLogs.
     */
    distinct?: AdminAccessLogScalarFieldEnum | AdminAccessLogScalarFieldEnum[]
  }

  /**
   * AdminAccessLog findMany
   */
  export type AdminAccessLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAccessLog
     */
    select?: AdminAccessLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminAccessLog
     */
    omit?: AdminAccessLogOmit<ExtArgs> | null
    /**
     * Filter, which AdminAccessLogs to fetch.
     */
    where?: AdminAccessLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminAccessLogs to fetch.
     */
    orderBy?: AdminAccessLogOrderByWithRelationInput | AdminAccessLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AdminAccessLogs.
     */
    cursor?: AdminAccessLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminAccessLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminAccessLogs.
     */
    skip?: number
    distinct?: AdminAccessLogScalarFieldEnum | AdminAccessLogScalarFieldEnum[]
  }

  /**
   * AdminAccessLog create
   */
  export type AdminAccessLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAccessLog
     */
    select?: AdminAccessLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminAccessLog
     */
    omit?: AdminAccessLogOmit<ExtArgs> | null
    /**
     * The data needed to create a AdminAccessLog.
     */
    data: XOR<AdminAccessLogCreateInput, AdminAccessLogUncheckedCreateInput>
  }

  /**
   * AdminAccessLog createMany
   */
  export type AdminAccessLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AdminAccessLogs.
     */
    data: AdminAccessLogCreateManyInput | AdminAccessLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AdminAccessLog createManyAndReturn
   */
  export type AdminAccessLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAccessLog
     */
    select?: AdminAccessLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AdminAccessLog
     */
    omit?: AdminAccessLogOmit<ExtArgs> | null
    /**
     * The data used to create many AdminAccessLogs.
     */
    data: AdminAccessLogCreateManyInput | AdminAccessLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AdminAccessLog update
   */
  export type AdminAccessLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAccessLog
     */
    select?: AdminAccessLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminAccessLog
     */
    omit?: AdminAccessLogOmit<ExtArgs> | null
    /**
     * The data needed to update a AdminAccessLog.
     */
    data: XOR<AdminAccessLogUpdateInput, AdminAccessLogUncheckedUpdateInput>
    /**
     * Choose, which AdminAccessLog to update.
     */
    where: AdminAccessLogWhereUniqueInput
  }

  /**
   * AdminAccessLog updateMany
   */
  export type AdminAccessLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AdminAccessLogs.
     */
    data: XOR<AdminAccessLogUpdateManyMutationInput, AdminAccessLogUncheckedUpdateManyInput>
    /**
     * Filter which AdminAccessLogs to update
     */
    where?: AdminAccessLogWhereInput
    /**
     * Limit how many AdminAccessLogs to update.
     */
    limit?: number
  }

  /**
   * AdminAccessLog updateManyAndReturn
   */
  export type AdminAccessLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAccessLog
     */
    select?: AdminAccessLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AdminAccessLog
     */
    omit?: AdminAccessLogOmit<ExtArgs> | null
    /**
     * The data used to update AdminAccessLogs.
     */
    data: XOR<AdminAccessLogUpdateManyMutationInput, AdminAccessLogUncheckedUpdateManyInput>
    /**
     * Filter which AdminAccessLogs to update
     */
    where?: AdminAccessLogWhereInput
    /**
     * Limit how many AdminAccessLogs to update.
     */
    limit?: number
  }

  /**
   * AdminAccessLog upsert
   */
  export type AdminAccessLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAccessLog
     */
    select?: AdminAccessLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminAccessLog
     */
    omit?: AdminAccessLogOmit<ExtArgs> | null
    /**
     * The filter to search for the AdminAccessLog to update in case it exists.
     */
    where: AdminAccessLogWhereUniqueInput
    /**
     * In case the AdminAccessLog found by the `where` argument doesn't exist, create a new AdminAccessLog with this data.
     */
    create: XOR<AdminAccessLogCreateInput, AdminAccessLogUncheckedCreateInput>
    /**
     * In case the AdminAccessLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminAccessLogUpdateInput, AdminAccessLogUncheckedUpdateInput>
  }

  /**
   * AdminAccessLog delete
   */
  export type AdminAccessLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAccessLog
     */
    select?: AdminAccessLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminAccessLog
     */
    omit?: AdminAccessLogOmit<ExtArgs> | null
    /**
     * Filter which AdminAccessLog to delete.
     */
    where: AdminAccessLogWhereUniqueInput
  }

  /**
   * AdminAccessLog deleteMany
   */
  export type AdminAccessLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminAccessLogs to delete
     */
    where?: AdminAccessLogWhereInput
    /**
     * Limit how many AdminAccessLogs to delete.
     */
    limit?: number
  }

  /**
   * AdminAccessLog without action
   */
  export type AdminAccessLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAccessLog
     */
    select?: AdminAccessLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminAccessLog
     */
    omit?: AdminAccessLogOmit<ExtArgs> | null
  }


  /**
   * Model MissingWebhookAlert
   */

  export type AggregateMissingWebhookAlert = {
    _count: MissingWebhookAlertCountAggregateOutputType | null
    _min: MissingWebhookAlertMinAggregateOutputType | null
    _max: MissingWebhookAlertMaxAggregateOutputType | null
  }

  export type MissingWebhookAlertMinAggregateOutputType = {
    id: string | null
    onRampId: string | null
    provider: string | null
    status: string | null
    detectedAt: Date | null
    resolvedAt: Date | null
    resolution: string | null
    notes: string | null
  }

  export type MissingWebhookAlertMaxAggregateOutputType = {
    id: string | null
    onRampId: string | null
    provider: string | null
    status: string | null
    detectedAt: Date | null
    resolvedAt: Date | null
    resolution: string | null
    notes: string | null
  }

  export type MissingWebhookAlertCountAggregateOutputType = {
    id: number
    onRampId: number
    provider: number
    status: number
    detectedAt: number
    resolvedAt: number
    resolution: number
    notes: number
    _all: number
  }


  export type MissingWebhookAlertMinAggregateInputType = {
    id?: true
    onRampId?: true
    provider?: true
    status?: true
    detectedAt?: true
    resolvedAt?: true
    resolution?: true
    notes?: true
  }

  export type MissingWebhookAlertMaxAggregateInputType = {
    id?: true
    onRampId?: true
    provider?: true
    status?: true
    detectedAt?: true
    resolvedAt?: true
    resolution?: true
    notes?: true
  }

  export type MissingWebhookAlertCountAggregateInputType = {
    id?: true
    onRampId?: true
    provider?: true
    status?: true
    detectedAt?: true
    resolvedAt?: true
    resolution?: true
    notes?: true
    _all?: true
  }

  export type MissingWebhookAlertAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MissingWebhookAlert to aggregate.
     */
    where?: MissingWebhookAlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MissingWebhookAlerts to fetch.
     */
    orderBy?: MissingWebhookAlertOrderByWithRelationInput | MissingWebhookAlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MissingWebhookAlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MissingWebhookAlerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MissingWebhookAlerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MissingWebhookAlerts
    **/
    _count?: true | MissingWebhookAlertCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MissingWebhookAlertMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MissingWebhookAlertMaxAggregateInputType
  }

  export type GetMissingWebhookAlertAggregateType<T extends MissingWebhookAlertAggregateArgs> = {
        [P in keyof T & keyof AggregateMissingWebhookAlert]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMissingWebhookAlert[P]>
      : GetScalarType<T[P], AggregateMissingWebhookAlert[P]>
  }




  export type MissingWebhookAlertGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MissingWebhookAlertWhereInput
    orderBy?: MissingWebhookAlertOrderByWithAggregationInput | MissingWebhookAlertOrderByWithAggregationInput[]
    by: MissingWebhookAlertScalarFieldEnum[] | MissingWebhookAlertScalarFieldEnum
    having?: MissingWebhookAlertScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MissingWebhookAlertCountAggregateInputType | true
    _min?: MissingWebhookAlertMinAggregateInputType
    _max?: MissingWebhookAlertMaxAggregateInputType
  }

  export type MissingWebhookAlertGroupByOutputType = {
    id: string
    onRampId: string
    provider: string
    status: string
    detectedAt: Date
    resolvedAt: Date | null
    resolution: string | null
    notes: string | null
    _count: MissingWebhookAlertCountAggregateOutputType | null
    _min: MissingWebhookAlertMinAggregateOutputType | null
    _max: MissingWebhookAlertMaxAggregateOutputType | null
  }

  type GetMissingWebhookAlertGroupByPayload<T extends MissingWebhookAlertGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MissingWebhookAlertGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MissingWebhookAlertGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MissingWebhookAlertGroupByOutputType[P]>
            : GetScalarType<T[P], MissingWebhookAlertGroupByOutputType[P]>
        }
      >
    >


  export type MissingWebhookAlertSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    onRampId?: boolean
    provider?: boolean
    status?: boolean
    detectedAt?: boolean
    resolvedAt?: boolean
    resolution?: boolean
    notes?: boolean
    onRamp?: boolean | OnRampDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["missingWebhookAlert"]>

  export type MissingWebhookAlertSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    onRampId?: boolean
    provider?: boolean
    status?: boolean
    detectedAt?: boolean
    resolvedAt?: boolean
    resolution?: boolean
    notes?: boolean
    onRamp?: boolean | OnRampDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["missingWebhookAlert"]>

  export type MissingWebhookAlertSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    onRampId?: boolean
    provider?: boolean
    status?: boolean
    detectedAt?: boolean
    resolvedAt?: boolean
    resolution?: boolean
    notes?: boolean
    onRamp?: boolean | OnRampDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["missingWebhookAlert"]>

  export type MissingWebhookAlertSelectScalar = {
    id?: boolean
    onRampId?: boolean
    provider?: boolean
    status?: boolean
    detectedAt?: boolean
    resolvedAt?: boolean
    resolution?: boolean
    notes?: boolean
  }

  export type MissingWebhookAlertOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "onRampId" | "provider" | "status" | "detectedAt" | "resolvedAt" | "resolution" | "notes", ExtArgs["result"]["missingWebhookAlert"]>
  export type MissingWebhookAlertInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    onRamp?: boolean | OnRampDefaultArgs<ExtArgs>
  }
  export type MissingWebhookAlertIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    onRamp?: boolean | OnRampDefaultArgs<ExtArgs>
  }
  export type MissingWebhookAlertIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    onRamp?: boolean | OnRampDefaultArgs<ExtArgs>
  }

  export type $MissingWebhookAlertPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MissingWebhookAlert"
    objects: {
      onRamp: Prisma.$OnRampPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      onRampId: string
      provider: string
      status: string
      detectedAt: Date
      resolvedAt: Date | null
      resolution: string | null
      notes: string | null
    }, ExtArgs["result"]["missingWebhookAlert"]>
    composites: {}
  }

  type MissingWebhookAlertGetPayload<S extends boolean | null | undefined | MissingWebhookAlertDefaultArgs> = $Result.GetResult<Prisma.$MissingWebhookAlertPayload, S>

  type MissingWebhookAlertCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MissingWebhookAlertFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MissingWebhookAlertCountAggregateInputType | true
    }

  export interface MissingWebhookAlertDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MissingWebhookAlert'], meta: { name: 'MissingWebhookAlert' } }
    /**
     * Find zero or one MissingWebhookAlert that matches the filter.
     * @param {MissingWebhookAlertFindUniqueArgs} args - Arguments to find a MissingWebhookAlert
     * @example
     * // Get one MissingWebhookAlert
     * const missingWebhookAlert = await prisma.missingWebhookAlert.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MissingWebhookAlertFindUniqueArgs>(args: SelectSubset<T, MissingWebhookAlertFindUniqueArgs<ExtArgs>>): Prisma__MissingWebhookAlertClient<$Result.GetResult<Prisma.$MissingWebhookAlertPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MissingWebhookAlert that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MissingWebhookAlertFindUniqueOrThrowArgs} args - Arguments to find a MissingWebhookAlert
     * @example
     * // Get one MissingWebhookAlert
     * const missingWebhookAlert = await prisma.missingWebhookAlert.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MissingWebhookAlertFindUniqueOrThrowArgs>(args: SelectSubset<T, MissingWebhookAlertFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MissingWebhookAlertClient<$Result.GetResult<Prisma.$MissingWebhookAlertPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MissingWebhookAlert that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MissingWebhookAlertFindFirstArgs} args - Arguments to find a MissingWebhookAlert
     * @example
     * // Get one MissingWebhookAlert
     * const missingWebhookAlert = await prisma.missingWebhookAlert.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MissingWebhookAlertFindFirstArgs>(args?: SelectSubset<T, MissingWebhookAlertFindFirstArgs<ExtArgs>>): Prisma__MissingWebhookAlertClient<$Result.GetResult<Prisma.$MissingWebhookAlertPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MissingWebhookAlert that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MissingWebhookAlertFindFirstOrThrowArgs} args - Arguments to find a MissingWebhookAlert
     * @example
     * // Get one MissingWebhookAlert
     * const missingWebhookAlert = await prisma.missingWebhookAlert.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MissingWebhookAlertFindFirstOrThrowArgs>(args?: SelectSubset<T, MissingWebhookAlertFindFirstOrThrowArgs<ExtArgs>>): Prisma__MissingWebhookAlertClient<$Result.GetResult<Prisma.$MissingWebhookAlertPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MissingWebhookAlerts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MissingWebhookAlertFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MissingWebhookAlerts
     * const missingWebhookAlerts = await prisma.missingWebhookAlert.findMany()
     * 
     * // Get first 10 MissingWebhookAlerts
     * const missingWebhookAlerts = await prisma.missingWebhookAlert.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const missingWebhookAlertWithIdOnly = await prisma.missingWebhookAlert.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MissingWebhookAlertFindManyArgs>(args?: SelectSubset<T, MissingWebhookAlertFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MissingWebhookAlertPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MissingWebhookAlert.
     * @param {MissingWebhookAlertCreateArgs} args - Arguments to create a MissingWebhookAlert.
     * @example
     * // Create one MissingWebhookAlert
     * const MissingWebhookAlert = await prisma.missingWebhookAlert.create({
     *   data: {
     *     // ... data to create a MissingWebhookAlert
     *   }
     * })
     * 
     */
    create<T extends MissingWebhookAlertCreateArgs>(args: SelectSubset<T, MissingWebhookAlertCreateArgs<ExtArgs>>): Prisma__MissingWebhookAlertClient<$Result.GetResult<Prisma.$MissingWebhookAlertPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MissingWebhookAlerts.
     * @param {MissingWebhookAlertCreateManyArgs} args - Arguments to create many MissingWebhookAlerts.
     * @example
     * // Create many MissingWebhookAlerts
     * const missingWebhookAlert = await prisma.missingWebhookAlert.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MissingWebhookAlertCreateManyArgs>(args?: SelectSubset<T, MissingWebhookAlertCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MissingWebhookAlerts and returns the data saved in the database.
     * @param {MissingWebhookAlertCreateManyAndReturnArgs} args - Arguments to create many MissingWebhookAlerts.
     * @example
     * // Create many MissingWebhookAlerts
     * const missingWebhookAlert = await prisma.missingWebhookAlert.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MissingWebhookAlerts and only return the `id`
     * const missingWebhookAlertWithIdOnly = await prisma.missingWebhookAlert.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MissingWebhookAlertCreateManyAndReturnArgs>(args?: SelectSubset<T, MissingWebhookAlertCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MissingWebhookAlertPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MissingWebhookAlert.
     * @param {MissingWebhookAlertDeleteArgs} args - Arguments to delete one MissingWebhookAlert.
     * @example
     * // Delete one MissingWebhookAlert
     * const MissingWebhookAlert = await prisma.missingWebhookAlert.delete({
     *   where: {
     *     // ... filter to delete one MissingWebhookAlert
     *   }
     * })
     * 
     */
    delete<T extends MissingWebhookAlertDeleteArgs>(args: SelectSubset<T, MissingWebhookAlertDeleteArgs<ExtArgs>>): Prisma__MissingWebhookAlertClient<$Result.GetResult<Prisma.$MissingWebhookAlertPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MissingWebhookAlert.
     * @param {MissingWebhookAlertUpdateArgs} args - Arguments to update one MissingWebhookAlert.
     * @example
     * // Update one MissingWebhookAlert
     * const missingWebhookAlert = await prisma.missingWebhookAlert.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MissingWebhookAlertUpdateArgs>(args: SelectSubset<T, MissingWebhookAlertUpdateArgs<ExtArgs>>): Prisma__MissingWebhookAlertClient<$Result.GetResult<Prisma.$MissingWebhookAlertPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MissingWebhookAlerts.
     * @param {MissingWebhookAlertDeleteManyArgs} args - Arguments to filter MissingWebhookAlerts to delete.
     * @example
     * // Delete a few MissingWebhookAlerts
     * const { count } = await prisma.missingWebhookAlert.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MissingWebhookAlertDeleteManyArgs>(args?: SelectSubset<T, MissingWebhookAlertDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MissingWebhookAlerts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MissingWebhookAlertUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MissingWebhookAlerts
     * const missingWebhookAlert = await prisma.missingWebhookAlert.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MissingWebhookAlertUpdateManyArgs>(args: SelectSubset<T, MissingWebhookAlertUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MissingWebhookAlerts and returns the data updated in the database.
     * @param {MissingWebhookAlertUpdateManyAndReturnArgs} args - Arguments to update many MissingWebhookAlerts.
     * @example
     * // Update many MissingWebhookAlerts
     * const missingWebhookAlert = await prisma.missingWebhookAlert.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MissingWebhookAlerts and only return the `id`
     * const missingWebhookAlertWithIdOnly = await prisma.missingWebhookAlert.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MissingWebhookAlertUpdateManyAndReturnArgs>(args: SelectSubset<T, MissingWebhookAlertUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MissingWebhookAlertPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MissingWebhookAlert.
     * @param {MissingWebhookAlertUpsertArgs} args - Arguments to update or create a MissingWebhookAlert.
     * @example
     * // Update or create a MissingWebhookAlert
     * const missingWebhookAlert = await prisma.missingWebhookAlert.upsert({
     *   create: {
     *     // ... data to create a MissingWebhookAlert
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MissingWebhookAlert we want to update
     *   }
     * })
     */
    upsert<T extends MissingWebhookAlertUpsertArgs>(args: SelectSubset<T, MissingWebhookAlertUpsertArgs<ExtArgs>>): Prisma__MissingWebhookAlertClient<$Result.GetResult<Prisma.$MissingWebhookAlertPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MissingWebhookAlerts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MissingWebhookAlertCountArgs} args - Arguments to filter MissingWebhookAlerts to count.
     * @example
     * // Count the number of MissingWebhookAlerts
     * const count = await prisma.missingWebhookAlert.count({
     *   where: {
     *     // ... the filter for the MissingWebhookAlerts we want to count
     *   }
     * })
    **/
    count<T extends MissingWebhookAlertCountArgs>(
      args?: Subset<T, MissingWebhookAlertCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MissingWebhookAlertCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MissingWebhookAlert.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MissingWebhookAlertAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MissingWebhookAlertAggregateArgs>(args: Subset<T, MissingWebhookAlertAggregateArgs>): Prisma.PrismaPromise<GetMissingWebhookAlertAggregateType<T>>

    /**
     * Group by MissingWebhookAlert.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MissingWebhookAlertGroupByArgs} args - Group by arguments.
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
      T extends MissingWebhookAlertGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MissingWebhookAlertGroupByArgs['orderBy'] }
        : { orderBy?: MissingWebhookAlertGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, MissingWebhookAlertGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMissingWebhookAlertGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MissingWebhookAlert model
   */
  readonly fields: MissingWebhookAlertFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MissingWebhookAlert.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MissingWebhookAlertClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    onRamp<T extends OnRampDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OnRampDefaultArgs<ExtArgs>>): Prisma__OnRampClient<$Result.GetResult<Prisma.$OnRampPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MissingWebhookAlert model
   */
  interface MissingWebhookAlertFieldRefs {
    readonly id: FieldRef<"MissingWebhookAlert", 'String'>
    readonly onRampId: FieldRef<"MissingWebhookAlert", 'String'>
    readonly provider: FieldRef<"MissingWebhookAlert", 'String'>
    readonly status: FieldRef<"MissingWebhookAlert", 'String'>
    readonly detectedAt: FieldRef<"MissingWebhookAlert", 'DateTime'>
    readonly resolvedAt: FieldRef<"MissingWebhookAlert", 'DateTime'>
    readonly resolution: FieldRef<"MissingWebhookAlert", 'String'>
    readonly notes: FieldRef<"MissingWebhookAlert", 'String'>
  }
    

  // Custom InputTypes
  /**
   * MissingWebhookAlert findUnique
   */
  export type MissingWebhookAlertFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MissingWebhookAlert
     */
    select?: MissingWebhookAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MissingWebhookAlert
     */
    omit?: MissingWebhookAlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissingWebhookAlertInclude<ExtArgs> | null
    /**
     * Filter, which MissingWebhookAlert to fetch.
     */
    where: MissingWebhookAlertWhereUniqueInput
  }

  /**
   * MissingWebhookAlert findUniqueOrThrow
   */
  export type MissingWebhookAlertFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MissingWebhookAlert
     */
    select?: MissingWebhookAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MissingWebhookAlert
     */
    omit?: MissingWebhookAlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissingWebhookAlertInclude<ExtArgs> | null
    /**
     * Filter, which MissingWebhookAlert to fetch.
     */
    where: MissingWebhookAlertWhereUniqueInput
  }

  /**
   * MissingWebhookAlert findFirst
   */
  export type MissingWebhookAlertFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MissingWebhookAlert
     */
    select?: MissingWebhookAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MissingWebhookAlert
     */
    omit?: MissingWebhookAlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissingWebhookAlertInclude<ExtArgs> | null
    /**
     * Filter, which MissingWebhookAlert to fetch.
     */
    where?: MissingWebhookAlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MissingWebhookAlerts to fetch.
     */
    orderBy?: MissingWebhookAlertOrderByWithRelationInput | MissingWebhookAlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MissingWebhookAlerts.
     */
    cursor?: MissingWebhookAlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MissingWebhookAlerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MissingWebhookAlerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MissingWebhookAlerts.
     */
    distinct?: MissingWebhookAlertScalarFieldEnum | MissingWebhookAlertScalarFieldEnum[]
  }

  /**
   * MissingWebhookAlert findFirstOrThrow
   */
  export type MissingWebhookAlertFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MissingWebhookAlert
     */
    select?: MissingWebhookAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MissingWebhookAlert
     */
    omit?: MissingWebhookAlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissingWebhookAlertInclude<ExtArgs> | null
    /**
     * Filter, which MissingWebhookAlert to fetch.
     */
    where?: MissingWebhookAlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MissingWebhookAlerts to fetch.
     */
    orderBy?: MissingWebhookAlertOrderByWithRelationInput | MissingWebhookAlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MissingWebhookAlerts.
     */
    cursor?: MissingWebhookAlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MissingWebhookAlerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MissingWebhookAlerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MissingWebhookAlerts.
     */
    distinct?: MissingWebhookAlertScalarFieldEnum | MissingWebhookAlertScalarFieldEnum[]
  }

  /**
   * MissingWebhookAlert findMany
   */
  export type MissingWebhookAlertFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MissingWebhookAlert
     */
    select?: MissingWebhookAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MissingWebhookAlert
     */
    omit?: MissingWebhookAlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissingWebhookAlertInclude<ExtArgs> | null
    /**
     * Filter, which MissingWebhookAlerts to fetch.
     */
    where?: MissingWebhookAlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MissingWebhookAlerts to fetch.
     */
    orderBy?: MissingWebhookAlertOrderByWithRelationInput | MissingWebhookAlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MissingWebhookAlerts.
     */
    cursor?: MissingWebhookAlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MissingWebhookAlerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MissingWebhookAlerts.
     */
    skip?: number
    distinct?: MissingWebhookAlertScalarFieldEnum | MissingWebhookAlertScalarFieldEnum[]
  }

  /**
   * MissingWebhookAlert create
   */
  export type MissingWebhookAlertCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MissingWebhookAlert
     */
    select?: MissingWebhookAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MissingWebhookAlert
     */
    omit?: MissingWebhookAlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissingWebhookAlertInclude<ExtArgs> | null
    /**
     * The data needed to create a MissingWebhookAlert.
     */
    data: XOR<MissingWebhookAlertCreateInput, MissingWebhookAlertUncheckedCreateInput>
  }

  /**
   * MissingWebhookAlert createMany
   */
  export type MissingWebhookAlertCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MissingWebhookAlerts.
     */
    data: MissingWebhookAlertCreateManyInput | MissingWebhookAlertCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MissingWebhookAlert createManyAndReturn
   */
  export type MissingWebhookAlertCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MissingWebhookAlert
     */
    select?: MissingWebhookAlertSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MissingWebhookAlert
     */
    omit?: MissingWebhookAlertOmit<ExtArgs> | null
    /**
     * The data used to create many MissingWebhookAlerts.
     */
    data: MissingWebhookAlertCreateManyInput | MissingWebhookAlertCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissingWebhookAlertIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MissingWebhookAlert update
   */
  export type MissingWebhookAlertUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MissingWebhookAlert
     */
    select?: MissingWebhookAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MissingWebhookAlert
     */
    omit?: MissingWebhookAlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissingWebhookAlertInclude<ExtArgs> | null
    /**
     * The data needed to update a MissingWebhookAlert.
     */
    data: XOR<MissingWebhookAlertUpdateInput, MissingWebhookAlertUncheckedUpdateInput>
    /**
     * Choose, which MissingWebhookAlert to update.
     */
    where: MissingWebhookAlertWhereUniqueInput
  }

  /**
   * MissingWebhookAlert updateMany
   */
  export type MissingWebhookAlertUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MissingWebhookAlerts.
     */
    data: XOR<MissingWebhookAlertUpdateManyMutationInput, MissingWebhookAlertUncheckedUpdateManyInput>
    /**
     * Filter which MissingWebhookAlerts to update
     */
    where?: MissingWebhookAlertWhereInput
    /**
     * Limit how many MissingWebhookAlerts to update.
     */
    limit?: number
  }

  /**
   * MissingWebhookAlert updateManyAndReturn
   */
  export type MissingWebhookAlertUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MissingWebhookAlert
     */
    select?: MissingWebhookAlertSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MissingWebhookAlert
     */
    omit?: MissingWebhookAlertOmit<ExtArgs> | null
    /**
     * The data used to update MissingWebhookAlerts.
     */
    data: XOR<MissingWebhookAlertUpdateManyMutationInput, MissingWebhookAlertUncheckedUpdateManyInput>
    /**
     * Filter which MissingWebhookAlerts to update
     */
    where?: MissingWebhookAlertWhereInput
    /**
     * Limit how many MissingWebhookAlerts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissingWebhookAlertIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MissingWebhookAlert upsert
   */
  export type MissingWebhookAlertUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MissingWebhookAlert
     */
    select?: MissingWebhookAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MissingWebhookAlert
     */
    omit?: MissingWebhookAlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissingWebhookAlertInclude<ExtArgs> | null
    /**
     * The filter to search for the MissingWebhookAlert to update in case it exists.
     */
    where: MissingWebhookAlertWhereUniqueInput
    /**
     * In case the MissingWebhookAlert found by the `where` argument doesn't exist, create a new MissingWebhookAlert with this data.
     */
    create: XOR<MissingWebhookAlertCreateInput, MissingWebhookAlertUncheckedCreateInput>
    /**
     * In case the MissingWebhookAlert was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MissingWebhookAlertUpdateInput, MissingWebhookAlertUncheckedUpdateInput>
  }

  /**
   * MissingWebhookAlert delete
   */
  export type MissingWebhookAlertDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MissingWebhookAlert
     */
    select?: MissingWebhookAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MissingWebhookAlert
     */
    omit?: MissingWebhookAlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissingWebhookAlertInclude<ExtArgs> | null
    /**
     * Filter which MissingWebhookAlert to delete.
     */
    where: MissingWebhookAlertWhereUniqueInput
  }

  /**
   * MissingWebhookAlert deleteMany
   */
  export type MissingWebhookAlertDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MissingWebhookAlerts to delete
     */
    where?: MissingWebhookAlertWhereInput
    /**
     * Limit how many MissingWebhookAlerts to delete.
     */
    limit?: number
  }

  /**
   * MissingWebhookAlert without action
   */
  export type MissingWebhookAlertDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MissingWebhookAlert
     */
    select?: MissingWebhookAlertSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MissingWebhookAlert
     */
    omit?: MissingWebhookAlertOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MissingWebhookAlertInclude<ExtArgs> | null
  }


  /**
   * Model DeadLetterQueue
   */

  export type AggregateDeadLetterQueue = {
    _count: DeadLetterQueueCountAggregateOutputType | null
    _avg: DeadLetterQueueAvgAggregateOutputType | null
    _sum: DeadLetterQueueSumAggregateOutputType | null
    _min: DeadLetterQueueMinAggregateOutputType | null
    _max: DeadLetterQueueMaxAggregateOutputType | null
  }

  export type DeadLetterQueueAvgAggregateOutputType = {
    retryCount: number | null
    maxRetries: number | null
  }

  export type DeadLetterQueueSumAggregateOutputType = {
    retryCount: number | null
    maxRetries: number | null
  }

  export type DeadLetterQueueMinAggregateOutputType = {
    id: string | null
    eventId: string | null
    eventType: string | null
    provider: string | null
    reason: string | null
    lastError: string | null
    retryCount: number | null
    maxRetries: number | null
    status: string | null
    resolvedAt: Date | null
    resolution: string | null
    notes: string | null
    createdAt: Date | null
  }

  export type DeadLetterQueueMaxAggregateOutputType = {
    id: string | null
    eventId: string | null
    eventType: string | null
    provider: string | null
    reason: string | null
    lastError: string | null
    retryCount: number | null
    maxRetries: number | null
    status: string | null
    resolvedAt: Date | null
    resolution: string | null
    notes: string | null
    createdAt: Date | null
  }

  export type DeadLetterQueueCountAggregateOutputType = {
    id: number
    eventId: number
    eventType: number
    provider: number
    reason: number
    lastError: number
    retryCount: number
    maxRetries: number
    payload: number
    status: number
    resolvedAt: number
    resolution: number
    notes: number
    createdAt: number
    _all: number
  }


  export type DeadLetterQueueAvgAggregateInputType = {
    retryCount?: true
    maxRetries?: true
  }

  export type DeadLetterQueueSumAggregateInputType = {
    retryCount?: true
    maxRetries?: true
  }

  export type DeadLetterQueueMinAggregateInputType = {
    id?: true
    eventId?: true
    eventType?: true
    provider?: true
    reason?: true
    lastError?: true
    retryCount?: true
    maxRetries?: true
    status?: true
    resolvedAt?: true
    resolution?: true
    notes?: true
    createdAt?: true
  }

  export type DeadLetterQueueMaxAggregateInputType = {
    id?: true
    eventId?: true
    eventType?: true
    provider?: true
    reason?: true
    lastError?: true
    retryCount?: true
    maxRetries?: true
    status?: true
    resolvedAt?: true
    resolution?: true
    notes?: true
    createdAt?: true
  }

  export type DeadLetterQueueCountAggregateInputType = {
    id?: true
    eventId?: true
    eventType?: true
    provider?: true
    reason?: true
    lastError?: true
    retryCount?: true
    maxRetries?: true
    payload?: true
    status?: true
    resolvedAt?: true
    resolution?: true
    notes?: true
    createdAt?: true
    _all?: true
  }

  export type DeadLetterQueueAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DeadLetterQueue to aggregate.
     */
    where?: DeadLetterQueueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeadLetterQueues to fetch.
     */
    orderBy?: DeadLetterQueueOrderByWithRelationInput | DeadLetterQueueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DeadLetterQueueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeadLetterQueues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeadLetterQueues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DeadLetterQueues
    **/
    _count?: true | DeadLetterQueueCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DeadLetterQueueAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DeadLetterQueueSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DeadLetterQueueMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DeadLetterQueueMaxAggregateInputType
  }

  export type GetDeadLetterQueueAggregateType<T extends DeadLetterQueueAggregateArgs> = {
        [P in keyof T & keyof AggregateDeadLetterQueue]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDeadLetterQueue[P]>
      : GetScalarType<T[P], AggregateDeadLetterQueue[P]>
  }




  export type DeadLetterQueueGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeadLetterQueueWhereInput
    orderBy?: DeadLetterQueueOrderByWithAggregationInput | DeadLetterQueueOrderByWithAggregationInput[]
    by: DeadLetterQueueScalarFieldEnum[] | DeadLetterQueueScalarFieldEnum
    having?: DeadLetterQueueScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DeadLetterQueueCountAggregateInputType | true
    _avg?: DeadLetterQueueAvgAggregateInputType
    _sum?: DeadLetterQueueSumAggregateInputType
    _min?: DeadLetterQueueMinAggregateInputType
    _max?: DeadLetterQueueMaxAggregateInputType
  }

  export type DeadLetterQueueGroupByOutputType = {
    id: string
    eventId: string
    eventType: string
    provider: string
    reason: string
    lastError: string | null
    retryCount: number
    maxRetries: number
    payload: JsonValue | null
    status: string
    resolvedAt: Date | null
    resolution: string | null
    notes: string | null
    createdAt: Date
    _count: DeadLetterQueueCountAggregateOutputType | null
    _avg: DeadLetterQueueAvgAggregateOutputType | null
    _sum: DeadLetterQueueSumAggregateOutputType | null
    _min: DeadLetterQueueMinAggregateOutputType | null
    _max: DeadLetterQueueMaxAggregateOutputType | null
  }

  type GetDeadLetterQueueGroupByPayload<T extends DeadLetterQueueGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DeadLetterQueueGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DeadLetterQueueGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DeadLetterQueueGroupByOutputType[P]>
            : GetScalarType<T[P], DeadLetterQueueGroupByOutputType[P]>
        }
      >
    >


  export type DeadLetterQueueSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventId?: boolean
    eventType?: boolean
    provider?: boolean
    reason?: boolean
    lastError?: boolean
    retryCount?: boolean
    maxRetries?: boolean
    payload?: boolean
    status?: boolean
    resolvedAt?: boolean
    resolution?: boolean
    notes?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["deadLetterQueue"]>

  export type DeadLetterQueueSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventId?: boolean
    eventType?: boolean
    provider?: boolean
    reason?: boolean
    lastError?: boolean
    retryCount?: boolean
    maxRetries?: boolean
    payload?: boolean
    status?: boolean
    resolvedAt?: boolean
    resolution?: boolean
    notes?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["deadLetterQueue"]>

  export type DeadLetterQueueSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventId?: boolean
    eventType?: boolean
    provider?: boolean
    reason?: boolean
    lastError?: boolean
    retryCount?: boolean
    maxRetries?: boolean
    payload?: boolean
    status?: boolean
    resolvedAt?: boolean
    resolution?: boolean
    notes?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["deadLetterQueue"]>

  export type DeadLetterQueueSelectScalar = {
    id?: boolean
    eventId?: boolean
    eventType?: boolean
    provider?: boolean
    reason?: boolean
    lastError?: boolean
    retryCount?: boolean
    maxRetries?: boolean
    payload?: boolean
    status?: boolean
    resolvedAt?: boolean
    resolution?: boolean
    notes?: boolean
    createdAt?: boolean
  }

  export type DeadLetterQueueOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "eventId" | "eventType" | "provider" | "reason" | "lastError" | "retryCount" | "maxRetries" | "payload" | "status" | "resolvedAt" | "resolution" | "notes" | "createdAt", ExtArgs["result"]["deadLetterQueue"]>

  export type $DeadLetterQueuePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DeadLetterQueue"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      eventId: string
      eventType: string
      provider: string
      reason: string
      lastError: string | null
      retryCount: number
      maxRetries: number
      payload: Prisma.JsonValue | null
      status: string
      resolvedAt: Date | null
      resolution: string | null
      notes: string | null
      createdAt: Date
    }, ExtArgs["result"]["deadLetterQueue"]>
    composites: {}
  }

  type DeadLetterQueueGetPayload<S extends boolean | null | undefined | DeadLetterQueueDefaultArgs> = $Result.GetResult<Prisma.$DeadLetterQueuePayload, S>

  type DeadLetterQueueCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DeadLetterQueueFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DeadLetterQueueCountAggregateInputType | true
    }

  export interface DeadLetterQueueDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DeadLetterQueue'], meta: { name: 'DeadLetterQueue' } }
    /**
     * Find zero or one DeadLetterQueue that matches the filter.
     * @param {DeadLetterQueueFindUniqueArgs} args - Arguments to find a DeadLetterQueue
     * @example
     * // Get one DeadLetterQueue
     * const deadLetterQueue = await prisma.deadLetterQueue.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DeadLetterQueueFindUniqueArgs>(args: SelectSubset<T, DeadLetterQueueFindUniqueArgs<ExtArgs>>): Prisma__DeadLetterQueueClient<$Result.GetResult<Prisma.$DeadLetterQueuePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DeadLetterQueue that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DeadLetterQueueFindUniqueOrThrowArgs} args - Arguments to find a DeadLetterQueue
     * @example
     * // Get one DeadLetterQueue
     * const deadLetterQueue = await prisma.deadLetterQueue.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DeadLetterQueueFindUniqueOrThrowArgs>(args: SelectSubset<T, DeadLetterQueueFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DeadLetterQueueClient<$Result.GetResult<Prisma.$DeadLetterQueuePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DeadLetterQueue that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeadLetterQueueFindFirstArgs} args - Arguments to find a DeadLetterQueue
     * @example
     * // Get one DeadLetterQueue
     * const deadLetterQueue = await prisma.deadLetterQueue.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DeadLetterQueueFindFirstArgs>(args?: SelectSubset<T, DeadLetterQueueFindFirstArgs<ExtArgs>>): Prisma__DeadLetterQueueClient<$Result.GetResult<Prisma.$DeadLetterQueuePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DeadLetterQueue that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeadLetterQueueFindFirstOrThrowArgs} args - Arguments to find a DeadLetterQueue
     * @example
     * // Get one DeadLetterQueue
     * const deadLetterQueue = await prisma.deadLetterQueue.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DeadLetterQueueFindFirstOrThrowArgs>(args?: SelectSubset<T, DeadLetterQueueFindFirstOrThrowArgs<ExtArgs>>): Prisma__DeadLetterQueueClient<$Result.GetResult<Prisma.$DeadLetterQueuePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DeadLetterQueues that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeadLetterQueueFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DeadLetterQueues
     * const deadLetterQueues = await prisma.deadLetterQueue.findMany()
     * 
     * // Get first 10 DeadLetterQueues
     * const deadLetterQueues = await prisma.deadLetterQueue.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const deadLetterQueueWithIdOnly = await prisma.deadLetterQueue.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DeadLetterQueueFindManyArgs>(args?: SelectSubset<T, DeadLetterQueueFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeadLetterQueuePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DeadLetterQueue.
     * @param {DeadLetterQueueCreateArgs} args - Arguments to create a DeadLetterQueue.
     * @example
     * // Create one DeadLetterQueue
     * const DeadLetterQueue = await prisma.deadLetterQueue.create({
     *   data: {
     *     // ... data to create a DeadLetterQueue
     *   }
     * })
     * 
     */
    create<T extends DeadLetterQueueCreateArgs>(args: SelectSubset<T, DeadLetterQueueCreateArgs<ExtArgs>>): Prisma__DeadLetterQueueClient<$Result.GetResult<Prisma.$DeadLetterQueuePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DeadLetterQueues.
     * @param {DeadLetterQueueCreateManyArgs} args - Arguments to create many DeadLetterQueues.
     * @example
     * // Create many DeadLetterQueues
     * const deadLetterQueue = await prisma.deadLetterQueue.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DeadLetterQueueCreateManyArgs>(args?: SelectSubset<T, DeadLetterQueueCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DeadLetterQueues and returns the data saved in the database.
     * @param {DeadLetterQueueCreateManyAndReturnArgs} args - Arguments to create many DeadLetterQueues.
     * @example
     * // Create many DeadLetterQueues
     * const deadLetterQueue = await prisma.deadLetterQueue.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DeadLetterQueues and only return the `id`
     * const deadLetterQueueWithIdOnly = await prisma.deadLetterQueue.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DeadLetterQueueCreateManyAndReturnArgs>(args?: SelectSubset<T, DeadLetterQueueCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeadLetterQueuePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DeadLetterQueue.
     * @param {DeadLetterQueueDeleteArgs} args - Arguments to delete one DeadLetterQueue.
     * @example
     * // Delete one DeadLetterQueue
     * const DeadLetterQueue = await prisma.deadLetterQueue.delete({
     *   where: {
     *     // ... filter to delete one DeadLetterQueue
     *   }
     * })
     * 
     */
    delete<T extends DeadLetterQueueDeleteArgs>(args: SelectSubset<T, DeadLetterQueueDeleteArgs<ExtArgs>>): Prisma__DeadLetterQueueClient<$Result.GetResult<Prisma.$DeadLetterQueuePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DeadLetterQueue.
     * @param {DeadLetterQueueUpdateArgs} args - Arguments to update one DeadLetterQueue.
     * @example
     * // Update one DeadLetterQueue
     * const deadLetterQueue = await prisma.deadLetterQueue.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DeadLetterQueueUpdateArgs>(args: SelectSubset<T, DeadLetterQueueUpdateArgs<ExtArgs>>): Prisma__DeadLetterQueueClient<$Result.GetResult<Prisma.$DeadLetterQueuePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DeadLetterQueues.
     * @param {DeadLetterQueueDeleteManyArgs} args - Arguments to filter DeadLetterQueues to delete.
     * @example
     * // Delete a few DeadLetterQueues
     * const { count } = await prisma.deadLetterQueue.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DeadLetterQueueDeleteManyArgs>(args?: SelectSubset<T, DeadLetterQueueDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DeadLetterQueues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeadLetterQueueUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DeadLetterQueues
     * const deadLetterQueue = await prisma.deadLetterQueue.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DeadLetterQueueUpdateManyArgs>(args: SelectSubset<T, DeadLetterQueueUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DeadLetterQueues and returns the data updated in the database.
     * @param {DeadLetterQueueUpdateManyAndReturnArgs} args - Arguments to update many DeadLetterQueues.
     * @example
     * // Update many DeadLetterQueues
     * const deadLetterQueue = await prisma.deadLetterQueue.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DeadLetterQueues and only return the `id`
     * const deadLetterQueueWithIdOnly = await prisma.deadLetterQueue.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DeadLetterQueueUpdateManyAndReturnArgs>(args: SelectSubset<T, DeadLetterQueueUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeadLetterQueuePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DeadLetterQueue.
     * @param {DeadLetterQueueUpsertArgs} args - Arguments to update or create a DeadLetterQueue.
     * @example
     * // Update or create a DeadLetterQueue
     * const deadLetterQueue = await prisma.deadLetterQueue.upsert({
     *   create: {
     *     // ... data to create a DeadLetterQueue
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DeadLetterQueue we want to update
     *   }
     * })
     */
    upsert<T extends DeadLetterQueueUpsertArgs>(args: SelectSubset<T, DeadLetterQueueUpsertArgs<ExtArgs>>): Prisma__DeadLetterQueueClient<$Result.GetResult<Prisma.$DeadLetterQueuePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DeadLetterQueues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeadLetterQueueCountArgs} args - Arguments to filter DeadLetterQueues to count.
     * @example
     * // Count the number of DeadLetterQueues
     * const count = await prisma.deadLetterQueue.count({
     *   where: {
     *     // ... the filter for the DeadLetterQueues we want to count
     *   }
     * })
    **/
    count<T extends DeadLetterQueueCountArgs>(
      args?: Subset<T, DeadLetterQueueCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DeadLetterQueueCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DeadLetterQueue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeadLetterQueueAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DeadLetterQueueAggregateArgs>(args: Subset<T, DeadLetterQueueAggregateArgs>): Prisma.PrismaPromise<GetDeadLetterQueueAggregateType<T>>

    /**
     * Group by DeadLetterQueue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeadLetterQueueGroupByArgs} args - Group by arguments.
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
      T extends DeadLetterQueueGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DeadLetterQueueGroupByArgs['orderBy'] }
        : { orderBy?: DeadLetterQueueGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, DeadLetterQueueGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeadLetterQueueGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DeadLetterQueue model
   */
  readonly fields: DeadLetterQueueFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DeadLetterQueue.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DeadLetterQueueClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DeadLetterQueue model
   */
  interface DeadLetterQueueFieldRefs {
    readonly id: FieldRef<"DeadLetterQueue", 'String'>
    readonly eventId: FieldRef<"DeadLetterQueue", 'String'>
    readonly eventType: FieldRef<"DeadLetterQueue", 'String'>
    readonly provider: FieldRef<"DeadLetterQueue", 'String'>
    readonly reason: FieldRef<"DeadLetterQueue", 'String'>
    readonly lastError: FieldRef<"DeadLetterQueue", 'String'>
    readonly retryCount: FieldRef<"DeadLetterQueue", 'Int'>
    readonly maxRetries: FieldRef<"DeadLetterQueue", 'Int'>
    readonly payload: FieldRef<"DeadLetterQueue", 'Json'>
    readonly status: FieldRef<"DeadLetterQueue", 'String'>
    readonly resolvedAt: FieldRef<"DeadLetterQueue", 'DateTime'>
    readonly resolution: FieldRef<"DeadLetterQueue", 'String'>
    readonly notes: FieldRef<"DeadLetterQueue", 'String'>
    readonly createdAt: FieldRef<"DeadLetterQueue", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DeadLetterQueue findUnique
   */
  export type DeadLetterQueueFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeadLetterQueue
     */
    select?: DeadLetterQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeadLetterQueue
     */
    omit?: DeadLetterQueueOmit<ExtArgs> | null
    /**
     * Filter, which DeadLetterQueue to fetch.
     */
    where: DeadLetterQueueWhereUniqueInput
  }

  /**
   * DeadLetterQueue findUniqueOrThrow
   */
  export type DeadLetterQueueFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeadLetterQueue
     */
    select?: DeadLetterQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeadLetterQueue
     */
    omit?: DeadLetterQueueOmit<ExtArgs> | null
    /**
     * Filter, which DeadLetterQueue to fetch.
     */
    where: DeadLetterQueueWhereUniqueInput
  }

  /**
   * DeadLetterQueue findFirst
   */
  export type DeadLetterQueueFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeadLetterQueue
     */
    select?: DeadLetterQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeadLetterQueue
     */
    omit?: DeadLetterQueueOmit<ExtArgs> | null
    /**
     * Filter, which DeadLetterQueue to fetch.
     */
    where?: DeadLetterQueueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeadLetterQueues to fetch.
     */
    orderBy?: DeadLetterQueueOrderByWithRelationInput | DeadLetterQueueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DeadLetterQueues.
     */
    cursor?: DeadLetterQueueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeadLetterQueues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeadLetterQueues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DeadLetterQueues.
     */
    distinct?: DeadLetterQueueScalarFieldEnum | DeadLetterQueueScalarFieldEnum[]
  }

  /**
   * DeadLetterQueue findFirstOrThrow
   */
  export type DeadLetterQueueFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeadLetterQueue
     */
    select?: DeadLetterQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeadLetterQueue
     */
    omit?: DeadLetterQueueOmit<ExtArgs> | null
    /**
     * Filter, which DeadLetterQueue to fetch.
     */
    where?: DeadLetterQueueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeadLetterQueues to fetch.
     */
    orderBy?: DeadLetterQueueOrderByWithRelationInput | DeadLetterQueueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DeadLetterQueues.
     */
    cursor?: DeadLetterQueueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeadLetterQueues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeadLetterQueues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DeadLetterQueues.
     */
    distinct?: DeadLetterQueueScalarFieldEnum | DeadLetterQueueScalarFieldEnum[]
  }

  /**
   * DeadLetterQueue findMany
   */
  export type DeadLetterQueueFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeadLetterQueue
     */
    select?: DeadLetterQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeadLetterQueue
     */
    omit?: DeadLetterQueueOmit<ExtArgs> | null
    /**
     * Filter, which DeadLetterQueues to fetch.
     */
    where?: DeadLetterQueueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeadLetterQueues to fetch.
     */
    orderBy?: DeadLetterQueueOrderByWithRelationInput | DeadLetterQueueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DeadLetterQueues.
     */
    cursor?: DeadLetterQueueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeadLetterQueues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeadLetterQueues.
     */
    skip?: number
    distinct?: DeadLetterQueueScalarFieldEnum | DeadLetterQueueScalarFieldEnum[]
  }

  /**
   * DeadLetterQueue create
   */
  export type DeadLetterQueueCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeadLetterQueue
     */
    select?: DeadLetterQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeadLetterQueue
     */
    omit?: DeadLetterQueueOmit<ExtArgs> | null
    /**
     * The data needed to create a DeadLetterQueue.
     */
    data: XOR<DeadLetterQueueCreateInput, DeadLetterQueueUncheckedCreateInput>
  }

  /**
   * DeadLetterQueue createMany
   */
  export type DeadLetterQueueCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DeadLetterQueues.
     */
    data: DeadLetterQueueCreateManyInput | DeadLetterQueueCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DeadLetterQueue createManyAndReturn
   */
  export type DeadLetterQueueCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeadLetterQueue
     */
    select?: DeadLetterQueueSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DeadLetterQueue
     */
    omit?: DeadLetterQueueOmit<ExtArgs> | null
    /**
     * The data used to create many DeadLetterQueues.
     */
    data: DeadLetterQueueCreateManyInput | DeadLetterQueueCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DeadLetterQueue update
   */
  export type DeadLetterQueueUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeadLetterQueue
     */
    select?: DeadLetterQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeadLetterQueue
     */
    omit?: DeadLetterQueueOmit<ExtArgs> | null
    /**
     * The data needed to update a DeadLetterQueue.
     */
    data: XOR<DeadLetterQueueUpdateInput, DeadLetterQueueUncheckedUpdateInput>
    /**
     * Choose, which DeadLetterQueue to update.
     */
    where: DeadLetterQueueWhereUniqueInput
  }

  /**
   * DeadLetterQueue updateMany
   */
  export type DeadLetterQueueUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DeadLetterQueues.
     */
    data: XOR<DeadLetterQueueUpdateManyMutationInput, DeadLetterQueueUncheckedUpdateManyInput>
    /**
     * Filter which DeadLetterQueues to update
     */
    where?: DeadLetterQueueWhereInput
    /**
     * Limit how many DeadLetterQueues to update.
     */
    limit?: number
  }

  /**
   * DeadLetterQueue updateManyAndReturn
   */
  export type DeadLetterQueueUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeadLetterQueue
     */
    select?: DeadLetterQueueSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DeadLetterQueue
     */
    omit?: DeadLetterQueueOmit<ExtArgs> | null
    /**
     * The data used to update DeadLetterQueues.
     */
    data: XOR<DeadLetterQueueUpdateManyMutationInput, DeadLetterQueueUncheckedUpdateManyInput>
    /**
     * Filter which DeadLetterQueues to update
     */
    where?: DeadLetterQueueWhereInput
    /**
     * Limit how many DeadLetterQueues to update.
     */
    limit?: number
  }

  /**
   * DeadLetterQueue upsert
   */
  export type DeadLetterQueueUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeadLetterQueue
     */
    select?: DeadLetterQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeadLetterQueue
     */
    omit?: DeadLetterQueueOmit<ExtArgs> | null
    /**
     * The filter to search for the DeadLetterQueue to update in case it exists.
     */
    where: DeadLetterQueueWhereUniqueInput
    /**
     * In case the DeadLetterQueue found by the `where` argument doesn't exist, create a new DeadLetterQueue with this data.
     */
    create: XOR<DeadLetterQueueCreateInput, DeadLetterQueueUncheckedCreateInput>
    /**
     * In case the DeadLetterQueue was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DeadLetterQueueUpdateInput, DeadLetterQueueUncheckedUpdateInput>
  }

  /**
   * DeadLetterQueue delete
   */
  export type DeadLetterQueueDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeadLetterQueue
     */
    select?: DeadLetterQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeadLetterQueue
     */
    omit?: DeadLetterQueueOmit<ExtArgs> | null
    /**
     * Filter which DeadLetterQueue to delete.
     */
    where: DeadLetterQueueWhereUniqueInput
  }

  /**
   * DeadLetterQueue deleteMany
   */
  export type DeadLetterQueueDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DeadLetterQueues to delete
     */
    where?: DeadLetterQueueWhereInput
    /**
     * Limit how many DeadLetterQueues to delete.
     */
    limit?: number
  }

  /**
   * DeadLetterQueue without action
   */
  export type DeadLetterQueueDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeadLetterQueue
     */
    select?: DeadLetterQueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeadLetterQueue
     */
    omit?: DeadLetterQueueOmit<ExtArgs> | null
  }


  /**
   * Model AlertLog
   */

  export type AggregateAlertLog = {
    _count: AlertLogCountAggregateOutputType | null
    _min: AlertLogMinAggregateOutputType | null
    _max: AlertLogMaxAggregateOutputType | null
  }

  export type AlertLogMinAggregateOutputType = {
    id: string | null
    alertType: string | null
    severity: string | null
    title: string | null
    message: string | null
    resolved: boolean | null
    resolvedAt: Date | null
    resolvedBy: string | null
    acknowledgedAt: Date | null
    createdAt: Date | null
  }

  export type AlertLogMaxAggregateOutputType = {
    id: string | null
    alertType: string | null
    severity: string | null
    title: string | null
    message: string | null
    resolved: boolean | null
    resolvedAt: Date | null
    resolvedBy: string | null
    acknowledgedAt: Date | null
    createdAt: Date | null
  }

  export type AlertLogCountAggregateOutputType = {
    id: number
    alertType: number
    severity: number
    title: number
    message: number
    metadata: number
    resolved: number
    resolvedAt: number
    resolvedBy: number
    acknowledgedAt: number
    createdAt: number
    _all: number
  }


  export type AlertLogMinAggregateInputType = {
    id?: true
    alertType?: true
    severity?: true
    title?: true
    message?: true
    resolved?: true
    resolvedAt?: true
    resolvedBy?: true
    acknowledgedAt?: true
    createdAt?: true
  }

  export type AlertLogMaxAggregateInputType = {
    id?: true
    alertType?: true
    severity?: true
    title?: true
    message?: true
    resolved?: true
    resolvedAt?: true
    resolvedBy?: true
    acknowledgedAt?: true
    createdAt?: true
  }

  export type AlertLogCountAggregateInputType = {
    id?: true
    alertType?: true
    severity?: true
    title?: true
    message?: true
    metadata?: true
    resolved?: true
    resolvedAt?: true
    resolvedBy?: true
    acknowledgedAt?: true
    createdAt?: true
    _all?: true
  }

  export type AlertLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AlertLog to aggregate.
     */
    where?: AlertLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AlertLogs to fetch.
     */
    orderBy?: AlertLogOrderByWithRelationInput | AlertLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AlertLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AlertLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AlertLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AlertLogs
    **/
    _count?: true | AlertLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AlertLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AlertLogMaxAggregateInputType
  }

  export type GetAlertLogAggregateType<T extends AlertLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAlertLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAlertLog[P]>
      : GetScalarType<T[P], AggregateAlertLog[P]>
  }




  export type AlertLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AlertLogWhereInput
    orderBy?: AlertLogOrderByWithAggregationInput | AlertLogOrderByWithAggregationInput[]
    by: AlertLogScalarFieldEnum[] | AlertLogScalarFieldEnum
    having?: AlertLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AlertLogCountAggregateInputType | true
    _min?: AlertLogMinAggregateInputType
    _max?: AlertLogMaxAggregateInputType
  }

  export type AlertLogGroupByOutputType = {
    id: string
    alertType: string
    severity: string
    title: string
    message: string
    metadata: JsonValue | null
    resolved: boolean
    resolvedAt: Date | null
    resolvedBy: string | null
    acknowledgedAt: Date | null
    createdAt: Date
    _count: AlertLogCountAggregateOutputType | null
    _min: AlertLogMinAggregateOutputType | null
    _max: AlertLogMaxAggregateOutputType | null
  }

  type GetAlertLogGroupByPayload<T extends AlertLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AlertLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AlertLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AlertLogGroupByOutputType[P]>
            : GetScalarType<T[P], AlertLogGroupByOutputType[P]>
        }
      >
    >


  export type AlertLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    alertType?: boolean
    severity?: boolean
    title?: boolean
    message?: boolean
    metadata?: boolean
    resolved?: boolean
    resolvedAt?: boolean
    resolvedBy?: boolean
    acknowledgedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["alertLog"]>

  export type AlertLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    alertType?: boolean
    severity?: boolean
    title?: boolean
    message?: boolean
    metadata?: boolean
    resolved?: boolean
    resolvedAt?: boolean
    resolvedBy?: boolean
    acknowledgedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["alertLog"]>

  export type AlertLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    alertType?: boolean
    severity?: boolean
    title?: boolean
    message?: boolean
    metadata?: boolean
    resolved?: boolean
    resolvedAt?: boolean
    resolvedBy?: boolean
    acknowledgedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["alertLog"]>

  export type AlertLogSelectScalar = {
    id?: boolean
    alertType?: boolean
    severity?: boolean
    title?: boolean
    message?: boolean
    metadata?: boolean
    resolved?: boolean
    resolvedAt?: boolean
    resolvedBy?: boolean
    acknowledgedAt?: boolean
    createdAt?: boolean
  }

  export type AlertLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "alertType" | "severity" | "title" | "message" | "metadata" | "resolved" | "resolvedAt" | "resolvedBy" | "acknowledgedAt" | "createdAt", ExtArgs["result"]["alertLog"]>

  export type $AlertLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AlertLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      alertType: string
      severity: string
      title: string
      message: string
      metadata: Prisma.JsonValue | null
      resolved: boolean
      resolvedAt: Date | null
      resolvedBy: string | null
      acknowledgedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["alertLog"]>
    composites: {}
  }

  type AlertLogGetPayload<S extends boolean | null | undefined | AlertLogDefaultArgs> = $Result.GetResult<Prisma.$AlertLogPayload, S>

  type AlertLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AlertLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AlertLogCountAggregateInputType | true
    }

  export interface AlertLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AlertLog'], meta: { name: 'AlertLog' } }
    /**
     * Find zero or one AlertLog that matches the filter.
     * @param {AlertLogFindUniqueArgs} args - Arguments to find a AlertLog
     * @example
     * // Get one AlertLog
     * const alertLog = await prisma.alertLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AlertLogFindUniqueArgs>(args: SelectSubset<T, AlertLogFindUniqueArgs<ExtArgs>>): Prisma__AlertLogClient<$Result.GetResult<Prisma.$AlertLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AlertLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AlertLogFindUniqueOrThrowArgs} args - Arguments to find a AlertLog
     * @example
     * // Get one AlertLog
     * const alertLog = await prisma.alertLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AlertLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AlertLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AlertLogClient<$Result.GetResult<Prisma.$AlertLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AlertLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertLogFindFirstArgs} args - Arguments to find a AlertLog
     * @example
     * // Get one AlertLog
     * const alertLog = await prisma.alertLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AlertLogFindFirstArgs>(args?: SelectSubset<T, AlertLogFindFirstArgs<ExtArgs>>): Prisma__AlertLogClient<$Result.GetResult<Prisma.$AlertLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AlertLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertLogFindFirstOrThrowArgs} args - Arguments to find a AlertLog
     * @example
     * // Get one AlertLog
     * const alertLog = await prisma.alertLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AlertLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AlertLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AlertLogClient<$Result.GetResult<Prisma.$AlertLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AlertLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AlertLogs
     * const alertLogs = await prisma.alertLog.findMany()
     * 
     * // Get first 10 AlertLogs
     * const alertLogs = await prisma.alertLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const alertLogWithIdOnly = await prisma.alertLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AlertLogFindManyArgs>(args?: SelectSubset<T, AlertLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlertLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AlertLog.
     * @param {AlertLogCreateArgs} args - Arguments to create a AlertLog.
     * @example
     * // Create one AlertLog
     * const AlertLog = await prisma.alertLog.create({
     *   data: {
     *     // ... data to create a AlertLog
     *   }
     * })
     * 
     */
    create<T extends AlertLogCreateArgs>(args: SelectSubset<T, AlertLogCreateArgs<ExtArgs>>): Prisma__AlertLogClient<$Result.GetResult<Prisma.$AlertLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AlertLogs.
     * @param {AlertLogCreateManyArgs} args - Arguments to create many AlertLogs.
     * @example
     * // Create many AlertLogs
     * const alertLog = await prisma.alertLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AlertLogCreateManyArgs>(args?: SelectSubset<T, AlertLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AlertLogs and returns the data saved in the database.
     * @param {AlertLogCreateManyAndReturnArgs} args - Arguments to create many AlertLogs.
     * @example
     * // Create many AlertLogs
     * const alertLog = await prisma.alertLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AlertLogs and only return the `id`
     * const alertLogWithIdOnly = await prisma.alertLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AlertLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AlertLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlertLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AlertLog.
     * @param {AlertLogDeleteArgs} args - Arguments to delete one AlertLog.
     * @example
     * // Delete one AlertLog
     * const AlertLog = await prisma.alertLog.delete({
     *   where: {
     *     // ... filter to delete one AlertLog
     *   }
     * })
     * 
     */
    delete<T extends AlertLogDeleteArgs>(args: SelectSubset<T, AlertLogDeleteArgs<ExtArgs>>): Prisma__AlertLogClient<$Result.GetResult<Prisma.$AlertLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AlertLog.
     * @param {AlertLogUpdateArgs} args - Arguments to update one AlertLog.
     * @example
     * // Update one AlertLog
     * const alertLog = await prisma.alertLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AlertLogUpdateArgs>(args: SelectSubset<T, AlertLogUpdateArgs<ExtArgs>>): Prisma__AlertLogClient<$Result.GetResult<Prisma.$AlertLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AlertLogs.
     * @param {AlertLogDeleteManyArgs} args - Arguments to filter AlertLogs to delete.
     * @example
     * // Delete a few AlertLogs
     * const { count } = await prisma.alertLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AlertLogDeleteManyArgs>(args?: SelectSubset<T, AlertLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AlertLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AlertLogs
     * const alertLog = await prisma.alertLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AlertLogUpdateManyArgs>(args: SelectSubset<T, AlertLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AlertLogs and returns the data updated in the database.
     * @param {AlertLogUpdateManyAndReturnArgs} args - Arguments to update many AlertLogs.
     * @example
     * // Update many AlertLogs
     * const alertLog = await prisma.alertLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AlertLogs and only return the `id`
     * const alertLogWithIdOnly = await prisma.alertLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AlertLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AlertLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlertLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AlertLog.
     * @param {AlertLogUpsertArgs} args - Arguments to update or create a AlertLog.
     * @example
     * // Update or create a AlertLog
     * const alertLog = await prisma.alertLog.upsert({
     *   create: {
     *     // ... data to create a AlertLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AlertLog we want to update
     *   }
     * })
     */
    upsert<T extends AlertLogUpsertArgs>(args: SelectSubset<T, AlertLogUpsertArgs<ExtArgs>>): Prisma__AlertLogClient<$Result.GetResult<Prisma.$AlertLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AlertLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertLogCountArgs} args - Arguments to filter AlertLogs to count.
     * @example
     * // Count the number of AlertLogs
     * const count = await prisma.alertLog.count({
     *   where: {
     *     // ... the filter for the AlertLogs we want to count
     *   }
     * })
    **/
    count<T extends AlertLogCountArgs>(
      args?: Subset<T, AlertLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AlertLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AlertLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AlertLogAggregateArgs>(args: Subset<T, AlertLogAggregateArgs>): Prisma.PrismaPromise<GetAlertLogAggregateType<T>>

    /**
     * Group by AlertLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertLogGroupByArgs} args - Group by arguments.
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
      T extends AlertLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AlertLogGroupByArgs['orderBy'] }
        : { orderBy?: AlertLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, AlertLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAlertLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AlertLog model
   */
  readonly fields: AlertLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AlertLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AlertLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AlertLog model
   */
  interface AlertLogFieldRefs {
    readonly id: FieldRef<"AlertLog", 'String'>
    readonly alertType: FieldRef<"AlertLog", 'String'>
    readonly severity: FieldRef<"AlertLog", 'String'>
    readonly title: FieldRef<"AlertLog", 'String'>
    readonly message: FieldRef<"AlertLog", 'String'>
    readonly metadata: FieldRef<"AlertLog", 'Json'>
    readonly resolved: FieldRef<"AlertLog", 'Boolean'>
    readonly resolvedAt: FieldRef<"AlertLog", 'DateTime'>
    readonly resolvedBy: FieldRef<"AlertLog", 'String'>
    readonly acknowledgedAt: FieldRef<"AlertLog", 'DateTime'>
    readonly createdAt: FieldRef<"AlertLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AlertLog findUnique
   */
  export type AlertLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertLog
     */
    select?: AlertLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlertLog
     */
    omit?: AlertLogOmit<ExtArgs> | null
    /**
     * Filter, which AlertLog to fetch.
     */
    where: AlertLogWhereUniqueInput
  }

  /**
   * AlertLog findUniqueOrThrow
   */
  export type AlertLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertLog
     */
    select?: AlertLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlertLog
     */
    omit?: AlertLogOmit<ExtArgs> | null
    /**
     * Filter, which AlertLog to fetch.
     */
    where: AlertLogWhereUniqueInput
  }

  /**
   * AlertLog findFirst
   */
  export type AlertLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertLog
     */
    select?: AlertLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlertLog
     */
    omit?: AlertLogOmit<ExtArgs> | null
    /**
     * Filter, which AlertLog to fetch.
     */
    where?: AlertLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AlertLogs to fetch.
     */
    orderBy?: AlertLogOrderByWithRelationInput | AlertLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AlertLogs.
     */
    cursor?: AlertLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AlertLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AlertLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AlertLogs.
     */
    distinct?: AlertLogScalarFieldEnum | AlertLogScalarFieldEnum[]
  }

  /**
   * AlertLog findFirstOrThrow
   */
  export type AlertLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertLog
     */
    select?: AlertLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlertLog
     */
    omit?: AlertLogOmit<ExtArgs> | null
    /**
     * Filter, which AlertLog to fetch.
     */
    where?: AlertLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AlertLogs to fetch.
     */
    orderBy?: AlertLogOrderByWithRelationInput | AlertLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AlertLogs.
     */
    cursor?: AlertLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AlertLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AlertLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AlertLogs.
     */
    distinct?: AlertLogScalarFieldEnum | AlertLogScalarFieldEnum[]
  }

  /**
   * AlertLog findMany
   */
  export type AlertLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertLog
     */
    select?: AlertLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlertLog
     */
    omit?: AlertLogOmit<ExtArgs> | null
    /**
     * Filter, which AlertLogs to fetch.
     */
    where?: AlertLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AlertLogs to fetch.
     */
    orderBy?: AlertLogOrderByWithRelationInput | AlertLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AlertLogs.
     */
    cursor?: AlertLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AlertLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AlertLogs.
     */
    skip?: number
    distinct?: AlertLogScalarFieldEnum | AlertLogScalarFieldEnum[]
  }

  /**
   * AlertLog create
   */
  export type AlertLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertLog
     */
    select?: AlertLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlertLog
     */
    omit?: AlertLogOmit<ExtArgs> | null
    /**
     * The data needed to create a AlertLog.
     */
    data: XOR<AlertLogCreateInput, AlertLogUncheckedCreateInput>
  }

  /**
   * AlertLog createMany
   */
  export type AlertLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AlertLogs.
     */
    data: AlertLogCreateManyInput | AlertLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AlertLog createManyAndReturn
   */
  export type AlertLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertLog
     */
    select?: AlertLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AlertLog
     */
    omit?: AlertLogOmit<ExtArgs> | null
    /**
     * The data used to create many AlertLogs.
     */
    data: AlertLogCreateManyInput | AlertLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AlertLog update
   */
  export type AlertLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertLog
     */
    select?: AlertLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlertLog
     */
    omit?: AlertLogOmit<ExtArgs> | null
    /**
     * The data needed to update a AlertLog.
     */
    data: XOR<AlertLogUpdateInput, AlertLogUncheckedUpdateInput>
    /**
     * Choose, which AlertLog to update.
     */
    where: AlertLogWhereUniqueInput
  }

  /**
   * AlertLog updateMany
   */
  export type AlertLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AlertLogs.
     */
    data: XOR<AlertLogUpdateManyMutationInput, AlertLogUncheckedUpdateManyInput>
    /**
     * Filter which AlertLogs to update
     */
    where?: AlertLogWhereInput
    /**
     * Limit how many AlertLogs to update.
     */
    limit?: number
  }

  /**
   * AlertLog updateManyAndReturn
   */
  export type AlertLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertLog
     */
    select?: AlertLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AlertLog
     */
    omit?: AlertLogOmit<ExtArgs> | null
    /**
     * The data used to update AlertLogs.
     */
    data: XOR<AlertLogUpdateManyMutationInput, AlertLogUncheckedUpdateManyInput>
    /**
     * Filter which AlertLogs to update
     */
    where?: AlertLogWhereInput
    /**
     * Limit how many AlertLogs to update.
     */
    limit?: number
  }

  /**
   * AlertLog upsert
   */
  export type AlertLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertLog
     */
    select?: AlertLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlertLog
     */
    omit?: AlertLogOmit<ExtArgs> | null
    /**
     * The filter to search for the AlertLog to update in case it exists.
     */
    where: AlertLogWhereUniqueInput
    /**
     * In case the AlertLog found by the `where` argument doesn't exist, create a new AlertLog with this data.
     */
    create: XOR<AlertLogCreateInput, AlertLogUncheckedCreateInput>
    /**
     * In case the AlertLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AlertLogUpdateInput, AlertLogUncheckedUpdateInput>
  }

  /**
   * AlertLog delete
   */
  export type AlertLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertLog
     */
    select?: AlertLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlertLog
     */
    omit?: AlertLogOmit<ExtArgs> | null
    /**
     * Filter which AlertLog to delete.
     */
    where: AlertLogWhereUniqueInput
  }

  /**
   * AlertLog deleteMany
   */
  export type AlertLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AlertLogs to delete
     */
    where?: AlertLogWhereInput
    /**
     * Limit how many AlertLogs to delete.
     */
    limit?: number
  }

  /**
   * AlertLog without action
   */
  export type AlertLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertLog
     */
    select?: AlertLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlertLog
     */
    omit?: AlertLogOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    role: 'role',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const WalletScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    balance: 'balance',
    currency: 'currency',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    flaggedForReview: 'flaggedForReview',
    flaggedReason: 'flaggedReason',
    flaggedAt: 'flaggedAt',
    flaggedDelta: 'flaggedDelta'
  };

  export type WalletScalarFieldEnum = (typeof WalletScalarFieldEnum)[keyof typeof WalletScalarFieldEnum]


  export const TransactionScalarFieldEnum: {
    id: 'id',
    walletId: 'walletId',
    type: 'type',
    amount: 'amount',
    idempotencyKey: 'idempotencyKey',
    createdAt: 'createdAt'
  };

  export type TransactionScalarFieldEnum = (typeof TransactionScalarFieldEnum)[keyof typeof TransactionScalarFieldEnum]


  export const WalletLedgerEntryScalarFieldEnum: {
    id: 'id',
    walletId: 'walletId',
    type: 'type',
    amount: 'amount',
    balanceBefore: 'balanceBefore',
    balanceAfter: 'balanceAfter',
    reference: 'reference',
    description: 'description',
    source: 'source',
    providerEventId: 'providerEventId',
    idempotencyKey: 'idempotencyKey',
    createdAt: 'createdAt'
  };

  export type WalletLedgerEntryScalarFieldEnum = (typeof WalletLedgerEntryScalarFieldEnum)[keyof typeof WalletLedgerEntryScalarFieldEnum]


  export const OnRampScalarFieldEnum: {
    id: 'id',
    walletId: 'walletId',
    provider: 'provider',
    providerTxId: 'providerTxId',
    amount: 'amount',
    cryptoAmount: 'cryptoAmount',
    currency: 'currency',
    status: 'status',
    metadata: 'metadata',
    createdAt: 'createdAt',
    completedAt: 'completedAt'
  };

  export type OnRampScalarFieldEnum = (typeof OnRampScalarFieldEnum)[keyof typeof OnRampScalarFieldEnum]


  export const WebhookEventScalarFieldEnum: {
    id: 'id',
    provider: 'provider',
    externalId: 'externalId',
    payloadHash: 'payloadHash',
    status: 'status',
    transactionId: 'transactionId',
    errorMessage: 'errorMessage',
    receivedAt: 'receivedAt',
    processedAt: 'processedAt',
    retryCount: 'retryCount',
    maxRetries: 'maxRetries',
    lastRetryAt: 'lastRetryAt',
    deadLetterAt: 'deadLetterAt'
  };

  export type WebhookEventScalarFieldEnum = (typeof WebhookEventScalarFieldEnum)[keyof typeof WebhookEventScalarFieldEnum]


  export const AdminAccessLogScalarFieldEnum: {
    id: 'id',
    adminUserId: 'adminUserId',
    action: 'action',
    resource: 'resource',
    resourceId: 'resourceId',
    status: 'status',
    requestId: 'requestId',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    metadata: 'metadata',
    timestamp: 'timestamp'
  };

  export type AdminAccessLogScalarFieldEnum = (typeof AdminAccessLogScalarFieldEnum)[keyof typeof AdminAccessLogScalarFieldEnum]


  export const MissingWebhookAlertScalarFieldEnum: {
    id: 'id',
    onRampId: 'onRampId',
    provider: 'provider',
    status: 'status',
    detectedAt: 'detectedAt',
    resolvedAt: 'resolvedAt',
    resolution: 'resolution',
    notes: 'notes'
  };

  export type MissingWebhookAlertScalarFieldEnum = (typeof MissingWebhookAlertScalarFieldEnum)[keyof typeof MissingWebhookAlertScalarFieldEnum]


  export const DeadLetterQueueScalarFieldEnum: {
    id: 'id',
    eventId: 'eventId',
    eventType: 'eventType',
    provider: 'provider',
    reason: 'reason',
    lastError: 'lastError',
    retryCount: 'retryCount',
    maxRetries: 'maxRetries',
    payload: 'payload',
    status: 'status',
    resolvedAt: 'resolvedAt',
    resolution: 'resolution',
    notes: 'notes',
    createdAt: 'createdAt'
  };

  export type DeadLetterQueueScalarFieldEnum = (typeof DeadLetterQueueScalarFieldEnum)[keyof typeof DeadLetterQueueScalarFieldEnum]


  export const AlertLogScalarFieldEnum: {
    id: 'id',
    alertType: 'alertType',
    severity: 'severity',
    title: 'title',
    message: 'message',
    metadata: 'metadata',
    resolved: 'resolved',
    resolvedAt: 'resolvedAt',
    resolvedBy: 'resolvedBy',
    acknowledgedAt: 'acknowledgedAt',
    createdAt: 'createdAt'
  };

  export type AlertLogScalarFieldEnum = (typeof AlertLogScalarFieldEnum)[keyof typeof AlertLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    wallet?: XOR<WalletNullableScalarRelationFilter, WalletWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    wallet?: WalletOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    wallet?: XOR<WalletNullableScalarRelationFilter, WalletWhereInput> | null
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type WalletWhereInput = {
    AND?: WalletWhereInput | WalletWhereInput[]
    OR?: WalletWhereInput[]
    NOT?: WalletWhereInput | WalletWhereInput[]
    id?: StringFilter<"Wallet"> | string
    userId?: StringFilter<"Wallet"> | string
    balance?: FloatFilter<"Wallet"> | number
    currency?: StringFilter<"Wallet"> | string
    createdAt?: DateTimeFilter<"Wallet"> | Date | string
    updatedAt?: DateTimeFilter<"Wallet"> | Date | string
    flaggedForReview?: BoolFilter<"Wallet"> | boolean
    flaggedReason?: StringNullableFilter<"Wallet"> | string | null
    flaggedAt?: DateTimeNullableFilter<"Wallet"> | Date | string | null
    flaggedDelta?: FloatNullableFilter<"Wallet"> | number | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    transactions?: TransactionListRelationFilter
    onRamps?: OnRampListRelationFilter
    ledger?: WalletLedgerEntryListRelationFilter
  }

  export type WalletOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    balance?: SortOrder
    currency?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    flaggedForReview?: SortOrder
    flaggedReason?: SortOrderInput | SortOrder
    flaggedAt?: SortOrderInput | SortOrder
    flaggedDelta?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    transactions?: TransactionOrderByRelationAggregateInput
    onRamps?: OnRampOrderByRelationAggregateInput
    ledger?: WalletLedgerEntryOrderByRelationAggregateInput
  }

  export type WalletWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: WalletWhereInput | WalletWhereInput[]
    OR?: WalletWhereInput[]
    NOT?: WalletWhereInput | WalletWhereInput[]
    balance?: FloatFilter<"Wallet"> | number
    currency?: StringFilter<"Wallet"> | string
    createdAt?: DateTimeFilter<"Wallet"> | Date | string
    updatedAt?: DateTimeFilter<"Wallet"> | Date | string
    flaggedForReview?: BoolFilter<"Wallet"> | boolean
    flaggedReason?: StringNullableFilter<"Wallet"> | string | null
    flaggedAt?: DateTimeNullableFilter<"Wallet"> | Date | string | null
    flaggedDelta?: FloatNullableFilter<"Wallet"> | number | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    transactions?: TransactionListRelationFilter
    onRamps?: OnRampListRelationFilter
    ledger?: WalletLedgerEntryListRelationFilter
  }, "id" | "userId">

  export type WalletOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    balance?: SortOrder
    currency?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    flaggedForReview?: SortOrder
    flaggedReason?: SortOrderInput | SortOrder
    flaggedAt?: SortOrderInput | SortOrder
    flaggedDelta?: SortOrderInput | SortOrder
    _count?: WalletCountOrderByAggregateInput
    _avg?: WalletAvgOrderByAggregateInput
    _max?: WalletMaxOrderByAggregateInput
    _min?: WalletMinOrderByAggregateInput
    _sum?: WalletSumOrderByAggregateInput
  }

  export type WalletScalarWhereWithAggregatesInput = {
    AND?: WalletScalarWhereWithAggregatesInput | WalletScalarWhereWithAggregatesInput[]
    OR?: WalletScalarWhereWithAggregatesInput[]
    NOT?: WalletScalarWhereWithAggregatesInput | WalletScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Wallet"> | string
    userId?: StringWithAggregatesFilter<"Wallet"> | string
    balance?: FloatWithAggregatesFilter<"Wallet"> | number
    currency?: StringWithAggregatesFilter<"Wallet"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Wallet"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Wallet"> | Date | string
    flaggedForReview?: BoolWithAggregatesFilter<"Wallet"> | boolean
    flaggedReason?: StringNullableWithAggregatesFilter<"Wallet"> | string | null
    flaggedAt?: DateTimeNullableWithAggregatesFilter<"Wallet"> | Date | string | null
    flaggedDelta?: FloatNullableWithAggregatesFilter<"Wallet"> | number | null
  }

  export type TransactionWhereInput = {
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    id?: StringFilter<"Transaction"> | string
    walletId?: StringFilter<"Transaction"> | string
    type?: StringFilter<"Transaction"> | string
    amount?: FloatFilter<"Transaction"> | number
    idempotencyKey?: StringNullableFilter<"Transaction"> | string | null
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    wallet?: XOR<WalletScalarRelationFilter, WalletWhereInput>
    webhookEvents?: WebhookEventListRelationFilter
  }

  export type TransactionOrderByWithRelationInput = {
    id?: SortOrder
    walletId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    idempotencyKey?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    wallet?: WalletOrderByWithRelationInput
    webhookEvents?: WebhookEventOrderByRelationAggregateInput
  }

  export type TransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    idempotencyKey?: string
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    walletId?: StringFilter<"Transaction"> | string
    type?: StringFilter<"Transaction"> | string
    amount?: FloatFilter<"Transaction"> | number
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    wallet?: XOR<WalletScalarRelationFilter, WalletWhereInput>
    webhookEvents?: WebhookEventListRelationFilter
  }, "id" | "idempotencyKey">

  export type TransactionOrderByWithAggregationInput = {
    id?: SortOrder
    walletId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    idempotencyKey?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: TransactionCountOrderByAggregateInput
    _avg?: TransactionAvgOrderByAggregateInput
    _max?: TransactionMaxOrderByAggregateInput
    _min?: TransactionMinOrderByAggregateInput
    _sum?: TransactionSumOrderByAggregateInput
  }

  export type TransactionScalarWhereWithAggregatesInput = {
    AND?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    OR?: TransactionScalarWhereWithAggregatesInput[]
    NOT?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Transaction"> | string
    walletId?: StringWithAggregatesFilter<"Transaction"> | string
    type?: StringWithAggregatesFilter<"Transaction"> | string
    amount?: FloatWithAggregatesFilter<"Transaction"> | number
    idempotencyKey?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
  }

  export type WalletLedgerEntryWhereInput = {
    AND?: WalletLedgerEntryWhereInput | WalletLedgerEntryWhereInput[]
    OR?: WalletLedgerEntryWhereInput[]
    NOT?: WalletLedgerEntryWhereInput | WalletLedgerEntryWhereInput[]
    id?: StringFilter<"WalletLedgerEntry"> | string
    walletId?: StringFilter<"WalletLedgerEntry"> | string
    type?: StringFilter<"WalletLedgerEntry"> | string
    amount?: FloatFilter<"WalletLedgerEntry"> | number
    balanceBefore?: FloatFilter<"WalletLedgerEntry"> | number
    balanceAfter?: FloatFilter<"WalletLedgerEntry"> | number
    reference?: StringNullableFilter<"WalletLedgerEntry"> | string | null
    description?: StringNullableFilter<"WalletLedgerEntry"> | string | null
    source?: StringNullableFilter<"WalletLedgerEntry"> | string | null
    providerEventId?: StringNullableFilter<"WalletLedgerEntry"> | string | null
    idempotencyKey?: StringNullableFilter<"WalletLedgerEntry"> | string | null
    createdAt?: DateTimeFilter<"WalletLedgerEntry"> | Date | string
    wallet?: XOR<WalletScalarRelationFilter, WalletWhereInput>
  }

  export type WalletLedgerEntryOrderByWithRelationInput = {
    id?: SortOrder
    walletId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    balanceBefore?: SortOrder
    balanceAfter?: SortOrder
    reference?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    providerEventId?: SortOrderInput | SortOrder
    idempotencyKey?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    wallet?: WalletOrderByWithRelationInput
  }

  export type WalletLedgerEntryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    idempotencyKey?: string
    AND?: WalletLedgerEntryWhereInput | WalletLedgerEntryWhereInput[]
    OR?: WalletLedgerEntryWhereInput[]
    NOT?: WalletLedgerEntryWhereInput | WalletLedgerEntryWhereInput[]
    walletId?: StringFilter<"WalletLedgerEntry"> | string
    type?: StringFilter<"WalletLedgerEntry"> | string
    amount?: FloatFilter<"WalletLedgerEntry"> | number
    balanceBefore?: FloatFilter<"WalletLedgerEntry"> | number
    balanceAfter?: FloatFilter<"WalletLedgerEntry"> | number
    reference?: StringNullableFilter<"WalletLedgerEntry"> | string | null
    description?: StringNullableFilter<"WalletLedgerEntry"> | string | null
    source?: StringNullableFilter<"WalletLedgerEntry"> | string | null
    providerEventId?: StringNullableFilter<"WalletLedgerEntry"> | string | null
    createdAt?: DateTimeFilter<"WalletLedgerEntry"> | Date | string
    wallet?: XOR<WalletScalarRelationFilter, WalletWhereInput>
  }, "id" | "idempotencyKey">

  export type WalletLedgerEntryOrderByWithAggregationInput = {
    id?: SortOrder
    walletId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    balanceBefore?: SortOrder
    balanceAfter?: SortOrder
    reference?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    providerEventId?: SortOrderInput | SortOrder
    idempotencyKey?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: WalletLedgerEntryCountOrderByAggregateInput
    _avg?: WalletLedgerEntryAvgOrderByAggregateInput
    _max?: WalletLedgerEntryMaxOrderByAggregateInput
    _min?: WalletLedgerEntryMinOrderByAggregateInput
    _sum?: WalletLedgerEntrySumOrderByAggregateInput
  }

  export type WalletLedgerEntryScalarWhereWithAggregatesInput = {
    AND?: WalletLedgerEntryScalarWhereWithAggregatesInput | WalletLedgerEntryScalarWhereWithAggregatesInput[]
    OR?: WalletLedgerEntryScalarWhereWithAggregatesInput[]
    NOT?: WalletLedgerEntryScalarWhereWithAggregatesInput | WalletLedgerEntryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WalletLedgerEntry"> | string
    walletId?: StringWithAggregatesFilter<"WalletLedgerEntry"> | string
    type?: StringWithAggregatesFilter<"WalletLedgerEntry"> | string
    amount?: FloatWithAggregatesFilter<"WalletLedgerEntry"> | number
    balanceBefore?: FloatWithAggregatesFilter<"WalletLedgerEntry"> | number
    balanceAfter?: FloatWithAggregatesFilter<"WalletLedgerEntry"> | number
    reference?: StringNullableWithAggregatesFilter<"WalletLedgerEntry"> | string | null
    description?: StringNullableWithAggregatesFilter<"WalletLedgerEntry"> | string | null
    source?: StringNullableWithAggregatesFilter<"WalletLedgerEntry"> | string | null
    providerEventId?: StringNullableWithAggregatesFilter<"WalletLedgerEntry"> | string | null
    idempotencyKey?: StringNullableWithAggregatesFilter<"WalletLedgerEntry"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"WalletLedgerEntry"> | Date | string
  }

  export type OnRampWhereInput = {
    AND?: OnRampWhereInput | OnRampWhereInput[]
    OR?: OnRampWhereInput[]
    NOT?: OnRampWhereInput | OnRampWhereInput[]
    id?: StringFilter<"OnRamp"> | string
    walletId?: StringFilter<"OnRamp"> | string
    provider?: StringFilter<"OnRamp"> | string
    providerTxId?: StringNullableFilter<"OnRamp"> | string | null
    amount?: FloatFilter<"OnRamp"> | number
    cryptoAmount?: FloatNullableFilter<"OnRamp"> | number | null
    currency?: StringFilter<"OnRamp"> | string
    status?: StringFilter<"OnRamp"> | string
    metadata?: JsonNullableFilter<"OnRamp">
    createdAt?: DateTimeFilter<"OnRamp"> | Date | string
    completedAt?: DateTimeNullableFilter<"OnRamp"> | Date | string | null
    wallet?: XOR<WalletScalarRelationFilter, WalletWhereInput>
    missingWebhook?: XOR<MissingWebhookAlertNullableScalarRelationFilter, MissingWebhookAlertWhereInput> | null
  }

  export type OnRampOrderByWithRelationInput = {
    id?: SortOrder
    walletId?: SortOrder
    provider?: SortOrder
    providerTxId?: SortOrderInput | SortOrder
    amount?: SortOrder
    cryptoAmount?: SortOrderInput | SortOrder
    currency?: SortOrder
    status?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    wallet?: WalletOrderByWithRelationInput
    missingWebhook?: MissingWebhookAlertOrderByWithRelationInput
  }

  export type OnRampWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OnRampWhereInput | OnRampWhereInput[]
    OR?: OnRampWhereInput[]
    NOT?: OnRampWhereInput | OnRampWhereInput[]
    walletId?: StringFilter<"OnRamp"> | string
    provider?: StringFilter<"OnRamp"> | string
    providerTxId?: StringNullableFilter<"OnRamp"> | string | null
    amount?: FloatFilter<"OnRamp"> | number
    cryptoAmount?: FloatNullableFilter<"OnRamp"> | number | null
    currency?: StringFilter<"OnRamp"> | string
    status?: StringFilter<"OnRamp"> | string
    metadata?: JsonNullableFilter<"OnRamp">
    createdAt?: DateTimeFilter<"OnRamp"> | Date | string
    completedAt?: DateTimeNullableFilter<"OnRamp"> | Date | string | null
    wallet?: XOR<WalletScalarRelationFilter, WalletWhereInput>
    missingWebhook?: XOR<MissingWebhookAlertNullableScalarRelationFilter, MissingWebhookAlertWhereInput> | null
  }, "id">

  export type OnRampOrderByWithAggregationInput = {
    id?: SortOrder
    walletId?: SortOrder
    provider?: SortOrder
    providerTxId?: SortOrderInput | SortOrder
    amount?: SortOrder
    cryptoAmount?: SortOrderInput | SortOrder
    currency?: SortOrder
    status?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    _count?: OnRampCountOrderByAggregateInput
    _avg?: OnRampAvgOrderByAggregateInput
    _max?: OnRampMaxOrderByAggregateInput
    _min?: OnRampMinOrderByAggregateInput
    _sum?: OnRampSumOrderByAggregateInput
  }

  export type OnRampScalarWhereWithAggregatesInput = {
    AND?: OnRampScalarWhereWithAggregatesInput | OnRampScalarWhereWithAggregatesInput[]
    OR?: OnRampScalarWhereWithAggregatesInput[]
    NOT?: OnRampScalarWhereWithAggregatesInput | OnRampScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OnRamp"> | string
    walletId?: StringWithAggregatesFilter<"OnRamp"> | string
    provider?: StringWithAggregatesFilter<"OnRamp"> | string
    providerTxId?: StringNullableWithAggregatesFilter<"OnRamp"> | string | null
    amount?: FloatWithAggregatesFilter<"OnRamp"> | number
    cryptoAmount?: FloatNullableWithAggregatesFilter<"OnRamp"> | number | null
    currency?: StringWithAggregatesFilter<"OnRamp"> | string
    status?: StringWithAggregatesFilter<"OnRamp"> | string
    metadata?: JsonNullableWithAggregatesFilter<"OnRamp">
    createdAt?: DateTimeWithAggregatesFilter<"OnRamp"> | Date | string
    completedAt?: DateTimeNullableWithAggregatesFilter<"OnRamp"> | Date | string | null
  }

  export type WebhookEventWhereInput = {
    AND?: WebhookEventWhereInput | WebhookEventWhereInput[]
    OR?: WebhookEventWhereInput[]
    NOT?: WebhookEventWhereInput | WebhookEventWhereInput[]
    id?: StringFilter<"WebhookEvent"> | string
    provider?: StringFilter<"WebhookEvent"> | string
    externalId?: StringFilter<"WebhookEvent"> | string
    payloadHash?: StringFilter<"WebhookEvent"> | string
    status?: StringFilter<"WebhookEvent"> | string
    transactionId?: StringNullableFilter<"WebhookEvent"> | string | null
    errorMessage?: StringNullableFilter<"WebhookEvent"> | string | null
    receivedAt?: DateTimeFilter<"WebhookEvent"> | Date | string
    processedAt?: DateTimeNullableFilter<"WebhookEvent"> | Date | string | null
    retryCount?: IntFilter<"WebhookEvent"> | number
    maxRetries?: IntFilter<"WebhookEvent"> | number
    lastRetryAt?: DateTimeNullableFilter<"WebhookEvent"> | Date | string | null
    deadLetterAt?: DateTimeNullableFilter<"WebhookEvent"> | Date | string | null
    transaction?: XOR<TransactionNullableScalarRelationFilter, TransactionWhereInput> | null
  }

  export type WebhookEventOrderByWithRelationInput = {
    id?: SortOrder
    provider?: SortOrder
    externalId?: SortOrder
    payloadHash?: SortOrder
    status?: SortOrder
    transactionId?: SortOrderInput | SortOrder
    errorMessage?: SortOrderInput | SortOrder
    receivedAt?: SortOrder
    processedAt?: SortOrderInput | SortOrder
    retryCount?: SortOrder
    maxRetries?: SortOrder
    lastRetryAt?: SortOrderInput | SortOrder
    deadLetterAt?: SortOrderInput | SortOrder
    transaction?: TransactionOrderByWithRelationInput
  }

  export type WebhookEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    externalId?: string
    AND?: WebhookEventWhereInput | WebhookEventWhereInput[]
    OR?: WebhookEventWhereInput[]
    NOT?: WebhookEventWhereInput | WebhookEventWhereInput[]
    provider?: StringFilter<"WebhookEvent"> | string
    payloadHash?: StringFilter<"WebhookEvent"> | string
    status?: StringFilter<"WebhookEvent"> | string
    transactionId?: StringNullableFilter<"WebhookEvent"> | string | null
    errorMessage?: StringNullableFilter<"WebhookEvent"> | string | null
    receivedAt?: DateTimeFilter<"WebhookEvent"> | Date | string
    processedAt?: DateTimeNullableFilter<"WebhookEvent"> | Date | string | null
    retryCount?: IntFilter<"WebhookEvent"> | number
    maxRetries?: IntFilter<"WebhookEvent"> | number
    lastRetryAt?: DateTimeNullableFilter<"WebhookEvent"> | Date | string | null
    deadLetterAt?: DateTimeNullableFilter<"WebhookEvent"> | Date | string | null
    transaction?: XOR<TransactionNullableScalarRelationFilter, TransactionWhereInput> | null
  }, "id" | "externalId">

  export type WebhookEventOrderByWithAggregationInput = {
    id?: SortOrder
    provider?: SortOrder
    externalId?: SortOrder
    payloadHash?: SortOrder
    status?: SortOrder
    transactionId?: SortOrderInput | SortOrder
    errorMessage?: SortOrderInput | SortOrder
    receivedAt?: SortOrder
    processedAt?: SortOrderInput | SortOrder
    retryCount?: SortOrder
    maxRetries?: SortOrder
    lastRetryAt?: SortOrderInput | SortOrder
    deadLetterAt?: SortOrderInput | SortOrder
    _count?: WebhookEventCountOrderByAggregateInput
    _avg?: WebhookEventAvgOrderByAggregateInput
    _max?: WebhookEventMaxOrderByAggregateInput
    _min?: WebhookEventMinOrderByAggregateInput
    _sum?: WebhookEventSumOrderByAggregateInput
  }

  export type WebhookEventScalarWhereWithAggregatesInput = {
    AND?: WebhookEventScalarWhereWithAggregatesInput | WebhookEventScalarWhereWithAggregatesInput[]
    OR?: WebhookEventScalarWhereWithAggregatesInput[]
    NOT?: WebhookEventScalarWhereWithAggregatesInput | WebhookEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WebhookEvent"> | string
    provider?: StringWithAggregatesFilter<"WebhookEvent"> | string
    externalId?: StringWithAggregatesFilter<"WebhookEvent"> | string
    payloadHash?: StringWithAggregatesFilter<"WebhookEvent"> | string
    status?: StringWithAggregatesFilter<"WebhookEvent"> | string
    transactionId?: StringNullableWithAggregatesFilter<"WebhookEvent"> | string | null
    errorMessage?: StringNullableWithAggregatesFilter<"WebhookEvent"> | string | null
    receivedAt?: DateTimeWithAggregatesFilter<"WebhookEvent"> | Date | string
    processedAt?: DateTimeNullableWithAggregatesFilter<"WebhookEvent"> | Date | string | null
    retryCount?: IntWithAggregatesFilter<"WebhookEvent"> | number
    maxRetries?: IntWithAggregatesFilter<"WebhookEvent"> | number
    lastRetryAt?: DateTimeNullableWithAggregatesFilter<"WebhookEvent"> | Date | string | null
    deadLetterAt?: DateTimeNullableWithAggregatesFilter<"WebhookEvent"> | Date | string | null
  }

  export type AdminAccessLogWhereInput = {
    AND?: AdminAccessLogWhereInput | AdminAccessLogWhereInput[]
    OR?: AdminAccessLogWhereInput[]
    NOT?: AdminAccessLogWhereInput | AdminAccessLogWhereInput[]
    id?: StringFilter<"AdminAccessLog"> | string
    adminUserId?: StringFilter<"AdminAccessLog"> | string
    action?: StringFilter<"AdminAccessLog"> | string
    resource?: StringFilter<"AdminAccessLog"> | string
    resourceId?: StringNullableFilter<"AdminAccessLog"> | string | null
    status?: StringFilter<"AdminAccessLog"> | string
    requestId?: StringNullableFilter<"AdminAccessLog"> | string | null
    ipAddress?: StringNullableFilter<"AdminAccessLog"> | string | null
    userAgent?: StringNullableFilter<"AdminAccessLog"> | string | null
    metadata?: JsonNullableFilter<"AdminAccessLog">
    timestamp?: DateTimeFilter<"AdminAccessLog"> | Date | string
  }

  export type AdminAccessLogOrderByWithRelationInput = {
    id?: SortOrder
    adminUserId?: SortOrder
    action?: SortOrder
    resource?: SortOrder
    resourceId?: SortOrderInput | SortOrder
    status?: SortOrder
    requestId?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    timestamp?: SortOrder
  }

  export type AdminAccessLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AdminAccessLogWhereInput | AdminAccessLogWhereInput[]
    OR?: AdminAccessLogWhereInput[]
    NOT?: AdminAccessLogWhereInput | AdminAccessLogWhereInput[]
    adminUserId?: StringFilter<"AdminAccessLog"> | string
    action?: StringFilter<"AdminAccessLog"> | string
    resource?: StringFilter<"AdminAccessLog"> | string
    resourceId?: StringNullableFilter<"AdminAccessLog"> | string | null
    status?: StringFilter<"AdminAccessLog"> | string
    requestId?: StringNullableFilter<"AdminAccessLog"> | string | null
    ipAddress?: StringNullableFilter<"AdminAccessLog"> | string | null
    userAgent?: StringNullableFilter<"AdminAccessLog"> | string | null
    metadata?: JsonNullableFilter<"AdminAccessLog">
    timestamp?: DateTimeFilter<"AdminAccessLog"> | Date | string
  }, "id">

  export type AdminAccessLogOrderByWithAggregationInput = {
    id?: SortOrder
    adminUserId?: SortOrder
    action?: SortOrder
    resource?: SortOrder
    resourceId?: SortOrderInput | SortOrder
    status?: SortOrder
    requestId?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    _count?: AdminAccessLogCountOrderByAggregateInput
    _max?: AdminAccessLogMaxOrderByAggregateInput
    _min?: AdminAccessLogMinOrderByAggregateInput
  }

  export type AdminAccessLogScalarWhereWithAggregatesInput = {
    AND?: AdminAccessLogScalarWhereWithAggregatesInput | AdminAccessLogScalarWhereWithAggregatesInput[]
    OR?: AdminAccessLogScalarWhereWithAggregatesInput[]
    NOT?: AdminAccessLogScalarWhereWithAggregatesInput | AdminAccessLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AdminAccessLog"> | string
    adminUserId?: StringWithAggregatesFilter<"AdminAccessLog"> | string
    action?: StringWithAggregatesFilter<"AdminAccessLog"> | string
    resource?: StringWithAggregatesFilter<"AdminAccessLog"> | string
    resourceId?: StringNullableWithAggregatesFilter<"AdminAccessLog"> | string | null
    status?: StringWithAggregatesFilter<"AdminAccessLog"> | string
    requestId?: StringNullableWithAggregatesFilter<"AdminAccessLog"> | string | null
    ipAddress?: StringNullableWithAggregatesFilter<"AdminAccessLog"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"AdminAccessLog"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"AdminAccessLog">
    timestamp?: DateTimeWithAggregatesFilter<"AdminAccessLog"> | Date | string
  }

  export type MissingWebhookAlertWhereInput = {
    AND?: MissingWebhookAlertWhereInput | MissingWebhookAlertWhereInput[]
    OR?: MissingWebhookAlertWhereInput[]
    NOT?: MissingWebhookAlertWhereInput | MissingWebhookAlertWhereInput[]
    id?: StringFilter<"MissingWebhookAlert"> | string
    onRampId?: StringFilter<"MissingWebhookAlert"> | string
    provider?: StringFilter<"MissingWebhookAlert"> | string
    status?: StringFilter<"MissingWebhookAlert"> | string
    detectedAt?: DateTimeFilter<"MissingWebhookAlert"> | Date | string
    resolvedAt?: DateTimeNullableFilter<"MissingWebhookAlert"> | Date | string | null
    resolution?: StringNullableFilter<"MissingWebhookAlert"> | string | null
    notes?: StringNullableFilter<"MissingWebhookAlert"> | string | null
    onRamp?: XOR<OnRampScalarRelationFilter, OnRampWhereInput>
  }

  export type MissingWebhookAlertOrderByWithRelationInput = {
    id?: SortOrder
    onRampId?: SortOrder
    provider?: SortOrder
    status?: SortOrder
    detectedAt?: SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    resolution?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    onRamp?: OnRampOrderByWithRelationInput
  }

  export type MissingWebhookAlertWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    onRampId?: string
    AND?: MissingWebhookAlertWhereInput | MissingWebhookAlertWhereInput[]
    OR?: MissingWebhookAlertWhereInput[]
    NOT?: MissingWebhookAlertWhereInput | MissingWebhookAlertWhereInput[]
    provider?: StringFilter<"MissingWebhookAlert"> | string
    status?: StringFilter<"MissingWebhookAlert"> | string
    detectedAt?: DateTimeFilter<"MissingWebhookAlert"> | Date | string
    resolvedAt?: DateTimeNullableFilter<"MissingWebhookAlert"> | Date | string | null
    resolution?: StringNullableFilter<"MissingWebhookAlert"> | string | null
    notes?: StringNullableFilter<"MissingWebhookAlert"> | string | null
    onRamp?: XOR<OnRampScalarRelationFilter, OnRampWhereInput>
  }, "id" | "onRampId">

  export type MissingWebhookAlertOrderByWithAggregationInput = {
    id?: SortOrder
    onRampId?: SortOrder
    provider?: SortOrder
    status?: SortOrder
    detectedAt?: SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    resolution?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    _count?: MissingWebhookAlertCountOrderByAggregateInput
    _max?: MissingWebhookAlertMaxOrderByAggregateInput
    _min?: MissingWebhookAlertMinOrderByAggregateInput
  }

  export type MissingWebhookAlertScalarWhereWithAggregatesInput = {
    AND?: MissingWebhookAlertScalarWhereWithAggregatesInput | MissingWebhookAlertScalarWhereWithAggregatesInput[]
    OR?: MissingWebhookAlertScalarWhereWithAggregatesInput[]
    NOT?: MissingWebhookAlertScalarWhereWithAggregatesInput | MissingWebhookAlertScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MissingWebhookAlert"> | string
    onRampId?: StringWithAggregatesFilter<"MissingWebhookAlert"> | string
    provider?: StringWithAggregatesFilter<"MissingWebhookAlert"> | string
    status?: StringWithAggregatesFilter<"MissingWebhookAlert"> | string
    detectedAt?: DateTimeWithAggregatesFilter<"MissingWebhookAlert"> | Date | string
    resolvedAt?: DateTimeNullableWithAggregatesFilter<"MissingWebhookAlert"> | Date | string | null
    resolution?: StringNullableWithAggregatesFilter<"MissingWebhookAlert"> | string | null
    notes?: StringNullableWithAggregatesFilter<"MissingWebhookAlert"> | string | null
  }

  export type DeadLetterQueueWhereInput = {
    AND?: DeadLetterQueueWhereInput | DeadLetterQueueWhereInput[]
    OR?: DeadLetterQueueWhereInput[]
    NOT?: DeadLetterQueueWhereInput | DeadLetterQueueWhereInput[]
    id?: StringFilter<"DeadLetterQueue"> | string
    eventId?: StringFilter<"DeadLetterQueue"> | string
    eventType?: StringFilter<"DeadLetterQueue"> | string
    provider?: StringFilter<"DeadLetterQueue"> | string
    reason?: StringFilter<"DeadLetterQueue"> | string
    lastError?: StringNullableFilter<"DeadLetterQueue"> | string | null
    retryCount?: IntFilter<"DeadLetterQueue"> | number
    maxRetries?: IntFilter<"DeadLetterQueue"> | number
    payload?: JsonNullableFilter<"DeadLetterQueue">
    status?: StringFilter<"DeadLetterQueue"> | string
    resolvedAt?: DateTimeNullableFilter<"DeadLetterQueue"> | Date | string | null
    resolution?: StringNullableFilter<"DeadLetterQueue"> | string | null
    notes?: StringNullableFilter<"DeadLetterQueue"> | string | null
    createdAt?: DateTimeFilter<"DeadLetterQueue"> | Date | string
  }

  export type DeadLetterQueueOrderByWithRelationInput = {
    id?: SortOrder
    eventId?: SortOrder
    eventType?: SortOrder
    provider?: SortOrder
    reason?: SortOrder
    lastError?: SortOrderInput | SortOrder
    retryCount?: SortOrder
    maxRetries?: SortOrder
    payload?: SortOrderInput | SortOrder
    status?: SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    resolution?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type DeadLetterQueueWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DeadLetterQueueWhereInput | DeadLetterQueueWhereInput[]
    OR?: DeadLetterQueueWhereInput[]
    NOT?: DeadLetterQueueWhereInput | DeadLetterQueueWhereInput[]
    eventId?: StringFilter<"DeadLetterQueue"> | string
    eventType?: StringFilter<"DeadLetterQueue"> | string
    provider?: StringFilter<"DeadLetterQueue"> | string
    reason?: StringFilter<"DeadLetterQueue"> | string
    lastError?: StringNullableFilter<"DeadLetterQueue"> | string | null
    retryCount?: IntFilter<"DeadLetterQueue"> | number
    maxRetries?: IntFilter<"DeadLetterQueue"> | number
    payload?: JsonNullableFilter<"DeadLetterQueue">
    status?: StringFilter<"DeadLetterQueue"> | string
    resolvedAt?: DateTimeNullableFilter<"DeadLetterQueue"> | Date | string | null
    resolution?: StringNullableFilter<"DeadLetterQueue"> | string | null
    notes?: StringNullableFilter<"DeadLetterQueue"> | string | null
    createdAt?: DateTimeFilter<"DeadLetterQueue"> | Date | string
  }, "id">

  export type DeadLetterQueueOrderByWithAggregationInput = {
    id?: SortOrder
    eventId?: SortOrder
    eventType?: SortOrder
    provider?: SortOrder
    reason?: SortOrder
    lastError?: SortOrderInput | SortOrder
    retryCount?: SortOrder
    maxRetries?: SortOrder
    payload?: SortOrderInput | SortOrder
    status?: SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    resolution?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: DeadLetterQueueCountOrderByAggregateInput
    _avg?: DeadLetterQueueAvgOrderByAggregateInput
    _max?: DeadLetterQueueMaxOrderByAggregateInput
    _min?: DeadLetterQueueMinOrderByAggregateInput
    _sum?: DeadLetterQueueSumOrderByAggregateInput
  }

  export type DeadLetterQueueScalarWhereWithAggregatesInput = {
    AND?: DeadLetterQueueScalarWhereWithAggregatesInput | DeadLetterQueueScalarWhereWithAggregatesInput[]
    OR?: DeadLetterQueueScalarWhereWithAggregatesInput[]
    NOT?: DeadLetterQueueScalarWhereWithAggregatesInput | DeadLetterQueueScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DeadLetterQueue"> | string
    eventId?: StringWithAggregatesFilter<"DeadLetterQueue"> | string
    eventType?: StringWithAggregatesFilter<"DeadLetterQueue"> | string
    provider?: StringWithAggregatesFilter<"DeadLetterQueue"> | string
    reason?: StringWithAggregatesFilter<"DeadLetterQueue"> | string
    lastError?: StringNullableWithAggregatesFilter<"DeadLetterQueue"> | string | null
    retryCount?: IntWithAggregatesFilter<"DeadLetterQueue"> | number
    maxRetries?: IntWithAggregatesFilter<"DeadLetterQueue"> | number
    payload?: JsonNullableWithAggregatesFilter<"DeadLetterQueue">
    status?: StringWithAggregatesFilter<"DeadLetterQueue"> | string
    resolvedAt?: DateTimeNullableWithAggregatesFilter<"DeadLetterQueue"> | Date | string | null
    resolution?: StringNullableWithAggregatesFilter<"DeadLetterQueue"> | string | null
    notes?: StringNullableWithAggregatesFilter<"DeadLetterQueue"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"DeadLetterQueue"> | Date | string
  }

  export type AlertLogWhereInput = {
    AND?: AlertLogWhereInput | AlertLogWhereInput[]
    OR?: AlertLogWhereInput[]
    NOT?: AlertLogWhereInput | AlertLogWhereInput[]
    id?: StringFilter<"AlertLog"> | string
    alertType?: StringFilter<"AlertLog"> | string
    severity?: StringFilter<"AlertLog"> | string
    title?: StringFilter<"AlertLog"> | string
    message?: StringFilter<"AlertLog"> | string
    metadata?: JsonNullableFilter<"AlertLog">
    resolved?: BoolFilter<"AlertLog"> | boolean
    resolvedAt?: DateTimeNullableFilter<"AlertLog"> | Date | string | null
    resolvedBy?: StringNullableFilter<"AlertLog"> | string | null
    acknowledgedAt?: DateTimeNullableFilter<"AlertLog"> | Date | string | null
    createdAt?: DateTimeFilter<"AlertLog"> | Date | string
  }

  export type AlertLogOrderByWithRelationInput = {
    id?: SortOrder
    alertType?: SortOrder
    severity?: SortOrder
    title?: SortOrder
    message?: SortOrder
    metadata?: SortOrderInput | SortOrder
    resolved?: SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    resolvedBy?: SortOrderInput | SortOrder
    acknowledgedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type AlertLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AlertLogWhereInput | AlertLogWhereInput[]
    OR?: AlertLogWhereInput[]
    NOT?: AlertLogWhereInput | AlertLogWhereInput[]
    alertType?: StringFilter<"AlertLog"> | string
    severity?: StringFilter<"AlertLog"> | string
    title?: StringFilter<"AlertLog"> | string
    message?: StringFilter<"AlertLog"> | string
    metadata?: JsonNullableFilter<"AlertLog">
    resolved?: BoolFilter<"AlertLog"> | boolean
    resolvedAt?: DateTimeNullableFilter<"AlertLog"> | Date | string | null
    resolvedBy?: StringNullableFilter<"AlertLog"> | string | null
    acknowledgedAt?: DateTimeNullableFilter<"AlertLog"> | Date | string | null
    createdAt?: DateTimeFilter<"AlertLog"> | Date | string
  }, "id">

  export type AlertLogOrderByWithAggregationInput = {
    id?: SortOrder
    alertType?: SortOrder
    severity?: SortOrder
    title?: SortOrder
    message?: SortOrder
    metadata?: SortOrderInput | SortOrder
    resolved?: SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    resolvedBy?: SortOrderInput | SortOrder
    acknowledgedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AlertLogCountOrderByAggregateInput
    _max?: AlertLogMaxOrderByAggregateInput
    _min?: AlertLogMinOrderByAggregateInput
  }

  export type AlertLogScalarWhereWithAggregatesInput = {
    AND?: AlertLogScalarWhereWithAggregatesInput | AlertLogScalarWhereWithAggregatesInput[]
    OR?: AlertLogScalarWhereWithAggregatesInput[]
    NOT?: AlertLogScalarWhereWithAggregatesInput | AlertLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AlertLog"> | string
    alertType?: StringWithAggregatesFilter<"AlertLog"> | string
    severity?: StringWithAggregatesFilter<"AlertLog"> | string
    title?: StringWithAggregatesFilter<"AlertLog"> | string
    message?: StringWithAggregatesFilter<"AlertLog"> | string
    metadata?: JsonNullableWithAggregatesFilter<"AlertLog">
    resolved?: BoolWithAggregatesFilter<"AlertLog"> | boolean
    resolvedAt?: DateTimeNullableWithAggregatesFilter<"AlertLog"> | Date | string | null
    resolvedBy?: StringNullableWithAggregatesFilter<"AlertLog"> | string | null
    acknowledgedAt?: DateTimeNullableWithAggregatesFilter<"AlertLog"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AlertLog"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    role?: string
    createdAt?: Date | string
    wallet?: WalletCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    role?: string
    createdAt?: Date | string
    wallet?: WalletUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wallet?: WalletUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wallet?: WalletUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    role?: string
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletCreateInput = {
    id?: string
    balance?: number
    currency?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    flaggedForReview?: boolean
    flaggedReason?: string | null
    flaggedAt?: Date | string | null
    flaggedDelta?: number | null
    user: UserCreateNestedOneWithoutWalletInput
    transactions?: TransactionCreateNestedManyWithoutWalletInput
    onRamps?: OnRampCreateNestedManyWithoutWalletInput
    ledger?: WalletLedgerEntryCreateNestedManyWithoutWalletInput
  }

  export type WalletUncheckedCreateInput = {
    id?: string
    userId: string
    balance?: number
    currency?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    flaggedForReview?: boolean
    flaggedReason?: string | null
    flaggedAt?: Date | string | null
    flaggedDelta?: number | null
    transactions?: TransactionUncheckedCreateNestedManyWithoutWalletInput
    onRamps?: OnRampUncheckedCreateNestedManyWithoutWalletInput
    ledger?: WalletLedgerEntryUncheckedCreateNestedManyWithoutWalletInput
  }

  export type WalletUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    flaggedForReview?: BoolFieldUpdateOperationsInput | boolean
    flaggedReason?: NullableStringFieldUpdateOperationsInput | string | null
    flaggedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    flaggedDelta?: NullableFloatFieldUpdateOperationsInput | number | null
    user?: UserUpdateOneRequiredWithoutWalletNestedInput
    transactions?: TransactionUpdateManyWithoutWalletNestedInput
    onRamps?: OnRampUpdateManyWithoutWalletNestedInput
    ledger?: WalletLedgerEntryUpdateManyWithoutWalletNestedInput
  }

  export type WalletUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    balance?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    flaggedForReview?: BoolFieldUpdateOperationsInput | boolean
    flaggedReason?: NullableStringFieldUpdateOperationsInput | string | null
    flaggedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    flaggedDelta?: NullableFloatFieldUpdateOperationsInput | number | null
    transactions?: TransactionUncheckedUpdateManyWithoutWalletNestedInput
    onRamps?: OnRampUncheckedUpdateManyWithoutWalletNestedInput
    ledger?: WalletLedgerEntryUncheckedUpdateManyWithoutWalletNestedInput
  }

  export type WalletCreateManyInput = {
    id?: string
    userId: string
    balance?: number
    currency?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    flaggedForReview?: boolean
    flaggedReason?: string | null
    flaggedAt?: Date | string | null
    flaggedDelta?: number | null
  }

  export type WalletUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    flaggedForReview?: BoolFieldUpdateOperationsInput | boolean
    flaggedReason?: NullableStringFieldUpdateOperationsInput | string | null
    flaggedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    flaggedDelta?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type WalletUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    balance?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    flaggedForReview?: BoolFieldUpdateOperationsInput | boolean
    flaggedReason?: NullableStringFieldUpdateOperationsInput | string | null
    flaggedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    flaggedDelta?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type TransactionCreateInput = {
    id?: string
    type: string
    amount: number
    idempotencyKey?: string | null
    createdAt?: Date | string
    wallet: WalletCreateNestedOneWithoutTransactionsInput
    webhookEvents?: WebhookEventCreateNestedManyWithoutTransactionInput
  }

  export type TransactionUncheckedCreateInput = {
    id?: string
    walletId: string
    type: string
    amount: number
    idempotencyKey?: string | null
    createdAt?: Date | string
    webhookEvents?: WebhookEventUncheckedCreateNestedManyWithoutTransactionInput
  }

  export type TransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wallet?: WalletUpdateOneRequiredWithoutTransactionsNestedInput
    webhookEvents?: WebhookEventUpdateManyWithoutTransactionNestedInput
  }

  export type TransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    webhookEvents?: WebhookEventUncheckedUpdateManyWithoutTransactionNestedInput
  }

  export type TransactionCreateManyInput = {
    id?: string
    walletId: string
    type: string
    amount: number
    idempotencyKey?: string | null
    createdAt?: Date | string
  }

  export type TransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletLedgerEntryCreateInput = {
    id?: string
    type: string
    amount: number
    balanceBefore: number
    balanceAfter: number
    reference?: string | null
    description?: string | null
    source?: string | null
    providerEventId?: string | null
    idempotencyKey?: string | null
    createdAt?: Date | string
    wallet: WalletCreateNestedOneWithoutLedgerInput
  }

  export type WalletLedgerEntryUncheckedCreateInput = {
    id?: string
    walletId: string
    type: string
    amount: number
    balanceBefore: number
    balanceAfter: number
    reference?: string | null
    description?: string | null
    source?: string | null
    providerEventId?: string | null
    idempotencyKey?: string | null
    createdAt?: Date | string
  }

  export type WalletLedgerEntryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    balanceBefore?: FloatFieldUpdateOperationsInput | number
    balanceAfter?: FloatFieldUpdateOperationsInput | number
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    providerEventId?: NullableStringFieldUpdateOperationsInput | string | null
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wallet?: WalletUpdateOneRequiredWithoutLedgerNestedInput
  }

  export type WalletLedgerEntryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    balanceBefore?: FloatFieldUpdateOperationsInput | number
    balanceAfter?: FloatFieldUpdateOperationsInput | number
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    providerEventId?: NullableStringFieldUpdateOperationsInput | string | null
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletLedgerEntryCreateManyInput = {
    id?: string
    walletId: string
    type: string
    amount: number
    balanceBefore: number
    balanceAfter: number
    reference?: string | null
    description?: string | null
    source?: string | null
    providerEventId?: string | null
    idempotencyKey?: string | null
    createdAt?: Date | string
  }

  export type WalletLedgerEntryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    balanceBefore?: FloatFieldUpdateOperationsInput | number
    balanceAfter?: FloatFieldUpdateOperationsInput | number
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    providerEventId?: NullableStringFieldUpdateOperationsInput | string | null
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletLedgerEntryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    balanceBefore?: FloatFieldUpdateOperationsInput | number
    balanceAfter?: FloatFieldUpdateOperationsInput | number
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    providerEventId?: NullableStringFieldUpdateOperationsInput | string | null
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OnRampCreateInput = {
    id?: string
    provider: string
    providerTxId?: string | null
    amount: number
    cryptoAmount?: number | null
    currency?: string
    status?: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    completedAt?: Date | string | null
    wallet: WalletCreateNestedOneWithoutOnRampsInput
    missingWebhook?: MissingWebhookAlertCreateNestedOneWithoutOnRampInput
  }

  export type OnRampUncheckedCreateInput = {
    id?: string
    walletId: string
    provider: string
    providerTxId?: string | null
    amount: number
    cryptoAmount?: number | null
    currency?: string
    status?: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    completedAt?: Date | string | null
    missingWebhook?: MissingWebhookAlertUncheckedCreateNestedOneWithoutOnRampInput
  }

  export type OnRampUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerTxId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    cryptoAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wallet?: WalletUpdateOneRequiredWithoutOnRampsNestedInput
    missingWebhook?: MissingWebhookAlertUpdateOneWithoutOnRampNestedInput
  }

  export type OnRampUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerTxId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    cryptoAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    missingWebhook?: MissingWebhookAlertUncheckedUpdateOneWithoutOnRampNestedInput
  }

  export type OnRampCreateManyInput = {
    id?: string
    walletId: string
    provider: string
    providerTxId?: string | null
    amount: number
    cryptoAmount?: number | null
    currency?: string
    status?: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    completedAt?: Date | string | null
  }

  export type OnRampUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerTxId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    cryptoAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OnRampUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerTxId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    cryptoAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type WebhookEventCreateInput = {
    id?: string
    provider: string
    externalId: string
    payloadHash: string
    status?: string
    errorMessage?: string | null
    receivedAt?: Date | string
    processedAt?: Date | string | null
    retryCount?: number
    maxRetries?: number
    lastRetryAt?: Date | string | null
    deadLetterAt?: Date | string | null
    transaction?: TransactionCreateNestedOneWithoutWebhookEventsInput
  }

  export type WebhookEventUncheckedCreateInput = {
    id?: string
    provider: string
    externalId: string
    payloadHash: string
    status?: string
    transactionId?: string | null
    errorMessage?: string | null
    receivedAt?: Date | string
    processedAt?: Date | string | null
    retryCount?: number
    maxRetries?: number
    lastRetryAt?: Date | string | null
    deadLetterAt?: Date | string | null
  }

  export type WebhookEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    payloadHash?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    maxRetries?: IntFieldUpdateOperationsInput | number
    lastRetryAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deadLetterAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    transaction?: TransactionUpdateOneWithoutWebhookEventsNestedInput
  }

  export type WebhookEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    payloadHash?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    maxRetries?: IntFieldUpdateOperationsInput | number
    lastRetryAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deadLetterAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type WebhookEventCreateManyInput = {
    id?: string
    provider: string
    externalId: string
    payloadHash: string
    status?: string
    transactionId?: string | null
    errorMessage?: string | null
    receivedAt?: Date | string
    processedAt?: Date | string | null
    retryCount?: number
    maxRetries?: number
    lastRetryAt?: Date | string | null
    deadLetterAt?: Date | string | null
  }

  export type WebhookEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    payloadHash?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    maxRetries?: IntFieldUpdateOperationsInput | number
    lastRetryAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deadLetterAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type WebhookEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    payloadHash?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    maxRetries?: IntFieldUpdateOperationsInput | number
    lastRetryAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deadLetterAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AdminAccessLogCreateInput = {
    id?: string
    adminUserId: string
    action: string
    resource: string
    resourceId?: string | null
    status: string
    requestId?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: Date | string
  }

  export type AdminAccessLogUncheckedCreateInput = {
    id?: string
    adminUserId: string
    action: string
    resource: string
    resourceId?: string | null
    status: string
    requestId?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: Date | string
  }

  export type AdminAccessLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    adminUserId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resource?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    requestId?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminAccessLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    adminUserId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resource?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    requestId?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminAccessLogCreateManyInput = {
    id?: string
    adminUserId: string
    action: string
    resource: string
    resourceId?: string | null
    status: string
    requestId?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: Date | string
  }

  export type AdminAccessLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    adminUserId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resource?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    requestId?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminAccessLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    adminUserId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resource?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    requestId?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MissingWebhookAlertCreateInput = {
    id?: string
    provider: string
    status?: string
    detectedAt?: Date | string
    resolvedAt?: Date | string | null
    resolution?: string | null
    notes?: string | null
    onRamp: OnRampCreateNestedOneWithoutMissingWebhookInput
  }

  export type MissingWebhookAlertUncheckedCreateInput = {
    id?: string
    onRampId: string
    provider: string
    status?: string
    detectedAt?: Date | string
    resolvedAt?: Date | string | null
    resolution?: string | null
    notes?: string | null
  }

  export type MissingWebhookAlertUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    detectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    onRamp?: OnRampUpdateOneRequiredWithoutMissingWebhookNestedInput
  }

  export type MissingWebhookAlertUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    onRampId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    detectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MissingWebhookAlertCreateManyInput = {
    id?: string
    onRampId: string
    provider: string
    status?: string
    detectedAt?: Date | string
    resolvedAt?: Date | string | null
    resolution?: string | null
    notes?: string | null
  }

  export type MissingWebhookAlertUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    detectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MissingWebhookAlertUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    onRampId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    detectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DeadLetterQueueCreateInput = {
    id?: string
    eventId: string
    eventType: string
    provider: string
    reason: string
    lastError?: string | null
    retryCount: number
    maxRetries: number
    payload?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    resolvedAt?: Date | string | null
    resolution?: string | null
    notes?: string | null
    createdAt?: Date | string
  }

  export type DeadLetterQueueUncheckedCreateInput = {
    id?: string
    eventId: string
    eventType: string
    provider: string
    reason: string
    lastError?: string | null
    retryCount: number
    maxRetries: number
    payload?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    resolvedAt?: Date | string | null
    resolution?: string | null
    notes?: string | null
    createdAt?: Date | string
  }

  export type DeadLetterQueueUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    maxRetries?: IntFieldUpdateOperationsInput | number
    payload?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeadLetterQueueUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    maxRetries?: IntFieldUpdateOperationsInput | number
    payload?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeadLetterQueueCreateManyInput = {
    id?: string
    eventId: string
    eventType: string
    provider: string
    reason: string
    lastError?: string | null
    retryCount: number
    maxRetries: number
    payload?: NullableJsonNullValueInput | InputJsonValue
    status?: string
    resolvedAt?: Date | string | null
    resolution?: string | null
    notes?: string | null
    createdAt?: Date | string
  }

  export type DeadLetterQueueUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    maxRetries?: IntFieldUpdateOperationsInput | number
    payload?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeadLetterQueueUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    maxRetries?: IntFieldUpdateOperationsInput | number
    payload?: NullableJsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlertLogCreateInput = {
    id?: string
    alertType: string
    severity: string
    title: string
    message: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    resolved?: boolean
    resolvedAt?: Date | string | null
    resolvedBy?: string | null
    acknowledgedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type AlertLogUncheckedCreateInput = {
    id?: string
    alertType: string
    severity: string
    title: string
    message: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    resolved?: boolean
    resolvedAt?: Date | string | null
    resolvedBy?: string | null
    acknowledgedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type AlertLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    alertType?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    resolved?: BoolFieldUpdateOperationsInput | boolean
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    acknowledgedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlertLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    alertType?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    resolved?: BoolFieldUpdateOperationsInput | boolean
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    acknowledgedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlertLogCreateManyInput = {
    id?: string
    alertType: string
    severity: string
    title: string
    message: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    resolved?: boolean
    resolvedAt?: Date | string | null
    resolvedBy?: string | null
    acknowledgedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type AlertLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    alertType?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    resolved?: BoolFieldUpdateOperationsInput | boolean
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    acknowledgedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlertLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    alertType?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    resolved?: BoolFieldUpdateOperationsInput | boolean
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    acknowledgedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type WalletNullableScalarRelationFilter = {
    is?: WalletWhereInput | null
    isNot?: WalletWhereInput | null
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type TransactionListRelationFilter = {
    every?: TransactionWhereInput
    some?: TransactionWhereInput
    none?: TransactionWhereInput
  }

  export type OnRampListRelationFilter = {
    every?: OnRampWhereInput
    some?: OnRampWhereInput
    none?: OnRampWhereInput
  }

  export type WalletLedgerEntryListRelationFilter = {
    every?: WalletLedgerEntryWhereInput
    some?: WalletLedgerEntryWhereInput
    none?: WalletLedgerEntryWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OnRampOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WalletLedgerEntryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WalletCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    balance?: SortOrder
    currency?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    flaggedForReview?: SortOrder
    flaggedReason?: SortOrder
    flaggedAt?: SortOrder
    flaggedDelta?: SortOrder
  }

  export type WalletAvgOrderByAggregateInput = {
    balance?: SortOrder
    flaggedDelta?: SortOrder
  }

  export type WalletMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    balance?: SortOrder
    currency?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    flaggedForReview?: SortOrder
    flaggedReason?: SortOrder
    flaggedAt?: SortOrder
    flaggedDelta?: SortOrder
  }

  export type WalletMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    balance?: SortOrder
    currency?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    flaggedForReview?: SortOrder
    flaggedReason?: SortOrder
    flaggedAt?: SortOrder
    flaggedDelta?: SortOrder
  }

  export type WalletSumOrderByAggregateInput = {
    balance?: SortOrder
    flaggedDelta?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type WalletScalarRelationFilter = {
    is?: WalletWhereInput
    isNot?: WalletWhereInput
  }

  export type WebhookEventListRelationFilter = {
    every?: WebhookEventWhereInput
    some?: WebhookEventWhereInput
    none?: WebhookEventWhereInput
  }

  export type WebhookEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TransactionCountOrderByAggregateInput = {
    id?: SortOrder
    walletId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    idempotencyKey?: SortOrder
    createdAt?: SortOrder
  }

  export type TransactionAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type TransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    walletId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    idempotencyKey?: SortOrder
    createdAt?: SortOrder
  }

  export type TransactionMinOrderByAggregateInput = {
    id?: SortOrder
    walletId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    idempotencyKey?: SortOrder
    createdAt?: SortOrder
  }

  export type TransactionSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type WalletLedgerEntryCountOrderByAggregateInput = {
    id?: SortOrder
    walletId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    balanceBefore?: SortOrder
    balanceAfter?: SortOrder
    reference?: SortOrder
    description?: SortOrder
    source?: SortOrder
    providerEventId?: SortOrder
    idempotencyKey?: SortOrder
    createdAt?: SortOrder
  }

  export type WalletLedgerEntryAvgOrderByAggregateInput = {
    amount?: SortOrder
    balanceBefore?: SortOrder
    balanceAfter?: SortOrder
  }

  export type WalletLedgerEntryMaxOrderByAggregateInput = {
    id?: SortOrder
    walletId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    balanceBefore?: SortOrder
    balanceAfter?: SortOrder
    reference?: SortOrder
    description?: SortOrder
    source?: SortOrder
    providerEventId?: SortOrder
    idempotencyKey?: SortOrder
    createdAt?: SortOrder
  }

  export type WalletLedgerEntryMinOrderByAggregateInput = {
    id?: SortOrder
    walletId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    balanceBefore?: SortOrder
    balanceAfter?: SortOrder
    reference?: SortOrder
    description?: SortOrder
    source?: SortOrder
    providerEventId?: SortOrder
    idempotencyKey?: SortOrder
    createdAt?: SortOrder
  }

  export type WalletLedgerEntrySumOrderByAggregateInput = {
    amount?: SortOrder
    balanceBefore?: SortOrder
    balanceAfter?: SortOrder
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type MissingWebhookAlertNullableScalarRelationFilter = {
    is?: MissingWebhookAlertWhereInput | null
    isNot?: MissingWebhookAlertWhereInput | null
  }

  export type OnRampCountOrderByAggregateInput = {
    id?: SortOrder
    walletId?: SortOrder
    provider?: SortOrder
    providerTxId?: SortOrder
    amount?: SortOrder
    cryptoAmount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrder
  }

  export type OnRampAvgOrderByAggregateInput = {
    amount?: SortOrder
    cryptoAmount?: SortOrder
  }

  export type OnRampMaxOrderByAggregateInput = {
    id?: SortOrder
    walletId?: SortOrder
    provider?: SortOrder
    providerTxId?: SortOrder
    amount?: SortOrder
    cryptoAmount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrder
  }

  export type OnRampMinOrderByAggregateInput = {
    id?: SortOrder
    walletId?: SortOrder
    provider?: SortOrder
    providerTxId?: SortOrder
    amount?: SortOrder
    cryptoAmount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrder
  }

  export type OnRampSumOrderByAggregateInput = {
    amount?: SortOrder
    cryptoAmount?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type TransactionNullableScalarRelationFilter = {
    is?: TransactionWhereInput | null
    isNot?: TransactionWhereInput | null
  }

  export type WebhookEventCountOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    externalId?: SortOrder
    payloadHash?: SortOrder
    status?: SortOrder
    transactionId?: SortOrder
    errorMessage?: SortOrder
    receivedAt?: SortOrder
    processedAt?: SortOrder
    retryCount?: SortOrder
    maxRetries?: SortOrder
    lastRetryAt?: SortOrder
    deadLetterAt?: SortOrder
  }

  export type WebhookEventAvgOrderByAggregateInput = {
    retryCount?: SortOrder
    maxRetries?: SortOrder
  }

  export type WebhookEventMaxOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    externalId?: SortOrder
    payloadHash?: SortOrder
    status?: SortOrder
    transactionId?: SortOrder
    errorMessage?: SortOrder
    receivedAt?: SortOrder
    processedAt?: SortOrder
    retryCount?: SortOrder
    maxRetries?: SortOrder
    lastRetryAt?: SortOrder
    deadLetterAt?: SortOrder
  }

  export type WebhookEventMinOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    externalId?: SortOrder
    payloadHash?: SortOrder
    status?: SortOrder
    transactionId?: SortOrder
    errorMessage?: SortOrder
    receivedAt?: SortOrder
    processedAt?: SortOrder
    retryCount?: SortOrder
    maxRetries?: SortOrder
    lastRetryAt?: SortOrder
    deadLetterAt?: SortOrder
  }

  export type WebhookEventSumOrderByAggregateInput = {
    retryCount?: SortOrder
    maxRetries?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type AdminAccessLogCountOrderByAggregateInput = {
    id?: SortOrder
    adminUserId?: SortOrder
    action?: SortOrder
    resource?: SortOrder
    resourceId?: SortOrder
    status?: SortOrder
    requestId?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    metadata?: SortOrder
    timestamp?: SortOrder
  }

  export type AdminAccessLogMaxOrderByAggregateInput = {
    id?: SortOrder
    adminUserId?: SortOrder
    action?: SortOrder
    resource?: SortOrder
    resourceId?: SortOrder
    status?: SortOrder
    requestId?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    timestamp?: SortOrder
  }

  export type AdminAccessLogMinOrderByAggregateInput = {
    id?: SortOrder
    adminUserId?: SortOrder
    action?: SortOrder
    resource?: SortOrder
    resourceId?: SortOrder
    status?: SortOrder
    requestId?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    timestamp?: SortOrder
  }

  export type OnRampScalarRelationFilter = {
    is?: OnRampWhereInput
    isNot?: OnRampWhereInput
  }

  export type MissingWebhookAlertCountOrderByAggregateInput = {
    id?: SortOrder
    onRampId?: SortOrder
    provider?: SortOrder
    status?: SortOrder
    detectedAt?: SortOrder
    resolvedAt?: SortOrder
    resolution?: SortOrder
    notes?: SortOrder
  }

  export type MissingWebhookAlertMaxOrderByAggregateInput = {
    id?: SortOrder
    onRampId?: SortOrder
    provider?: SortOrder
    status?: SortOrder
    detectedAt?: SortOrder
    resolvedAt?: SortOrder
    resolution?: SortOrder
    notes?: SortOrder
  }

  export type MissingWebhookAlertMinOrderByAggregateInput = {
    id?: SortOrder
    onRampId?: SortOrder
    provider?: SortOrder
    status?: SortOrder
    detectedAt?: SortOrder
    resolvedAt?: SortOrder
    resolution?: SortOrder
    notes?: SortOrder
  }

  export type DeadLetterQueueCountOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    eventType?: SortOrder
    provider?: SortOrder
    reason?: SortOrder
    lastError?: SortOrder
    retryCount?: SortOrder
    maxRetries?: SortOrder
    payload?: SortOrder
    status?: SortOrder
    resolvedAt?: SortOrder
    resolution?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
  }

  export type DeadLetterQueueAvgOrderByAggregateInput = {
    retryCount?: SortOrder
    maxRetries?: SortOrder
  }

  export type DeadLetterQueueMaxOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    eventType?: SortOrder
    provider?: SortOrder
    reason?: SortOrder
    lastError?: SortOrder
    retryCount?: SortOrder
    maxRetries?: SortOrder
    status?: SortOrder
    resolvedAt?: SortOrder
    resolution?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
  }

  export type DeadLetterQueueMinOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    eventType?: SortOrder
    provider?: SortOrder
    reason?: SortOrder
    lastError?: SortOrder
    retryCount?: SortOrder
    maxRetries?: SortOrder
    status?: SortOrder
    resolvedAt?: SortOrder
    resolution?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
  }

  export type DeadLetterQueueSumOrderByAggregateInput = {
    retryCount?: SortOrder
    maxRetries?: SortOrder
  }

  export type AlertLogCountOrderByAggregateInput = {
    id?: SortOrder
    alertType?: SortOrder
    severity?: SortOrder
    title?: SortOrder
    message?: SortOrder
    metadata?: SortOrder
    resolved?: SortOrder
    resolvedAt?: SortOrder
    resolvedBy?: SortOrder
    acknowledgedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type AlertLogMaxOrderByAggregateInput = {
    id?: SortOrder
    alertType?: SortOrder
    severity?: SortOrder
    title?: SortOrder
    message?: SortOrder
    resolved?: SortOrder
    resolvedAt?: SortOrder
    resolvedBy?: SortOrder
    acknowledgedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type AlertLogMinOrderByAggregateInput = {
    id?: SortOrder
    alertType?: SortOrder
    severity?: SortOrder
    title?: SortOrder
    message?: SortOrder
    resolved?: SortOrder
    resolvedAt?: SortOrder
    resolvedBy?: SortOrder
    acknowledgedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type WalletCreateNestedOneWithoutUserInput = {
    create?: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput>
    connectOrCreate?: WalletCreateOrConnectWithoutUserInput
    connect?: WalletWhereUniqueInput
  }

  export type WalletUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput>
    connectOrCreate?: WalletCreateOrConnectWithoutUserInput
    connect?: WalletWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type WalletUpdateOneWithoutUserNestedInput = {
    create?: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput>
    connectOrCreate?: WalletCreateOrConnectWithoutUserInput
    upsert?: WalletUpsertWithoutUserInput
    disconnect?: WalletWhereInput | boolean
    delete?: WalletWhereInput | boolean
    connect?: WalletWhereUniqueInput
    update?: XOR<XOR<WalletUpdateToOneWithWhereWithoutUserInput, WalletUpdateWithoutUserInput>, WalletUncheckedUpdateWithoutUserInput>
  }

  export type WalletUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput>
    connectOrCreate?: WalletCreateOrConnectWithoutUserInput
    upsert?: WalletUpsertWithoutUserInput
    disconnect?: WalletWhereInput | boolean
    delete?: WalletWhereInput | boolean
    connect?: WalletWhereUniqueInput
    update?: XOR<XOR<WalletUpdateToOneWithWhereWithoutUserInput, WalletUpdateWithoutUserInput>, WalletUncheckedUpdateWithoutUserInput>
  }

  export type UserCreateNestedOneWithoutWalletInput = {
    create?: XOR<UserCreateWithoutWalletInput, UserUncheckedCreateWithoutWalletInput>
    connectOrCreate?: UserCreateOrConnectWithoutWalletInput
    connect?: UserWhereUniqueInput
  }

  export type TransactionCreateNestedManyWithoutWalletInput = {
    create?: XOR<TransactionCreateWithoutWalletInput, TransactionUncheckedCreateWithoutWalletInput> | TransactionCreateWithoutWalletInput[] | TransactionUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutWalletInput | TransactionCreateOrConnectWithoutWalletInput[]
    createMany?: TransactionCreateManyWalletInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type OnRampCreateNestedManyWithoutWalletInput = {
    create?: XOR<OnRampCreateWithoutWalletInput, OnRampUncheckedCreateWithoutWalletInput> | OnRampCreateWithoutWalletInput[] | OnRampUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: OnRampCreateOrConnectWithoutWalletInput | OnRampCreateOrConnectWithoutWalletInput[]
    createMany?: OnRampCreateManyWalletInputEnvelope
    connect?: OnRampWhereUniqueInput | OnRampWhereUniqueInput[]
  }

  export type WalletLedgerEntryCreateNestedManyWithoutWalletInput = {
    create?: XOR<WalletLedgerEntryCreateWithoutWalletInput, WalletLedgerEntryUncheckedCreateWithoutWalletInput> | WalletLedgerEntryCreateWithoutWalletInput[] | WalletLedgerEntryUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: WalletLedgerEntryCreateOrConnectWithoutWalletInput | WalletLedgerEntryCreateOrConnectWithoutWalletInput[]
    createMany?: WalletLedgerEntryCreateManyWalletInputEnvelope
    connect?: WalletLedgerEntryWhereUniqueInput | WalletLedgerEntryWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutWalletInput = {
    create?: XOR<TransactionCreateWithoutWalletInput, TransactionUncheckedCreateWithoutWalletInput> | TransactionCreateWithoutWalletInput[] | TransactionUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutWalletInput | TransactionCreateOrConnectWithoutWalletInput[]
    createMany?: TransactionCreateManyWalletInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type OnRampUncheckedCreateNestedManyWithoutWalletInput = {
    create?: XOR<OnRampCreateWithoutWalletInput, OnRampUncheckedCreateWithoutWalletInput> | OnRampCreateWithoutWalletInput[] | OnRampUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: OnRampCreateOrConnectWithoutWalletInput | OnRampCreateOrConnectWithoutWalletInput[]
    createMany?: OnRampCreateManyWalletInputEnvelope
    connect?: OnRampWhereUniqueInput | OnRampWhereUniqueInput[]
  }

  export type WalletLedgerEntryUncheckedCreateNestedManyWithoutWalletInput = {
    create?: XOR<WalletLedgerEntryCreateWithoutWalletInput, WalletLedgerEntryUncheckedCreateWithoutWalletInput> | WalletLedgerEntryCreateWithoutWalletInput[] | WalletLedgerEntryUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: WalletLedgerEntryCreateOrConnectWithoutWalletInput | WalletLedgerEntryCreateOrConnectWithoutWalletInput[]
    createMany?: WalletLedgerEntryCreateManyWalletInputEnvelope
    connect?: WalletLedgerEntryWhereUniqueInput | WalletLedgerEntryWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutWalletNestedInput = {
    create?: XOR<UserCreateWithoutWalletInput, UserUncheckedCreateWithoutWalletInput>
    connectOrCreate?: UserCreateOrConnectWithoutWalletInput
    upsert?: UserUpsertWithoutWalletInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWalletInput, UserUpdateWithoutWalletInput>, UserUncheckedUpdateWithoutWalletInput>
  }

  export type TransactionUpdateManyWithoutWalletNestedInput = {
    create?: XOR<TransactionCreateWithoutWalletInput, TransactionUncheckedCreateWithoutWalletInput> | TransactionCreateWithoutWalletInput[] | TransactionUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutWalletInput | TransactionCreateOrConnectWithoutWalletInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutWalletInput | TransactionUpsertWithWhereUniqueWithoutWalletInput[]
    createMany?: TransactionCreateManyWalletInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutWalletInput | TransactionUpdateWithWhereUniqueWithoutWalletInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutWalletInput | TransactionUpdateManyWithWhereWithoutWalletInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type OnRampUpdateManyWithoutWalletNestedInput = {
    create?: XOR<OnRampCreateWithoutWalletInput, OnRampUncheckedCreateWithoutWalletInput> | OnRampCreateWithoutWalletInput[] | OnRampUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: OnRampCreateOrConnectWithoutWalletInput | OnRampCreateOrConnectWithoutWalletInput[]
    upsert?: OnRampUpsertWithWhereUniqueWithoutWalletInput | OnRampUpsertWithWhereUniqueWithoutWalletInput[]
    createMany?: OnRampCreateManyWalletInputEnvelope
    set?: OnRampWhereUniqueInput | OnRampWhereUniqueInput[]
    disconnect?: OnRampWhereUniqueInput | OnRampWhereUniqueInput[]
    delete?: OnRampWhereUniqueInput | OnRampWhereUniqueInput[]
    connect?: OnRampWhereUniqueInput | OnRampWhereUniqueInput[]
    update?: OnRampUpdateWithWhereUniqueWithoutWalletInput | OnRampUpdateWithWhereUniqueWithoutWalletInput[]
    updateMany?: OnRampUpdateManyWithWhereWithoutWalletInput | OnRampUpdateManyWithWhereWithoutWalletInput[]
    deleteMany?: OnRampScalarWhereInput | OnRampScalarWhereInput[]
  }

  export type WalletLedgerEntryUpdateManyWithoutWalletNestedInput = {
    create?: XOR<WalletLedgerEntryCreateWithoutWalletInput, WalletLedgerEntryUncheckedCreateWithoutWalletInput> | WalletLedgerEntryCreateWithoutWalletInput[] | WalletLedgerEntryUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: WalletLedgerEntryCreateOrConnectWithoutWalletInput | WalletLedgerEntryCreateOrConnectWithoutWalletInput[]
    upsert?: WalletLedgerEntryUpsertWithWhereUniqueWithoutWalletInput | WalletLedgerEntryUpsertWithWhereUniqueWithoutWalletInput[]
    createMany?: WalletLedgerEntryCreateManyWalletInputEnvelope
    set?: WalletLedgerEntryWhereUniqueInput | WalletLedgerEntryWhereUniqueInput[]
    disconnect?: WalletLedgerEntryWhereUniqueInput | WalletLedgerEntryWhereUniqueInput[]
    delete?: WalletLedgerEntryWhereUniqueInput | WalletLedgerEntryWhereUniqueInput[]
    connect?: WalletLedgerEntryWhereUniqueInput | WalletLedgerEntryWhereUniqueInput[]
    update?: WalletLedgerEntryUpdateWithWhereUniqueWithoutWalletInput | WalletLedgerEntryUpdateWithWhereUniqueWithoutWalletInput[]
    updateMany?: WalletLedgerEntryUpdateManyWithWhereWithoutWalletInput | WalletLedgerEntryUpdateManyWithWhereWithoutWalletInput[]
    deleteMany?: WalletLedgerEntryScalarWhereInput | WalletLedgerEntryScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutWalletNestedInput = {
    create?: XOR<TransactionCreateWithoutWalletInput, TransactionUncheckedCreateWithoutWalletInput> | TransactionCreateWithoutWalletInput[] | TransactionUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutWalletInput | TransactionCreateOrConnectWithoutWalletInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutWalletInput | TransactionUpsertWithWhereUniqueWithoutWalletInput[]
    createMany?: TransactionCreateManyWalletInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutWalletInput | TransactionUpdateWithWhereUniqueWithoutWalletInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutWalletInput | TransactionUpdateManyWithWhereWithoutWalletInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type OnRampUncheckedUpdateManyWithoutWalletNestedInput = {
    create?: XOR<OnRampCreateWithoutWalletInput, OnRampUncheckedCreateWithoutWalletInput> | OnRampCreateWithoutWalletInput[] | OnRampUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: OnRampCreateOrConnectWithoutWalletInput | OnRampCreateOrConnectWithoutWalletInput[]
    upsert?: OnRampUpsertWithWhereUniqueWithoutWalletInput | OnRampUpsertWithWhereUniqueWithoutWalletInput[]
    createMany?: OnRampCreateManyWalletInputEnvelope
    set?: OnRampWhereUniqueInput | OnRampWhereUniqueInput[]
    disconnect?: OnRampWhereUniqueInput | OnRampWhereUniqueInput[]
    delete?: OnRampWhereUniqueInput | OnRampWhereUniqueInput[]
    connect?: OnRampWhereUniqueInput | OnRampWhereUniqueInput[]
    update?: OnRampUpdateWithWhereUniqueWithoutWalletInput | OnRampUpdateWithWhereUniqueWithoutWalletInput[]
    updateMany?: OnRampUpdateManyWithWhereWithoutWalletInput | OnRampUpdateManyWithWhereWithoutWalletInput[]
    deleteMany?: OnRampScalarWhereInput | OnRampScalarWhereInput[]
  }

  export type WalletLedgerEntryUncheckedUpdateManyWithoutWalletNestedInput = {
    create?: XOR<WalletLedgerEntryCreateWithoutWalletInput, WalletLedgerEntryUncheckedCreateWithoutWalletInput> | WalletLedgerEntryCreateWithoutWalletInput[] | WalletLedgerEntryUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: WalletLedgerEntryCreateOrConnectWithoutWalletInput | WalletLedgerEntryCreateOrConnectWithoutWalletInput[]
    upsert?: WalletLedgerEntryUpsertWithWhereUniqueWithoutWalletInput | WalletLedgerEntryUpsertWithWhereUniqueWithoutWalletInput[]
    createMany?: WalletLedgerEntryCreateManyWalletInputEnvelope
    set?: WalletLedgerEntryWhereUniqueInput | WalletLedgerEntryWhereUniqueInput[]
    disconnect?: WalletLedgerEntryWhereUniqueInput | WalletLedgerEntryWhereUniqueInput[]
    delete?: WalletLedgerEntryWhereUniqueInput | WalletLedgerEntryWhereUniqueInput[]
    connect?: WalletLedgerEntryWhereUniqueInput | WalletLedgerEntryWhereUniqueInput[]
    update?: WalletLedgerEntryUpdateWithWhereUniqueWithoutWalletInput | WalletLedgerEntryUpdateWithWhereUniqueWithoutWalletInput[]
    updateMany?: WalletLedgerEntryUpdateManyWithWhereWithoutWalletInput | WalletLedgerEntryUpdateManyWithWhereWithoutWalletInput[]
    deleteMany?: WalletLedgerEntryScalarWhereInput | WalletLedgerEntryScalarWhereInput[]
  }

  export type WalletCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<WalletCreateWithoutTransactionsInput, WalletUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: WalletCreateOrConnectWithoutTransactionsInput
    connect?: WalletWhereUniqueInput
  }

  export type WebhookEventCreateNestedManyWithoutTransactionInput = {
    create?: XOR<WebhookEventCreateWithoutTransactionInput, WebhookEventUncheckedCreateWithoutTransactionInput> | WebhookEventCreateWithoutTransactionInput[] | WebhookEventUncheckedCreateWithoutTransactionInput[]
    connectOrCreate?: WebhookEventCreateOrConnectWithoutTransactionInput | WebhookEventCreateOrConnectWithoutTransactionInput[]
    createMany?: WebhookEventCreateManyTransactionInputEnvelope
    connect?: WebhookEventWhereUniqueInput | WebhookEventWhereUniqueInput[]
  }

  export type WebhookEventUncheckedCreateNestedManyWithoutTransactionInput = {
    create?: XOR<WebhookEventCreateWithoutTransactionInput, WebhookEventUncheckedCreateWithoutTransactionInput> | WebhookEventCreateWithoutTransactionInput[] | WebhookEventUncheckedCreateWithoutTransactionInput[]
    connectOrCreate?: WebhookEventCreateOrConnectWithoutTransactionInput | WebhookEventCreateOrConnectWithoutTransactionInput[]
    createMany?: WebhookEventCreateManyTransactionInputEnvelope
    connect?: WebhookEventWhereUniqueInput | WebhookEventWhereUniqueInput[]
  }

  export type WalletUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<WalletCreateWithoutTransactionsInput, WalletUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: WalletCreateOrConnectWithoutTransactionsInput
    upsert?: WalletUpsertWithoutTransactionsInput
    connect?: WalletWhereUniqueInput
    update?: XOR<XOR<WalletUpdateToOneWithWhereWithoutTransactionsInput, WalletUpdateWithoutTransactionsInput>, WalletUncheckedUpdateWithoutTransactionsInput>
  }

  export type WebhookEventUpdateManyWithoutTransactionNestedInput = {
    create?: XOR<WebhookEventCreateWithoutTransactionInput, WebhookEventUncheckedCreateWithoutTransactionInput> | WebhookEventCreateWithoutTransactionInput[] | WebhookEventUncheckedCreateWithoutTransactionInput[]
    connectOrCreate?: WebhookEventCreateOrConnectWithoutTransactionInput | WebhookEventCreateOrConnectWithoutTransactionInput[]
    upsert?: WebhookEventUpsertWithWhereUniqueWithoutTransactionInput | WebhookEventUpsertWithWhereUniqueWithoutTransactionInput[]
    createMany?: WebhookEventCreateManyTransactionInputEnvelope
    set?: WebhookEventWhereUniqueInput | WebhookEventWhereUniqueInput[]
    disconnect?: WebhookEventWhereUniqueInput | WebhookEventWhereUniqueInput[]
    delete?: WebhookEventWhereUniqueInput | WebhookEventWhereUniqueInput[]
    connect?: WebhookEventWhereUniqueInput | WebhookEventWhereUniqueInput[]
    update?: WebhookEventUpdateWithWhereUniqueWithoutTransactionInput | WebhookEventUpdateWithWhereUniqueWithoutTransactionInput[]
    updateMany?: WebhookEventUpdateManyWithWhereWithoutTransactionInput | WebhookEventUpdateManyWithWhereWithoutTransactionInput[]
    deleteMany?: WebhookEventScalarWhereInput | WebhookEventScalarWhereInput[]
  }

  export type WebhookEventUncheckedUpdateManyWithoutTransactionNestedInput = {
    create?: XOR<WebhookEventCreateWithoutTransactionInput, WebhookEventUncheckedCreateWithoutTransactionInput> | WebhookEventCreateWithoutTransactionInput[] | WebhookEventUncheckedCreateWithoutTransactionInput[]
    connectOrCreate?: WebhookEventCreateOrConnectWithoutTransactionInput | WebhookEventCreateOrConnectWithoutTransactionInput[]
    upsert?: WebhookEventUpsertWithWhereUniqueWithoutTransactionInput | WebhookEventUpsertWithWhereUniqueWithoutTransactionInput[]
    createMany?: WebhookEventCreateManyTransactionInputEnvelope
    set?: WebhookEventWhereUniqueInput | WebhookEventWhereUniqueInput[]
    disconnect?: WebhookEventWhereUniqueInput | WebhookEventWhereUniqueInput[]
    delete?: WebhookEventWhereUniqueInput | WebhookEventWhereUniqueInput[]
    connect?: WebhookEventWhereUniqueInput | WebhookEventWhereUniqueInput[]
    update?: WebhookEventUpdateWithWhereUniqueWithoutTransactionInput | WebhookEventUpdateWithWhereUniqueWithoutTransactionInput[]
    updateMany?: WebhookEventUpdateManyWithWhereWithoutTransactionInput | WebhookEventUpdateManyWithWhereWithoutTransactionInput[]
    deleteMany?: WebhookEventScalarWhereInput | WebhookEventScalarWhereInput[]
  }

  export type WalletCreateNestedOneWithoutLedgerInput = {
    create?: XOR<WalletCreateWithoutLedgerInput, WalletUncheckedCreateWithoutLedgerInput>
    connectOrCreate?: WalletCreateOrConnectWithoutLedgerInput
    connect?: WalletWhereUniqueInput
  }

  export type WalletUpdateOneRequiredWithoutLedgerNestedInput = {
    create?: XOR<WalletCreateWithoutLedgerInput, WalletUncheckedCreateWithoutLedgerInput>
    connectOrCreate?: WalletCreateOrConnectWithoutLedgerInput
    upsert?: WalletUpsertWithoutLedgerInput
    connect?: WalletWhereUniqueInput
    update?: XOR<XOR<WalletUpdateToOneWithWhereWithoutLedgerInput, WalletUpdateWithoutLedgerInput>, WalletUncheckedUpdateWithoutLedgerInput>
  }

  export type WalletCreateNestedOneWithoutOnRampsInput = {
    create?: XOR<WalletCreateWithoutOnRampsInput, WalletUncheckedCreateWithoutOnRampsInput>
    connectOrCreate?: WalletCreateOrConnectWithoutOnRampsInput
    connect?: WalletWhereUniqueInput
  }

  export type MissingWebhookAlertCreateNestedOneWithoutOnRampInput = {
    create?: XOR<MissingWebhookAlertCreateWithoutOnRampInput, MissingWebhookAlertUncheckedCreateWithoutOnRampInput>
    connectOrCreate?: MissingWebhookAlertCreateOrConnectWithoutOnRampInput
    connect?: MissingWebhookAlertWhereUniqueInput
  }

  export type MissingWebhookAlertUncheckedCreateNestedOneWithoutOnRampInput = {
    create?: XOR<MissingWebhookAlertCreateWithoutOnRampInput, MissingWebhookAlertUncheckedCreateWithoutOnRampInput>
    connectOrCreate?: MissingWebhookAlertCreateOrConnectWithoutOnRampInput
    connect?: MissingWebhookAlertWhereUniqueInput
  }

  export type WalletUpdateOneRequiredWithoutOnRampsNestedInput = {
    create?: XOR<WalletCreateWithoutOnRampsInput, WalletUncheckedCreateWithoutOnRampsInput>
    connectOrCreate?: WalletCreateOrConnectWithoutOnRampsInput
    upsert?: WalletUpsertWithoutOnRampsInput
    connect?: WalletWhereUniqueInput
    update?: XOR<XOR<WalletUpdateToOneWithWhereWithoutOnRampsInput, WalletUpdateWithoutOnRampsInput>, WalletUncheckedUpdateWithoutOnRampsInput>
  }

  export type MissingWebhookAlertUpdateOneWithoutOnRampNestedInput = {
    create?: XOR<MissingWebhookAlertCreateWithoutOnRampInput, MissingWebhookAlertUncheckedCreateWithoutOnRampInput>
    connectOrCreate?: MissingWebhookAlertCreateOrConnectWithoutOnRampInput
    upsert?: MissingWebhookAlertUpsertWithoutOnRampInput
    disconnect?: MissingWebhookAlertWhereInput | boolean
    delete?: MissingWebhookAlertWhereInput | boolean
    connect?: MissingWebhookAlertWhereUniqueInput
    update?: XOR<XOR<MissingWebhookAlertUpdateToOneWithWhereWithoutOnRampInput, MissingWebhookAlertUpdateWithoutOnRampInput>, MissingWebhookAlertUncheckedUpdateWithoutOnRampInput>
  }

  export type MissingWebhookAlertUncheckedUpdateOneWithoutOnRampNestedInput = {
    create?: XOR<MissingWebhookAlertCreateWithoutOnRampInput, MissingWebhookAlertUncheckedCreateWithoutOnRampInput>
    connectOrCreate?: MissingWebhookAlertCreateOrConnectWithoutOnRampInput
    upsert?: MissingWebhookAlertUpsertWithoutOnRampInput
    disconnect?: MissingWebhookAlertWhereInput | boolean
    delete?: MissingWebhookAlertWhereInput | boolean
    connect?: MissingWebhookAlertWhereUniqueInput
    update?: XOR<XOR<MissingWebhookAlertUpdateToOneWithWhereWithoutOnRampInput, MissingWebhookAlertUpdateWithoutOnRampInput>, MissingWebhookAlertUncheckedUpdateWithoutOnRampInput>
  }

  export type TransactionCreateNestedOneWithoutWebhookEventsInput = {
    create?: XOR<TransactionCreateWithoutWebhookEventsInput, TransactionUncheckedCreateWithoutWebhookEventsInput>
    connectOrCreate?: TransactionCreateOrConnectWithoutWebhookEventsInput
    connect?: TransactionWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TransactionUpdateOneWithoutWebhookEventsNestedInput = {
    create?: XOR<TransactionCreateWithoutWebhookEventsInput, TransactionUncheckedCreateWithoutWebhookEventsInput>
    connectOrCreate?: TransactionCreateOrConnectWithoutWebhookEventsInput
    upsert?: TransactionUpsertWithoutWebhookEventsInput
    disconnect?: TransactionWhereInput | boolean
    delete?: TransactionWhereInput | boolean
    connect?: TransactionWhereUniqueInput
    update?: XOR<XOR<TransactionUpdateToOneWithWhereWithoutWebhookEventsInput, TransactionUpdateWithoutWebhookEventsInput>, TransactionUncheckedUpdateWithoutWebhookEventsInput>
  }

  export type OnRampCreateNestedOneWithoutMissingWebhookInput = {
    create?: XOR<OnRampCreateWithoutMissingWebhookInput, OnRampUncheckedCreateWithoutMissingWebhookInput>
    connectOrCreate?: OnRampCreateOrConnectWithoutMissingWebhookInput
    connect?: OnRampWhereUniqueInput
  }

  export type OnRampUpdateOneRequiredWithoutMissingWebhookNestedInput = {
    create?: XOR<OnRampCreateWithoutMissingWebhookInput, OnRampUncheckedCreateWithoutMissingWebhookInput>
    connectOrCreate?: OnRampCreateOrConnectWithoutMissingWebhookInput
    upsert?: OnRampUpsertWithoutMissingWebhookInput
    connect?: OnRampWhereUniqueInput
    update?: XOR<XOR<OnRampUpdateToOneWithWhereWithoutMissingWebhookInput, OnRampUpdateWithoutMissingWebhookInput>, OnRampUncheckedUpdateWithoutMissingWebhookInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type WalletCreateWithoutUserInput = {
    id?: string
    balance?: number
    currency?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    flaggedForReview?: boolean
    flaggedReason?: string | null
    flaggedAt?: Date | string | null
    flaggedDelta?: number | null
    transactions?: TransactionCreateNestedManyWithoutWalletInput
    onRamps?: OnRampCreateNestedManyWithoutWalletInput
    ledger?: WalletLedgerEntryCreateNestedManyWithoutWalletInput
  }

  export type WalletUncheckedCreateWithoutUserInput = {
    id?: string
    balance?: number
    currency?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    flaggedForReview?: boolean
    flaggedReason?: string | null
    flaggedAt?: Date | string | null
    flaggedDelta?: number | null
    transactions?: TransactionUncheckedCreateNestedManyWithoutWalletInput
    onRamps?: OnRampUncheckedCreateNestedManyWithoutWalletInput
    ledger?: WalletLedgerEntryUncheckedCreateNestedManyWithoutWalletInput
  }

  export type WalletCreateOrConnectWithoutUserInput = {
    where: WalletWhereUniqueInput
    create: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput>
  }

  export type WalletUpsertWithoutUserInput = {
    update: XOR<WalletUpdateWithoutUserInput, WalletUncheckedUpdateWithoutUserInput>
    create: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput>
    where?: WalletWhereInput
  }

  export type WalletUpdateToOneWithWhereWithoutUserInput = {
    where?: WalletWhereInput
    data: XOR<WalletUpdateWithoutUserInput, WalletUncheckedUpdateWithoutUserInput>
  }

  export type WalletUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    flaggedForReview?: BoolFieldUpdateOperationsInput | boolean
    flaggedReason?: NullableStringFieldUpdateOperationsInput | string | null
    flaggedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    flaggedDelta?: NullableFloatFieldUpdateOperationsInput | number | null
    transactions?: TransactionUpdateManyWithoutWalletNestedInput
    onRamps?: OnRampUpdateManyWithoutWalletNestedInput
    ledger?: WalletLedgerEntryUpdateManyWithoutWalletNestedInput
  }

  export type WalletUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    flaggedForReview?: BoolFieldUpdateOperationsInput | boolean
    flaggedReason?: NullableStringFieldUpdateOperationsInput | string | null
    flaggedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    flaggedDelta?: NullableFloatFieldUpdateOperationsInput | number | null
    transactions?: TransactionUncheckedUpdateManyWithoutWalletNestedInput
    onRamps?: OnRampUncheckedUpdateManyWithoutWalletNestedInput
    ledger?: WalletLedgerEntryUncheckedUpdateManyWithoutWalletNestedInput
  }

  export type UserCreateWithoutWalletInput = {
    id?: string
    email: string
    password: string
    role?: string
    createdAt?: Date | string
  }

  export type UserUncheckedCreateWithoutWalletInput = {
    id?: string
    email: string
    password: string
    role?: string
    createdAt?: Date | string
  }

  export type UserCreateOrConnectWithoutWalletInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWalletInput, UserUncheckedCreateWithoutWalletInput>
  }

  export type TransactionCreateWithoutWalletInput = {
    id?: string
    type: string
    amount: number
    idempotencyKey?: string | null
    createdAt?: Date | string
    webhookEvents?: WebhookEventCreateNestedManyWithoutTransactionInput
  }

  export type TransactionUncheckedCreateWithoutWalletInput = {
    id?: string
    type: string
    amount: number
    idempotencyKey?: string | null
    createdAt?: Date | string
    webhookEvents?: WebhookEventUncheckedCreateNestedManyWithoutTransactionInput
  }

  export type TransactionCreateOrConnectWithoutWalletInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutWalletInput, TransactionUncheckedCreateWithoutWalletInput>
  }

  export type TransactionCreateManyWalletInputEnvelope = {
    data: TransactionCreateManyWalletInput | TransactionCreateManyWalletInput[]
    skipDuplicates?: boolean
  }

  export type OnRampCreateWithoutWalletInput = {
    id?: string
    provider: string
    providerTxId?: string | null
    amount: number
    cryptoAmount?: number | null
    currency?: string
    status?: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    completedAt?: Date | string | null
    missingWebhook?: MissingWebhookAlertCreateNestedOneWithoutOnRampInput
  }

  export type OnRampUncheckedCreateWithoutWalletInput = {
    id?: string
    provider: string
    providerTxId?: string | null
    amount: number
    cryptoAmount?: number | null
    currency?: string
    status?: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    completedAt?: Date | string | null
    missingWebhook?: MissingWebhookAlertUncheckedCreateNestedOneWithoutOnRampInput
  }

  export type OnRampCreateOrConnectWithoutWalletInput = {
    where: OnRampWhereUniqueInput
    create: XOR<OnRampCreateWithoutWalletInput, OnRampUncheckedCreateWithoutWalletInput>
  }

  export type OnRampCreateManyWalletInputEnvelope = {
    data: OnRampCreateManyWalletInput | OnRampCreateManyWalletInput[]
    skipDuplicates?: boolean
  }

  export type WalletLedgerEntryCreateWithoutWalletInput = {
    id?: string
    type: string
    amount: number
    balanceBefore: number
    balanceAfter: number
    reference?: string | null
    description?: string | null
    source?: string | null
    providerEventId?: string | null
    idempotencyKey?: string | null
    createdAt?: Date | string
  }

  export type WalletLedgerEntryUncheckedCreateWithoutWalletInput = {
    id?: string
    type: string
    amount: number
    balanceBefore: number
    balanceAfter: number
    reference?: string | null
    description?: string | null
    source?: string | null
    providerEventId?: string | null
    idempotencyKey?: string | null
    createdAt?: Date | string
  }

  export type WalletLedgerEntryCreateOrConnectWithoutWalletInput = {
    where: WalletLedgerEntryWhereUniqueInput
    create: XOR<WalletLedgerEntryCreateWithoutWalletInput, WalletLedgerEntryUncheckedCreateWithoutWalletInput>
  }

  export type WalletLedgerEntryCreateManyWalletInputEnvelope = {
    data: WalletLedgerEntryCreateManyWalletInput | WalletLedgerEntryCreateManyWalletInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutWalletInput = {
    update: XOR<UserUpdateWithoutWalletInput, UserUncheckedUpdateWithoutWalletInput>
    create: XOR<UserCreateWithoutWalletInput, UserUncheckedCreateWithoutWalletInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWalletInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWalletInput, UserUncheckedUpdateWithoutWalletInput>
  }

  export type UserUpdateWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUpsertWithWhereUniqueWithoutWalletInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutWalletInput, TransactionUncheckedUpdateWithoutWalletInput>
    create: XOR<TransactionCreateWithoutWalletInput, TransactionUncheckedCreateWithoutWalletInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutWalletInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutWalletInput, TransactionUncheckedUpdateWithoutWalletInput>
  }

  export type TransactionUpdateManyWithWhereWithoutWalletInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutWalletInput>
  }

  export type TransactionScalarWhereInput = {
    AND?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    OR?: TransactionScalarWhereInput[]
    NOT?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    id?: StringFilter<"Transaction"> | string
    walletId?: StringFilter<"Transaction"> | string
    type?: StringFilter<"Transaction"> | string
    amount?: FloatFilter<"Transaction"> | number
    idempotencyKey?: StringNullableFilter<"Transaction"> | string | null
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
  }

  export type OnRampUpsertWithWhereUniqueWithoutWalletInput = {
    where: OnRampWhereUniqueInput
    update: XOR<OnRampUpdateWithoutWalletInput, OnRampUncheckedUpdateWithoutWalletInput>
    create: XOR<OnRampCreateWithoutWalletInput, OnRampUncheckedCreateWithoutWalletInput>
  }

  export type OnRampUpdateWithWhereUniqueWithoutWalletInput = {
    where: OnRampWhereUniqueInput
    data: XOR<OnRampUpdateWithoutWalletInput, OnRampUncheckedUpdateWithoutWalletInput>
  }

  export type OnRampUpdateManyWithWhereWithoutWalletInput = {
    where: OnRampScalarWhereInput
    data: XOR<OnRampUpdateManyMutationInput, OnRampUncheckedUpdateManyWithoutWalletInput>
  }

  export type OnRampScalarWhereInput = {
    AND?: OnRampScalarWhereInput | OnRampScalarWhereInput[]
    OR?: OnRampScalarWhereInput[]
    NOT?: OnRampScalarWhereInput | OnRampScalarWhereInput[]
    id?: StringFilter<"OnRamp"> | string
    walletId?: StringFilter<"OnRamp"> | string
    provider?: StringFilter<"OnRamp"> | string
    providerTxId?: StringNullableFilter<"OnRamp"> | string | null
    amount?: FloatFilter<"OnRamp"> | number
    cryptoAmount?: FloatNullableFilter<"OnRamp"> | number | null
    currency?: StringFilter<"OnRamp"> | string
    status?: StringFilter<"OnRamp"> | string
    metadata?: JsonNullableFilter<"OnRamp">
    createdAt?: DateTimeFilter<"OnRamp"> | Date | string
    completedAt?: DateTimeNullableFilter<"OnRamp"> | Date | string | null
  }

  export type WalletLedgerEntryUpsertWithWhereUniqueWithoutWalletInput = {
    where: WalletLedgerEntryWhereUniqueInput
    update: XOR<WalletLedgerEntryUpdateWithoutWalletInput, WalletLedgerEntryUncheckedUpdateWithoutWalletInput>
    create: XOR<WalletLedgerEntryCreateWithoutWalletInput, WalletLedgerEntryUncheckedCreateWithoutWalletInput>
  }

  export type WalletLedgerEntryUpdateWithWhereUniqueWithoutWalletInput = {
    where: WalletLedgerEntryWhereUniqueInput
    data: XOR<WalletLedgerEntryUpdateWithoutWalletInput, WalletLedgerEntryUncheckedUpdateWithoutWalletInput>
  }

  export type WalletLedgerEntryUpdateManyWithWhereWithoutWalletInput = {
    where: WalletLedgerEntryScalarWhereInput
    data: XOR<WalletLedgerEntryUpdateManyMutationInput, WalletLedgerEntryUncheckedUpdateManyWithoutWalletInput>
  }

  export type WalletLedgerEntryScalarWhereInput = {
    AND?: WalletLedgerEntryScalarWhereInput | WalletLedgerEntryScalarWhereInput[]
    OR?: WalletLedgerEntryScalarWhereInput[]
    NOT?: WalletLedgerEntryScalarWhereInput | WalletLedgerEntryScalarWhereInput[]
    id?: StringFilter<"WalletLedgerEntry"> | string
    walletId?: StringFilter<"WalletLedgerEntry"> | string
    type?: StringFilter<"WalletLedgerEntry"> | string
    amount?: FloatFilter<"WalletLedgerEntry"> | number
    balanceBefore?: FloatFilter<"WalletLedgerEntry"> | number
    balanceAfter?: FloatFilter<"WalletLedgerEntry"> | number
    reference?: StringNullableFilter<"WalletLedgerEntry"> | string | null
    description?: StringNullableFilter<"WalletLedgerEntry"> | string | null
    source?: StringNullableFilter<"WalletLedgerEntry"> | string | null
    providerEventId?: StringNullableFilter<"WalletLedgerEntry"> | string | null
    idempotencyKey?: StringNullableFilter<"WalletLedgerEntry"> | string | null
    createdAt?: DateTimeFilter<"WalletLedgerEntry"> | Date | string
  }

  export type WalletCreateWithoutTransactionsInput = {
    id?: string
    balance?: number
    currency?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    flaggedForReview?: boolean
    flaggedReason?: string | null
    flaggedAt?: Date | string | null
    flaggedDelta?: number | null
    user: UserCreateNestedOneWithoutWalletInput
    onRamps?: OnRampCreateNestedManyWithoutWalletInput
    ledger?: WalletLedgerEntryCreateNestedManyWithoutWalletInput
  }

  export type WalletUncheckedCreateWithoutTransactionsInput = {
    id?: string
    userId: string
    balance?: number
    currency?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    flaggedForReview?: boolean
    flaggedReason?: string | null
    flaggedAt?: Date | string | null
    flaggedDelta?: number | null
    onRamps?: OnRampUncheckedCreateNestedManyWithoutWalletInput
    ledger?: WalletLedgerEntryUncheckedCreateNestedManyWithoutWalletInput
  }

  export type WalletCreateOrConnectWithoutTransactionsInput = {
    where: WalletWhereUniqueInput
    create: XOR<WalletCreateWithoutTransactionsInput, WalletUncheckedCreateWithoutTransactionsInput>
  }

  export type WebhookEventCreateWithoutTransactionInput = {
    id?: string
    provider: string
    externalId: string
    payloadHash: string
    status?: string
    errorMessage?: string | null
    receivedAt?: Date | string
    processedAt?: Date | string | null
    retryCount?: number
    maxRetries?: number
    lastRetryAt?: Date | string | null
    deadLetterAt?: Date | string | null
  }

  export type WebhookEventUncheckedCreateWithoutTransactionInput = {
    id?: string
    provider: string
    externalId: string
    payloadHash: string
    status?: string
    errorMessage?: string | null
    receivedAt?: Date | string
    processedAt?: Date | string | null
    retryCount?: number
    maxRetries?: number
    lastRetryAt?: Date | string | null
    deadLetterAt?: Date | string | null
  }

  export type WebhookEventCreateOrConnectWithoutTransactionInput = {
    where: WebhookEventWhereUniqueInput
    create: XOR<WebhookEventCreateWithoutTransactionInput, WebhookEventUncheckedCreateWithoutTransactionInput>
  }

  export type WebhookEventCreateManyTransactionInputEnvelope = {
    data: WebhookEventCreateManyTransactionInput | WebhookEventCreateManyTransactionInput[]
    skipDuplicates?: boolean
  }

  export type WalletUpsertWithoutTransactionsInput = {
    update: XOR<WalletUpdateWithoutTransactionsInput, WalletUncheckedUpdateWithoutTransactionsInput>
    create: XOR<WalletCreateWithoutTransactionsInput, WalletUncheckedCreateWithoutTransactionsInput>
    where?: WalletWhereInput
  }

  export type WalletUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: WalletWhereInput
    data: XOR<WalletUpdateWithoutTransactionsInput, WalletUncheckedUpdateWithoutTransactionsInput>
  }

  export type WalletUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    flaggedForReview?: BoolFieldUpdateOperationsInput | boolean
    flaggedReason?: NullableStringFieldUpdateOperationsInput | string | null
    flaggedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    flaggedDelta?: NullableFloatFieldUpdateOperationsInput | number | null
    user?: UserUpdateOneRequiredWithoutWalletNestedInput
    onRamps?: OnRampUpdateManyWithoutWalletNestedInput
    ledger?: WalletLedgerEntryUpdateManyWithoutWalletNestedInput
  }

  export type WalletUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    balance?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    flaggedForReview?: BoolFieldUpdateOperationsInput | boolean
    flaggedReason?: NullableStringFieldUpdateOperationsInput | string | null
    flaggedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    flaggedDelta?: NullableFloatFieldUpdateOperationsInput | number | null
    onRamps?: OnRampUncheckedUpdateManyWithoutWalletNestedInput
    ledger?: WalletLedgerEntryUncheckedUpdateManyWithoutWalletNestedInput
  }

  export type WebhookEventUpsertWithWhereUniqueWithoutTransactionInput = {
    where: WebhookEventWhereUniqueInput
    update: XOR<WebhookEventUpdateWithoutTransactionInput, WebhookEventUncheckedUpdateWithoutTransactionInput>
    create: XOR<WebhookEventCreateWithoutTransactionInput, WebhookEventUncheckedCreateWithoutTransactionInput>
  }

  export type WebhookEventUpdateWithWhereUniqueWithoutTransactionInput = {
    where: WebhookEventWhereUniqueInput
    data: XOR<WebhookEventUpdateWithoutTransactionInput, WebhookEventUncheckedUpdateWithoutTransactionInput>
  }

  export type WebhookEventUpdateManyWithWhereWithoutTransactionInput = {
    where: WebhookEventScalarWhereInput
    data: XOR<WebhookEventUpdateManyMutationInput, WebhookEventUncheckedUpdateManyWithoutTransactionInput>
  }

  export type WebhookEventScalarWhereInput = {
    AND?: WebhookEventScalarWhereInput | WebhookEventScalarWhereInput[]
    OR?: WebhookEventScalarWhereInput[]
    NOT?: WebhookEventScalarWhereInput | WebhookEventScalarWhereInput[]
    id?: StringFilter<"WebhookEvent"> | string
    provider?: StringFilter<"WebhookEvent"> | string
    externalId?: StringFilter<"WebhookEvent"> | string
    payloadHash?: StringFilter<"WebhookEvent"> | string
    status?: StringFilter<"WebhookEvent"> | string
    transactionId?: StringNullableFilter<"WebhookEvent"> | string | null
    errorMessage?: StringNullableFilter<"WebhookEvent"> | string | null
    receivedAt?: DateTimeFilter<"WebhookEvent"> | Date | string
    processedAt?: DateTimeNullableFilter<"WebhookEvent"> | Date | string | null
    retryCount?: IntFilter<"WebhookEvent"> | number
    maxRetries?: IntFilter<"WebhookEvent"> | number
    lastRetryAt?: DateTimeNullableFilter<"WebhookEvent"> | Date | string | null
    deadLetterAt?: DateTimeNullableFilter<"WebhookEvent"> | Date | string | null
  }

  export type WalletCreateWithoutLedgerInput = {
    id?: string
    balance?: number
    currency?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    flaggedForReview?: boolean
    flaggedReason?: string | null
    flaggedAt?: Date | string | null
    flaggedDelta?: number | null
    user: UserCreateNestedOneWithoutWalletInput
    transactions?: TransactionCreateNestedManyWithoutWalletInput
    onRamps?: OnRampCreateNestedManyWithoutWalletInput
  }

  export type WalletUncheckedCreateWithoutLedgerInput = {
    id?: string
    userId: string
    balance?: number
    currency?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    flaggedForReview?: boolean
    flaggedReason?: string | null
    flaggedAt?: Date | string | null
    flaggedDelta?: number | null
    transactions?: TransactionUncheckedCreateNestedManyWithoutWalletInput
    onRamps?: OnRampUncheckedCreateNestedManyWithoutWalletInput
  }

  export type WalletCreateOrConnectWithoutLedgerInput = {
    where: WalletWhereUniqueInput
    create: XOR<WalletCreateWithoutLedgerInput, WalletUncheckedCreateWithoutLedgerInput>
  }

  export type WalletUpsertWithoutLedgerInput = {
    update: XOR<WalletUpdateWithoutLedgerInput, WalletUncheckedUpdateWithoutLedgerInput>
    create: XOR<WalletCreateWithoutLedgerInput, WalletUncheckedCreateWithoutLedgerInput>
    where?: WalletWhereInput
  }

  export type WalletUpdateToOneWithWhereWithoutLedgerInput = {
    where?: WalletWhereInput
    data: XOR<WalletUpdateWithoutLedgerInput, WalletUncheckedUpdateWithoutLedgerInput>
  }

  export type WalletUpdateWithoutLedgerInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    flaggedForReview?: BoolFieldUpdateOperationsInput | boolean
    flaggedReason?: NullableStringFieldUpdateOperationsInput | string | null
    flaggedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    flaggedDelta?: NullableFloatFieldUpdateOperationsInput | number | null
    user?: UserUpdateOneRequiredWithoutWalletNestedInput
    transactions?: TransactionUpdateManyWithoutWalletNestedInput
    onRamps?: OnRampUpdateManyWithoutWalletNestedInput
  }

  export type WalletUncheckedUpdateWithoutLedgerInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    balance?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    flaggedForReview?: BoolFieldUpdateOperationsInput | boolean
    flaggedReason?: NullableStringFieldUpdateOperationsInput | string | null
    flaggedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    flaggedDelta?: NullableFloatFieldUpdateOperationsInput | number | null
    transactions?: TransactionUncheckedUpdateManyWithoutWalletNestedInput
    onRamps?: OnRampUncheckedUpdateManyWithoutWalletNestedInput
  }

  export type WalletCreateWithoutOnRampsInput = {
    id?: string
    balance?: number
    currency?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    flaggedForReview?: boolean
    flaggedReason?: string | null
    flaggedAt?: Date | string | null
    flaggedDelta?: number | null
    user: UserCreateNestedOneWithoutWalletInput
    transactions?: TransactionCreateNestedManyWithoutWalletInput
    ledger?: WalletLedgerEntryCreateNestedManyWithoutWalletInput
  }

  export type WalletUncheckedCreateWithoutOnRampsInput = {
    id?: string
    userId: string
    balance?: number
    currency?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    flaggedForReview?: boolean
    flaggedReason?: string | null
    flaggedAt?: Date | string | null
    flaggedDelta?: number | null
    transactions?: TransactionUncheckedCreateNestedManyWithoutWalletInput
    ledger?: WalletLedgerEntryUncheckedCreateNestedManyWithoutWalletInput
  }

  export type WalletCreateOrConnectWithoutOnRampsInput = {
    where: WalletWhereUniqueInput
    create: XOR<WalletCreateWithoutOnRampsInput, WalletUncheckedCreateWithoutOnRampsInput>
  }

  export type MissingWebhookAlertCreateWithoutOnRampInput = {
    id?: string
    provider: string
    status?: string
    detectedAt?: Date | string
    resolvedAt?: Date | string | null
    resolution?: string | null
    notes?: string | null
  }

  export type MissingWebhookAlertUncheckedCreateWithoutOnRampInput = {
    id?: string
    provider: string
    status?: string
    detectedAt?: Date | string
    resolvedAt?: Date | string | null
    resolution?: string | null
    notes?: string | null
  }

  export type MissingWebhookAlertCreateOrConnectWithoutOnRampInput = {
    where: MissingWebhookAlertWhereUniqueInput
    create: XOR<MissingWebhookAlertCreateWithoutOnRampInput, MissingWebhookAlertUncheckedCreateWithoutOnRampInput>
  }

  export type WalletUpsertWithoutOnRampsInput = {
    update: XOR<WalletUpdateWithoutOnRampsInput, WalletUncheckedUpdateWithoutOnRampsInput>
    create: XOR<WalletCreateWithoutOnRampsInput, WalletUncheckedCreateWithoutOnRampsInput>
    where?: WalletWhereInput
  }

  export type WalletUpdateToOneWithWhereWithoutOnRampsInput = {
    where?: WalletWhereInput
    data: XOR<WalletUpdateWithoutOnRampsInput, WalletUncheckedUpdateWithoutOnRampsInput>
  }

  export type WalletUpdateWithoutOnRampsInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    flaggedForReview?: BoolFieldUpdateOperationsInput | boolean
    flaggedReason?: NullableStringFieldUpdateOperationsInput | string | null
    flaggedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    flaggedDelta?: NullableFloatFieldUpdateOperationsInput | number | null
    user?: UserUpdateOneRequiredWithoutWalletNestedInput
    transactions?: TransactionUpdateManyWithoutWalletNestedInput
    ledger?: WalletLedgerEntryUpdateManyWithoutWalletNestedInput
  }

  export type WalletUncheckedUpdateWithoutOnRampsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    balance?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    flaggedForReview?: BoolFieldUpdateOperationsInput | boolean
    flaggedReason?: NullableStringFieldUpdateOperationsInput | string | null
    flaggedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    flaggedDelta?: NullableFloatFieldUpdateOperationsInput | number | null
    transactions?: TransactionUncheckedUpdateManyWithoutWalletNestedInput
    ledger?: WalletLedgerEntryUncheckedUpdateManyWithoutWalletNestedInput
  }

  export type MissingWebhookAlertUpsertWithoutOnRampInput = {
    update: XOR<MissingWebhookAlertUpdateWithoutOnRampInput, MissingWebhookAlertUncheckedUpdateWithoutOnRampInput>
    create: XOR<MissingWebhookAlertCreateWithoutOnRampInput, MissingWebhookAlertUncheckedCreateWithoutOnRampInput>
    where?: MissingWebhookAlertWhereInput
  }

  export type MissingWebhookAlertUpdateToOneWithWhereWithoutOnRampInput = {
    where?: MissingWebhookAlertWhereInput
    data: XOR<MissingWebhookAlertUpdateWithoutOnRampInput, MissingWebhookAlertUncheckedUpdateWithoutOnRampInput>
  }

  export type MissingWebhookAlertUpdateWithoutOnRampInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    detectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MissingWebhookAlertUncheckedUpdateWithoutOnRampInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    detectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TransactionCreateWithoutWebhookEventsInput = {
    id?: string
    type: string
    amount: number
    idempotencyKey?: string | null
    createdAt?: Date | string
    wallet: WalletCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateWithoutWebhookEventsInput = {
    id?: string
    walletId: string
    type: string
    amount: number
    idempotencyKey?: string | null
    createdAt?: Date | string
  }

  export type TransactionCreateOrConnectWithoutWebhookEventsInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutWebhookEventsInput, TransactionUncheckedCreateWithoutWebhookEventsInput>
  }

  export type TransactionUpsertWithoutWebhookEventsInput = {
    update: XOR<TransactionUpdateWithoutWebhookEventsInput, TransactionUncheckedUpdateWithoutWebhookEventsInput>
    create: XOR<TransactionCreateWithoutWebhookEventsInput, TransactionUncheckedCreateWithoutWebhookEventsInput>
    where?: TransactionWhereInput
  }

  export type TransactionUpdateToOneWithWhereWithoutWebhookEventsInput = {
    where?: TransactionWhereInput
    data: XOR<TransactionUpdateWithoutWebhookEventsInput, TransactionUncheckedUpdateWithoutWebhookEventsInput>
  }

  export type TransactionUpdateWithoutWebhookEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wallet?: WalletUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateWithoutWebhookEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OnRampCreateWithoutMissingWebhookInput = {
    id?: string
    provider: string
    providerTxId?: string | null
    amount: number
    cryptoAmount?: number | null
    currency?: string
    status?: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    completedAt?: Date | string | null
    wallet: WalletCreateNestedOneWithoutOnRampsInput
  }

  export type OnRampUncheckedCreateWithoutMissingWebhookInput = {
    id?: string
    walletId: string
    provider: string
    providerTxId?: string | null
    amount: number
    cryptoAmount?: number | null
    currency?: string
    status?: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    completedAt?: Date | string | null
  }

  export type OnRampCreateOrConnectWithoutMissingWebhookInput = {
    where: OnRampWhereUniqueInput
    create: XOR<OnRampCreateWithoutMissingWebhookInput, OnRampUncheckedCreateWithoutMissingWebhookInput>
  }

  export type OnRampUpsertWithoutMissingWebhookInput = {
    update: XOR<OnRampUpdateWithoutMissingWebhookInput, OnRampUncheckedUpdateWithoutMissingWebhookInput>
    create: XOR<OnRampCreateWithoutMissingWebhookInput, OnRampUncheckedCreateWithoutMissingWebhookInput>
    where?: OnRampWhereInput
  }

  export type OnRampUpdateToOneWithWhereWithoutMissingWebhookInput = {
    where?: OnRampWhereInput
    data: XOR<OnRampUpdateWithoutMissingWebhookInput, OnRampUncheckedUpdateWithoutMissingWebhookInput>
  }

  export type OnRampUpdateWithoutMissingWebhookInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerTxId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    cryptoAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wallet?: WalletUpdateOneRequiredWithoutOnRampsNestedInput
  }

  export type OnRampUncheckedUpdateWithoutMissingWebhookInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerTxId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    cryptoAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TransactionCreateManyWalletInput = {
    id?: string
    type: string
    amount: number
    idempotencyKey?: string | null
    createdAt?: Date | string
  }

  export type OnRampCreateManyWalletInput = {
    id?: string
    provider: string
    providerTxId?: string | null
    amount: number
    cryptoAmount?: number | null
    currency?: string
    status?: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    completedAt?: Date | string | null
  }

  export type WalletLedgerEntryCreateManyWalletInput = {
    id?: string
    type: string
    amount: number
    balanceBefore: number
    balanceAfter: number
    reference?: string | null
    description?: string | null
    source?: string | null
    providerEventId?: string | null
    idempotencyKey?: string | null
    createdAt?: Date | string
  }

  export type TransactionUpdateWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    webhookEvents?: WebhookEventUpdateManyWithoutTransactionNestedInput
  }

  export type TransactionUncheckedUpdateWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    webhookEvents?: WebhookEventUncheckedUpdateManyWithoutTransactionNestedInput
  }

  export type TransactionUncheckedUpdateManyWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OnRampUpdateWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerTxId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    cryptoAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    missingWebhook?: MissingWebhookAlertUpdateOneWithoutOnRampNestedInput
  }

  export type OnRampUncheckedUpdateWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerTxId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    cryptoAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    missingWebhook?: MissingWebhookAlertUncheckedUpdateOneWithoutOnRampNestedInput
  }

  export type OnRampUncheckedUpdateManyWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerTxId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    cryptoAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type WalletLedgerEntryUpdateWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    balanceBefore?: FloatFieldUpdateOperationsInput | number
    balanceAfter?: FloatFieldUpdateOperationsInput | number
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    providerEventId?: NullableStringFieldUpdateOperationsInput | string | null
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletLedgerEntryUncheckedUpdateWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    balanceBefore?: FloatFieldUpdateOperationsInput | number
    balanceAfter?: FloatFieldUpdateOperationsInput | number
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    providerEventId?: NullableStringFieldUpdateOperationsInput | string | null
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletLedgerEntryUncheckedUpdateManyWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    balanceBefore?: FloatFieldUpdateOperationsInput | number
    balanceAfter?: FloatFieldUpdateOperationsInput | number
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    providerEventId?: NullableStringFieldUpdateOperationsInput | string | null
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookEventCreateManyTransactionInput = {
    id?: string
    provider: string
    externalId: string
    payloadHash: string
    status?: string
    errorMessage?: string | null
    receivedAt?: Date | string
    processedAt?: Date | string | null
    retryCount?: number
    maxRetries?: number
    lastRetryAt?: Date | string | null
    deadLetterAt?: Date | string | null
  }

  export type WebhookEventUpdateWithoutTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    payloadHash?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    maxRetries?: IntFieldUpdateOperationsInput | number
    lastRetryAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deadLetterAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type WebhookEventUncheckedUpdateWithoutTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    payloadHash?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    maxRetries?: IntFieldUpdateOperationsInput | number
    lastRetryAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deadLetterAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type WebhookEventUncheckedUpdateManyWithoutTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    payloadHash?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    maxRetries?: IntFieldUpdateOperationsInput | number
    lastRetryAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deadLetterAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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