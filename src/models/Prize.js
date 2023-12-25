import mongoose from "mongoose";

const { Schema } = mongoose;

const prizeSchema = new Schema(
    {
        id: { type: Number, unique: true, required: true, default: 0 },
        creator: { type: String, required: true },
        title: { type: String, required: false, default: "Null" },
        description: { type: String, required: false, default: "Null" },
        playedout: { type: Boolean, required: false, default: false },
        playedout_name: { type: String, required: false, default: "Null"  }
    },
    { timestamps: true }
);

prizeSchema.pre('save', function (next) {
    const prize = this;
    if (prize.isNew) {
        PrizeModal.findOne().sort('-id').exec(function (err, lastPrize) {
            if (err) {
                return next(err);
            }
            prize.id = lastPrize ? lastPrize.id + 1 : 1;
            next();
        });
    } else {
        next();
    }
});

const PrizeModal = mongoose.models.Prize || mongoose.model("Prize", prizeSchema)
export default PrizeModal;