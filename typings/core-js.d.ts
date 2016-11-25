﻿// Type definitions for core-js v0.9.7
// Project: https://github.com/zloirock/core-js/
// Definitions by: Ron Buckton <http://github.com/rbuckton>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/* *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

declare type PropertyKey = string | number | symbol;


// #############################################################################################
// ECMAScript 6: Symbols
// Modules: es6.symbol
// #############################################################################################

interface Symbol {
    /** Returns a string representation of an object. */
    toString(): string;

    [Symbol.toStringTag]: string;
}

interface SymbolConstructor {
    /**
      * A reference to the prototype.
      */
    prototype: Symbol;

    /**
      * Returns a new unique Symbol value.
      * @param  description Description of the new Symbol object.
      */
    (description?: string|number): symbol;

    /**
      * Returns a Symbol object from the global symbol registry matching the given key if found.
      * Otherwise, returns a new symbol with this key.
      * @param key key to search for.
      */
    for(key: string): symbol;

    /**
      * Returns a key from the global symbol registry matching the given Symbol if found.
      * Otherwise, returns a undefined.
      * @param sym Symbol to find the key for.
      */
    keyFor(sym: symbol): string;

    // Well-known Symbols

    /**
      * A method that determines if a constructor object recognizes an object as one of the
      * constructor’s instances. Called by the semantics of the instanceof operator.
      */
    hasInstance: symbol;

    /**
      * A Boolean value that if true indicates that an object should flatten to its array elements
      * by Array.prototype.concat.
      */
    isConcatSpreadable: symbol;

    /**
      * A method that returns the default iterator for an object. Called by the semantics of the
      * for-of statement.
      */
    iterator: symbol;

    /**
      * A regular expression method that matches the regular expression against a string. Called
      * by the String.prototype.match method.
      */
    match: symbol;

    /**
      * A regular expression method that replaces matched substrings of a string. Called by the
      * String.prototype.replace method.
      */
    replace: symbol;

    /**
      * A regular expression method that returns the index within a string that matches the
      * regular expression. Called by the String.prototype.search method.
      */
    search: symbol;

    /**
      * A function valued property that is the constructor function that is used to create
      * derived objects.
      */
    species: symbol;

    /**
      * A regular expression method that splits a string at the indices that match the regular
      * expression. Called by the String.prototype.split method.
      */
    split: symbol;

    /**
      * A method that converts an object to a corresponding primitive value.Called by the ToPrimitive
      * abstract operation.
      */
    toPrimitive: symbol;

    /**
      * A String value that is used in the creation of the default string description of an object.
      * Called by the built-in method Object.prototype.toString.
      */
    toStringTag: symbol;

    /**
      * An Object whose own property names are property names that are excluded from the with
      * environment bindings of the associated objects.
      */
    unscopables: symbol;

    /**
      * Non-standard. Use simple mode for core-js symbols. See https://github.com/zloirock/core-js/#caveats-when-using-symbol-polyfill
      */
    useSimple(): void;

    /**
      * Non-standard. Use setter mode for core-js symbols. See https://github.com/zloirock/core-js/#caveats-when-using-symbol-polyfill
      */
    userSetter(): void;
}

declare var Symbol: SymbolConstructor;

// #############################################################################################
// ECMAScript 6: Collections
// Modules: es6.map, es6.set, es6.weak-map, and es6.weak-set
// #############################################################################################

interface Map<K, V> {
    clear(): void;
    delete(key: K): boolean;
    forEach(callbackfn: (value: V, index: K, map: Map<K, V>) => void, thisArg?: any): void;
    get(key: K): V;
    has(key: K): boolean;
    set(key: K, value?: V): Map<K, V>;
    size: number;
}

interface MapConstructor {
    new <K, V>(): Map<K, V>;
    new <K, V>(iterable: Iterable<[K, V]>): Map<K, V>;
    prototype: Map<any, any>;
}

interface Set<T> {
    add(value: T): Set<T>;
    clear(): void;
    delete(value: T): boolean;
    forEach(callbackfn: (value: T, index: T, set: Set<T>) => void, thisArg?: any): void;
    has(value: T): boolean;
    size: number;
}

interface SetConstructor {
    new <T>(): Set<T>;
    new <T>(iterable: Iterable<T>): Set<T>;
    prototype: Set<any>;
}

interface WeakMap<K, V> {
    delete(key: K): boolean;
    get(key: K): V;
    has(key: K): boolean;
    set(key: K, value?: V): WeakMap<K, V>;
}

interface WeakMapConstructor {
    new <K, V>(): WeakMap<K, V>;
    new <K, V>(iterable: Iterable<[K, V]>): WeakMap<K, V>;
    prototype: WeakMap<any, any>;
}

interface WeakSet<T> {
    add(value: T): WeakSet<T>;
    delete(value: T): boolean;
    has(value: T): boolean;
}

interface WeakSetConstructor {
    new <T>(): WeakSet<T>;
    new <T>(iterable: Iterable<T>): WeakSet<T>;
    prototype: WeakSet<any>;
}

// #############################################################################################
// ECMAScript 6: Iterators
// Modules: es6.string.iterator, es6.array.iterator, es6.map, es6.set, web.dom.iterable
// #############################################################################################

interface Array<T> {
    [Symbol.iterator](): IterableIterator<T>;
}

interface IteratorResult<T> {
    done: boolean;
    value?: T;
}

interface Iterator<T> {
    next(value?: any): IteratorResult<T>;
    return?(value?: any): IteratorResult<T>;
    throw?(e?: any): IteratorResult<T>;
}

interface Iterable<T> {
    [Symbol.iterator](): Iterator<T>;
}

interface IterableIterator<T> extends Iterator<T> {
    [Symbol.iterator](): IterableIterator<T>;
}

interface $for<T> extends IterableIterator<T> {
    of(callbackfn: (value: T, key: any) => void, thisArg?: any): void;
    array(): T[];
    array<U>(callbackfn: (value: T, key: any) => U, thisArg?: any): U[];
    filter(callbackfn: (value: T, key: any) => boolean, thisArg?: any): $for<T>;
    map<U>(callbackfn: (value: T, key: any) => U, thisArg?: any): $for<U>;
}

// #############################################################################################
// ECMAScript 6: Promises
// Modules: es6.promise
// #############################################################################################

interface PromiseLike<T> {
    /**
    * Attaches callbacks for the resolution and/or rejection of the Promise.
    * @param onfulfilled The callback to execute when the Promise is resolved.
    * @param onrejected The callback to execute when the Promise is rejected.
    * @returns A Promise for the completion of which ever callback is executed.
    */
    then<TResult>(onfulfilled?: (value: T) => TResult | PromiseLike<TResult>, onrejected?: (reason: any) => TResult | PromiseLike<TResult>): PromiseLike<TResult>;
    then<TResult>(onfulfilled?: (value: T) => TResult | PromiseLike<TResult>, onrejected?: (reason: any) => void): PromiseLike<TResult>;
}

/**
 * Represents the completion of an asynchronous operation
 */
interface Promise<T> {
    /**
    * Attaches callbacks for the resolution and/or rejection of the Promise.
    * @param onfulfilled The callback to execute when the Promise is resolved.
    * @param onrejected The callback to execute when the Promise is rejected.
    * @returns A Promise for the completion of which ever callback is executed.
    */
    then<TResult>(onfulfilled?: (value: T) => TResult | PromiseLike<TResult>, onrejected?: (reason: any) => TResult | PromiseLike<TResult>): Promise<TResult>;
    then<TResult>(onfulfilled?: (value: T) => TResult | PromiseLike<TResult>, onrejected?: (reason: any) => void): Promise<TResult>;

    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch(onrejected?: (reason: any) => T | PromiseLike<T>): Promise<T>;
    catch(onrejected?: (reason: any) => void): Promise<T>;
}

interface PromiseConstructor {
    /**
      * A reference to the prototype.
      */
    prototype: Promise<any>;

    /**
     * Creates a new Promise.
     * @param executor A callback used to initialize the promise. This callback is passed two arguments:
     * a resolve callback used resolve the promise with a value or the result of another promise,
     * and a reject callback used to reject the promise with a provided reason or error.
     */
    new <T>(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T>(values: Iterable<T | PromiseLike<T>>): Promise<T[]>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T>(values: Iterable<T | PromiseLike<T>>): Promise<T>;

    /**
     * Creates a new rejected promise for the provided reason.
     * @param reason The reason the promise was rejected.
     * @returns A new rejected Promise.
     */
    reject(reason: any): Promise<void>;

    /**
     * Creates a new rejected promise for the provided reason.
     * @param reason The reason the promise was rejected.
     * @returns A new rejected Promise.
     */
    reject<T>(reason: any): Promise<T>;

    /**
      * Creates a new resolved promise for the provided value.
      * @param value A promise.
      * @returns A promise whose internal state matches the provided promise.
      */
    resolve<T>(value: T | PromiseLike<T>): Promise<T>;

    /**
     * Creates a new resolved promise .
     * @returns A resolved promise.
     */
    resolve(): Promise<void>;
}

// #############################################################################################
// ECMAScript 6: Reflect
// Modules: es6.reflect
// #############################################################################################

declare module Reflect {
    function apply(target: Function, thisArgument: any, argumentsList: ArrayLike<any>): any;
    function construct(target: Function, argumentsList: ArrayLike<any>, newTarget?: any): any;
    function defineProperty(target: any, propertyKey: PropertyKey, attributes: PropertyDescriptor): boolean;
    function deleteProperty(target: any, propertyKey: PropertyKey): boolean;
    function enumerate(target: any): IterableIterator<any>;
    function get(target: any, propertyKey: PropertyKey, receiver?: any): any;
    function getOwnPropertyDescriptor(target: any, propertyKey: PropertyKey): PropertyDescriptor;
    function getPrototypeOf(target: any): any;
    function has(target: any, propertyKey: PropertyKey): boolean;
    function isExtensible(target: any): boolean;
    function ownKeys(target: any): Array<PropertyKey>;
    function preventExtensions(target: any): boolean;
    function set(target: any, propertyKey: PropertyKey, value: any, receiver?: any): boolean;
    function setPrototypeOf(target: any, proto: any): boolean;
}

// #############################################################################################
// Console - https://github.com/zloirock/core-js/#console
// Modules: core.log
// #############################################################################################

interface Log extends Console {
    (message?: any, ...optionalParams: any[]): void;
    enable(): void;
    disable(): void;
}

// #############################################################################################
// Dict - https://github.com/zloirock/core-js/#dict
// Modules: core.dict
// #############################################################################################

interface Dict<T> {
    [key: string]: T;
    [key: number]: T;
    //[key: symbol]: T;
}

interface DictConstructor {
    prototype: Dict<any>;

    new <T>(value?: Dict<T>): Dict<T>;
    new (value?: any): Dict<any>;
    <T>(value?: Dict<T>): Dict<T>;
    (value?: any): Dict<any>;

    isDict(value: any): boolean;
    values<T>(object: Dict<T>): IterableIterator<T>;
    keys<T>(object: Dict<T>): IterableIterator<PropertyKey>;
    entries<T>(object: Dict<T>): IterableIterator<[PropertyKey, T]>;
    has<T>(object: Dict<T>, key: PropertyKey): boolean;
    get<T>(object: Dict<T>, key: PropertyKey): T;
    set<T>(object: Dict<T>, key: PropertyKey, value: T): Dict<T>;
    forEach<T>(object: Dict<T>, callbackfn: (value: T, key: PropertyKey, dict: Dict<T>) => void, thisArg?: any): void;
    map<T, U>(object: Dict<T>, callbackfn: (value: T, key: PropertyKey, dict: Dict<T>) => U, thisArg?: any): Dict<U>;
    mapPairs<T, U>(object: Dict<T>, callbackfn: (value: T, key: PropertyKey, dict: Dict<T>) => [PropertyKey, U], thisArg?: any): Dict<U>;
    filter<T>(object: Dict<T>, callbackfn: (value: T, key: PropertyKey, dict: Dict<T>) => boolean, thisArg?: any): Dict<T>;
    some<T>(object: Dict<T>, callbackfn: (value: T, key: PropertyKey, dict: Dict<T>) => boolean, thisArg?: any): boolean;
    every<T>(object: Dict<T>, callbackfn: (value: T, key: PropertyKey, dict: Dict<T>) => boolean, thisArg?: any): boolean;
    find<T>(object: Dict<T>, callbackfn: (value: T, key: PropertyKey, dict: Dict<T>) => boolean, thisArg?: any): T;
    findKey<T>(object: Dict<T>, callbackfn: (value: T, key: PropertyKey, dict: Dict<T>) => boolean, thisArg?: any): PropertyKey;
    keyOf<T>(object: Dict<T>, value: T): PropertyKey;
    includes<T>(object: Dict<T>, value: T): boolean;
    reduce<T, U>(object: Dict<T>, callbackfn: (previousValue: U, value: T, key: PropertyKey, dict: Dict<T>) => U, initialValue: U): U;
    reduce<T>(object: Dict<T>, callbackfn: (previousValue: T, value: T, key: PropertyKey, dict: Dict<T>) => T, initialValue?: T): T;
    turn<T, U>(object: Dict<T>, callbackfn: (memo: Dict<U>, value: T, key: PropertyKey, dict: Dict<T>) => void, memo: Dict<U>): Dict<U>;
    turn<T>(object: Dict<T>, callbackfn: (memo: Dict<T>, value: T, key: PropertyKey, dict: Dict<T>) => void, memo?: Dict<T>): Dict<T>;
}

declare module core {
    module Reflect {
        function apply(target: Function, thisArgument: any, argumentsList: ArrayLike<any>): any;
        function construct(target: Function, argumentsList: ArrayLike<any>): any;
        function defineProperty(target: any, propertyKey: PropertyKey, attributes: PropertyDescriptor): boolean;
        function deleteProperty(target: any, propertyKey: PropertyKey): boolean;
        function enumerate(target: any): IterableIterator<any>;
        function get(target: any, propertyKey: PropertyKey, receiver?: any): any;
        function getOwnPropertyDescriptor(target: any, propertyKey: PropertyKey): PropertyDescriptor;
        function getPrototypeOf(target: any): any;
        function has(target: any, propertyKey: string): boolean;
        function has(target: any, propertyKey: symbol): boolean;
        function isExtensible(target: any): boolean;
        function ownKeys(target: any): Array<PropertyKey>;
        function preventExtensions(target: any): boolean;
        function set(target: any, propertyKey: PropertyKey, value: any, receiver?: any): boolean;
        function setPrototypeOf(target: any, proto: any): boolean;
    }

    var Object: {
        getPrototypeOf(o: any): any;
        getOwnPropertyDescriptor(o: any, p: string): PropertyDescriptor;
        getOwnPropertyNames(o: any): string[];
        create(o: any, properties?: PropertyDescriptorMap): any;
        defineProperty(o: any, p: string, attributes: PropertyDescriptor): any;
        defineProperties(o: any, properties: PropertyDescriptorMap): any;
        seal<T>(o: T): T;
        freeze<T>(o: T): T;
        preventExtensions<T>(o: T): T;
        isSealed(o: any): boolean;
        isFrozen(o: any): boolean;
        isExtensible(o: any): boolean;
        keys(o: any): string[];
        assign(target: any, ...sources: any[]): any;
        is(value1: any, value2: any): boolean;
        setPrototypeOf(o: any, proto: any): any;
        getOwnPropertySymbols(o: any): symbol[];
        getOwnPropertyDescriptor(o: any, propertyKey: PropertyKey): PropertyDescriptor;
        defineProperty(o: any, propertyKey: PropertyKey, attributes: PropertyDescriptor): any;
        values(object: any): any[];
        entries(object: any): any[];
        getOwnPropertyDescriptors(object: any): PropertyDescriptorMap;
        isObject(value: any): boolean;
        classof(value: any): string;
        define<T>(target: T, mixin: any): T;
        make<T>(proto: T, mixin?: any): T;
    };

    var Function: {
        bind(target: Function, thisArg: any, ...argArray: any[]): any;
        part(target: Function, ...args: any[]): any;
    };

    var Array: {
        from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): Array<U>;
        from<T, U>(iterable: Iterable<T>, mapfn: (v: T, k: number) => U, thisArg?: any): Array<U>;
        from<T>(arrayLike: ArrayLike<T>): Array<T>;
        from<T>(iterable: Iterable<T>): Array<T>;
        of<T>(...items: T[]): Array<T>;
        push<T>(array: ArrayLike<T>, ...items: T[]): number;
        pop<T>(array: ArrayLike<T>): T;
        concat<T>(array: ArrayLike<T>, ...items: (T[]| T)[]): T[];
        join<T>(array: ArrayLike<T>, separator?: string): string;
        reverse<T>(array: ArrayLike<T>): T[];
        shift<T>(array: ArrayLike<T>): T;
        slice<T>(array: ArrayLike<T>, start?: number, end?: number): T[];
        sort<T>(array: ArrayLike<T>, compareFn?: (a: T, b: T) => number): T[];
        splice<T>(array: ArrayLike<T>, start: number): T[];
        splice<T>(array: ArrayLike<T>, start: number, deleteCount: number, ...items: T[]): T[];
        unshift<T>(array: ArrayLike<T>, ...items: T[]): number;
        indexOf<T>(array: ArrayLike<T>, searchElement: T, fromIndex?: number): number;
        lastIndexOf<T>(array: ArrayLike<T>, earchElement: T, fromIndex?: number): number;
        every<T>(array: ArrayLike<T>, callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean;
        some<T>(array: ArrayLike<T>, callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean;
        forEach<T>(array: ArrayLike<T>, callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
        map<T, U>(array: ArrayLike<T>, callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
        filter<T>(array: ArrayLike<T>, callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): T[];
        reduce<T>(array: ArrayLike<T>, callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue?: T): T;
        reduce<T, U>(array: ArrayLike<T>, callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;
        reduceRight<T>(array: ArrayLike<T>, callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue?: T): T;
        reduceRight<T, U>(array: ArrayLike<T>, callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;
        entries<T>(array: ArrayLike<T>): IterableIterator<[number, T]>;
        keys<T>(array: ArrayLike<T>): IterableIterator<number>;
        values<T>(array: ArrayLike<T>): IterableIterator<T>;
        find<T>(array: ArrayLike<T>, predicate: (value: T, index: number, obj: Array<T>) => boolean, thisArg?: any): T;
        findIndex<T>(array: ArrayLike<T>, predicate: (value: T) => boolean, thisArg?: any): number;
        fill<T>(array: ArrayLike<T>, value: T, start?: number, end?: number): T[];
        copyWithin<T>(array: ArrayLike<T>, target: number, start: number, end?: number): T[];
        includes<T>(array: ArrayLike<T>, value: T, fromIndex?: number): boolean;
        turn<T>(array: ArrayLike<T>, callbackfn: (memo: Array<T>, value: T, index: number, array: Array<T>) => void, memo?: Array<T>): Array<T>;
        turn<T, U>(array: ArrayLike<T>, callbackfn: (memo: U, value: T, index: number, array: Array<T>) => void, memo?: U): U;
    };

    var String: {
        codePointAt(text: string, pos: number): number;
        includes(text: string, searchString: string, position?: number): boolean;
        endsWith(text: string, searchString: string, endPosition?: number): boolean;
        repeat(text: string, count: number): string;
        fromCodePoint(...codePoints: number[]): string;
        raw(template: TemplateStringsArray, ...substitutions: any[]): string;
        startsWith(text: string, searchString: string, position?: number): boolean;
        at(text: string, index: number): string;
        lpad(text: string, length: number, fillStr?: string): string;
        rpad(text: string, length: number, fillStr?: string): string;
        escapeHTML(text: string): string;
        unescapeHTML(text: string): string;
    };

    var Date: {
        now(): number;
        toISOString(date: Date): string;
        format(date: Date, template: string, locale?: string): string;
        formatUTC(date: Date, template: string, locale?: string): string;
    };

    var Number: {
        EPSILON: number;
        isFinite(number: number): boolean;
        isInteger(number: number): boolean;
        isNaN(number: number): boolean;
        isSafeInteger(number: number): boolean;
        MAX_SAFE_INTEGER: number;
        MIN_SAFE_INTEGER: number;
        parseFloat(string: string): number;
        parseInt(string: string, radix?: number): number;
        clz32(x: number): number;
        imul(x: number, y: number): number;
        sign(x: number): number;
        log10(x: number): number;
        log2(x: number): number;
        log1p(x: number): number;
        expm1(x: number): number;
        cosh(x: number): number;
        sinh(x: number): number;
        tanh(x: number): number;
        acosh(x: number): number;
        asinh(x: number): number;
        atanh(x: number): number;
        hypot(...values: number[]): number;
        trunc(x: number): number;
        fround(x: number): number;
        cbrt(x: number): number;
        random(lim?: number): number;
    };

    var Math: {
        clz32(x: number): number;
        imul(x: number, y: number): number;
        sign(x: number): number;
        log10(x: number): number;
        log2(x: number): number;
        log1p(x: number): number;
        expm1(x: number): number;
        cosh(x: number): number;
        sinh(x: number): number;
        tanh(x: number): number;
        acosh(x: number): number;
        asinh(x: number): number;
        atanh(x: number): number;
        hypot(...values: number[]): number;
        trunc(x: number): number;
        fround(x: number): number;
        cbrt(x: number): number;
    };

    var RegExp: {
        escape(str: string): string;
    };

    var Map: MapConstructor;
    var Set: SetConstructor;
    var WeakMap: WeakMapConstructor;
    var WeakSet: WeakSetConstructor;
    var Promise: PromiseConstructor;
    var Symbol: SymbolConstructor;
    var Dict: DictConstructor;
    var global: any;
    var log: Log;
    var _: boolean;

    function setTimeout(handler: any, timeout?: any, ...args: any[]): number;

    function setInterval(handler: any, timeout?: any, ...args: any[]): number;

    function setImmediate(expression: any, ...args: any[]): number;

    function clearImmediate(handle: number): void;

    function $for<T>(iterable: Iterable<T>): $for<T>;

    function isIterable(value: any): boolean;

    function getIterator<T>(iterable: Iterable<T>): Iterator<T>;

    interface Locale {
        weekdays: string;
        months: string;
    }

    function addLocale(lang: string, locale: Locale): typeof core;

    function locale(lang?: string): string;

    function delay(msec: number): Promise<void>;
}

declare module "core-js" {
    export = core;
}
declare module "core-js/shim" {
    export = core;
}
declare module "core-js/core" {
    export = core;
}
declare module "core-js/core/$for" {
    import $for = core.$for;
    export = $for;
}
declare module "core-js/core/_" {
    var _: typeof core._;
    export = _;
}
declare module "core-js/core/array" {
    var Array: typeof core.Array;
    export = Array;
}
declare module "core-js/core/date" {
    var Date: typeof core.Date;
    export = Date;
}
declare module "core-js/core/delay" {
    var delay: typeof core.delay;
    export = delay;
}
declare module "core-js/core/dict" {
    var Dict: typeof core.Dict;
    export = Dict;
}
declare module "core-js/core/function" {
    var Function: typeof core.Function;
    export = Function;
}
declare module "core-js/core/global" {
    var global: typeof core.global;
    export = global;
}
declare module "core-js/core/log" {
    var log: typeof core.log;
    export = log;
}
declare module "core-js/core/number" {
    var Number: typeof core.Number;
    export = Number;
}
declare module "core-js/core/object" {
    var Object: typeof core.Object;
    export = Object;
}
declare module "core-js/core/string" {
    var String: typeof core.String;
    export = String;
}
declare module "core-js/fn/$for" {
    import $for = core.$for;
    export = $for;
}
declare module "core-js/fn/_" {
    var _: typeof core._;
    export = _;
}
declare module "core-js/fn/clear-immediate" {
    var clearImmediate: typeof core.clearImmediate;
    export = clearImmediate;
}
declare module "core-js/fn/delay" {
    var delay: typeof core.delay;
    export = delay;
}
declare module "core-js/fn/dict" {
    var Dict: typeof core.Dict;
    export = Dict;
}
declare module "core-js/fn/get-iterator" {
    var getIterator: typeof core.getIterator;
    export = getIterator;
}
declare module "core-js/fn/global" {
    var global: typeof core.global;
    export = global;
}
declare module "core-js/fn/is-iterable" {
    var isIterable: typeof core.isIterable;
    export = isIterable;
}
declare module "core-js/fn/log" {
    var log: typeof core.log;
    export = log;
}
declare module "core-js/fn/map" {
    var Map: typeof core.Map;
    export = Map;
}
declare module "core-js/fn/promise" {
    var Promise: typeof core.Promise;
    export = Promise;
}
declare module "core-js/fn/set" {
    var Set: typeof core.Set;
    export = Set;
}
declare module "core-js/fn/set-immediate" {
    var setImmediate: typeof core.setImmediate;
    export = setImmediate;
}
declare module "core-js/fn/set-interval" {
    var setInterval: typeof core.setInterval;
    export = setInterval;
}
declare module "core-js/fn/set-timeout" {
    var setTimeout: typeof core.setTimeout;
    export = setTimeout;
}
declare module "core-js/fn/weak-map" {
    var WeakMap: typeof core.WeakMap;
    export = WeakMap;
}
declare module "core-js/fn/weak-set" {
    var WeakSet: typeof core.WeakSet;
    export = WeakSet;
}
declare module "core-js/fn/array" {
    var Array: typeof core.Array;
    export = Array;
}
declare module "core-js/fn/array/concat" {
    var concat: typeof core.Array.concat;
    export = concat;
}
declare module "core-js/fn/array/copy-within" {
    var copyWithin: typeof core.Array.copyWithin;
    export = copyWithin;
}
declare module "core-js/fn/array/entries" {
    var entries: typeof core.Array.entries;
    export = entries;
}
declare module "core-js/fn/array/every" {
    var every: typeof core.Array.every;
    export = every;
}
declare module "core-js/fn/array/fill" {
    var fill: typeof core.Array.fill;
    export = fill;
}
declare module "core-js/fn/array/filter" {
    var filter: typeof core.Array.filter;
    export = filter;
}
declare module "core-js/fn/array/find" {
    var find: typeof core.Array.find;
    export = find;
}
declare module "core-js/fn/array/find-index" {
    var findIndex: typeof core.Array.findIndex;
    export = findIndex;
}
declare module "core-js/fn/array/for-each" {
    var forEach: typeof core.Array.forEach;
    export = forEach;
}
declare module "core-js/fn/array/from" {
    var from: typeof core.Array.from;
    export = from;
}
declare module "core-js/fn/array/includes" {
    var includes: typeof core.Array.includes;
    export = includes;
}
declare module "core-js/fn/array/index-of" {
    var indexOf: typeof core.Array.indexOf;
    export = indexOf;
}
declare module "core-js/fn/array/join" {
    var join: typeof core.Array.join;
    export = join;
}
declare module "core-js/fn/array/keys" {
    var keys: typeof core.Array.keys;
    export = keys;
}
declare module "core-js/fn/array/last-index-of" {
    var lastIndexOf: typeof core.Array.lastIndexOf;
    export = lastIndexOf;
}
declare module "core-js/fn/array/map" {
    var map: typeof core.Array.map;
    export = map;
}
declare module "core-js/fn/array/of" {
    var of: typeof core.Array.of;
    export = of;
}
declare module "core-js/fn/array/pop" {
    var pop: typeof core.Array.pop;
    export = pop;
}
declare module "core-js/fn/array/push" {
    var push: typeof core.Array.push;
    export = push;
}
declare module "core-js/fn/array/reduce" {
    var reduce: typeof core.Array.reduce;
    export = reduce;
}
declare module "core-js/fn/array/reduce-right" {
    var reduceRight: typeof core.Array.reduceRight;
    export = reduceRight;
}
declare module "core-js/fn/array/reverse" {
    var reverse: typeof core.Array.reverse;
    export = reverse;
}
declare module "core-js/fn/array/shift" {
    var shift: typeof core.Array.shift;
    export = shift;
}
declare module "core-js/fn/array/slice" {
    var slice: typeof core.Array.slice;
    export = slice;
}
declare module "core-js/fn/array/some" {
    var some: typeof core.Array.some;
    export = some;
}
declare module "core-js/fn/array/sort" {
    var sort: typeof core.Array.sort;
    export = sort;
}
declare module "core-js/fn/array/splice" {
    var splice: typeof core.Array.splice;
    export = splice;
}
declare module "core-js/fn/array/turn" {
    var turn: typeof core.Array.turn;
    export = turn;
}
declare module "core-js/fn/array/unshift" {
    var unshift: typeof core.Array.unshift;
    export = unshift;
}
declare module "core-js/fn/array/values" {
    var values: typeof core.Array.values;
    export = values;
}
declare module "core-js/fn/date" {
    var Date: typeof core.Date;
    export = Date;
}
declare module "core-js/fn/date/add-locale" {
    var addLocale: typeof core.addLocale;
    export = addLocale;
}
declare module "core-js/fn/date/format" {
    var format: typeof core.Date.format;
    export = format;
}
declare module "core-js/fn/date/formatUTC" {
    var formatUTC: typeof core.Date.formatUTC;
    export = formatUTC;
}
declare module "core-js/fn/function" {
    var Function: typeof core.Function;
    export = Function;
}
declare module "core-js/fn/function/has-instance" {
    var hasInstance: (value: any) => boolean;
    export = hasInstance;
}
declare module "core-js/fn/function/name"
{
}
declare module "core-js/fn/function/part" {
    var part: typeof core.Function.part;
    export = part;
}
declare module "core-js/fn/math" {
    var Math: typeof core.Math;
    export = Math;
}
declare module "core-js/fn/math/acosh" {
    var acosh: typeof core.Math.acosh;
    export = acosh;
}
declare module "core-js/fn/math/asinh" {
    var asinh: typeof core.Math.asinh;
    export = asinh;
}
declare module "core-js/fn/math/atanh" {
    var atanh: typeof core.Math.atanh;
    export = atanh;
}
declare module "core-js/fn/math/cbrt" {
    var cbrt: typeof core.Math.cbrt;
    export = cbrt;
}
declare module "core-js/fn/math/clz32" {
    var clz32: typeof core.Math.clz32;
    export = clz32;
}
declare module "core-js/fn/math/cosh" {
    var cosh: typeof core.Math.cosh;
    export = cosh;
}
declare module "core-js/fn/math/expm1" {
    var expm1: typeof core.Math.expm1;
    export = expm1;
}
declare module "core-js/fn/math/fround" {
    var fround: typeof core.Math.fround;
    export = fround;
}
declare module "core-js/fn/math/hypot" {
    var hypot: typeof core.Math.hypot;
    export = hypot;
}
declare module "core-js/fn/math/imul" {
    var imul: typeof core.Math.imul;
    export = imul;
}
declare module "core-js/fn/math/log10" {
    var log10: typeof core.Math.log10;
    export = log10;
}
declare module "core-js/fn/math/log1p" {
    var log1p: typeof core.Math.log1p;
    export = log1p;
}
declare module "core-js/fn/math/log2" {
    var log2: typeof core.Math.log2;
    export = log2;
}
declare module "core-js/fn/math/sign" {
    var sign: typeof core.Math.sign;
    export = sign;
}
declare module "core-js/fn/math/sinh" {
    var sinh: typeof core.Math.sinh;
    export = sinh;
}
declare module "core-js/fn/math/tanh" {
    var tanh: typeof core.Math.tanh;
    export = tanh;
}
declare module "core-js/fn/math/trunc" {
    var trunc: typeof core.Math.trunc;
    export = trunc;
}
declare module "core-js/fn/number" {
    var Number: typeof core.Number;
    export = Number;
}
declare module "core-js/fn/number/epsilon" {
    var EPSILON: typeof core.Number.EPSILON;
    export = EPSILON;
}
declare module "core-js/fn/number/is-finite" {
    var isFinite: typeof core.Number.isFinite;
    export = isFinite;
}
declare module "core-js/fn/number/is-integer" {
    var isInteger: typeof core.Number.isInteger;
    export = isInteger;
}
declare module "core-js/fn/number/is-nan" {
    var isNaN: typeof core.Number.isNaN;
    export = isNaN;
}
declare module "core-js/fn/number/is-safe-integer" {
    var isSafeInteger: typeof core.Number.isSafeInteger;
    export = isSafeInteger;
}
declare module "core-js/fn/number/max-safe-integer" {
    var MAX_SAFE_INTEGER: typeof core.Number.MAX_SAFE_INTEGER;
    export = MAX_SAFE_INTEGER;
}
declare module "core-js/fn/number/min-safe-interger" {
    var MIN_SAFE_INTEGER: typeof core.Number.MIN_SAFE_INTEGER;
    export = MIN_SAFE_INTEGER;
}
declare module "core-js/fn/number/parse-float" {
    var parseFloat: typeof core.Number.parseFloat;
    export = parseFloat;
}
declare module "core-js/fn/number/parse-int" {
    var parseInt: typeof core.Number.parseInt;
    export = parseInt;
}
declare module "core-js/fn/number/random" {
    var random: typeof core.Number.random;
    export = random;
}
declare module "core-js/fn/object" {
    var Object: typeof core.Object;
    export = Object;
}
declare module "core-js/fn/object/assign" {
    var assign: typeof core.Object.assign;
    export = assign;
}
declare module "core-js/fn/object/classof" {
    var classof: typeof core.Object.classof;
    export = classof;
}
declare module "core-js/fn/object/create" {
    var create: typeof core.Object.create;
    export = create;
}
declare module "core-js/fn/object/define" {
    var define: typeof core.Object.define;
    export = define;
}
declare module "core-js/fn/object/define-properties" {
    var defineProperties: typeof core.Object.defineProperties;
    export = defineProperties;
}
declare module "core-js/fn/object/define-property" {
    var defineProperty: typeof core.Object.defineProperty;
    export = defineProperty;
}
declare module "core-js/fn/object/entries" {
    var entries: typeof core.Object.entries;
    export = entries;
}
declare module "core-js/fn/object/freeze" {
    var freeze: typeof core.Object.freeze;
    export = freeze;
}
declare module "core-js/fn/object/get-own-property-descriptor" {
    var getOwnPropertyDescriptor: typeof core.Object.getOwnPropertyDescriptor;
    export = getOwnPropertyDescriptor;
}
declare module "core-js/fn/object/get-own-property-descriptors" {
    var getOwnPropertyDescriptors: typeof core.Object.getOwnPropertyDescriptors;
    export = getOwnPropertyDescriptors;
}
declare module "core-js/fn/object/get-own-property-names" {
    var getOwnPropertyNames: typeof core.Object.getOwnPropertyNames;
    export = getOwnPropertyNames;
}
declare module "core-js/fn/object/get-own-property-symbols" {
    var getOwnPropertySymbols: typeof core.Object.getOwnPropertySymbols;
    export = getOwnPropertySymbols;
}
declare module "core-js/fn/object/get-prototype-of" {
    var getPrototypeOf: typeof core.Object.getPrototypeOf;
    export = getPrototypeOf;
}
declare module "core-js/fn/object/is" {
    var is: typeof core.Object.is;
    export = is;
}
declare module "core-js/fn/object/is-extensible" {
    var isExtensible: typeof core.Object.isExtensible;
    export = isExtensible;
}
declare module "core-js/fn/object/is-frozen" {
    var isFrozen: typeof core.Object.isFrozen;
    export = isFrozen;
}
declare module "core-js/fn/object/is-object" {
    var isObject: typeof core.Object.isObject;
    export = isObject;
}
declare module "core-js/fn/object/is-sealed" {
    var isSealed: typeof core.Object.isSealed;
    export = isSealed;
}
declare module "core-js/fn/object/keys" {
    var keys: typeof core.Object.keys;
    export = keys;
}
declare module "core-js/fn/object/make" {
    var make: typeof core.Object.make;
    export = make;
}
declare module "core-js/fn/object/prevent-extensions" {
    var preventExtensions: typeof core.Object.preventExtensions;
    export = preventExtensions;
}
declare module "core-js/fn/object/seal" {
    var seal: typeof core.Object.seal;
    export = seal;
}
declare module "core-js/fn/object/set-prototype-of" {
    var setPrototypeOf: typeof core.Object.setPrototypeOf;
    export = setPrototypeOf;
}
declare module "core-js/fn/object/values" {
    var values: typeof core.Object.values;
    export = values;
}
declare module "core-js/fn/reflect" {
    var Reflect: typeof core.Reflect;
    export = Reflect;
}
declare module "core-js/fn/reflect/apply" {
    var apply: typeof core.Reflect.apply;
    export = apply;
}
declare module "core-js/fn/reflect/construct" {
    var construct: typeof core.Reflect.construct;
    export = construct;
}
declare module "core-js/fn/reflect/define-property" {
    var defineProperty: typeof core.Reflect.defineProperty;
    export = defineProperty;
}
declare module "core-js/fn/reflect/delete-property" {
    var deleteProperty: typeof core.Reflect.deleteProperty;
    export = deleteProperty;
}
declare module "core-js/fn/reflect/enumerate" {
    var enumerate: typeof core.Reflect.enumerate;
    export = enumerate;
}
declare module "core-js/fn/reflect/get" {
    var get: typeof core.Reflect.get;
    export = get;
}
declare module "core-js/fn/reflect/get-own-property-descriptor" {
    var getOwnPropertyDescriptor: typeof core.Reflect.getOwnPropertyDescriptor;
    export = getOwnPropertyDescriptor;
}
declare module "core-js/fn/reflect/get-prototype-of" {
    var getPrototypeOf: typeof core.Reflect.getPrototypeOf;
    export = getPrototypeOf;
}
declare module "core-js/fn/reflect/has" {
    var has: typeof core.Reflect.has;
    export = has;
}
declare module "core-js/fn/reflect/is-extensible" {
    var isExtensible: typeof core.Reflect.isExtensible;
    export = isExtensible;
}
declare module "core-js/fn/reflect/own-keys" {
    var ownKeys: typeof core.Reflect.ownKeys;
    export = ownKeys;
}
declare module "core-js/fn/reflect/prevent-extensions" {
    var preventExtensions: typeof core.Reflect.preventExtensions;
    export = preventExtensions;
}
declare module "core-js/fn/reflect/set" {
    var set: typeof core.Reflect.set;
    export = set;
}
declare module "core-js/fn/reflect/set-prototype-of" {
    var setPrototypeOf: typeof core.Reflect.setPrototypeOf;
    export = setPrototypeOf;
}
declare module "core-js/fn/regexp" {
    var RegExp: typeof core.RegExp;
    export = RegExp;
}
declare module "core-js/fn/regexp/escape" {
    var escape: typeof core.RegExp.escape;
    export = escape;
}
declare module "core-js/fn/string" {
    var String: typeof core.String;
    export = String;
}
declare module "core-js/fn/string/at" {
    var at: typeof core.String.at;
    export = at;
}
declare module "core-js/fn/string/code-point-at" {
    var codePointAt: typeof core.String.codePointAt;
    export = codePointAt;
}
declare module "core-js/fn/string/ends-with" {
    var endsWith: typeof core.String.endsWith;
    export = endsWith;
}
declare module "core-js/fn/string/escape-html" {
    var escapeHTML: typeof core.String.escapeHTML;
    export = escapeHTML;
}
declare module "core-js/fn/string/from-code-point" {
    var fromCodePoint: typeof core.String.fromCodePoint;
    export = fromCodePoint;
}
declare module "core-js/fn/string/includes" {
    var includes: typeof core.String.includes;
    export = includes;
}
declare module "core-js/fn/string/lpad" {
    var lpad: typeof core.String.lpad;
    export = lpad;
}
declare module "core-js/fn/string/raw" {
    var raw: typeof core.String.raw;
    export = raw;
}
declare module "core-js/fn/string/repeat" {
    var repeat: typeof core.String.repeat;
    export = repeat;
}
declare module "core-js/fn/string/rpad" {
    var rpad: typeof core.String.rpad;
    export = rpad;
}
declare module "core-js/fn/string/starts-with" {
    var startsWith: typeof core.String.startsWith;
    export = startsWith;
}
declare module "core-js/fn/string/unescape-html" {
    var unescapeHTML: typeof core.String.unescapeHTML;
    export = unescapeHTML;
}
declare module "core-js/fn/symbol" {
    var Symbol: typeof core.Symbol;
    export = Symbol;
}
declare module "core-js/fn/symbol/for" {
    var _for: typeof core.Symbol.for;
    export = _for;
}
declare module "core-js/fn/symbol/has-instance" {
    var hasInstance: typeof core.Symbol.hasInstance;
    export = hasInstance;
}
declare module "core-js/fn/symbol/is-concat-spreadable" {
    var isConcatSpreadable: typeof core.Symbol.isConcatSpreadable;
    export = isConcatSpreadable;
}
declare module "core-js/fn/symbol/iterator" {
    var iterator: typeof core.Symbol.iterator;
    export = iterator;
}
declare module "core-js/fn/symbol/key-for" {
    var keyFor: typeof core.Symbol.keyFor;
    export = keyFor;
}
declare module "core-js/fn/symbol/match" {
    var match: typeof core.Symbol.match;
    export = match;
}
declare module "core-js/fn/symbol/replace" {
    var replace: typeof core.Symbol.replace;
    export = replace;
}
declare module "core-js/fn/symbol/search" {
    var search: typeof core.Symbol.search;
    export = search;
}
declare module "core-js/fn/symbol/species" {
    var species: typeof core.Symbol.species;
    export = species;
}
declare module "core-js/fn/symbol/split" {
    var split: typeof core.Symbol.split;
    export = split;
}
declare module "core-js/fn/symbol/to-primitive" {
    var toPrimitive: typeof core.Symbol.toPrimitive;
    export = toPrimitive;
}
declare module "core-js/fn/symbol/to-string-tag" {
    var toStringTag: typeof core.Symbol.toStringTag;
    export = toStringTag;
}
declare module "core-js/fn/symbol/unscopables" {
    var unscopables: typeof core.Symbol.unscopables;
    export = unscopables;
}
declare module "core-js/es5" {
    export = core;
}
declare module "core-js/es6" {
    export = core;
}
declare module "core-js/es6/array" {
    var Array: typeof core.Array;
    export = Array;
}
declare module "core-js/es6/function" {
    var Function: typeof core.Function;
    export = Function;
}
declare module "core-js/es6/map" {
    var Map: typeof core.Map;
    export = Map;
}
declare module "core-js/es6/math" {
    var Math: typeof core.Math;
    export = Math;
}
declare module "core-js/es6/number" {
    var Number: typeof core.Number;
    export = Number;
}
declare module "core-js/es6/object" {
    var Object: typeof core.Object;
    export = Object;
}
declare module "core-js/es6/promise" {
    var Promise: typeof core.Promise;
    export = Promise;
}
declare module "core-js/es6/reflect" {
    var Reflect: typeof core.Reflect;
    export = Reflect;
}
declare module "core-js/es6/regexp" {
    var RegExp: typeof core.RegExp;
    export = RegExp;
}
declare module "core-js/es6/set" {
    var Set: typeof core.Set;
    export = Set;
}
declare module "core-js/es6/string" {
    var String: typeof core.String;
    export = String;
}
declare module "core-js/es6/symbol" {
    var Symbol: typeof core.Symbol;
    export = Symbol;
}
declare module "core-js/es6/weak-map" {
    var WeakMap: typeof core.WeakMap;
    export = WeakMap;
}
declare module "core-js/es6/weak-set" {
    var WeakSet: typeof core.WeakSet;
    export = WeakSet;
}
declare module "core-js/es7" {
    export = core;
}
declare module "core-js/es7/array" {
    var Array: typeof core.Array;
    export = Array;
}
declare module "core-js/es7/map" {
    var Map: typeof core.Map;
    export = Map;
}
declare module "core-js/es7/object" {
    var Object: typeof core.Object;
    export = Object;
}
declare module "core-js/es7/regexp" {
    var RegExp: typeof core.RegExp;
    export = RegExp;
}
declare module "core-js/es7/set" {
    var Set: typeof core.Set;
    export = Set;
}
declare module "core-js/es7/string" {
    var String: typeof core.String;
    export = String;
}
declare module "core-js/js" {
    export = core;
}
declare module "core-js/js/array" {
    var Array: typeof core.Array;
    export = Array;
}
declare module "core-js/web" {
    export = core;
}
declare module "core-js/web/dom" {
    export = core;
}
declare module "core-js/web/immediate" {
    export = core;
}
declare module "core-js/web/timers" {
    export = core;
}
declare module "core-js/library" {
    export = core;
}
declare module "core-js/library/shim" {
    export = core;
}
declare module "core-js/library/core" {
    export = core;
}
declare module "core-js/library/core/$for" {
    import $for = core.$for;
    export = $for;
}
declare module "core-js/library/core/_" {
    var _: typeof core._;
    export = _;
}
declare module "core-js/library/core/array" {
    var Array: typeof core.Array;
    export = Array;
}
declare module "core-js/library/core/date" {
    var Date: typeof core.Date;
    export = Date;
}
declare module "core-js/library/core/delay" {
    var delay: typeof core.delay;
    export = delay;
}
declare module "core-js/library/core/dict" {
    var Dict: typeof core.Dict;
    export = Dict;
}
declare module "core-js/library/core/function" {
    var Function: typeof core.Function;
    export = Function;
}
declare module "core-js/library/core/global" {
    var global: typeof core.global;
    export = global;
}
declare module "core-js/library/core/log" {
    var log: typeof core.log;
    export = log;
}
declare module "core-js/library/core/number" {
    var Number: typeof core.Number;
    export = Number;
}
declare module "core-js/library/core/object" {
    var Object: typeof core.Object;
    export = Object;
}
declare module "core-js/library/core/string" {
    var String: typeof core.String;
    export = String;
}
declare module "core-js/library/fn/$for" {
    import $for = core.$for;
    export = $for;
}
declare module "core-js/library/fn/_" {
    var _: typeof core._;
    export = _;
}
declare module "core-js/library/fn/clear-immediate" {
    var clearImmediate: typeof core.clearImmediate;
    export = clearImmediate;
}
declare module "core-js/library/fn/delay" {
    var delay: typeof core.delay;
    export = delay;
}
declare module "core-js/library/fn/dict" {
    var Dict: typeof core.Dict;
    export = Dict;
}
declare module "core-js/library/fn/get-iterator" {
    var getIterator: typeof core.getIterator;
    export = getIterator;
}
declare module "core-js/library/fn/global" {
    var global: typeof core.global;
    export = global;
}
declare module "core-js/library/fn/is-iterable" {
    var isIterable: typeof core.isIterable;
    export = isIterable;
}
declare module "core-js/library/fn/log" {
    var log: typeof core.log;
    export = log;
}
declare module "core-js/library/fn/map" {
    var Map: typeof core.Map;
    export = Map;
}
declare module "core-js/library/fn/promise" {
    var Promise: typeof core.Promise;
    export = Promise;
}
declare module "core-js/library/fn/set" {
    var Set: typeof core.Set;
    export = Set;
}
declare module "core-js/library/fn/set-immediate" {
    var setImmediate: typeof core.setImmediate;
    export = setImmediate;
}
declare module "core-js/library/fn/set-interval" {
    var setInterval: typeof core.setInterval;
    export = setInterval;
}
declare module "core-js/library/fn/set-timeout" {
    var setTimeout: typeof core.setTimeout;
    export = setTimeout;
}
declare module "core-js/library/fn/weak-map" {
    var WeakMap: typeof core.WeakMap;
    export = WeakMap;
}
declare module "core-js/library/fn/weak-set" {
    var WeakSet: typeof core.WeakSet;
    export = WeakSet;
}
declare module "core-js/library/fn/array" {
    var Array: typeof core.Array;
    export = Array;
}
declare module "core-js/library/fn/array/concat" {
    var concat: typeof core.Array.concat;
    export = concat;
}
declare module "core-js/library/fn/array/copy-within" {
    var copyWithin: typeof core.Array.copyWithin;
    export = copyWithin;
}
declare module "core-js/library/fn/array/entries" {
    var entries: typeof core.Array.entries;
    export = entries;
}
declare module "core-js/library/fn/array/every" {
    var every: typeof core.Array.every;
    export = every;
}
declare module "core-js/library/fn/array/fill" {
    var fill: typeof core.Array.fill;
    export = fill;
}
declare module "core-js/library/fn/array/filter" {
    var filter: typeof core.Array.filter;
    export = filter;
}
declare module "core-js/library/fn/array/find" {
    var find: typeof core.Array.find;
    export = find;
}
declare module "core-js/library/fn/array/find-index" {
    var findIndex: typeof core.Array.findIndex;
    export = findIndex;
}
declare module "core-js/library/fn/array/for-each" {
    var forEach: typeof core.Array.forEach;
    export = forEach;
}
declare module "core-js/library/fn/array/from" {
    var from: typeof core.Array.from;
    export = from;
}
declare module "core-js/library/fn/array/includes" {
    var includes: typeof core.Array.includes;
    export = includes;
}
declare module "core-js/library/fn/array/index-of" {
    var indexOf: typeof core.Array.indexOf;
    export = indexOf;
}
declare module "core-js/library/fn/array/join" {
    var join: typeof core.Array.join;
    export = join;
}
declare module "core-js/library/fn/array/keys" {
    var keys: typeof core.Array.keys;
    export = keys;
}
declare module "core-js/library/fn/array/last-index-of" {
    var lastIndexOf: typeof core.Array.lastIndexOf;
    export = lastIndexOf;
}
declare module "core-js/library/fn/array/map" {
    var map: typeof core.Array.map;
    export = map;
}
declare module "core-js/library/fn/array/of" {
    var of: typeof core.Array.of;
    export = of;
}
declare module "core-js/library/fn/array/pop" {
    var pop: typeof core.Array.pop;
    export = pop;
}
declare module "core-js/library/fn/array/push" {
    var push: typeof core.Array.push;
    export = push;
}
declare module "core-js/library/fn/array/reduce" {
    var reduce: typeof core.Array.reduce;
    export = reduce;
}
declare module "core-js/library/fn/array/reduce-right" {
    var reduceRight: typeof core.Array.reduceRight;
    export = reduceRight;
}
declare module "core-js/library/fn/array/reverse" {
    var reverse: typeof core.Array.reverse;
    export = reverse;
}
declare module "core-js/library/fn/array/shift" {
    var shift: typeof core.Array.shift;
    export = shift;
}
declare module "core-js/library/fn/array/slice" {
    var slice: typeof core.Array.slice;
    export = slice;
}
declare module "core-js/library/fn/array/some" {
    var some: typeof core.Array.some;
    export = some;
}
declare module "core-js/library/fn/array/sort" {
    var sort: typeof core.Array.sort;
    export = sort;
}
declare module "core-js/library/fn/array/splice" {
    var splice: typeof core.Array.splice;
    export = splice;
}
declare module "core-js/library/fn/array/turn" {
    var turn: typeof core.Array.turn;
    export = turn;
}
declare module "core-js/library/fn/array/unshift" {
    var unshift: typeof core.Array.unshift;
    export = unshift;
}
declare module "core-js/library/fn/array/values" {
    var values: typeof core.Array.values;
    export = values;
}
declare module "core-js/library/fn/date" {
    var Date: typeof core.Date;
    export = Date;
}
declare module "core-js/library/fn/date/add-locale" {
    var addLocale: typeof core.addLocale;
    export = addLocale;
}
declare module "core-js/library/fn/date/format" {
    var format: typeof core.Date.format;
    export = format;
}
declare module "core-js/library/fn/date/formatUTC" {
    var formatUTC: typeof core.Date.formatUTC;
    export = formatUTC;
}
declare module "core-js/library/fn/function" {
    var Function: typeof core.Function;
    export = Function;
}
declare module "core-js/library/fn/function/has-instance" {
    var hasInstance: (value: any) => boolean;
    export = hasInstance;
}
declare module "core-js/library/fn/function/name" {
}
declare module "core-js/library/fn/function/part" {
    var part: typeof core.Function.part;
    export = part;
}
declare module "core-js/library/fn/math" {
    var Math: typeof core.Math;
    export = Math;
}
declare module "core-js/library/fn/math/acosh" {
    var acosh: typeof core.Math.acosh;
    export = acosh;
}
declare module "core-js/library/fn/math/asinh" {
    var asinh: typeof core.Math.asinh;
    export = asinh;
}
declare module "core-js/library/fn/math/atanh" {
    var atanh: typeof core.Math.atanh;
    export = atanh;
}
declare module "core-js/library/fn/math/cbrt" {
    var cbrt: typeof core.Math.cbrt;
    export = cbrt;
}
declare module "core-js/library/fn/math/clz32" {
    var clz32: typeof core.Math.clz32;
    export = clz32;
}
declare module "core-js/library/fn/math/cosh" {
    var cosh: typeof core.Math.cosh;
    export = cosh;
}
declare module "core-js/library/fn/math/expm1" {
    var expm1: typeof core.Math.expm1;
    export = expm1;
}
declare module "core-js/library/fn/math/fround" {
    var fround: typeof core.Math.fround;
    export = fround;
}
declare module "core-js/library/fn/math/hypot" {
    var hypot: typeof core.Math.hypot;
    export = hypot;
}
declare module "core-js/library/fn/math/imul" {
    var imul: typeof core.Math.imul;
    export = imul;
}
declare module "core-js/library/fn/math/log10" {
    var log10: typeof core.Math.log10;
    export = log10;
}
declare module "core-js/library/fn/math/log1p" {
    var log1p: typeof core.Math.log1p;
    export = log1p;
}
declare module "core-js/library/fn/math/log2" {
    var log2: typeof core.Math.log2;
    export = log2;
}
declare module "core-js/library/fn/math/sign" {
    var sign: typeof core.Math.sign;
    export = sign;
}
declare module "core-js/library/fn/math/sinh" {
    var sinh: typeof core.Math.sinh;
    export = sinh;
}
declare module "core-js/library/fn/math/tanh" {
    var tanh: typeof core.Math.tanh;
    export = tanh;
}
declare module "core-js/library/fn/math/trunc" {
    var trunc: typeof core.Math.trunc;
    export = trunc;
}
declare module "core-js/library/fn/number" {
    var Number: typeof core.Number;
    export = Number;
}
declare module "core-js/library/fn/number/epsilon" {
    var EPSILON: typeof core.Number.EPSILON;
    export = EPSILON;
}
declare module "core-js/library/fn/number/is-finite" {
    var isFinite: typeof core.Number.isFinite;
    export = isFinite;
}
declare module "core-js/library/fn/number/is-integer" {
    var isInteger: typeof core.Number.isInteger;
    export = isInteger;
}
declare module "core-js/library/fn/number/is-nan" {
    var isNaN: typeof core.Number.isNaN;
    export = isNaN;
}
declare module "core-js/library/fn/number/is-safe-integer" {
    var isSafeInteger: typeof core.Number.isSafeInteger;
    export = isSafeInteger;
}
declare module "core-js/library/fn/number/max-safe-integer" {
    var MAX_SAFE_INTEGER: typeof core.Number.MAX_SAFE_INTEGER;
    export = MAX_SAFE_INTEGER;
}
declare module "core-js/library/fn/number/min-safe-interger" {
    var MIN_SAFE_INTEGER: typeof core.Number.MIN_SAFE_INTEGER;
    export = MIN_SAFE_INTEGER;
}
declare module "core-js/library/fn/number/parse-float" {
    var parseFloat: typeof core.Number.parseFloat;
    export = parseFloat;
}
declare module "core-js/library/fn/number/parse-int" {
    var parseInt: typeof core.Number.parseInt;
    export = parseInt;
}
declare module "core-js/library/fn/number/random" {
    var random: typeof core.Number.random;
    export = random;
}
declare module "core-js/library/fn/object" {
    var Object: typeof core.Object;
    export = Object;
}
declare module "core-js/library/fn/object/assign" {
    var assign: typeof core.Object.assign;
    export = assign;
}
declare module "core-js/library/fn/object/classof" {
    var classof: typeof core.Object.classof;
    export = classof;
}
declare module "core-js/library/fn/object/create" {
    var create: typeof core.Object.create;
    export = create;
}
declare module "core-js/library/fn/object/define" {
    var define: typeof core.Object.define;
    export = define;
}
declare module "core-js/library/fn/object/define-properties" {
    var defineProperties: typeof core.Object.defineProperties;
    export = defineProperties;
}
declare module "core-js/library/fn/object/define-property" {
    var defineProperty: typeof core.Object.defineProperty;
    export = defineProperty;
}
declare module "core-js/library/fn/object/entries" {
    var entries: typeof core.Object.entries;
    export = entries;
}
declare module "core-js/library/fn/object/freeze" {
    var freeze: typeof core.Object.freeze;
    export = freeze;
}
declare module "core-js/library/fn/object/get-own-property-descriptor" {
    var getOwnPropertyDescriptor: typeof core.Object.getOwnPropertyDescriptor;
    export = getOwnPropertyDescriptor;
}
declare module "core-js/library/fn/object/get-own-property-descriptors" {
    var getOwnPropertyDescriptors: typeof core.Object.getOwnPropertyDescriptors;
    export = getOwnPropertyDescriptors;
}
declare module "core-js/library/fn/object/get-own-property-names" {
    var getOwnPropertyNames: typeof core.Object.getOwnPropertyNames;
    export = getOwnPropertyNames;
}
declare module "core-js/library/fn/object/get-own-property-symbols" {
    var getOwnPropertySymbols: typeof core.Object.getOwnPropertySymbols;
    export = getOwnPropertySymbols;
}
declare module "core-js/library/fn/object/get-prototype-of" {
    var getPrototypeOf: typeof core.Object.getPrototypeOf;
    export = getPrototypeOf;
}
declare module "core-js/library/fn/object/is" {
    var is: typeof core.Object.is;
    export = is;
}
declare module "core-js/library/fn/object/is-extensible" {
    var isExtensible: typeof core.Object.isExtensible;
    export = isExtensible;
}
declare module "core-js/library/fn/object/is-frozen" {
    var isFrozen: typeof core.Object.isFrozen;
    export = isFrozen;
}
declare module "core-js/library/fn/object/is-object" {
    var isObject: typeof core.Object.isObject;
    export = isObject;
}
declare module "core-js/library/fn/object/is-sealed" {
    var isSealed: typeof core.Object.isSealed;
    export = isSealed;
}
declare module "core-js/library/fn/object/keys" {
    var keys: typeof core.Object.keys;
    export = keys;
}
declare module "core-js/library/fn/object/make" {
    var make: typeof core.Object.make;
    export = make;
}
declare module "core-js/library/fn/object/prevent-extensions" {
    var preventExtensions: typeof core.Object.preventExtensions;
    export = preventExtensions;
}
declare module "core-js/library/fn/object/seal" {
    var seal: typeof core.Object.seal;
    export = seal;
}
declare module "core-js/library/fn/object/set-prototype-of" {
    var setPrototypeOf: typeof core.Object.setPrototypeOf;
    export = setPrototypeOf;
}
declare module "core-js/library/fn/object/values" {
    var values: typeof core.Object.values;
    export = values;
}
declare module "core-js/library/fn/reflect" {
    var Reflect: typeof core.Reflect;
    export = Reflect;
}
declare module "core-js/library/fn/reflect/apply" {
    var apply: typeof core.Reflect.apply;
    export = apply;
}
declare module "core-js/library/fn/reflect/construct" {
    var construct: typeof core.Reflect.construct;
    export = construct;
}
declare module "core-js/library/fn/reflect/define-property" {
    var defineProperty: typeof core.Reflect.defineProperty;
    export = defineProperty;
}
declare module "core-js/library/fn/reflect/delete-property" {
    var deleteProperty: typeof core.Reflect.deleteProperty;
    export = deleteProperty;
}
declare module "core-js/library/fn/reflect/enumerate" {
    var enumerate: typeof core.Reflect.enumerate;
    export = enumerate;
}
declare module "core-js/library/fn/reflect/get" {
    var get: typeof core.Reflect.get;
    export = get;
}
declare module "core-js/library/fn/reflect/get-own-property-descriptor" {
    var getOwnPropertyDescriptor: typeof core.Reflect.getOwnPropertyDescriptor;
    export = getOwnPropertyDescriptor;
}
declare module "core-js/library/fn/reflect/get-prototype-of" {
    var getPrototypeOf: typeof core.Reflect.getPrototypeOf;
    export = getPrototypeOf;
}
declare module "core-js/library/fn/reflect/has" {
    var has: typeof core.Reflect.has;
    export = has;
}
declare module "core-js/library/fn/reflect/is-extensible" {
    var isExtensible: typeof core.Reflect.isExtensible;
    export = isExtensible;
}
declare module "core-js/library/fn/reflect/own-keys" {
    var ownKeys: typeof core.Reflect.ownKeys;
    export = ownKeys;
}
declare module "core-js/library/fn/reflect/prevent-extensions" {
    var preventExtensions: typeof core.Reflect.preventExtensions;
    export = preventExtensions;
}
declare module "core-js/library/fn/reflect/set" {
    var set: typeof core.Reflect.set;
    export = set;
}
declare module "core-js/library/fn/reflect/set-prototype-of" {
    var setPrototypeOf: typeof core.Reflect.setPrototypeOf;
    export = setPrototypeOf;
}
declare module "core-js/library/fn/regexp" {
    var RegExp: typeof core.RegExp;
    export = RegExp;
}
declare module "core-js/library/fn/regexp/escape" {
    var escape: typeof core.RegExp.escape;
    export = escape;
}
declare module "core-js/library/fn/string" {
    var String: typeof core.String;
    export = String;
}
declare module "core-js/library/fn/string/at" {
    var at: typeof core.String.at;
    export = at;
}
declare module "core-js/library/fn/string/code-point-at" {
    var codePointAt: typeof core.String.codePointAt;
    export = codePointAt;
}
declare module "core-js/library/fn/string/ends-with" {
    var endsWith: typeof core.String.endsWith;
    export = endsWith;
}
declare module "core-js/library/fn/string/escape-html" {
    var escapeHTML: typeof core.String.escapeHTML;
    export = escapeHTML;
}
declare module "core-js/library/fn/string/from-code-point" {
    var fromCodePoint: typeof core.String.fromCodePoint;
    export = fromCodePoint;
}
declare module "core-js/library/fn/string/includes" {
    var includes: typeof core.String.includes;
    export = includes;
}
declare module "core-js/library/fn/string/lpad" {
    var lpad: typeof core.String.lpad;
    export = lpad;
}
declare module "core-js/library/fn/string/raw" {
    var raw: typeof core.String.raw;
    export = raw;
}
declare module "core-js/library/fn/string/repeat" {
    var repeat: typeof core.String.repeat;
    export = repeat;
}
declare module "core-js/library/fn/string/rpad" {
    var rpad: typeof core.String.rpad;
    export = rpad;
}
declare module "core-js/library/fn/string/starts-with" {
    var startsWith: typeof core.String.startsWith;
    export = startsWith;
}
declare module "core-js/library/fn/string/unescape-html" {
    var unescapeHTML: typeof core.String.unescapeHTML;
    export = unescapeHTML;
}
declare module "core-js/library/fn/symbol" {
    var Symbol: typeof core.Symbol;
    export = Symbol;
}
declare module "core-js/library/fn/symbol/for" {
    var _for: typeof core.Symbol.for;
    export = _for;
}
declare module "core-js/library/fn/symbol/has-instance" {
    var hasInstance: typeof core.Symbol.hasInstance;
    export = hasInstance;
}
declare module "core-js/library/fn/symbol/is-concat-spreadable" {
    var isConcatSpreadable: typeof core.Symbol.isConcatSpreadable;
    export = isConcatSpreadable;
}
declare module "core-js/library/fn/symbol/iterator" {
    var iterator: typeof core.Symbol.iterator;
    export = iterator;
}
declare module "core-js/library/fn/symbol/key-for" {
    var keyFor: typeof core.Symbol.keyFor;
    export = keyFor;
}
declare module "core-js/library/fn/symbol/match" {
    var match: typeof core.Symbol.match;
    export = match;
}
declare module "core-js/library/fn/symbol/replace" {
    var replace: typeof core.Symbol.replace;
    export = replace;
}
declare module "core-js/library/fn/symbol/search" {
    var search: typeof core.Symbol.search;
    export = search;
}
declare module "core-js/library/fn/symbol/species" {
    var species: typeof core.Symbol.species;
    export = species;
}
declare module "core-js/library/fn/symbol/split" {
    var split: typeof core.Symbol.split;
    export = split;
}
declare module "core-js/library/fn/symbol/to-primitive" {
    var toPrimitive: typeof core.Symbol.toPrimitive;
    export = toPrimitive;
}
declare module "core-js/library/fn/symbol/to-string-tag" {
    var toStringTag: typeof core.Symbol.toStringTag;
    export = toStringTag;
}
declare module "core-js/library/fn/symbol/unscopables" {
    var unscopables: typeof core.Symbol.unscopables;
    export = unscopables;
}
declare module "core-js/library/es5" {
    export = core;
}
declare module "core-js/library/es6" {
    export = core;
}
declare module "core-js/library/es6/array" {
    var Array: typeof core.Array;
    export = Array;
}
declare module "core-js/library/es6/function" {
    var Function: typeof core.Function;
    export = Function;
}
declare module "core-js/library/es6/map" {
    var Map: typeof core.Map;
    export = Map;
}
declare module "core-js/library/es6/math" {
    var Math: typeof core.Math;
    export = Math;
}
declare module "core-js/library/es6/number" {
    var Number: typeof core.Number;
    export = Number;
}
declare module "core-js/library/es6/object" {
    var Object: typeof core.Object;
    export = Object;
}
declare module "core-js/library/es6/promise" {
    var Promise: typeof core.Promise;
    export = Promise;
}
declare module "core-js/library/es6/reflect" {
    var Reflect: typeof core.Reflect;
    export = Reflect;
}
declare module "core-js/library/es6/regexp" {
    var RegExp: typeof core.RegExp;
    export = RegExp;
}
declare module "core-js/library/es6/set" {
    var Set: typeof core.Set;
    export = Set;
}
declare module "core-js/library/es6/string" {
    var String: typeof core.String;
    export = String;
}
declare module "core-js/library/es6/symbol" {
    var Symbol: typeof core.Symbol;
    export = Symbol;
}
declare module "core-js/library/es6/weak-map" {
    var WeakMap: typeof core.WeakMap;
    export = WeakMap;
}
declare module "core-js/library/es6/weak-set" {
    var WeakSet: typeof core.WeakSet;
    export = WeakSet;
}
declare module "core-js/library/es7" {
    export = core;
}
declare module "core-js/library/es7/array" {
    var Array: typeof core.Array;
    export = Array;
}
declare module "core-js/library/es7/map" {
    var Map: typeof core.Map;
    export = Map;
}
declare module "core-js/library/es7/object" {
    var Object: typeof core.Object;
    export = Object;
}
declare module "core-js/library/es7/regexp" {
    var RegExp: typeof core.RegExp;
    export = RegExp;
}
declare module "core-js/library/es7/set" {
    var Set: typeof core.Set;
    export = Set;
}
declare module "core-js/library/es7/string" {
    var String: typeof core.String;
    export = String;
}
declare module "core-js/library/js" {
    export = core;
}
declare module "core-js/library/js/array" {
    var Array: typeof core.Array;
    export = Array;
}
declare module "core-js/library/web" {
    export = core;
}
declare module "core-js/library/web/dom" {
    export = core;
}
declare module "core-js/library/web/immediate" {
    export = core;
}
declare module "core-js/library/web/timers" {
    export = core;
}