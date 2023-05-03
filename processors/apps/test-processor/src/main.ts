import {
    buildVersionFolders,
    findHighestVersionUrl,
    Folder,
    replaceHighestVersions,
    writeYmlFile,
} from '@domg-lib/version-processing';
import * as YAML from 'yaml';

const buildAppsFolder = '/Users/krisspeltincx/Ontwikkeling/OMG/github/uigov-pages/build-apps';
const appVersionsFolders: Folder[] = buildVersionFolders(buildAppsFolder);

writeYmlFile(appVersionsFolders, '/Users/krisspeltincx/Ontwikkeling/OMG/github/uigov-pages/jekyll/_data/versions.yml');
console.log(YAML.stringify(appVersionsFolders));
const highestVersionUrl = findHighestVersionUrl(appVersionsFolders);
console.log('highestVersionUrl:', highestVersionUrl);
replaceHighestVersions(buildAppsFolder, highestVersionUrl);
