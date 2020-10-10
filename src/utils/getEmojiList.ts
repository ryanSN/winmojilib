import { LATEST_EMOJI_VERSION } from '../constants';
import fetch, { RequestInit } from 'node-fetch';
import parseEmojiList from './parsers/parseEmojiList';
import path from 'path';
import fs from 'fs-extra';

const CACHE_FOLDER = path.resolve(__dirname, '../../cache');
const FILENAME = `${LATEST_EMOJI_VERSION}/emoji-source-list.json`;

const readCache = (name: string): string | null => {
    const cachePath = path.resolve(CACHE_FOLDER, name);

    if (fs.existsSync(cachePath)) {
        console.log('cache', `Using ${name} cached data`);
        return JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
    }

    console.log('cache', `No cache data found`);

    return null;
};

export const loadEmojiList = async () => {
    let text = '';
    const url = `https://unicode.org/emoji/charts-${LATEST_EMOJI_VERSION}/emoji-list.html`;
    const cache = readCache(FILENAME);

    if (!cache) {
        console.log('making url call', url);
        try {
            text = await fetch(url).then((response) => {
                if (response.ok) {
                    return response.text();
                }
                throw new Error(`${response.status} ${response.statusText}`);
            });
        } catch (error) {
            console.log('error', error);
        }

        const filePath = path.resolve(CACHE_FOLDER, FILENAME);

        await fs
            .ensureDir(path.dirname(filePath))
            .then(() => fs.writeFile(filePath, JSON.stringify(text, null, '  '), 'utf-8'))
            .then(() => text);
    } else {
        text = cache;
    }

    return parseEmojiList(text);
};
