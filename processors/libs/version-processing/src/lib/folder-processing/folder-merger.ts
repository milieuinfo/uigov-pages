import { Folder } from '../model/folder.model';

const merge = (root: Folder, folders: Folder[]): Folder[] =>
    folders.map((folder: Folder) => ({
        ...folder,
        name: root.name + '/' + folder.name,
    }));

const shouldBeMerged = (folders: Folder[]): boolean => !!folders?.find((folder) => folder?.subfolders?.length);

export const mergeFirstLevelInSecond = (folders: Folder[]) =>
    folders.flatMap((folder: Folder) =>
        shouldBeMerged(folder.subfolders) ? merge(folder, folder.subfolders) : folder
    );
