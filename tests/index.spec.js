const index = require('../index');
const sinon = require('sinon');
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

const isValidPath = require('is-valid-path');

const fs = require('fs');

describe('The main module', function () {

    const filePath = './path/to/file.txt';
    const fileContents = 'abc def ghi';

    const dirPath = './path/to/dir';
    const dirContents = ['file1.hbs', 'file2.hbs', 'file3.txt', 'file4.abc'];

    const hbsPartialFile = index({
        referenceDir: '.'
    });

    // Stub the Node.js 'fs.readFileSync' function.
    function stubReadFile() {
        this.sandbox.stub(fs, 'readFileSync').callsFake(function () {
            return fileContents;
        });
    }

    function stubReadDir() {
        this.sandbox.stub(fs, 'readdirSync').callsFake(function () {
            return dirContents;
        });
    }

    it("registers a file as partial", function () {
        stubReadFile.apply(this);

        const result = hbsPartialFile.registerFile(filePath);

        assert.isOk(result, 'file registered');
        assert(typeof result === 'object');
    });

    it("registers a directory's files as partials", function () {
        stubReadFile.apply(this);
        stubReadDir.apply(this);

        const result = hbsPartialFile.registerDirectory(dirPath);

        assert.isOk(result, 'dir files registered');
        assert(typeof result === 'object');
    });

});