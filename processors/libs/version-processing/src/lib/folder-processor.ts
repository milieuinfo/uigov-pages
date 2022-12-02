import { Dir, Dirent } from 'fs';
import * as fs from 'fs';
import { Folder } from './model/folder.model';

const directoryHasFolder = (path: string, folder: string): boolean => {
    const dir: Dir = fs.opendirSync(path);
    let dirent: Dirent;
    try {
        while ((dirent = dir.readSync()) !== null) {
            if (dirent.name === folder) {
                return true;
            }
        }
        return false;
    } finally {
        dir.closeSync();
    }
};

export const processDirectory = (processPath: string, url: string, stopFolder: string): Folder[] => {
    if (directoryHasFolder(processPath, stopFolder)) {
        return;
    }
    const folderList: Folder[] = [];
    const dir: Dir = fs.opendirSync(processPath);
    let dirent: Dirent;
    try {
        while ((dirent = dir.readSync()) !== null) {
            const folder: any = {};
            folder.name = dirent.name;
            folder.url = url + '/' + dirent.name;
            if (dirent.isDirectory()) {
                const subfolders = processDirectory(processPath + '/' + dirent.name, folder.url, stopFolder);
                if (subfolders?.length > 0) {
                    folder.subfolders = subfolders;
                }
            }
            folderList.push(folder);
        }
    } finally {
        dir.closeSync();
    }
    return folderList;
};
