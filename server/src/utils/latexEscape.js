const latexEscape = (value) => {
    if (value === null || value === undefined) {
        return "";
    }

    const replacements = {
        "\\": "\\textbackslash{}",
        "&": "\\&",
        "%": "\\%",
        "$": "\\$",
        "#": "\\#",
        "_": "\\_",
        "{": "\\{",
        "}": "\\}",
        "~": "\\textasciitilde{}",
        "^": "\\textasciicircum{}"
    };

    return String(value).replace(
        /[\\&%$#_{}~^]/g,
        (character) => replacements[character]
    );
};

module.exports = latexEscape;