/**
 * This file was generated by 'vite-plugin-kit-routes'
 *
 *      >> DO NOT EDIT THIS FILE MANUALLY <<
 */

/**
 * PAGES
 */
const PAGES = {
	'/': `/`,
	'/about': `/about`,
	'/your-face': `/your-face`
};

/**
 * SERVERS
 */
const SERVERS = {};

/**
 * ACTIONS
 */
const ACTIONS = {};

/**
 * LINKS
 */
const LINKS = {
	twitter: `https:/twitter.com/jycouet`,
	github: `https:/github.com/jycouet/kitql`,
	github_avatar: (params: { author: string | number }) => {
		return `https:/avatars.githubusercontent.com/${params.author}`;
	},
	gravatar: (params: { str: string | number; s?: number; d?: 'retro' | 'identicon' }) => {
		params.s = params.s ?? 75;
		params.d = params.d ?? 'identicon';
		return `https:/www.gravatar.com/avatar/${params.str}${appendSp({
			s: params?.s,
			d: params?.d
		})}`;
	}
};

/**
 * Append search params to a string
 */
const appendSp = (sp?: Record<string, string | number | undefined>, prefix: '?' | '&' = '?') => {
	if (sp === undefined) return '';
	const mapping = Object.entries(sp)
		.filter((c) => c[1] !== undefined)
		.map((c) => [c[0], String(c[1])]);

	const formated = new URLSearchParams(mapping).toString();
	if (formated) {
		return `${prefix}${formated}`;
	}
	return '';
};

// route function helpers
type NonFunctionKeys<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];
type FunctionKeys<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T];
type FunctionParams<T> = T extends (...args: infer P) => any ? P : never;

const AllObjs = { ...PAGES, ...ACTIONS, ...SERVERS, ...LINKS };
type AllTypes = typeof AllObjs;

/**
 * To be used like this:
 * ```ts
 * import { route } from './ROUTES'
 *
 * route('site_id', { id: 1 })
 * ```
 */
export function route<T extends FunctionKeys<AllTypes>>(
	key: T,
	...params: FunctionParams<AllTypes[T]>
): string;
export function route<T extends NonFunctionKeys<AllTypes>>(key: T): string;
export function route<T extends keyof AllTypes>(key: T, ...params: any[]): string {
	if (AllObjs[key] instanceof Function) {
		const element = (AllObjs as any)[key] as (...args: any[]) => string;
		return element(...params);
	} else {
		return AllObjs[key] as string;
	}
}

/**
 * Add this type as a generic of the vite plugin `kitRoutes<KIT_ROUTES>`.
 *
 * Full example:
 * ```ts
 * import type { KIT_ROUTES } from './ROUTES'
 * import { kitRoutes } from 'vite-plugin-kit-routes'
 *
 * kitRoutes<KIT_ROUTES>({
 *  PAGES: {
 *    // here, key of object will be typed!
 *  }
 * })
 * ```
 */
export type KIT_ROUTES = {
	PAGES: { '/': never; '/about': never; '/your-face': never };
	SERVERS: Record<string, never>;
	ACTIONS: Record<string, never>;
	LINKS: { twitter: never; github: never; github_avatar: 'author'; gravatar: 'str' };
	Params: { author: never; str: never; s: never; d: never };
};
