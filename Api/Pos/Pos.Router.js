const {
  createPo,
  findPos,
  findPo,
  updatePo,
  deletePo,
} = require("./Pos.Controller");
const router = require("express").Router();

router.post("/", createPo);
router.put("/", updatePo);
router.get("/", findPos);
router.get("/:id", findPo);
router.delete("/", deletePo);

module.exports = router;
