export default function getProject(folderName: string): {
    manifest: Record<string, any>;
    projectbody: {
        main: string;
    };
    icon: string;
} | null;
