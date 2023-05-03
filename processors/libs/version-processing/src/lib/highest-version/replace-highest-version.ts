import * as fs from 'fs';

const toReplace = '__HIGHEST-VERSION-URL__';
const latestPlaygroundIndexHtml = '/release/latest/playground/index.html';
const latestStorybookIndexHtml = '/release/latest/storybook/index.html';

const replaceHighestVersion = (filePath: string, highestVersionUrl: string) => {
    fs.readFile(filePath, 'utf8', function (error, data) {
        if (error) return console.log(error);
        const result = data.replace(toReplace, highestVersionUrl);
        fs.writeFile(filePath, result, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    });
};

export const replaceHighestVersions = (processPath: string, highestVersionUrl: string) => {
    replaceHighestVersion(processPath + latestPlaygroundIndexHtml, highestVersionUrl);
    replaceHighestVersion(processPath + latestStorybookIndexHtml, highestVersionUrl);
};
