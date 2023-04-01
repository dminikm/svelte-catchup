migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3j0nl4c9ume5i14")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "aeo19ztn",
    "name": "field",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [
        "image/png",
        "image/jpeg",
        "image/webp"
      ],
      "thumbs": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3j0nl4c9ume5i14")

  // remove
  collection.schema.removeField("aeo19ztn")

  return dao.saveCollection(collection)
})
