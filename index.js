
const _fs = require('fs');
const _path = require('path');
const _hbs = require('handlebars');

let defaultValues = {
    referenceDir: '.'
};

let values = defaultValues;

/**
 * Retrieves the stem component (without the extension) of the filename.
 * @param path {string} The file path.
 * @returns {string}
 */
function getFilenameStem(path) {
    let rex = new RegExp(_path.extname(path) + '$', 'i');
    return _path.basename(path).replace(rex, '');
}

let fn = function(config = { referenceDir: '' }) {

    // Set working values.
    Object.keys(config).forEach(function(key) {
        values[key] = config[key] ? config[key] : defaultValues[key];
    });

    /**
     * Registers a file as a Handlebars partial.
     *
     * @param filePath {string} The file path to the file to be included.
     * @param nameOfPartial {string} The name of the partial. If not provided, the file name is used.
     * @returns {fn}
     */
    this.registerFile = function(filePath, nameOfPartial = '') {
        let name = (typeof nameOfPartial === 'string' && nameOfPartial.trim()) ? nameOfPartial.trim() : getFilenameStem(filePath);
        let tpl = _fs.readFileSync(_path.resolve(_path.join(values.referenceDir, filePath))).toString();

        // register partial
        _hbs.registerPartial(name, tpl);

        return this;
    };

    /**
     * Registers all files within a directory as Handlebars partials.
     *
     * @param dirPath {string} Directory path whose files to include.
     * @param ext {string} The permitted extension, or '*'.
     * @returns {fn}
     */
    this.registerDirectory = function(dirPath, ext = null) {
        // Normalize extension string param.
        ext = (typeof ext === 'string') ?
            (ext.trim() !== '*' ? ('.' + ext.replace(/^\.+/, '').trim()) : ext.trim()) :
            null;

        let path = _path.resolve(_path.join(values.referenceDir, dirPath));
        let filenames = _fs.readdirSync(path, 'utf8');

        filenames = filenames.filter(function(filename) {
            let filepath = _path.resolve(_path.join(path, filename));
            if (ext) {
                return ext === '*' || _path.extname(filepath) === ext;
            }
            return true;
        });

        filenames.forEach(function(filename) {
            let filepath = _path.resolve(_path.join(path, filename));
            let tpl = _fs.readFileSync(filepath).toString();
            let name = getFilenameStem(filename);

            // register partial
            _hbs.registerPartial(name, tpl);
        });

        return this;
    };

    return this;
};

module.exports = fn;
