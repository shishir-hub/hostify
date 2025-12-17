import fs from "fs/promises";
import path from "path";


const dataDir = path.join(process.cwd(), "data");


export const readJSON = async <T>(fileName:string): Promise<T> =>{
    const data = await fs.readFile(
        path.join(dataDir,fileName),
        "utf-8"
    );
    return JSON.parse(data);
}

export const writeJSON = async <T>(fileName:string, data:T) =>{
    await fs.writeFile(
        path.join(dataDir,fileName),
        JSON.stringify(data, null, 2)
    );
}
