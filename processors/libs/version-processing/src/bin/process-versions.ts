#!/usr/bin/env node

import { buildVersionFolders, Folder, writeYmlFile } from '../index';
import * as YAML from 'yaml';
import { findHighestVersionUrl } from '../lib/highest-version/find-highest-version';
import { replaceHighestVersions } from '../lib/highest-version/replace-highest-version';

const appVersionsFolders: Folder[] = buildVersionFolders(process.argv[2]);
writeYmlFile(appVersionsFolders, process.argv[3]);
console.log(YAML.stringify(appVersionsFolders));
const highestVersionUrl = findHighestVersionUrl(appVersionsFolders);
console.log('highestVersionUrl', highestVersionUrl);
replaceHighestVersions(process.argv[2], highestVersionUrl);
