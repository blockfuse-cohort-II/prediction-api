import mongoose, { Schema, Document } from "mongoose";

interface IQuestion extends Document {
  question: string;
  deadline: number;
  questionId: number;
}

interface ICounter extends Document {
  seq: number;
}

const CounterSchema: Schema = new Schema({
  seq: { type: Number, default: 1 },
});

const Counter = mongoose.model<ICounter>("Counter", CounterSchema);

const QuestionSchema: Schema = new Schema(
  {
    question: { type: String, required: true },
    deadline: { type: Number, required: true },
    questionId: { type: Number },
  },
  { timestamps: true }
);

QuestionSchema.pre<IQuestion>("save", async function (next) {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      {},
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.questionId = counter.seq;
  }
  next();
});

const Question = mongoose.model<IQuestion>("Question", QuestionSchema);
export default Question;