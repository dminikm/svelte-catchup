migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("je0scwpukogp0r2")

  collection.name = "comments"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("je0scwpukogp0r2")

  collection.name = "comment"

  return dao.saveCollection(collection)
})
