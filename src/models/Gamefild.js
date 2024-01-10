import mongoose from "mongoose";

const { Schema } = mongoose;

const gameSchema = new Schema(
    {
        id: { type: Number, required: true, unique: true, default: 0 },
        creator: { type: String, required: true },
        size: { type: Number, required: true },
        rules: { type: String },
        edit: { type: Boolean, default: true },
        ships: [{
            id: { type: Number },
            place: { type: Number },
            prizeId: { type: Number },
        }],
        users: [{
            name: { type: String },
            amount: { type: Number },
            shot: [{ type: Number }],
        }],
    },
    { timestamps: true }
);

gameSchema.pre('save', function (next) {
    const game = this;
    if (game.isNew) {
        GameModal.findOne().sort('-id').exec(function (err, lastGame) {
            if (err) {
                return next(err);
            }
            game.id = lastGame ? lastGame.id + 1 : 1;
            next();
        });
    } else {
        next();
    }
});

const GameModal = mongoose.models.GameFild || mongoose.model("GameFild", gameSchema)
export default GameModal;