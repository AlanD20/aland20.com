import path from 'path';
import fs from 'fs';
import __ from 'lodash';

const exportDir = path.join(__dirname, `/../../../../../prisma/export/`);

export const exportToFile = (type: string, data: object) => {
  const lowerType = type.toLocaleLowerCase();

  const exportPath = path.join(exportDir, `${lowerType}.ts`);

  fs.writeFile(
    exportPath,
    `const ${lowerType} = ${JSON.stringify(data)}; export default ${lowerType}`,
    (err) => {
      if (err) {
        throw new Error(`Failed to export ${__.capitalize(type)} database.`);
      }
    }
  );
};

export const createExportDir = async () => {
  const exists = fs.existsSync(exportDir);
  if (exists) return;

  fs.mkdir(exportDir, (err) => void console.log(err ?? 'Directory Created!'));
};
