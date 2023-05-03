import { Folder } from '../model/folder.model';

const addVersion = (folder: Folder, versionSet: Set<Folder>) => {
    if ((folder.name.match(/\./g) || []).length === 2) {
        versionSet.add(folder);
    }
};

const addVersionFolders = (folders: Folder[], versionSet: Set<Folder>) => {
    folders.forEach((folder) => {
        addVersion(folder, versionSet);
        if (folder.subfolders && folder.subfolders.length > 0) {
            addVersionFolders(folder.subfolders, versionSet);
        }
    });
};

const findHighestVersionFolder = (folderSet: Set<Folder>): Folder => {
    let highestNumber = 0;
    let highestVersionFolder: Folder = null;
    folderSet.forEach((folder: Folder) => {
        const versionNumberString = folder.name.replace(/\./g, '');
        const versionNumber = +versionNumberString;
        if (versionNumber > highestNumber) {
            highestNumber = versionNumber;
            highestVersionFolder = folder;
        }
    });
    return highestVersionFolder;
};

export const findHighestVersionUrl = (folders: Folder[]): string => {
    const folderSet = new Set<Folder>();
    addVersionFolders(folders, folderSet);
    const folder = findHighestVersionFolder(folderSet);
    return folder.url;
};
