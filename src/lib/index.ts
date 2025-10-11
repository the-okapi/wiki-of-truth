import { writable, type Writable } from 'svelte/store';

type Article = {
	featured: boolean;
	path: string;
	title: string;
	image: string;
	image_alt: string;
};

export const articles: Writable<Article[]> = writable([]);

export const SERVER_URL = 'https://wiki-of-truth.leapcell.app';
