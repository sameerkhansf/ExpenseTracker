"use server";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import dbConnect from '@/lib/dbConnect';
import Expense from '@/models/Expense';
import User from '@/models/User'; // Make sure you have a User model
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }


  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }


  const expenseData = await request.json();
  const newExpense = new Expense({
    ...expenseData,
    user: user._id
  });


  try {
    const savedExpense = await newExpense.save();
    return NextResponse.json({ message: "Expense added successfully", expense: savedExpense }, { status: 201 });
  } catch (error) {
    console.error("Error saving expense:", error);
    return NextResponse.json({ error: "Failed to save expense" }, { status: 500 });
  }
}

export async function GET() {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }


  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }


  try {
    const userExpenses = await Expense.find({ user: user._id });
    
    return NextResponse.json({ expenses: userExpenses });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return NextResponse.json({ error: "Failed to fetch expenses" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const updatedExpense = await Expense.findOneAndUpdate(
      { _id: body._id, user: body.userId }, // Use body.userId instead of userId
      body,
      { new: true }
    );
    if (!updatedExpense) {
      return NextResponse.json({ error: 'Expense not found' }, { status: 404 });
    }
    return NextResponse.json(updatedExpense);
  } catch (error: unknown) {
    return NextResponse.json({ error: 'Failed to update expense' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  try {
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    const deletedExpense = await Expense.findOneAndDelete({ _id: id, user: user._id });
    if (!deletedExpense) {
      return NextResponse.json({ error: 'Expense not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Expense deleted successfully' });
  } catch (error: unknown) {
    return NextResponse.json({ error: 'Failed to delete expense' }, { status: 500 });
  }
}
