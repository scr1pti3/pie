function toType(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}

//Delete properties that are not in the schema
function cleanProperties(data, schema) {
  for (let key in data) {
    //Delete reserved property
    if(key === "$required" || key === "$type") delete data[key];
    //Delete props that are not specified in schema
    else if (!(key in schema)) delete data[key];
    else {
      let dataType = toType(data[key]);
      let validator = (toType(schema[key]) === "object") ? schema[key]['$type'] : schema[key];

      //If the data prop has different type than the schema prop
      if (dataType !== validator) throw new schemaError("Data doesn't match schema", data, schema);

      if(dataType === "array") {
        data[key].forEach((element, index) => {
          let dataType = toType(element);
          let validator = (toType(schema[key]["$items"]) === "object") ? schema[key]['$items']['$type'] : schema[key]['$items'];

          if(dataType !== validator) throw new schemaError("Data doesn't match schema", data[key][index], schema[key]["$items"]);
          if(dataType === "object") cleanProperties(data[key][index], schema[key]['$items']);
        });
      }

      //If the data is an object, clean the object child aswell
      if(dataType === "object") data[key] = cleanProperties(data[key], schema[key]);
    }
  }
  return data;
}

function strictMatchProperties(data, schema) {
  for (let key in schema) {
    if(!data[key] && schema[key]['$required']) throw new schemaError("Missing required property", data, schema);
    else if(!schema[key]) continue
    else if((schema[key]['$type'] === "object" || schema[key]['$type'] === "array")) strictMatchProperties(data[key], schema[key])
  }
}

//Check if data matches the schema
function sanitize(data, schema) {
  data = cleanProperties(data, schema);
  strictMatchProperties(data, schema);

  return data;
}

function schemaError(errmsg, data, schema) {
  let instance = new Error(errmsg);

  //Delete properties that are not in schema
  for (let key in data)
    if(!(key in schema)) delete data[key];

  instance.name = "schemaError";
  instance.data = data;
  instance.schema = schema;

  //Set the instance of this function to be a prototype of Error
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
  if (Error.captureStackTrace)
    Error.captureStackTrace(instance, schemaError);
  return instance
}

module.exports = {
  sanitize,
  schemaError
}
