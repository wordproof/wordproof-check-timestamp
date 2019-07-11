import {sha256} from 'js-sha256';

export default class TimestampStandard {

  static hash(string) {
    return sha256(string);
  }

  static getJSON(schema) {
    const type = (schema['@context']['@type']) ? schema['@context']['@type'] : '';

    let object = {};
    switch (type) {
      case 'WebArticleTimestamp':
        object.type = schema['@context']['@type'];
        object.version = schema['@context']['@version'];
        object.title = schema.title;
        object.content = schema.content;
        object.date = schema.date;
        object = this.checkSchemaAttribute(object, schema, 'author');
        object = this.checkSchemaAttribute(object, schema, 'previousVersion');
        object = this.checkSchemaAttribute(object, schema, 'url');
        break;
      default:
        object.title = schema.title;
        object.content = schema.content;
        object.date = schema.date;
        break;
    }
    return object;
  }

  static checkSchemaAttribute(object, schema, attribute) {
    if (schema[attribute]) {
      object[attribute] = schema[attribute];
    }
    return object
  }

}
