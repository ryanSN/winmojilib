import { loadEmojiList } from './utils/getEmojiList';
import path from 'path';
import fs from 'fs-extra';
import { LATEST_SUPPORTED_EMOJI_VERSION } from './constants';

const DATA_FOLDER = path.resolve(__dirname, '../../data');
const FILENAME = `${LATEST_SUPPORTED_EMOJI_VERSION}/emoji-list-data.json`;

const filePath = path.resolve(DATA_FOLDER, FILENAME);

const runAndSave = async () => {
    const values = await loadEmojiList();
    await fs
        .ensureDir(path.dirname(filePath))
        .then(() => fs.writeFile(filePath, JSON.stringify(values, null, '  '), 'utf-8'))
        .then(() => console.log('Data file written'));
};

runAndSave();
