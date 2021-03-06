[![Build Status](https://travis-ci.org/ikmich/handlebars-partial-file.svg?branch=master)](https://travis-ci.org/ikmich/handlebars-partial-file)

### Description
Helper utility for including files as Handlebars template partials. __handlebars-partial-file__ reads a file's contents and registers it as a partial for use within a Handlebars template.

### Installation  
`npm install handlebars-partial-file`

### Usage
###### Require the package and initialize options:
```javascript
const hbsPartialFile = require('handlebars-partial-file')(options);
```
__options__
```javascript
{
    referenceDir: '.' // Directory path from which to reference the registered partials
}
```

###### Register a file as a Handlebars partial
```javascript
hbsPartialFile.registerFile(filepath, [nameOfPartial]);
```
__args__  
`filepath` - The file path to include as partial.  
`nameOfPartial` - (Optional) Name to register the partial as. If omitted, the file name will be used.

###### Register a directory whose files are to be registered as Handlebars partials
```javascript
hbsPartialFile.registerDirectory(dirPath, ext);
```
__args__  
`dirPath` - Directory path whose files to include.  
`ext` - (Optional) Permitted file extension, or `*`. If omitted, all files would be included.