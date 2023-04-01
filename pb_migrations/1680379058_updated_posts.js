migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3j0nl4c9ume5i14")

  collection.updateRule = "@request.auth.id = author.id"
  collection.deleteRule = "@request.auth.id = author.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3j0nl4c9ume5i14")

  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
