import React from "react"

import Bills from "./Categories/Bills"
import Groceries from "./Categories/Groceries"
import Fun from "./Categories/Fun"
import Emergency from "./Categories/Emergency"
import Savings from "./Categories/Savings"

const ExpenseList = ({modTitleHandler, modExpenseHandler, modify, cancel, bills, grocery,fun,emergency,
    savings,modifyItem, deleteItem, totalBills, totalGrocery, totalEmerg, totalFun, totalSavings, 
    submitModify})=>{
  
    return(
        <div className="expenses-section">
            <h1>Expenses</h1>
            <div className="expense-categories">

                <Bills
                    bills={bills}
                    modifyItem={modifyItem}
                    cancel={cancel}
                    deleteItem={deleteItem}
                    total={totalBills}
                    modExpenseHandler={modExpenseHandler}
                    modTitleHandler={modTitleHandler}
                    submitModify={submitModify}
                    modify={modify}
                    />
                <Groceries
                    grocery={grocery}
                    modifyItem={modifyItem}
                    deleteItem={deleteItem}
                    total={totalGrocery}/>
                <Fun
                    fun={fun}
                    modifyItem={modifyItem}
                    deleteItem={deleteItem}
                    total={totalFun}/>
                <Emergency
                    emergency={emergency}
                    modifyItem={modifyItem}
                    deleteItem={deleteItem}
                    total={totalEmerg}/>
                <Savings
                    savings={savings}
                    modifyItem={modifyItem}
                    deleteItem={deleteItem}
                    total={totalSavings}/>
            </div>
        </div>)
}

export default ExpenseList