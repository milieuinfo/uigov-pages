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

const directoryHasFolderOf = (path: string, folders: string[]): boolean =>
    folders.reduce<boolean>((hasFolder: boolean, folder: string) => directoryHasFolder(path, folder), false);

export const processDirectory = (processPath: string, url: string, stopFolders: string[]): Folder[] => {
    if (directoryHasFolderOf(processPath, stopFolders)) {
        return [];
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
                const subfolders = processDirectory(processPath + '/' + dirent.name, folder.url, stopFolders);
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
