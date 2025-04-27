// src/app/api/budgetOperation/route.js
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(request) {
  try {
    const { uid, operation, data } = await request.json();

    // Validate essential data
    if (!uid) {
      return new Response(JSON.stringify({ error: "Missing user ID" }), { status: 400 });
    }

    // Connect to MongoDB
    const { db } = await connectToDatabase();
    const usersCollection = db.collection('users');
    const budgetsCollection = db.collection('budgets');

    // Check if user exists
    const user = await usersCollection.findOne({ uid });
    if (!user && operation !== 'setUserInfo') {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    switch (operation) {
      case 'setUserInfo': {
        const { userName, userEmail } = data;
        if (!userName || !userEmail) {
          return new Response(JSON.stringify({ error: "Missing user information" }), { status: 400 });
        }

        // Update or insert user document
        await usersCollection.updateOne(
          { uid },
          { 
            $set: { 
              name: userName, 
              email: userEmail,
              updatedAt: new Date()
            },
            $setOnInsert: { 
              createdAt: new Date() 
            }
          },
          { upsert: true }
        );

        // Initialize budget document if it doesn't exist
        await budgetsCollection.updateOne(
          { userId: uid },
          { 
            $setOnInsert: {
              income: 0,
              expenses: [],
              achievements: [],
              goals: [],
              createdAt: new Date()
            },
            $set: {
              updatedAt: new Date()
            }
          },
          { upsert: true }
        );

        return new Response(JSON.stringify({ 
          success: true, 
          message: "User information saved successfully" 
        }), { status: 200 });
      }

      case 'setIncome': {
        const { income } = data;
        if (isNaN(income) || income < 0) {
          return new Response(JSON.stringify({ error: "Invalid income value" }), { status: 400 });
        }

        await budgetsCollection.updateOne(
          { userId: uid },
          { 
            $set: {
              income: Number(income),
              updatedAt: new Date()
            }
          },
          { upsert: true }
        );

        return new Response(JSON.stringify({ 
          success: true, 
          data: { income: Number(income) } 
        }), { status: 200 });
      }

      case 'addExpense': {
        const { expense } = data;
        if (!expense || !expense.category || !expense.amount || isNaN(expense.amount)) {
          return new Response(JSON.stringify({ error: "Invalid expense data" }), { status: 400 });
        }

        // Create new expense with ID
        const newExpense = {
          ...expense,
          _id: new ObjectId().toString(),
          date: new Date()
        };

        // Add expense to budget
        await budgetsCollection.updateOne(
          { userId: uid },
          { 
            $push: { expenses: newExpense },
            $set: { updatedAt: new Date() }
          },
          { upsert: true }
        );

        // Get updated expenses
        const budget = await budgetsCollection.findOne({ userId: uid });
        
        return new Response(JSON.stringify({ 
          success: true, 
          data: { expense: newExpense, expenses: budget.expenses } 
        }), { status: 200 });
      }

      case 'updateExpense': {
        const { expenseId, expense } = data;
        if (!expenseId || !expense) {
          return new Response(JSON.stringify({ error: "Missing expense ID or data" }), { status: 400 });
        }

        // Update expense in array
        await budgetsCollection.updateOne(
          { userId: uid, "expenses._id": expenseId },
          { 
            $set: { 
              "expenses.$": {
                ...expense,
                _id: expenseId,
                updatedAt: new Date()
              },
              updatedAt: new Date()
            }
          }
        );

        // Get updated expenses
        const budget = await budgetsCollection.findOne({ userId: uid });
        
        return new Response(JSON.stringify({ 
          success: true, 
          data: { expense, expenses: budget.expenses } 
        }), { status: 200 });
      }

      case 'deleteExpense': {
        const { expenseId } = data;
        if (!expenseId) {
          return new Response(JSON.stringify({ error: "Missing expense ID" }), { status: 400 });
        }

        // Remove expense from array
        await budgetsCollection.updateOne(
          { userId: uid },
          { 
            $pull: { expenses: { _id: expenseId } },
            $set: { updatedAt: new Date() }
          }
        );

        return new Response(JSON.stringify({ success: true }), { status: 200 });
      }

      case 'getData': {
        // Get user's budget data
        const budget = await budgetsCollection.findOne({ userId: uid });
        
        if (!budget) {
          await budgetsCollection.insertOne({
            userId: uid,
            income: 0,
            expenses: [],
            achievements: [],
            goals: [],
            createdAt: new Date(),
            updatedAt: new Date()
          });
          
          return new Response(JSON.stringify({ 
            success: true, 
            data: { income: 0, expenses: [], achievements: [] } 
          }), { status: 200 });
        }
        
        return new Response(JSON.stringify({ 
          success: true, 
          data: {
            income: budget.income || 0,
            expenses: budget.expenses || [],
            achievements: budget.achievements || []
          }
        }), { status: 200 });
      }

      case 'addAchievement': {
        const { achievement } = data;
        if (!achievement) {
          return new Response(JSON.stringify({ error: "Missing achievement data" }), { status: 400 });
        }

        // Add achievement with ID if not exists
        const newAchievement = {
          ...achievement,
          _id: achievement._id || new ObjectId().toString(),
          date: achievement.date || new Date()
        };

        await budgetsCollection.updateOne(
          { userId: uid },
          { 
            $push: { achievements: newAchievement },
            $set: { updatedAt: new Date() }
          },
          { upsert: true }
        );

        return new Response(JSON.stringify({ 
          success: true, 
          data: { achievement: newAchievement } 
        }), { status: 200 });
      }

      default:
        return new Response(JSON.stringify({ error: "Invalid operation" }), { status: 400 });
    }
  } catch (error) {
    console.error("API Error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const uid = searchParams.get('uid');
    const operation = searchParams.get('operation');

    if (!uid) {
      return new Response(JSON.stringify({ error: "Missing user ID" }), { status: 400 });
    }

    // Connect to MongoDB
    const { db } = await connectToDatabase();
    const budgetsCollection = db.collection('budgets');

    if (operation === 'getData') {
      // Get user's budget data
      const budget = await budgetsCollection.findOne({ userId: uid });
      
      if (!budget) {
        return new Response(JSON.stringify({ 
          success: true, 
          data: { income: 0, expenses: [], achievements: [] } 
        }), { status: 200 });
      }
      
      return new Response(JSON.stringify({ 
        success: true, 
        data: {
          income: budget.income || 0,
          expenses: budget.expenses || [],
          achievements: budget.achievements || []
        }
      }), { status: 200 });
    }

    return new Response(JSON.stringify({ error: "Invalid operation" }), { status: 400 });
  } catch (error) {
    console.error("API Error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}