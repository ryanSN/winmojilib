import cheerio from 'cheerio';
import slug from '../../helpers/slug';
import toSnakeCase from '../../helpers/snakeCase';
import { EXCLUDED_SUBGROUPS } from '../../constants';
import { chartreuse } from 'color-name';

interface GroupNameMap {
    [name: string]: number;
}

interface GroupIndexMap {
    [index: string]: string;
}

interface GroupCache {
    groups: GroupIndexMap;
    subgroups: GroupIndexMap;
}

function swapKeyValues(data: GroupIndexMap): GroupNameMap {
    const object: GroupNameMap = {};

    //console.log('dataKey', data);
    if (data) {
        Object.keys(data).forEach((key) => {
            object[data[key]] = Number(key);
        });
    }

    return object;
}

const parseEmojiList = (content: string) => {
    const xml = cheerio.load(content, { xmlMode: true });
    const groupCache = {} as GroupCache;
    const groups = {};
    const subgroups = {};
    const data = {} as any;
    let group = '';
    let groupName = '';
    let subgroup = '';
    let subgroupName = '';

    xml('table')
        .first()
        .find('tr')
        .each((i, row) => {
            const tr = xml(row);
            const groupRow = tr.find('.bighead');
            const subgroupRow = tr.find('.mediumhead');
            const headerRow = tr.find('.center');

            // Group
            if (groupRow.length > 0) {
                groupName = slug(groupRow.find('a').text());
                group = groupName;
                // Subgroup
            } else if (subgroupRow.length > 0) {
                subgroupName = slug(subgroupRow.find('a').text());
                subgroup = subgroupName; //subgroups[subgroupName];
                // Header
            } else if (headerRow.length > 0) {
                // Skip emoji
            } else {
                if (EXCLUDED_SUBGROUPS.includes(subgroup)) {
                    return;
                }
                const hexcode = String(tr.find('.code').find('a').attr('name'))
                    .toUpperCase()
                    .replace(/_/g, '-');
                const name = tr.find('.name').eq(0).text();
                const keywords = tr
                    .find('.name')
                    .eq(1)
                    .text()
                    .split('|')
                    .map((item) => {
                        return item.trim();
                    });

                // Recently added, not in an official emoji release
                if (name.includes('⊛')) {
                    return;
                }
                const chars = hexcode.split('-').map((i) => parseInt(i.trim(), 16));
                const char = String.fromCodePoint(...chars);

                data[hexcode] = {
                    char,
                    keywords,
                    name: toSnakeCase(name),
                    group,
                    hexcode,
                    subgroup,
                };
            }
        });

    return data;
};

export default parseEmojiList;
