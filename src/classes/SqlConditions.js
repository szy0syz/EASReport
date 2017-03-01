export class SqlConditions {
  add(options) {
    let sb = '';
    if(!options.type) return '';
    if(options.type.toLowerCase() == 'and') {
        sb += ' and ';
      }
    if(options.type.toLowerCase() == 'or') {
        sb += ' or ';
    }
    
  }
}