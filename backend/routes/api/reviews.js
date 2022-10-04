const express = require('express')
const asyncHandler =  require('express-async-handler')
const {Review} = require('../../db/models')

const router = express.Router()


router.post('/', asyncHandler(async (req, res) => {
    const newReview = await Review.create(req.body)

    res.json(newReview)
}))

router.put('/:reviewId', asyncHandler(async(req, res)=> {
    const {reviewId} = req.params
    const reviewToEdit = await Review.findByPk(reviewId)
    reviewToEdit.update(req.body)
    res.json(reviewToEdit)
}))

router.delete('/:reviewId', asyncHandler(async(req, res)=>{
    const {reviewId} = req.params
    const reviewToDelete = await Review.findByPk(reviewId)
    reviewToDelete.destroy()
    res.json({message: 'Review successfully deleted'})
}))
