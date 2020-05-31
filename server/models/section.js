module.exports = {
  name: {
    $type: "string",
    $required: true
  },
  fields: {
    $type: "array",
    $items: {
      $type: "object",
      name: {
        $type: "string",
        required: true
      }
    }
  }
}
