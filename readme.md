### Description
Helper utility for including __Handlebars__ template files

### Installation  
`npm install handlebars-partial-helper`

### Usage
###### Require the package and initialize options:
```javascript
const hbsPartialHelper = require('handlebars-partial-helper')(options);
```
__options__
```javascript
{
    referenceDir: '.' // Directory path from which to reference the registered partials
}
```

###### Register a file as a Handlebars partial
```javascript
hbsPartialHelper.registerFile(filepath, [nameOfPartial]);
```
__args__  
`filepath` - The file path to include as partial.  
`nameOfPartial` - (Optional) Name to register the partial as. If omitted, the file name will be used.

###### Register a directory whose files are to be registered as Handlebars partials
```javascript
hbsPartialHelper.registerDirectory(dirPath, ext);
```
__args__  
`dirPath` - Directory path whose files to include.  
`ext` - (Optional) Permitted file extension, or `*`. If omitted, all files would be included.