import React, { useState } from "react";
import AddSectionForm from "./AddSectionForm";
import ProjectSections from "./ProjectSections";
import ProjectIncomeSection from "./ProjectIncomeSection"
import Summary from "./Summary"
import {GiHamburgerMenu} from "react-icons/gi"
import "./styles.css";

const App=()=> {
  const [sections, setSections] = useState([
    {
      id: 1,
      sectionName: "Bills",
      expenses: [
        { id: 1, desc: "Utility ", amount: 1.00, editting: false }]
    },
    {
      id: 2,
      sectionName: "Grocery/Household",
      expenses: [
        { id: 1, desc: "Food ", amount: 1.00, editting: false }]
    },
    {
      id: 3,
      sectionName: "Fun",
      expenses: [
        { id: 1, desc: "Movies ", amount: 1.00, editting: false }]
    }
  ]);

  const [totalExpenses, setTotalExpenses] = useState()
  const [incomeSection, setIncomeSection] = useState([
    {
      id: 1,
      name: "Income",
      incomes: [{ id: 1, desc: "Pay 1 ", amount: 1.00, editting: false }]
    }
  ]);

  const addUpExpenses =()=>{
    let total = 0
    total = sections.expenses.reduce((acc,curr)=>{
      acc+=curr.amount
      return acc
    }, 0)
    return total.toFixed(2)
    //setExpensesTotal(total)
  }

  const addNewIncome = (sectionId, incomeName, amount) => {
    let income = parseFloat(amount)
    let newIncome = {
      id: keyRandomizer(),
      desc: incomeName,
      amount: income,
      editting: false
    };
    let allSectionsCopy = JSON.parse(JSON.stringify(incomeSection));
    let sectionIndex = allSectionsCopy.findIndex(
      section => section.id === sectionId
    );
    let sectionToUpdate = allSectionsCopy[sectionIndex];
    sectionToUpdate.incomes = [...sectionToUpdate.incomes, newIncome];
    setIncomeSection([...allSectionsCopy]);
  };

  const removeIncome=(sectionId, incomeId )=>{
    //find the correct object
    let allSectionsCopy = JSON.parse(JSON.stringify(incomeSection));
    let sectionIndex = allSectionsCopy.findIndex(
      section => section.id === sectionId
    );
    let sectionToUpdate = allSectionsCopy[sectionIndex];  //the category that needs to be updated
    const removedIncome = sectionToUpdate.incomes.filter(income=>income.id!==incomeId)
    sectionToUpdate.incomes = [...removedIncome] //return the section with filtered expenses
    setIncomeSection([...allSectionsCopy])

  }
  const removeExpenseSection=(sectionId)=>{
    let allSectionsCopy = JSON.parse(JSON.stringify(sections));
    let sectionIndex = allSectionsCopy.findIndex(
      section => section.id === sectionId
    );
    let sectionToUpdate = allSectionsCopy[sectionIndex];  //the index of the section to be deleted
    const sectionRemoved = allSectionsCopy.filter((section)=>section.id!==sectionToUpdate.id)
    setSections([...sectionRemoved])
    //console.log(sectionToUpdate)
  }
  const removeExpense=(sectionId,expenseId)=>{
    let allSectionsCopy = JSON.parse(JSON.stringify(sections));
    let sectionIndex = allSectionsCopy.findIndex(
      section => section.id === sectionId
    );
    let sectionToUpdate = allSectionsCopy[sectionIndex];  //the category that needs to be updated
    const removedExpense = sectionToUpdate.expenses.filter(expense=>expense.id!==expenseId)
    sectionToUpdate.expenses = [...removedExpense] //return the section with filtered expenses
    setSections([...allSectionsCopy])
  }

  const addNewExpense = (sectionId, expenseName, amount) => {
    let expense = parseFloat(amount)
    let newExpense = {
      id: keyRandomizer(),
      desc: expenseName,
      amount: expense,
      editting: false
    };

    let allSectionsCopy = JSON.parse(JSON.stringify(sections));
    let sectionIndex = allSectionsCopy.findIndex(
      section => section.id === sectionId
    );
    let sectionToUpdate = allSectionsCopy[sectionIndex];
    sectionToUpdate.expenses = [...sectionToUpdate.expenses, newExpense];
    setSections([...allSectionsCopy]);
  };

  const updateIncomeDesc = (desc, sectionId, incomeId) => {
    let allSectionsCopy = JSON.parse(JSON.stringify(incomeSection));
    let sectionIndex = allSectionsCopy.findIndex(
      section => section.id === sectionId
    );
    let sectionToUpdate = allSectionsCopy[sectionIndex];
    let incomeIndex = sectionToUpdate.incomes.findIndex(income => income.id === incomeId);
    let incomeToUpdate = sectionToUpdate.incomes[incomeIndex];
    incomeToUpdate.desc = desc;
    setIncomeSection([...allSectionsCopy]);
  };

  const updateIncomeAmount=(amount, sectionId, incomeId)=>{
    let income = parseFloat(amount)
    let allSectionsCopy = JSON.parse(JSON.stringify(incomeSection));
    let sectionIndex = allSectionsCopy.findIndex(
      section => section.id === sectionId
    );
    let sectionToUpdate = allSectionsCopy[sectionIndex];
    let incomeIndex = sectionToUpdate.incomes.findIndex(income => income.id === incomeId);
    let incomeToUpdate = sectionToUpdate.incomes[incomeIndex];
    incomeToUpdate.amount = income;
    setIncomeSection([...allSectionsCopy]);
  }
  const updateExpenseAmount = (amount, sectionId, expenseId) => {
    let expense = parseFloat(amount)
    let allSectionsCopy = JSON.parse(JSON.stringify(sections));
    let sectionIndex = allSectionsCopy.findIndex(
      section => section.id === sectionId
    );
    let sectionToUpdate = allSectionsCopy[sectionIndex];
    let expenseIndex = sectionToUpdate.expenses.findIndex(expense => expense.id === expenseId);
    let expenseToUpdate = sectionToUpdate.expenses[expenseIndex];
    
    expenseToUpdate.amount = expense;

    setSections([...allSectionsCopy]);
  };

  const toggleIncomeEditMode = (incomeId, taskId) => {
    let allSectionsCopy = JSON.parse(JSON.stringify(incomeSection));
    let sectionIndex = allSectionsCopy.findIndex(
      section => section.id === incomeId
    );
    let sectionToUpdate = allSectionsCopy[sectionIndex];
    let taskIndex = sectionToUpdate.incomes.findIndex(task => task.id === taskId);
    let taskToUpdate = sectionToUpdate.incomes[taskIndex];
    taskToUpdate.editting = !taskToUpdate.editting;
    setIncomeSection([...allSectionsCopy]);
  };

  const toggleExpenseEditMode = (sectionId, expenseId) => {
    let allSectionsCopy = JSON.parse(JSON.stringify(sections));
    let sectionIndex = allSectionsCopy.findIndex(
      section => section.id === sectionId
    );
    let sectionToUpdate = allSectionsCopy[sectionIndex];
    let expenseIndex = sectionToUpdate.expenses.findIndex(expense => expense.id === expenseId);
    let expenseToUpdate = sectionToUpdate.expenses[expenseIndex];
    expenseToUpdate.editting = !expenseToUpdate.editting;
    setSections([...allSectionsCopy]);
  };

  const addNewSection = sectionName => {
    let newSection = {
      id: keyRandomizer(),
      sectionName: sectionName,
      expenses: []
    };
    setSections([...sections, newSection]);
  };

  const updateExpenseDesc = (desc, sectionId, expenseId) => {
    let allSectionsCopy = JSON.parse(JSON.stringify(sections));
    let sectionIndex = allSectionsCopy.findIndex(
      section => section.id === sectionId
    );
    let sectionToUpdate = allSectionsCopy[sectionIndex];
    let expenseIndex = sectionToUpdate.expenses.findIndex(expense => expense.id === expenseId);
    let expenseToUpdate = sectionToUpdate.expenses[expenseIndex];
    
    expenseToUpdate.desc = desc;

    setSections([...allSectionsCopy]);
  };

  const keyRandomizer = () => {
    let randomKey = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++) {
      randomKey += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return randomKey;
  };

  return (
    <div className="App">
      {/* <ProjectSummary
        //addUpExpenses={addUpExpenses}
        incomeSection={incomeSection}
        sections={sections}
      /> */}
      
      <header>
        <div>
          <div className="header-logo">
            <h2>Budget Buddy</h2>
            <i>Work in Progress</i>
          </div>
          <button className="sign-in">
            <p>Sign in</p>
          </button>
        </div>
      </header>
      
      <div className="income-section">
        <section className="hero">
          <h2>Keeping track of your spending?</h2>
          <p>Enter your income to start budgeting. Then start adding expenses or categories.</p>
        </section>
        <ProjectIncomeSection
          incomeSection={incomeSection}
          addNewIncome={addNewIncome}
          removeIncome={removeIncome}
          updateIncomeDesc={updateIncomeDesc}
          updateIncomeAmount={updateIncomeAmount}
          toggleIncomeEditMode={toggleIncomeEditMode}/>
      </div>
      <Summary
        incomeSection={incomeSection}
        sections={sections}
      />
      <div className="add-section">
        <AddSectionForm 
        addNewSection={addNewSection}/>
      </div>
        <ProjectSections
          sections={sections}
          addNewExpense={addNewExpense}
          removeExpense={removeExpense}
          removeExpenseSection={removeExpenseSection}
          updateExpenseDesc={updateExpenseDesc}
          updateExpenseAmount={updateExpenseAmount}
          toggleExpenseEditMode={toggleExpenseEditMode}
        /> 
    </div>
  );
}

export default App
