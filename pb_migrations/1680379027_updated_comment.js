migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("je0scwpukogp0r2")

  collection.listRule = ""
  collection.viewRule = ""
  collection.createRule = ""
  collection.deleteRule = "@request.auth.id = post.author.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("je0scwpukogp0r2")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
