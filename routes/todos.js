const express = require('express');
const router = express.Router();
const alltodos = require("../models/todo");

// 할 일 추가하기
router.post("/todos", async (req, res) => {
    const { value } = req.body
    let order = 1
    const firsttodos = await alltodos.findOne()
    const lasttodos = await alltodos.find().sort({ order: -1 }).findOne()
    const done = false
    const doneAt = null
    const todoid = null

    if (value && !firsttodos) {
        await alltodos.create({ value, order, done, doneAt, todoid })
        const target = await alltodos.findOne({ value })
        await alltodos.updateOne({ value }, { "todoid": target._id })

        return res.status(200).json({ "message": "첫 번째 할일 등록을 축하합니다. " })
    } else if (value && firsttodos) {
        order = order + lasttodos.order
        await alltodos.create({ value, order, done, doneAt, todoid })
        const target = await alltodos.findOne({ value })
        await alltodos.updateOne({ value }, { "todoid": target._id })

        return res.status(200).json({ "message": "할 일이 등록되었습니다. " })
    } else if (!value) {
        return res.status(400).json({
            success: false,
            errorMessage: "할 일을 입력하세요."
        })
    }

})

// 할 일 목록 보기
router.get("/todos", async (req, res) => {
    const todoList = await alltodos.find({}, { _id: 0 }).sort({ "order": 1 })
    return res.status(200)
        .json({ "todoList": todoList })
})


// 할 일 삭제하기
router.delete("/todos/:todoid", async (req, res) => {
    const { todoid } = req.params
    await alltodos.findByIdAndDelete({ todoid })
    return res.status(200).json({ "message": "할 일이 삭제되었습니다." })
})


router.patch("/todos/:todoid", async (req, res) => {
    const { todoid } = req.params
    const { value } = req.body
    await alltodos.findByIdAndUpdate(todoid, { value })
    res.status(200).json({ "message": "할 일이 수정되었습니다." })
})

router.patch("/todos/:todoid/upgrade", async (req, res) => {
    const target = await alltodos.findById(todoid)
    if (target.order !== 1) {
        await target.updateOne({ "order": target.order - 1 })
        await alltodos.findOne({ "order": target.order - 1 }).updateOne({ "order": target.order })
        return res.status(200).json({ "message": "우선 순위가 1등급 올라갔습니다." })
    }
    else { return res.status(200).json({ "message": "우선 순위가 최고입니다. 현재 순위를 유지합니다." }) }

})



// 할 일 체크하기
router.patch("/todos/:todoid/done", async (req, res) => {
    const { todoid } = req.params
    const done = true
    const doneAt = new Date()
    await alltodos.findByIdAndUpdate(todoid, { done, doneAt })
    res.status(200).json({ "message": "할 일이 체크되었습니다." })

})

// 할 일 체크 해제하기
router.patch("/todos/:todoid/undone", async (req, res) => {
    const { todoid } = req.params
    const done = false
    const doneAt = null
    await alltodos.findByIdAndUpdate(todoid, { done, doneAt })
    res.status(200).json({ "message": "할 일이 체크 해제 되었습니다." })

})

module.exports = router;