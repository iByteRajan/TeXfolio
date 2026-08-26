const fs = require("fs/promises");
const path = require("path");
const os = require("os");
const crypto = require("crypto");
const { execFile } = require("child_process");
const { promisify } = require("util");

const execFileAsync = promisify(execFile);

const compileLatex = async (latex) => {
    const id = crypto.randomUUID();

    const workDir = path.join(
        os.tmpdir(),
        `resume-${id}`
    );

    await fs.mkdir(workDir, {
        recursive: true
    });

    const texPath = path.join(
        workDir,
        "resume.tex"
    );

    await fs.writeFile(
        texPath,
        latex,
        "utf-8"
    );

    try {
        await execFileAsync(
            "xelatex",
            [
                "-interaction=nonstopmode",
                "-halt-on-error",
                "-output-directory",
                workDir,
                texPath
            ],
            {
                timeout: 30000
            }
        );

        const pdfPath = path.join(
            workDir,
            "resume.pdf"
        );

        const pdf =
            await fs.readFile(pdfPath);

        return {
            pdf,
            workDir
        };

    } catch (error) {

        throw new Error(
            `LaTeX compilation failed:\n${
                error.stdout ||
                error.stderr ||
                error.message
            }`
        );
    }
};

module.exports = {
    compileLatex
};