// Code

export type SpikyConfig = {
	inputFileName: string;
	existingProjectFolderName: string;
	export:
		| {
				type: 'project';
				folderName: string;
		  }
		| {
				type: 'python';
				exportFileName: string;
				formatOutput: boolean;
		  };
};
