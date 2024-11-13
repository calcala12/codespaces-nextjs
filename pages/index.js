import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/expenses')
      .then(response => setExpenses(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <Link href="/add-expense">
        <a>Add New Expense</a>
      </Link>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            <strong>Amount:</strong> {expense.amount} <br />
            <strong>Category:</strong> {expense.category} <br />
            <strong>Date:</strong> {expense.date} <br />
          </li>
        ))}
      </ul>
    </div>
  );
}


// Fetch data with getServerSideProps
export async function getServerSideProps() {
  try {
    const response = await axios.get('http://localhost:8000/api/expenses');
    return {
      props: {
        expenses: response.data,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        expenses: [],
        error: 'Failed to load expenses',
      },
    };
  }
}
