import { Folder } from './model/folder.model';

const sortWithPriorisation = (folders: Folder[], priorisation: string): Folder[] =>
    folders.sort((f1, f2) => {
        if (f1.name === priorisation) {
            return -1;
        } else if (f2.name === priorisation) {
            return 1;
        }
        return f1.name.localeCompare(f2.name);
    });

const sortReversed = (folders: Folder[]): Folder[] => folders?.sort((f1, f2) => f2.name.localeCompare(f1.name));

export const sortVersioned = (folders: Folder[]): Folder[] => {
    const firstLevelSorted = sortWithPriorisation(folders, 'main');
    return firstLevelSorted.map((folder) => ({ ...folder, subfolders: sortReversed(folder.subfolders) }));
};
