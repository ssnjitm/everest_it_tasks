import OpenCC from 'opencc-js';
import fs from 'fs';
import path from 'path';

type ConversionMode = 's2t' | 't2s';

const toTraditional = OpenCC.Converter({ from: 'cn', to: 'hk' });
const toSimplified = OpenCC.Converter({ from: 'hk', to: 'cn' });

function convertDirectory(dirPath: string, mode: ConversionMode = 's2t'): void {
    try {
        const files = fs.readdirSync(dirPath);
        const converter = mode === 's2t' ? toTraditional : toSimplified;

        for (const file of files) {
            if (path.extname(file) === '.txt') {
                const filePath = path.join(dirPath, file);
                const content = fs.readFileSync(filePath, 'utf8');
                const converted = converter(content);

                const newFileName = `converted_${file}`;
                fs.writeFileSync(path.join(dirPath, newFileName), converted);

                console.log(`Converted: ${file} → ${newFileName}`);
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Run
convertDirectory('./source', 's2t');