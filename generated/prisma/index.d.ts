
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model CatalogGame
 * 
 */
export type CatalogGame = $Result.DefaultSelection<Prisma.$CatalogGamePayload>
/**
 * Model CatalogOffer
 * 
 */
export type CatalogOffer = $Result.DefaultSelection<Prisma.$CatalogOfferPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more CatalogGames
 * const catalogGames = await prisma.catalogGame.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
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
   * // Fetch zero or more CatalogGames
   * const catalogGames = await prisma.catalogGame.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * `prisma.catalogGame`: Exposes CRUD operations for the **CatalogGame** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CatalogGames
    * const catalogGames = await prisma.catalogGame.findMany()
    * ```
    */
  get catalogGame(): Prisma.CatalogGameDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.catalogOffer`: Exposes CRUD operations for the **CatalogOffer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CatalogOffers
    * const catalogOffers = await prisma.catalogOffer.findMany()
    * ```
    */
  get catalogOffer(): Prisma.CatalogOfferDelegate<ExtArgs, ClientOptions>;
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
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

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
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
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
    CatalogGame: 'CatalogGame',
    CatalogOffer: 'CatalogOffer'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "catalogGame" | "catalogOffer"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      CatalogGame: {
        payload: Prisma.$CatalogGamePayload<ExtArgs>
        fields: Prisma.CatalogGameFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CatalogGameFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogGamePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CatalogGameFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogGamePayload>
          }
          findFirst: {
            args: Prisma.CatalogGameFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogGamePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CatalogGameFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogGamePayload>
          }
          findMany: {
            args: Prisma.CatalogGameFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogGamePayload>[]
          }
          create: {
            args: Prisma.CatalogGameCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogGamePayload>
          }
          createMany: {
            args: Prisma.CatalogGameCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CatalogGameCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogGamePayload>[]
          }
          delete: {
            args: Prisma.CatalogGameDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogGamePayload>
          }
          update: {
            args: Prisma.CatalogGameUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogGamePayload>
          }
          deleteMany: {
            args: Prisma.CatalogGameDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CatalogGameUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CatalogGameUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogGamePayload>[]
          }
          upsert: {
            args: Prisma.CatalogGameUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogGamePayload>
          }
          aggregate: {
            args: Prisma.CatalogGameAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCatalogGame>
          }
          groupBy: {
            args: Prisma.CatalogGameGroupByArgs<ExtArgs>
            result: $Utils.Optional<CatalogGameGroupByOutputType>[]
          }
          count: {
            args: Prisma.CatalogGameCountArgs<ExtArgs>
            result: $Utils.Optional<CatalogGameCountAggregateOutputType> | number
          }
        }
      }
      CatalogOffer: {
        payload: Prisma.$CatalogOfferPayload<ExtArgs>
        fields: Prisma.CatalogOfferFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CatalogOfferFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogOfferPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CatalogOfferFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogOfferPayload>
          }
          findFirst: {
            args: Prisma.CatalogOfferFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogOfferPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CatalogOfferFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogOfferPayload>
          }
          findMany: {
            args: Prisma.CatalogOfferFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogOfferPayload>[]
          }
          create: {
            args: Prisma.CatalogOfferCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogOfferPayload>
          }
          createMany: {
            args: Prisma.CatalogOfferCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CatalogOfferCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogOfferPayload>[]
          }
          delete: {
            args: Prisma.CatalogOfferDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogOfferPayload>
          }
          update: {
            args: Prisma.CatalogOfferUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogOfferPayload>
          }
          deleteMany: {
            args: Prisma.CatalogOfferDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CatalogOfferUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CatalogOfferUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogOfferPayload>[]
          }
          upsert: {
            args: Prisma.CatalogOfferUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CatalogOfferPayload>
          }
          aggregate: {
            args: Prisma.CatalogOfferAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCatalogOffer>
          }
          groupBy: {
            args: Prisma.CatalogOfferGroupByArgs<ExtArgs>
            result: $Utils.Optional<CatalogOfferGroupByOutputType>[]
          }
          count: {
            args: Prisma.CatalogOfferCountArgs<ExtArgs>
            result: $Utils.Optional<CatalogOfferCountAggregateOutputType> | number
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
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
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
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
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
    adapter?: runtime.SqlDriverAdapterFactory | null
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
  }
  export type GlobalOmitConfig = {
    catalogGame?: CatalogGameOmit
    catalogOffer?: CatalogOfferOmit
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
   * Count Type CatalogGameCountOutputType
   */

  export type CatalogGameCountOutputType = {
    offers: number
  }

  export type CatalogGameCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    offers?: boolean | CatalogGameCountOutputTypeCountOffersArgs
  }

  // Custom InputTypes
  /**
   * CatalogGameCountOutputType without action
   */
  export type CatalogGameCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogGameCountOutputType
     */
    select?: CatalogGameCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CatalogGameCountOutputType without action
   */
  export type CatalogGameCountOutputTypeCountOffersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CatalogOfferWhereInput
  }


  /**
   * Models
   */

  /**
   * Model CatalogGame
   */

  export type AggregateCatalogGame = {
    _count: CatalogGameCountAggregateOutputType | null
    _avg: CatalogGameAvgAggregateOutputType | null
    _sum: CatalogGameSumAggregateOutputType | null
    _min: CatalogGameMinAggregateOutputType | null
    _max: CatalogGameMaxAggregateOutputType | null
  }

  export type CatalogGameAvgAggregateOutputType = {
    id: number | null
    position: number | null
  }

  export type CatalogGameSumAggregateOutputType = {
    id: number | null
    position: number | null
  }

  export type CatalogGameMinAggregateOutputType = {
    id: number | null
    slug: string | null
    name: string | null
    currency: string | null
    position: number | null
  }

  export type CatalogGameMaxAggregateOutputType = {
    id: number | null
    slug: string | null
    name: string | null
    currency: string | null
    position: number | null
  }

  export type CatalogGameCountAggregateOutputType = {
    id: number
    slug: number
    name: number
    currency: number
    position: number
    _all: number
  }


  export type CatalogGameAvgAggregateInputType = {
    id?: true
    position?: true
  }

  export type CatalogGameSumAggregateInputType = {
    id?: true
    position?: true
  }

  export type CatalogGameMinAggregateInputType = {
    id?: true
    slug?: true
    name?: true
    currency?: true
    position?: true
  }

  export type CatalogGameMaxAggregateInputType = {
    id?: true
    slug?: true
    name?: true
    currency?: true
    position?: true
  }

  export type CatalogGameCountAggregateInputType = {
    id?: true
    slug?: true
    name?: true
    currency?: true
    position?: true
    _all?: true
  }

  export type CatalogGameAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CatalogGame to aggregate.
     */
    where?: CatalogGameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CatalogGames to fetch.
     */
    orderBy?: CatalogGameOrderByWithRelationInput | CatalogGameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CatalogGameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CatalogGames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CatalogGames.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CatalogGames
    **/
    _count?: true | CatalogGameCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CatalogGameAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CatalogGameSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CatalogGameMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CatalogGameMaxAggregateInputType
  }

  export type GetCatalogGameAggregateType<T extends CatalogGameAggregateArgs> = {
        [P in keyof T & keyof AggregateCatalogGame]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCatalogGame[P]>
      : GetScalarType<T[P], AggregateCatalogGame[P]>
  }




  export type CatalogGameGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CatalogGameWhereInput
    orderBy?: CatalogGameOrderByWithAggregationInput | CatalogGameOrderByWithAggregationInput[]
    by: CatalogGameScalarFieldEnum[] | CatalogGameScalarFieldEnum
    having?: CatalogGameScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CatalogGameCountAggregateInputType | true
    _avg?: CatalogGameAvgAggregateInputType
    _sum?: CatalogGameSumAggregateInputType
    _min?: CatalogGameMinAggregateInputType
    _max?: CatalogGameMaxAggregateInputType
  }

  export type CatalogGameGroupByOutputType = {
    id: number
    slug: string
    name: string
    currency: string
    position: number
    _count: CatalogGameCountAggregateOutputType | null
    _avg: CatalogGameAvgAggregateOutputType | null
    _sum: CatalogGameSumAggregateOutputType | null
    _min: CatalogGameMinAggregateOutputType | null
    _max: CatalogGameMaxAggregateOutputType | null
  }

  type GetCatalogGameGroupByPayload<T extends CatalogGameGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CatalogGameGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CatalogGameGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CatalogGameGroupByOutputType[P]>
            : GetScalarType<T[P], CatalogGameGroupByOutputType[P]>
        }
      >
    >


  export type CatalogGameSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    name?: boolean
    currency?: boolean
    position?: boolean
    offers?: boolean | CatalogGame$offersArgs<ExtArgs>
    _count?: boolean | CatalogGameCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["catalogGame"]>

  export type CatalogGameSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    name?: boolean
    currency?: boolean
    position?: boolean
  }, ExtArgs["result"]["catalogGame"]>

  export type CatalogGameSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    name?: boolean
    currency?: boolean
    position?: boolean
  }, ExtArgs["result"]["catalogGame"]>

  export type CatalogGameSelectScalar = {
    id?: boolean
    slug?: boolean
    name?: boolean
    currency?: boolean
    position?: boolean
  }

  export type CatalogGameOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "slug" | "name" | "currency" | "position", ExtArgs["result"]["catalogGame"]>
  export type CatalogGameInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    offers?: boolean | CatalogGame$offersArgs<ExtArgs>
    _count?: boolean | CatalogGameCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CatalogGameIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CatalogGameIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CatalogGamePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CatalogGame"
    objects: {
      offers: Prisma.$CatalogOfferPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      slug: string
      name: string
      currency: string
      position: number
    }, ExtArgs["result"]["catalogGame"]>
    composites: {}
  }

  type CatalogGameGetPayload<S extends boolean | null | undefined | CatalogGameDefaultArgs> = $Result.GetResult<Prisma.$CatalogGamePayload, S>

  type CatalogGameCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CatalogGameFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CatalogGameCountAggregateInputType | true
    }

  export interface CatalogGameDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CatalogGame'], meta: { name: 'CatalogGame' } }
    /**
     * Find zero or one CatalogGame that matches the filter.
     * @param {CatalogGameFindUniqueArgs} args - Arguments to find a CatalogGame
     * @example
     * // Get one CatalogGame
     * const catalogGame = await prisma.catalogGame.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CatalogGameFindUniqueArgs>(args: SelectSubset<T, CatalogGameFindUniqueArgs<ExtArgs>>): Prisma__CatalogGameClient<$Result.GetResult<Prisma.$CatalogGamePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CatalogGame that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CatalogGameFindUniqueOrThrowArgs} args - Arguments to find a CatalogGame
     * @example
     * // Get one CatalogGame
     * const catalogGame = await prisma.catalogGame.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CatalogGameFindUniqueOrThrowArgs>(args: SelectSubset<T, CatalogGameFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CatalogGameClient<$Result.GetResult<Prisma.$CatalogGamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CatalogGame that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CatalogGameFindFirstArgs} args - Arguments to find a CatalogGame
     * @example
     * // Get one CatalogGame
     * const catalogGame = await prisma.catalogGame.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CatalogGameFindFirstArgs>(args?: SelectSubset<T, CatalogGameFindFirstArgs<ExtArgs>>): Prisma__CatalogGameClient<$Result.GetResult<Prisma.$CatalogGamePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CatalogGame that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CatalogGameFindFirstOrThrowArgs} args - Arguments to find a CatalogGame
     * @example
     * // Get one CatalogGame
     * const catalogGame = await prisma.catalogGame.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CatalogGameFindFirstOrThrowArgs>(args?: SelectSubset<T, CatalogGameFindFirstOrThrowArgs<ExtArgs>>): Prisma__CatalogGameClient<$Result.GetResult<Prisma.$CatalogGamePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CatalogGames that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CatalogGameFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CatalogGames
     * const catalogGames = await prisma.catalogGame.findMany()
     * 
     * // Get first 10 CatalogGames
     * const catalogGames = await prisma.catalogGame.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const catalogGameWithIdOnly = await prisma.catalogGame.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CatalogGameFindManyArgs>(args?: SelectSubset<T, CatalogGameFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CatalogGamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CatalogGame.
     * @param {CatalogGameCreateArgs} args - Arguments to create a CatalogGame.
     * @example
     * // Create one CatalogGame
     * const CatalogGame = await prisma.catalogGame.create({
     *   data: {
     *     // ... data to create a CatalogGame
     *   }
     * })
     * 
     */
    create<T extends CatalogGameCreateArgs>(args: SelectSubset<T, CatalogGameCreateArgs<ExtArgs>>): Prisma__CatalogGameClient<$Result.GetResult<Prisma.$CatalogGamePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CatalogGames.
     * @param {CatalogGameCreateManyArgs} args - Arguments to create many CatalogGames.
     * @example
     * // Create many CatalogGames
     * const catalogGame = await prisma.catalogGame.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CatalogGameCreateManyArgs>(args?: SelectSubset<T, CatalogGameCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CatalogGames and returns the data saved in the database.
     * @param {CatalogGameCreateManyAndReturnArgs} args - Arguments to create many CatalogGames.
     * @example
     * // Create many CatalogGames
     * const catalogGame = await prisma.catalogGame.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CatalogGames and only return the `id`
     * const catalogGameWithIdOnly = await prisma.catalogGame.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CatalogGameCreateManyAndReturnArgs>(args?: SelectSubset<T, CatalogGameCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CatalogGamePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CatalogGame.
     * @param {CatalogGameDeleteArgs} args - Arguments to delete one CatalogGame.
     * @example
     * // Delete one CatalogGame
     * const CatalogGame = await prisma.catalogGame.delete({
     *   where: {
     *     // ... filter to delete one CatalogGame
     *   }
     * })
     * 
     */
    delete<T extends CatalogGameDeleteArgs>(args: SelectSubset<T, CatalogGameDeleteArgs<ExtArgs>>): Prisma__CatalogGameClient<$Result.GetResult<Prisma.$CatalogGamePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CatalogGame.
     * @param {CatalogGameUpdateArgs} args - Arguments to update one CatalogGame.
     * @example
     * // Update one CatalogGame
     * const catalogGame = await prisma.catalogGame.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CatalogGameUpdateArgs>(args: SelectSubset<T, CatalogGameUpdateArgs<ExtArgs>>): Prisma__CatalogGameClient<$Result.GetResult<Prisma.$CatalogGamePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CatalogGames.
     * @param {CatalogGameDeleteManyArgs} args - Arguments to filter CatalogGames to delete.
     * @example
     * // Delete a few CatalogGames
     * const { count } = await prisma.catalogGame.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CatalogGameDeleteManyArgs>(args?: SelectSubset<T, CatalogGameDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CatalogGames.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CatalogGameUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CatalogGames
     * const catalogGame = await prisma.catalogGame.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CatalogGameUpdateManyArgs>(args: SelectSubset<T, CatalogGameUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CatalogGames and returns the data updated in the database.
     * @param {CatalogGameUpdateManyAndReturnArgs} args - Arguments to update many CatalogGames.
     * @example
     * // Update many CatalogGames
     * const catalogGame = await prisma.catalogGame.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CatalogGames and only return the `id`
     * const catalogGameWithIdOnly = await prisma.catalogGame.updateManyAndReturn({
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
    updateManyAndReturn<T extends CatalogGameUpdateManyAndReturnArgs>(args: SelectSubset<T, CatalogGameUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CatalogGamePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CatalogGame.
     * @param {CatalogGameUpsertArgs} args - Arguments to update or create a CatalogGame.
     * @example
     * // Update or create a CatalogGame
     * const catalogGame = await prisma.catalogGame.upsert({
     *   create: {
     *     // ... data to create a CatalogGame
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CatalogGame we want to update
     *   }
     * })
     */
    upsert<T extends CatalogGameUpsertArgs>(args: SelectSubset<T, CatalogGameUpsertArgs<ExtArgs>>): Prisma__CatalogGameClient<$Result.GetResult<Prisma.$CatalogGamePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CatalogGames.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CatalogGameCountArgs} args - Arguments to filter CatalogGames to count.
     * @example
     * // Count the number of CatalogGames
     * const count = await prisma.catalogGame.count({
     *   where: {
     *     // ... the filter for the CatalogGames we want to count
     *   }
     * })
    **/
    count<T extends CatalogGameCountArgs>(
      args?: Subset<T, CatalogGameCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CatalogGameCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CatalogGame.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CatalogGameAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CatalogGameAggregateArgs>(args: Subset<T, CatalogGameAggregateArgs>): Prisma.PrismaPromise<GetCatalogGameAggregateType<T>>

    /**
     * Group by CatalogGame.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CatalogGameGroupByArgs} args - Group by arguments.
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
      T extends CatalogGameGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CatalogGameGroupByArgs['orderBy'] }
        : { orderBy?: CatalogGameGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CatalogGameGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCatalogGameGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CatalogGame model
   */
  readonly fields: CatalogGameFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CatalogGame.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CatalogGameClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    offers<T extends CatalogGame$offersArgs<ExtArgs> = {}>(args?: Subset<T, CatalogGame$offersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CatalogOfferPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the CatalogGame model
   */
  interface CatalogGameFieldRefs {
    readonly id: FieldRef<"CatalogGame", 'Int'>
    readonly slug: FieldRef<"CatalogGame", 'String'>
    readonly name: FieldRef<"CatalogGame", 'String'>
    readonly currency: FieldRef<"CatalogGame", 'String'>
    readonly position: FieldRef<"CatalogGame", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * CatalogGame findUnique
   */
  export type CatalogGameFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogGame
     */
    select?: CatalogGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogGame
     */
    omit?: CatalogGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogGameInclude<ExtArgs> | null
    /**
     * Filter, which CatalogGame to fetch.
     */
    where: CatalogGameWhereUniqueInput
  }

  /**
   * CatalogGame findUniqueOrThrow
   */
  export type CatalogGameFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogGame
     */
    select?: CatalogGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogGame
     */
    omit?: CatalogGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogGameInclude<ExtArgs> | null
    /**
     * Filter, which CatalogGame to fetch.
     */
    where: CatalogGameWhereUniqueInput
  }

  /**
   * CatalogGame findFirst
   */
  export type CatalogGameFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogGame
     */
    select?: CatalogGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogGame
     */
    omit?: CatalogGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogGameInclude<ExtArgs> | null
    /**
     * Filter, which CatalogGame to fetch.
     */
    where?: CatalogGameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CatalogGames to fetch.
     */
    orderBy?: CatalogGameOrderByWithRelationInput | CatalogGameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CatalogGames.
     */
    cursor?: CatalogGameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CatalogGames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CatalogGames.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CatalogGames.
     */
    distinct?: CatalogGameScalarFieldEnum | CatalogGameScalarFieldEnum[]
  }

  /**
   * CatalogGame findFirstOrThrow
   */
  export type CatalogGameFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogGame
     */
    select?: CatalogGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogGame
     */
    omit?: CatalogGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogGameInclude<ExtArgs> | null
    /**
     * Filter, which CatalogGame to fetch.
     */
    where?: CatalogGameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CatalogGames to fetch.
     */
    orderBy?: CatalogGameOrderByWithRelationInput | CatalogGameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CatalogGames.
     */
    cursor?: CatalogGameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CatalogGames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CatalogGames.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CatalogGames.
     */
    distinct?: CatalogGameScalarFieldEnum | CatalogGameScalarFieldEnum[]
  }

  /**
   * CatalogGame findMany
   */
  export type CatalogGameFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogGame
     */
    select?: CatalogGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogGame
     */
    omit?: CatalogGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogGameInclude<ExtArgs> | null
    /**
     * Filter, which CatalogGames to fetch.
     */
    where?: CatalogGameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CatalogGames to fetch.
     */
    orderBy?: CatalogGameOrderByWithRelationInput | CatalogGameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CatalogGames.
     */
    cursor?: CatalogGameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CatalogGames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CatalogGames.
     */
    skip?: number
    distinct?: CatalogGameScalarFieldEnum | CatalogGameScalarFieldEnum[]
  }

  /**
   * CatalogGame create
   */
  export type CatalogGameCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogGame
     */
    select?: CatalogGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogGame
     */
    omit?: CatalogGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogGameInclude<ExtArgs> | null
    /**
     * The data needed to create a CatalogGame.
     */
    data: XOR<CatalogGameCreateInput, CatalogGameUncheckedCreateInput>
  }

  /**
   * CatalogGame createMany
   */
  export type CatalogGameCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CatalogGames.
     */
    data: CatalogGameCreateManyInput | CatalogGameCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CatalogGame createManyAndReturn
   */
  export type CatalogGameCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogGame
     */
    select?: CatalogGameSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogGame
     */
    omit?: CatalogGameOmit<ExtArgs> | null
    /**
     * The data used to create many CatalogGames.
     */
    data: CatalogGameCreateManyInput | CatalogGameCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CatalogGame update
   */
  export type CatalogGameUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogGame
     */
    select?: CatalogGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogGame
     */
    omit?: CatalogGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogGameInclude<ExtArgs> | null
    /**
     * The data needed to update a CatalogGame.
     */
    data: XOR<CatalogGameUpdateInput, CatalogGameUncheckedUpdateInput>
    /**
     * Choose, which CatalogGame to update.
     */
    where: CatalogGameWhereUniqueInput
  }

  /**
   * CatalogGame updateMany
   */
  export type CatalogGameUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CatalogGames.
     */
    data: XOR<CatalogGameUpdateManyMutationInput, CatalogGameUncheckedUpdateManyInput>
    /**
     * Filter which CatalogGames to update
     */
    where?: CatalogGameWhereInput
    /**
     * Limit how many CatalogGames to update.
     */
    limit?: number
  }

  /**
   * CatalogGame updateManyAndReturn
   */
  export type CatalogGameUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogGame
     */
    select?: CatalogGameSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogGame
     */
    omit?: CatalogGameOmit<ExtArgs> | null
    /**
     * The data used to update CatalogGames.
     */
    data: XOR<CatalogGameUpdateManyMutationInput, CatalogGameUncheckedUpdateManyInput>
    /**
     * Filter which CatalogGames to update
     */
    where?: CatalogGameWhereInput
    /**
     * Limit how many CatalogGames to update.
     */
    limit?: number
  }

  /**
   * CatalogGame upsert
   */
  export type CatalogGameUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogGame
     */
    select?: CatalogGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogGame
     */
    omit?: CatalogGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogGameInclude<ExtArgs> | null
    /**
     * The filter to search for the CatalogGame to update in case it exists.
     */
    where: CatalogGameWhereUniqueInput
    /**
     * In case the CatalogGame found by the `where` argument doesn't exist, create a new CatalogGame with this data.
     */
    create: XOR<CatalogGameCreateInput, CatalogGameUncheckedCreateInput>
    /**
     * In case the CatalogGame was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CatalogGameUpdateInput, CatalogGameUncheckedUpdateInput>
  }

  /**
   * CatalogGame delete
   */
  export type CatalogGameDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogGame
     */
    select?: CatalogGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogGame
     */
    omit?: CatalogGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogGameInclude<ExtArgs> | null
    /**
     * Filter which CatalogGame to delete.
     */
    where: CatalogGameWhereUniqueInput
  }

  /**
   * CatalogGame deleteMany
   */
  export type CatalogGameDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CatalogGames to delete
     */
    where?: CatalogGameWhereInput
    /**
     * Limit how many CatalogGames to delete.
     */
    limit?: number
  }

  /**
   * CatalogGame.offers
   */
  export type CatalogGame$offersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogOffer
     */
    select?: CatalogOfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogOffer
     */
    omit?: CatalogOfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogOfferInclude<ExtArgs> | null
    where?: CatalogOfferWhereInput
    orderBy?: CatalogOfferOrderByWithRelationInput | CatalogOfferOrderByWithRelationInput[]
    cursor?: CatalogOfferWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CatalogOfferScalarFieldEnum | CatalogOfferScalarFieldEnum[]
  }

  /**
   * CatalogGame without action
   */
  export type CatalogGameDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogGame
     */
    select?: CatalogGameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogGame
     */
    omit?: CatalogGameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogGameInclude<ExtArgs> | null
  }


  /**
   * Model CatalogOffer
   */

  export type AggregateCatalogOffer = {
    _count: CatalogOfferCountAggregateOutputType | null
    _avg: CatalogOfferAvgAggregateOutputType | null
    _sum: CatalogOfferSumAggregateOutputType | null
    _min: CatalogOfferMinAggregateOutputType | null
    _max: CatalogOfferMaxAggregateOutputType | null
  }

  export type CatalogOfferAvgAggregateOutputType = {
    id: number | null
    price: number | null
    position: number | null
    gameId: number | null
  }

  export type CatalogOfferSumAggregateOutputType = {
    id: number | null
    price: number | null
    position: number | null
    gameId: number | null
  }

  export type CatalogOfferMinAggregateOutputType = {
    id: number | null
    label: string | null
    price: number | null
    position: number | null
    gameId: number | null
  }

  export type CatalogOfferMaxAggregateOutputType = {
    id: number | null
    label: string | null
    price: number | null
    position: number | null
    gameId: number | null
  }

  export type CatalogOfferCountAggregateOutputType = {
    id: number
    label: number
    price: number
    position: number
    gameId: number
    _all: number
  }


  export type CatalogOfferAvgAggregateInputType = {
    id?: true
    price?: true
    position?: true
    gameId?: true
  }

  export type CatalogOfferSumAggregateInputType = {
    id?: true
    price?: true
    position?: true
    gameId?: true
  }

  export type CatalogOfferMinAggregateInputType = {
    id?: true
    label?: true
    price?: true
    position?: true
    gameId?: true
  }

  export type CatalogOfferMaxAggregateInputType = {
    id?: true
    label?: true
    price?: true
    position?: true
    gameId?: true
  }

  export type CatalogOfferCountAggregateInputType = {
    id?: true
    label?: true
    price?: true
    position?: true
    gameId?: true
    _all?: true
  }

  export type CatalogOfferAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CatalogOffer to aggregate.
     */
    where?: CatalogOfferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CatalogOffers to fetch.
     */
    orderBy?: CatalogOfferOrderByWithRelationInput | CatalogOfferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CatalogOfferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CatalogOffers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CatalogOffers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CatalogOffers
    **/
    _count?: true | CatalogOfferCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CatalogOfferAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CatalogOfferSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CatalogOfferMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CatalogOfferMaxAggregateInputType
  }

  export type GetCatalogOfferAggregateType<T extends CatalogOfferAggregateArgs> = {
        [P in keyof T & keyof AggregateCatalogOffer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCatalogOffer[P]>
      : GetScalarType<T[P], AggregateCatalogOffer[P]>
  }




  export type CatalogOfferGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CatalogOfferWhereInput
    orderBy?: CatalogOfferOrderByWithAggregationInput | CatalogOfferOrderByWithAggregationInput[]
    by: CatalogOfferScalarFieldEnum[] | CatalogOfferScalarFieldEnum
    having?: CatalogOfferScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CatalogOfferCountAggregateInputType | true
    _avg?: CatalogOfferAvgAggregateInputType
    _sum?: CatalogOfferSumAggregateInputType
    _min?: CatalogOfferMinAggregateInputType
    _max?: CatalogOfferMaxAggregateInputType
  }

  export type CatalogOfferGroupByOutputType = {
    id: number
    label: string
    price: number
    position: number
    gameId: number
    _count: CatalogOfferCountAggregateOutputType | null
    _avg: CatalogOfferAvgAggregateOutputType | null
    _sum: CatalogOfferSumAggregateOutputType | null
    _min: CatalogOfferMinAggregateOutputType | null
    _max: CatalogOfferMaxAggregateOutputType | null
  }

  type GetCatalogOfferGroupByPayload<T extends CatalogOfferGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CatalogOfferGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CatalogOfferGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CatalogOfferGroupByOutputType[P]>
            : GetScalarType<T[P], CatalogOfferGroupByOutputType[P]>
        }
      >
    >


  export type CatalogOfferSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    label?: boolean
    price?: boolean
    position?: boolean
    gameId?: boolean
    game?: boolean | CatalogGameDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["catalogOffer"]>

  export type CatalogOfferSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    label?: boolean
    price?: boolean
    position?: boolean
    gameId?: boolean
    game?: boolean | CatalogGameDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["catalogOffer"]>

  export type CatalogOfferSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    label?: boolean
    price?: boolean
    position?: boolean
    gameId?: boolean
    game?: boolean | CatalogGameDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["catalogOffer"]>

  export type CatalogOfferSelectScalar = {
    id?: boolean
    label?: boolean
    price?: boolean
    position?: boolean
    gameId?: boolean
  }

  export type CatalogOfferOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "label" | "price" | "position" | "gameId", ExtArgs["result"]["catalogOffer"]>
  export type CatalogOfferInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | CatalogGameDefaultArgs<ExtArgs>
  }
  export type CatalogOfferIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | CatalogGameDefaultArgs<ExtArgs>
  }
  export type CatalogOfferIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | CatalogGameDefaultArgs<ExtArgs>
  }

  export type $CatalogOfferPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CatalogOffer"
    objects: {
      game: Prisma.$CatalogGamePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      label: string
      price: number
      position: number
      gameId: number
    }, ExtArgs["result"]["catalogOffer"]>
    composites: {}
  }

  type CatalogOfferGetPayload<S extends boolean | null | undefined | CatalogOfferDefaultArgs> = $Result.GetResult<Prisma.$CatalogOfferPayload, S>

  type CatalogOfferCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CatalogOfferFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CatalogOfferCountAggregateInputType | true
    }

  export interface CatalogOfferDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CatalogOffer'], meta: { name: 'CatalogOffer' } }
    /**
     * Find zero or one CatalogOffer that matches the filter.
     * @param {CatalogOfferFindUniqueArgs} args - Arguments to find a CatalogOffer
     * @example
     * // Get one CatalogOffer
     * const catalogOffer = await prisma.catalogOffer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CatalogOfferFindUniqueArgs>(args: SelectSubset<T, CatalogOfferFindUniqueArgs<ExtArgs>>): Prisma__CatalogOfferClient<$Result.GetResult<Prisma.$CatalogOfferPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CatalogOffer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CatalogOfferFindUniqueOrThrowArgs} args - Arguments to find a CatalogOffer
     * @example
     * // Get one CatalogOffer
     * const catalogOffer = await prisma.catalogOffer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CatalogOfferFindUniqueOrThrowArgs>(args: SelectSubset<T, CatalogOfferFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CatalogOfferClient<$Result.GetResult<Prisma.$CatalogOfferPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CatalogOffer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CatalogOfferFindFirstArgs} args - Arguments to find a CatalogOffer
     * @example
     * // Get one CatalogOffer
     * const catalogOffer = await prisma.catalogOffer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CatalogOfferFindFirstArgs>(args?: SelectSubset<T, CatalogOfferFindFirstArgs<ExtArgs>>): Prisma__CatalogOfferClient<$Result.GetResult<Prisma.$CatalogOfferPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CatalogOffer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CatalogOfferFindFirstOrThrowArgs} args - Arguments to find a CatalogOffer
     * @example
     * // Get one CatalogOffer
     * const catalogOffer = await prisma.catalogOffer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CatalogOfferFindFirstOrThrowArgs>(args?: SelectSubset<T, CatalogOfferFindFirstOrThrowArgs<ExtArgs>>): Prisma__CatalogOfferClient<$Result.GetResult<Prisma.$CatalogOfferPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CatalogOffers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CatalogOfferFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CatalogOffers
     * const catalogOffers = await prisma.catalogOffer.findMany()
     * 
     * // Get first 10 CatalogOffers
     * const catalogOffers = await prisma.catalogOffer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const catalogOfferWithIdOnly = await prisma.catalogOffer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CatalogOfferFindManyArgs>(args?: SelectSubset<T, CatalogOfferFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CatalogOfferPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CatalogOffer.
     * @param {CatalogOfferCreateArgs} args - Arguments to create a CatalogOffer.
     * @example
     * // Create one CatalogOffer
     * const CatalogOffer = await prisma.catalogOffer.create({
     *   data: {
     *     // ... data to create a CatalogOffer
     *   }
     * })
     * 
     */
    create<T extends CatalogOfferCreateArgs>(args: SelectSubset<T, CatalogOfferCreateArgs<ExtArgs>>): Prisma__CatalogOfferClient<$Result.GetResult<Prisma.$CatalogOfferPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CatalogOffers.
     * @param {CatalogOfferCreateManyArgs} args - Arguments to create many CatalogOffers.
     * @example
     * // Create many CatalogOffers
     * const catalogOffer = await prisma.catalogOffer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CatalogOfferCreateManyArgs>(args?: SelectSubset<T, CatalogOfferCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CatalogOffers and returns the data saved in the database.
     * @param {CatalogOfferCreateManyAndReturnArgs} args - Arguments to create many CatalogOffers.
     * @example
     * // Create many CatalogOffers
     * const catalogOffer = await prisma.catalogOffer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CatalogOffers and only return the `id`
     * const catalogOfferWithIdOnly = await prisma.catalogOffer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CatalogOfferCreateManyAndReturnArgs>(args?: SelectSubset<T, CatalogOfferCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CatalogOfferPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CatalogOffer.
     * @param {CatalogOfferDeleteArgs} args - Arguments to delete one CatalogOffer.
     * @example
     * // Delete one CatalogOffer
     * const CatalogOffer = await prisma.catalogOffer.delete({
     *   where: {
     *     // ... filter to delete one CatalogOffer
     *   }
     * })
     * 
     */
    delete<T extends CatalogOfferDeleteArgs>(args: SelectSubset<T, CatalogOfferDeleteArgs<ExtArgs>>): Prisma__CatalogOfferClient<$Result.GetResult<Prisma.$CatalogOfferPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CatalogOffer.
     * @param {CatalogOfferUpdateArgs} args - Arguments to update one CatalogOffer.
     * @example
     * // Update one CatalogOffer
     * const catalogOffer = await prisma.catalogOffer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CatalogOfferUpdateArgs>(args: SelectSubset<T, CatalogOfferUpdateArgs<ExtArgs>>): Prisma__CatalogOfferClient<$Result.GetResult<Prisma.$CatalogOfferPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CatalogOffers.
     * @param {CatalogOfferDeleteManyArgs} args - Arguments to filter CatalogOffers to delete.
     * @example
     * // Delete a few CatalogOffers
     * const { count } = await prisma.catalogOffer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CatalogOfferDeleteManyArgs>(args?: SelectSubset<T, CatalogOfferDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CatalogOffers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CatalogOfferUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CatalogOffers
     * const catalogOffer = await prisma.catalogOffer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CatalogOfferUpdateManyArgs>(args: SelectSubset<T, CatalogOfferUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CatalogOffers and returns the data updated in the database.
     * @param {CatalogOfferUpdateManyAndReturnArgs} args - Arguments to update many CatalogOffers.
     * @example
     * // Update many CatalogOffers
     * const catalogOffer = await prisma.catalogOffer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CatalogOffers and only return the `id`
     * const catalogOfferWithIdOnly = await prisma.catalogOffer.updateManyAndReturn({
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
    updateManyAndReturn<T extends CatalogOfferUpdateManyAndReturnArgs>(args: SelectSubset<T, CatalogOfferUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CatalogOfferPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CatalogOffer.
     * @param {CatalogOfferUpsertArgs} args - Arguments to update or create a CatalogOffer.
     * @example
     * // Update or create a CatalogOffer
     * const catalogOffer = await prisma.catalogOffer.upsert({
     *   create: {
     *     // ... data to create a CatalogOffer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CatalogOffer we want to update
     *   }
     * })
     */
    upsert<T extends CatalogOfferUpsertArgs>(args: SelectSubset<T, CatalogOfferUpsertArgs<ExtArgs>>): Prisma__CatalogOfferClient<$Result.GetResult<Prisma.$CatalogOfferPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CatalogOffers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CatalogOfferCountArgs} args - Arguments to filter CatalogOffers to count.
     * @example
     * // Count the number of CatalogOffers
     * const count = await prisma.catalogOffer.count({
     *   where: {
     *     // ... the filter for the CatalogOffers we want to count
     *   }
     * })
    **/
    count<T extends CatalogOfferCountArgs>(
      args?: Subset<T, CatalogOfferCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CatalogOfferCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CatalogOffer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CatalogOfferAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CatalogOfferAggregateArgs>(args: Subset<T, CatalogOfferAggregateArgs>): Prisma.PrismaPromise<GetCatalogOfferAggregateType<T>>

    /**
     * Group by CatalogOffer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CatalogOfferGroupByArgs} args - Group by arguments.
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
      T extends CatalogOfferGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CatalogOfferGroupByArgs['orderBy'] }
        : { orderBy?: CatalogOfferGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CatalogOfferGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCatalogOfferGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CatalogOffer model
   */
  readonly fields: CatalogOfferFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CatalogOffer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CatalogOfferClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    game<T extends CatalogGameDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CatalogGameDefaultArgs<ExtArgs>>): Prisma__CatalogGameClient<$Result.GetResult<Prisma.$CatalogGamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the CatalogOffer model
   */
  interface CatalogOfferFieldRefs {
    readonly id: FieldRef<"CatalogOffer", 'Int'>
    readonly label: FieldRef<"CatalogOffer", 'String'>
    readonly price: FieldRef<"CatalogOffer", 'Int'>
    readonly position: FieldRef<"CatalogOffer", 'Int'>
    readonly gameId: FieldRef<"CatalogOffer", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * CatalogOffer findUnique
   */
  export type CatalogOfferFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogOffer
     */
    select?: CatalogOfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogOffer
     */
    omit?: CatalogOfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogOfferInclude<ExtArgs> | null
    /**
     * Filter, which CatalogOffer to fetch.
     */
    where: CatalogOfferWhereUniqueInput
  }

  /**
   * CatalogOffer findUniqueOrThrow
   */
  export type CatalogOfferFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogOffer
     */
    select?: CatalogOfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogOffer
     */
    omit?: CatalogOfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogOfferInclude<ExtArgs> | null
    /**
     * Filter, which CatalogOffer to fetch.
     */
    where: CatalogOfferWhereUniqueInput
  }

  /**
   * CatalogOffer findFirst
   */
  export type CatalogOfferFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogOffer
     */
    select?: CatalogOfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogOffer
     */
    omit?: CatalogOfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogOfferInclude<ExtArgs> | null
    /**
     * Filter, which CatalogOffer to fetch.
     */
    where?: CatalogOfferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CatalogOffers to fetch.
     */
    orderBy?: CatalogOfferOrderByWithRelationInput | CatalogOfferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CatalogOffers.
     */
    cursor?: CatalogOfferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CatalogOffers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CatalogOffers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CatalogOffers.
     */
    distinct?: CatalogOfferScalarFieldEnum | CatalogOfferScalarFieldEnum[]
  }

  /**
   * CatalogOffer findFirstOrThrow
   */
  export type CatalogOfferFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogOffer
     */
    select?: CatalogOfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogOffer
     */
    omit?: CatalogOfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogOfferInclude<ExtArgs> | null
    /**
     * Filter, which CatalogOffer to fetch.
     */
    where?: CatalogOfferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CatalogOffers to fetch.
     */
    orderBy?: CatalogOfferOrderByWithRelationInput | CatalogOfferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CatalogOffers.
     */
    cursor?: CatalogOfferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CatalogOffers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CatalogOffers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CatalogOffers.
     */
    distinct?: CatalogOfferScalarFieldEnum | CatalogOfferScalarFieldEnum[]
  }

  /**
   * CatalogOffer findMany
   */
  export type CatalogOfferFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogOffer
     */
    select?: CatalogOfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogOffer
     */
    omit?: CatalogOfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogOfferInclude<ExtArgs> | null
    /**
     * Filter, which CatalogOffers to fetch.
     */
    where?: CatalogOfferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CatalogOffers to fetch.
     */
    orderBy?: CatalogOfferOrderByWithRelationInput | CatalogOfferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CatalogOffers.
     */
    cursor?: CatalogOfferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CatalogOffers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CatalogOffers.
     */
    skip?: number
    distinct?: CatalogOfferScalarFieldEnum | CatalogOfferScalarFieldEnum[]
  }

  /**
   * CatalogOffer create
   */
  export type CatalogOfferCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogOffer
     */
    select?: CatalogOfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogOffer
     */
    omit?: CatalogOfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogOfferInclude<ExtArgs> | null
    /**
     * The data needed to create a CatalogOffer.
     */
    data: XOR<CatalogOfferCreateInput, CatalogOfferUncheckedCreateInput>
  }

  /**
   * CatalogOffer createMany
   */
  export type CatalogOfferCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CatalogOffers.
     */
    data: CatalogOfferCreateManyInput | CatalogOfferCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CatalogOffer createManyAndReturn
   */
  export type CatalogOfferCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogOffer
     */
    select?: CatalogOfferSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogOffer
     */
    omit?: CatalogOfferOmit<ExtArgs> | null
    /**
     * The data used to create many CatalogOffers.
     */
    data: CatalogOfferCreateManyInput | CatalogOfferCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogOfferIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CatalogOffer update
   */
  export type CatalogOfferUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogOffer
     */
    select?: CatalogOfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogOffer
     */
    omit?: CatalogOfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogOfferInclude<ExtArgs> | null
    /**
     * The data needed to update a CatalogOffer.
     */
    data: XOR<CatalogOfferUpdateInput, CatalogOfferUncheckedUpdateInput>
    /**
     * Choose, which CatalogOffer to update.
     */
    where: CatalogOfferWhereUniqueInput
  }

  /**
   * CatalogOffer updateMany
   */
  export type CatalogOfferUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CatalogOffers.
     */
    data: XOR<CatalogOfferUpdateManyMutationInput, CatalogOfferUncheckedUpdateManyInput>
    /**
     * Filter which CatalogOffers to update
     */
    where?: CatalogOfferWhereInput
    /**
     * Limit how many CatalogOffers to update.
     */
    limit?: number
  }

  /**
   * CatalogOffer updateManyAndReturn
   */
  export type CatalogOfferUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogOffer
     */
    select?: CatalogOfferSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogOffer
     */
    omit?: CatalogOfferOmit<ExtArgs> | null
    /**
     * The data used to update CatalogOffers.
     */
    data: XOR<CatalogOfferUpdateManyMutationInput, CatalogOfferUncheckedUpdateManyInput>
    /**
     * Filter which CatalogOffers to update
     */
    where?: CatalogOfferWhereInput
    /**
     * Limit how many CatalogOffers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogOfferIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CatalogOffer upsert
   */
  export type CatalogOfferUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogOffer
     */
    select?: CatalogOfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogOffer
     */
    omit?: CatalogOfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogOfferInclude<ExtArgs> | null
    /**
     * The filter to search for the CatalogOffer to update in case it exists.
     */
    where: CatalogOfferWhereUniqueInput
    /**
     * In case the CatalogOffer found by the `where` argument doesn't exist, create a new CatalogOffer with this data.
     */
    create: XOR<CatalogOfferCreateInput, CatalogOfferUncheckedCreateInput>
    /**
     * In case the CatalogOffer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CatalogOfferUpdateInput, CatalogOfferUncheckedUpdateInput>
  }

  /**
   * CatalogOffer delete
   */
  export type CatalogOfferDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogOffer
     */
    select?: CatalogOfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogOffer
     */
    omit?: CatalogOfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogOfferInclude<ExtArgs> | null
    /**
     * Filter which CatalogOffer to delete.
     */
    where: CatalogOfferWhereUniqueInput
  }

  /**
   * CatalogOffer deleteMany
   */
  export type CatalogOfferDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CatalogOffers to delete
     */
    where?: CatalogOfferWhereInput
    /**
     * Limit how many CatalogOffers to delete.
     */
    limit?: number
  }

  /**
   * CatalogOffer without action
   */
  export type CatalogOfferDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CatalogOffer
     */
    select?: CatalogOfferSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CatalogOffer
     */
    omit?: CatalogOfferOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CatalogOfferInclude<ExtArgs> | null
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


  export const CatalogGameScalarFieldEnum: {
    id: 'id',
    slug: 'slug',
    name: 'name',
    currency: 'currency',
    position: 'position'
  };

  export type CatalogGameScalarFieldEnum = (typeof CatalogGameScalarFieldEnum)[keyof typeof CatalogGameScalarFieldEnum]


  export const CatalogOfferScalarFieldEnum: {
    id: 'id',
    label: 'label',
    price: 'price',
    position: 'position',
    gameId: 'gameId'
  };

  export type CatalogOfferScalarFieldEnum = (typeof CatalogOfferScalarFieldEnum)[keyof typeof CatalogOfferScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type CatalogGameWhereInput = {
    AND?: CatalogGameWhereInput | CatalogGameWhereInput[]
    OR?: CatalogGameWhereInput[]
    NOT?: CatalogGameWhereInput | CatalogGameWhereInput[]
    id?: IntFilter<"CatalogGame"> | number
    slug?: StringFilter<"CatalogGame"> | string
    name?: StringFilter<"CatalogGame"> | string
    currency?: StringFilter<"CatalogGame"> | string
    position?: IntFilter<"CatalogGame"> | number
    offers?: CatalogOfferListRelationFilter
  }

  export type CatalogGameOrderByWithRelationInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    currency?: SortOrder
    position?: SortOrder
    offers?: CatalogOfferOrderByRelationAggregateInput
  }

  export type CatalogGameWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    slug?: string
    position?: number
    AND?: CatalogGameWhereInput | CatalogGameWhereInput[]
    OR?: CatalogGameWhereInput[]
    NOT?: CatalogGameWhereInput | CatalogGameWhereInput[]
    name?: StringFilter<"CatalogGame"> | string
    currency?: StringFilter<"CatalogGame"> | string
    offers?: CatalogOfferListRelationFilter
  }, "id" | "slug" | "position">

  export type CatalogGameOrderByWithAggregationInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    currency?: SortOrder
    position?: SortOrder
    _count?: CatalogGameCountOrderByAggregateInput
    _avg?: CatalogGameAvgOrderByAggregateInput
    _max?: CatalogGameMaxOrderByAggregateInput
    _min?: CatalogGameMinOrderByAggregateInput
    _sum?: CatalogGameSumOrderByAggregateInput
  }

  export type CatalogGameScalarWhereWithAggregatesInput = {
    AND?: CatalogGameScalarWhereWithAggregatesInput | CatalogGameScalarWhereWithAggregatesInput[]
    OR?: CatalogGameScalarWhereWithAggregatesInput[]
    NOT?: CatalogGameScalarWhereWithAggregatesInput | CatalogGameScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CatalogGame"> | number
    slug?: StringWithAggregatesFilter<"CatalogGame"> | string
    name?: StringWithAggregatesFilter<"CatalogGame"> | string
    currency?: StringWithAggregatesFilter<"CatalogGame"> | string
    position?: IntWithAggregatesFilter<"CatalogGame"> | number
  }

  export type CatalogOfferWhereInput = {
    AND?: CatalogOfferWhereInput | CatalogOfferWhereInput[]
    OR?: CatalogOfferWhereInput[]
    NOT?: CatalogOfferWhereInput | CatalogOfferWhereInput[]
    id?: IntFilter<"CatalogOffer"> | number
    label?: StringFilter<"CatalogOffer"> | string
    price?: IntFilter<"CatalogOffer"> | number
    position?: IntFilter<"CatalogOffer"> | number
    gameId?: IntFilter<"CatalogOffer"> | number
    game?: XOR<CatalogGameScalarRelationFilter, CatalogGameWhereInput>
  }

  export type CatalogOfferOrderByWithRelationInput = {
    id?: SortOrder
    label?: SortOrder
    price?: SortOrder
    position?: SortOrder
    gameId?: SortOrder
    game?: CatalogGameOrderByWithRelationInput
  }

  export type CatalogOfferWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    gameId_position?: CatalogOfferGameIdPositionCompoundUniqueInput
    AND?: CatalogOfferWhereInput | CatalogOfferWhereInput[]
    OR?: CatalogOfferWhereInput[]
    NOT?: CatalogOfferWhereInput | CatalogOfferWhereInput[]
    label?: StringFilter<"CatalogOffer"> | string
    price?: IntFilter<"CatalogOffer"> | number
    position?: IntFilter<"CatalogOffer"> | number
    gameId?: IntFilter<"CatalogOffer"> | number
    game?: XOR<CatalogGameScalarRelationFilter, CatalogGameWhereInput>
  }, "id" | "gameId_position">

  export type CatalogOfferOrderByWithAggregationInput = {
    id?: SortOrder
    label?: SortOrder
    price?: SortOrder
    position?: SortOrder
    gameId?: SortOrder
    _count?: CatalogOfferCountOrderByAggregateInput
    _avg?: CatalogOfferAvgOrderByAggregateInput
    _max?: CatalogOfferMaxOrderByAggregateInput
    _min?: CatalogOfferMinOrderByAggregateInput
    _sum?: CatalogOfferSumOrderByAggregateInput
  }

  export type CatalogOfferScalarWhereWithAggregatesInput = {
    AND?: CatalogOfferScalarWhereWithAggregatesInput | CatalogOfferScalarWhereWithAggregatesInput[]
    OR?: CatalogOfferScalarWhereWithAggregatesInput[]
    NOT?: CatalogOfferScalarWhereWithAggregatesInput | CatalogOfferScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CatalogOffer"> | number
    label?: StringWithAggregatesFilter<"CatalogOffer"> | string
    price?: IntWithAggregatesFilter<"CatalogOffer"> | number
    position?: IntWithAggregatesFilter<"CatalogOffer"> | number
    gameId?: IntWithAggregatesFilter<"CatalogOffer"> | number
  }

  export type CatalogGameCreateInput = {
    slug: string
    name: string
    currency: string
    position: number
    offers?: CatalogOfferCreateNestedManyWithoutGameInput
  }

  export type CatalogGameUncheckedCreateInput = {
    id?: number
    slug: string
    name: string
    currency: string
    position: number
    offers?: CatalogOfferUncheckedCreateNestedManyWithoutGameInput
  }

  export type CatalogGameUpdateInput = {
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    offers?: CatalogOfferUpdateManyWithoutGameNestedInput
  }

  export type CatalogGameUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    offers?: CatalogOfferUncheckedUpdateManyWithoutGameNestedInput
  }

  export type CatalogGameCreateManyInput = {
    id?: number
    slug: string
    name: string
    currency: string
    position: number
  }

  export type CatalogGameUpdateManyMutationInput = {
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
  }

  export type CatalogGameUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
  }

  export type CatalogOfferCreateInput = {
    label: string
    price: number
    position: number
    game: CatalogGameCreateNestedOneWithoutOffersInput
  }

  export type CatalogOfferUncheckedCreateInput = {
    id?: number
    label: string
    price: number
    position: number
    gameId: number
  }

  export type CatalogOfferUpdateInput = {
    label?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    position?: IntFieldUpdateOperationsInput | number
    game?: CatalogGameUpdateOneRequiredWithoutOffersNestedInput
  }

  export type CatalogOfferUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    label?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    position?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
  }

  export type CatalogOfferCreateManyInput = {
    id?: number
    label: string
    price: number
    position: number
    gameId: number
  }

  export type CatalogOfferUpdateManyMutationInput = {
    label?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    position?: IntFieldUpdateOperationsInput | number
  }

  export type CatalogOfferUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    label?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    position?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
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

  export type CatalogOfferListRelationFilter = {
    every?: CatalogOfferWhereInput
    some?: CatalogOfferWhereInput
    none?: CatalogOfferWhereInput
  }

  export type CatalogOfferOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CatalogGameCountOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    currency?: SortOrder
    position?: SortOrder
  }

  export type CatalogGameAvgOrderByAggregateInput = {
    id?: SortOrder
    position?: SortOrder
  }

  export type CatalogGameMaxOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    currency?: SortOrder
    position?: SortOrder
  }

  export type CatalogGameMinOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    currency?: SortOrder
    position?: SortOrder
  }

  export type CatalogGameSumOrderByAggregateInput = {
    id?: SortOrder
    position?: SortOrder
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

  export type CatalogGameScalarRelationFilter = {
    is?: CatalogGameWhereInput
    isNot?: CatalogGameWhereInput
  }

  export type CatalogOfferGameIdPositionCompoundUniqueInput = {
    gameId: number
    position: number
  }

  export type CatalogOfferCountOrderByAggregateInput = {
    id?: SortOrder
    label?: SortOrder
    price?: SortOrder
    position?: SortOrder
    gameId?: SortOrder
  }

  export type CatalogOfferAvgOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
    position?: SortOrder
    gameId?: SortOrder
  }

  export type CatalogOfferMaxOrderByAggregateInput = {
    id?: SortOrder
    label?: SortOrder
    price?: SortOrder
    position?: SortOrder
    gameId?: SortOrder
  }

  export type CatalogOfferMinOrderByAggregateInput = {
    id?: SortOrder
    label?: SortOrder
    price?: SortOrder
    position?: SortOrder
    gameId?: SortOrder
  }

  export type CatalogOfferSumOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
    position?: SortOrder
    gameId?: SortOrder
  }

  export type CatalogOfferCreateNestedManyWithoutGameInput = {
    create?: XOR<CatalogOfferCreateWithoutGameInput, CatalogOfferUncheckedCreateWithoutGameInput> | CatalogOfferCreateWithoutGameInput[] | CatalogOfferUncheckedCreateWithoutGameInput[]
    connectOrCreate?: CatalogOfferCreateOrConnectWithoutGameInput | CatalogOfferCreateOrConnectWithoutGameInput[]
    createMany?: CatalogOfferCreateManyGameInputEnvelope
    connect?: CatalogOfferWhereUniqueInput | CatalogOfferWhereUniqueInput[]
  }

  export type CatalogOfferUncheckedCreateNestedManyWithoutGameInput = {
    create?: XOR<CatalogOfferCreateWithoutGameInput, CatalogOfferUncheckedCreateWithoutGameInput> | CatalogOfferCreateWithoutGameInput[] | CatalogOfferUncheckedCreateWithoutGameInput[]
    connectOrCreate?: CatalogOfferCreateOrConnectWithoutGameInput | CatalogOfferCreateOrConnectWithoutGameInput[]
    createMany?: CatalogOfferCreateManyGameInputEnvelope
    connect?: CatalogOfferWhereUniqueInput | CatalogOfferWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CatalogOfferUpdateManyWithoutGameNestedInput = {
    create?: XOR<CatalogOfferCreateWithoutGameInput, CatalogOfferUncheckedCreateWithoutGameInput> | CatalogOfferCreateWithoutGameInput[] | CatalogOfferUncheckedCreateWithoutGameInput[]
    connectOrCreate?: CatalogOfferCreateOrConnectWithoutGameInput | CatalogOfferCreateOrConnectWithoutGameInput[]
    upsert?: CatalogOfferUpsertWithWhereUniqueWithoutGameInput | CatalogOfferUpsertWithWhereUniqueWithoutGameInput[]
    createMany?: CatalogOfferCreateManyGameInputEnvelope
    set?: CatalogOfferWhereUniqueInput | CatalogOfferWhereUniqueInput[]
    disconnect?: CatalogOfferWhereUniqueInput | CatalogOfferWhereUniqueInput[]
    delete?: CatalogOfferWhereUniqueInput | CatalogOfferWhereUniqueInput[]
    connect?: CatalogOfferWhereUniqueInput | CatalogOfferWhereUniqueInput[]
    update?: CatalogOfferUpdateWithWhereUniqueWithoutGameInput | CatalogOfferUpdateWithWhereUniqueWithoutGameInput[]
    updateMany?: CatalogOfferUpdateManyWithWhereWithoutGameInput | CatalogOfferUpdateManyWithWhereWithoutGameInput[]
    deleteMany?: CatalogOfferScalarWhereInput | CatalogOfferScalarWhereInput[]
  }

  export type CatalogOfferUncheckedUpdateManyWithoutGameNestedInput = {
    create?: XOR<CatalogOfferCreateWithoutGameInput, CatalogOfferUncheckedCreateWithoutGameInput> | CatalogOfferCreateWithoutGameInput[] | CatalogOfferUncheckedCreateWithoutGameInput[]
    connectOrCreate?: CatalogOfferCreateOrConnectWithoutGameInput | CatalogOfferCreateOrConnectWithoutGameInput[]
    upsert?: CatalogOfferUpsertWithWhereUniqueWithoutGameInput | CatalogOfferUpsertWithWhereUniqueWithoutGameInput[]
    createMany?: CatalogOfferCreateManyGameInputEnvelope
    set?: CatalogOfferWhereUniqueInput | CatalogOfferWhereUniqueInput[]
    disconnect?: CatalogOfferWhereUniqueInput | CatalogOfferWhereUniqueInput[]
    delete?: CatalogOfferWhereUniqueInput | CatalogOfferWhereUniqueInput[]
    connect?: CatalogOfferWhereUniqueInput | CatalogOfferWhereUniqueInput[]
    update?: CatalogOfferUpdateWithWhereUniqueWithoutGameInput | CatalogOfferUpdateWithWhereUniqueWithoutGameInput[]
    updateMany?: CatalogOfferUpdateManyWithWhereWithoutGameInput | CatalogOfferUpdateManyWithWhereWithoutGameInput[]
    deleteMany?: CatalogOfferScalarWhereInput | CatalogOfferScalarWhereInput[]
  }

  export type CatalogGameCreateNestedOneWithoutOffersInput = {
    create?: XOR<CatalogGameCreateWithoutOffersInput, CatalogGameUncheckedCreateWithoutOffersInput>
    connectOrCreate?: CatalogGameCreateOrConnectWithoutOffersInput
    connect?: CatalogGameWhereUniqueInput
  }

  export type CatalogGameUpdateOneRequiredWithoutOffersNestedInput = {
    create?: XOR<CatalogGameCreateWithoutOffersInput, CatalogGameUncheckedCreateWithoutOffersInput>
    connectOrCreate?: CatalogGameCreateOrConnectWithoutOffersInput
    upsert?: CatalogGameUpsertWithoutOffersInput
    connect?: CatalogGameWhereUniqueInput
    update?: XOR<XOR<CatalogGameUpdateToOneWithWhereWithoutOffersInput, CatalogGameUpdateWithoutOffersInput>, CatalogGameUncheckedUpdateWithoutOffersInput>
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

  export type CatalogOfferCreateWithoutGameInput = {
    label: string
    price: number
    position: number
  }

  export type CatalogOfferUncheckedCreateWithoutGameInput = {
    id?: number
    label: string
    price: number
    position: number
  }

  export type CatalogOfferCreateOrConnectWithoutGameInput = {
    where: CatalogOfferWhereUniqueInput
    create: XOR<CatalogOfferCreateWithoutGameInput, CatalogOfferUncheckedCreateWithoutGameInput>
  }

  export type CatalogOfferCreateManyGameInputEnvelope = {
    data: CatalogOfferCreateManyGameInput | CatalogOfferCreateManyGameInput[]
    skipDuplicates?: boolean
  }

  export type CatalogOfferUpsertWithWhereUniqueWithoutGameInput = {
    where: CatalogOfferWhereUniqueInput
    update: XOR<CatalogOfferUpdateWithoutGameInput, CatalogOfferUncheckedUpdateWithoutGameInput>
    create: XOR<CatalogOfferCreateWithoutGameInput, CatalogOfferUncheckedCreateWithoutGameInput>
  }

  export type CatalogOfferUpdateWithWhereUniqueWithoutGameInput = {
    where: CatalogOfferWhereUniqueInput
    data: XOR<CatalogOfferUpdateWithoutGameInput, CatalogOfferUncheckedUpdateWithoutGameInput>
  }

  export type CatalogOfferUpdateManyWithWhereWithoutGameInput = {
    where: CatalogOfferScalarWhereInput
    data: XOR<CatalogOfferUpdateManyMutationInput, CatalogOfferUncheckedUpdateManyWithoutGameInput>
  }

  export type CatalogOfferScalarWhereInput = {
    AND?: CatalogOfferScalarWhereInput | CatalogOfferScalarWhereInput[]
    OR?: CatalogOfferScalarWhereInput[]
    NOT?: CatalogOfferScalarWhereInput | CatalogOfferScalarWhereInput[]
    id?: IntFilter<"CatalogOffer"> | number
    label?: StringFilter<"CatalogOffer"> | string
    price?: IntFilter<"CatalogOffer"> | number
    position?: IntFilter<"CatalogOffer"> | number
    gameId?: IntFilter<"CatalogOffer"> | number
  }

  export type CatalogGameCreateWithoutOffersInput = {
    slug: string
    name: string
    currency: string
    position: number
  }

  export type CatalogGameUncheckedCreateWithoutOffersInput = {
    id?: number
    slug: string
    name: string
    currency: string
    position: number
  }

  export type CatalogGameCreateOrConnectWithoutOffersInput = {
    where: CatalogGameWhereUniqueInput
    create: XOR<CatalogGameCreateWithoutOffersInput, CatalogGameUncheckedCreateWithoutOffersInput>
  }

  export type CatalogGameUpsertWithoutOffersInput = {
    update: XOR<CatalogGameUpdateWithoutOffersInput, CatalogGameUncheckedUpdateWithoutOffersInput>
    create: XOR<CatalogGameCreateWithoutOffersInput, CatalogGameUncheckedCreateWithoutOffersInput>
    where?: CatalogGameWhereInput
  }

  export type CatalogGameUpdateToOneWithWhereWithoutOffersInput = {
    where?: CatalogGameWhereInput
    data: XOR<CatalogGameUpdateWithoutOffersInput, CatalogGameUncheckedUpdateWithoutOffersInput>
  }

  export type CatalogGameUpdateWithoutOffersInput = {
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
  }

  export type CatalogGameUncheckedUpdateWithoutOffersInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
  }

  export type CatalogOfferCreateManyGameInput = {
    id?: number
    label: string
    price: number
    position: number
  }

  export type CatalogOfferUpdateWithoutGameInput = {
    label?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    position?: IntFieldUpdateOperationsInput | number
  }

  export type CatalogOfferUncheckedUpdateWithoutGameInput = {
    id?: IntFieldUpdateOperationsInput | number
    label?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    position?: IntFieldUpdateOperationsInput | number
  }

  export type CatalogOfferUncheckedUpdateManyWithoutGameInput = {
    id?: IntFieldUpdateOperationsInput | number
    label?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    position?: IntFieldUpdateOperationsInput | number
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