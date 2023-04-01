migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3j0nl4c9ume5i14")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9bb5ucte",
    "name": "field",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "je0scwpukogp0r2",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3j0nl4c9ume5i14")

  // remove
  collection.schema.removeField("9bb5ucte")

  return dao.saveCollection(collection)
})
