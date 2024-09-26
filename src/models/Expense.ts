import mongoose, { Schema } from 'mongoose';

const ExpenseSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
}, { timestamps: true });

ExpenseSchema.pre('save', function(next) {
  console.log('Saving expense:', this.toObject());
  if (!this.user) {
    console.error('User ID is missing');
  }
  next();
});

export interface IExpense extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  date: Date;
  amount: number;
  category: string;
}

const Expense = mongoose.models.Expense || mongoose.model<IExpense>('Expense', ExpenseSchema);
export default Expense;
