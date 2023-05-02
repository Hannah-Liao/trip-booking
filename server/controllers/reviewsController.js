import Review from "../models/Review.js";
import Tour from "../models/Tour.js";

//create new review
export const createReview = async (req, res) => {

    const tourId = req.params.tourId

    const newReview = new Review({ ...req.body })

    try {
        const savedReview = await newReview.save()

        await Tour.findByIdAndUpdate(tourId, {
            $push: { reviews: savedReview._id }
        })

        res.status(200).json({ success: true, message: "Successfully created", data: savedReview })
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to create. Try again" })
    }
}