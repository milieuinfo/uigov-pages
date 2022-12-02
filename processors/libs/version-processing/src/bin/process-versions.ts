#!/usr/bin/env node

import { buildVersionFolders, Folder, writeYmlFile } from '../index';
import * as YAML from 'yaml';

const appVersionsFolders: Folder[] = buildVersionFolders(process.argv[2]);
writeYmlFile(appVersionsFolders, process.argv[3]);
console.log(YAML.stringify(appVersionsFolders));
