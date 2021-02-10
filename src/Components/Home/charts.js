// @flow
import React from 'react';
import {Bar} from "react-chartjs-2";

const Charts = ({cdata}) => {
    const expenseLabel = [];
    const expenseData = [];

    const edLabel = [];
    const edExpense = []
    const edDeposit = []
    if(!cdata.loadingExpense && !cdata.loadingExpenseError ){
        for (let key in cdata.expenses){
            expenseData.push(cdata.expenses[key])
            expenseLabel.push(key)
        }
    }
    if(!cdata.loadingExpenseDeposit && !cdata.loadingExpenseDepositError ){

        for (let key in cdata.expenseDeposit){
            edLabel.push(cdata.expenseDeposit[key]["first_name"]+" "+cdata.expenseDeposit[key]["last_name"])
            edDeposit.push(cdata.expenseDeposit[key]["deposit"])
            edExpense.push(cdata.expenseDeposit[key]["expense"])
        }
    }
    const expenseChartData = {
        labels: expenseLabel,
        datasets: [
            {
                label: 'Expenses',
                data: expenseData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }
    const expenseChartOptions = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: false,
                    },
                },
            ],
        },
    }

    const expenseDepositData = {
        labels: edLabel,
        datasets: [
            {
                label: 'Deposit Amount',
                data: edDeposit,
                backgroundColor: 'rgb(54, 162, 235)',
            },
            {
                label: 'Expense Amount',
                data: edExpense,
                backgroundColor: 'rgb(255, 99, 132)',

            },
        ],
    }
    const expenseDepositoptions = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ]
        },
    }
 return (
  <>
      <div className="row">
          <div className="col-md-6">
              <div className="card">
                  <div className="card-header">
                      <h5 className="card-title">Expenses</h5>
                      <p className="card-category">List of Expenses</p>
                  </div>
                  <div className="card-body">
                      <Bar data={expenseChartData} options={expenseChartOptions} />
                  </div>
                  <div className="card-footer ">
                      <hr/>
                      <div className="stats">
                          <i className="fa fa-history"></i> Updated 3 minutes ago
                      </div>
                  </div>
              </div>
          </div>
          <div className="col-md-6">
              <div className="card">
                  <div className="card-header">
                      <h5 className="card-title">Expense Deposit Users</h5>
                      <p className="card-category">List of Expenses & Deposits By Users</p>
                  </div>
                  <div className="card-body">
                      <Bar data={expenseDepositData} options={expenseDepositoptions} />
                  </div>
                  <div className="card-footer ">
                      <hr/>
                      <div className="stats">
                          <i className="fa fa-history"></i> Updated 3 minutes ago
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div className="row">

      </div>
  </>
 );
};
export default Charts;