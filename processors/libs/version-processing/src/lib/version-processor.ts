import * as fs from 'fs';
import * as YAML from 'yaml';
import { processDirectory } from './folder-processor';
import { mergeFirstLevelInSecond } from './folder-merger';
import { sortVersioned } from './folder-sorter';
import { Folder } from './model/folder.model';

export const buildVersionFolders = (path: string): Folder[] => {
    console.log('building versions folders for', path);
    const folders = processDirectory(path, 'build-apps', 'storybook');
    const merged = mergeFirstLevelInSecond(folders);
    return sortVersioned(merged);
};

export const writeYmlFile = (folders: Folder[], path: string) => {
    console.log('writing yml file to', path);
    try {
        fs.writeFileSync(path, YAML.stringify(folders));
    } catch (err) {
        console.error(err);
    }
};
