export default function updateProject(folderName: string, code: {
    content: string;
    line?: number;
}[]): true | null;
