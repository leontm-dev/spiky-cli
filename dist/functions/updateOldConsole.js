// Code
export default async function updateOldConsole(newConsole, permanent = false) {
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    if (permanent) {
        console.log(newConsole);
    }
    else {
        process.stdout.write(newConsole);
    }
}
//# sourceMappingURL=updateOldConsole.js.map