const fs = require('fs');

module.exports = {
  isExists (path) {
    return fs.existsSync(path);    
  },
  writeJSON (filename, obj) {
    try {
      fs.writeFileSync(filename, JSON.stringify(obj))
      return true;
    } catch (error) {
      console.error(error);
      return false;  
    }
  },
  readJSON (filename) {
    if(!this.isExists(filename)) return undefined;
    try {
      return JSON.parse(fs.readFileSync(filename));
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }
}