migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("je0scwpukogp0r2")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dbovrahz",
    "name": "author",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jzjrppgt",
    "name": "post",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "3j0nl4c9ume5i14",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("je0scwpukogp0r2")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dbovrahz",
    "name": "author",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jzjrppgt",
    "name": "post",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "3j0nl4c9ume5i14",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
