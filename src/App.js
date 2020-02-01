import React, { Component } from "react";
import { generateSudoku, checkSolution, shareUrl } from "./lib/sudoku";
import produce from "immer";
import SudokuBoard from "./components/SudokuBoard";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = produce({}, () => ({
      sudoku: generateSudoku()
    }));
  }

  // Change the value of the col while writing
  handleChange = e => {
    this.setState(
      produce(state => {
        state.sudoku.rows[e.row].cols[e.col].value = e.value;

        if (!state.sudoku.solvedTime) {
          const solved = checkSolution(state.sudoku);
          if (solved) {
            state.sudoku.solveTime = new Date();
            state.sudoku.shareUrl = shareUrl(state.sudoku);
          }
        }
      })
    );
  };

  // solve the sudoku by changing all the cols value (not ReadOnly) with the formatted solution one
  solveSudoku = e => {
    this.setState(
      produce(state => {
        state.sudoku.rows.forEach(row =>
          row.cols.forEach(col => {
            if (!col.readonly) {
              col.value = state.sudoku.solution[col.row * 9 + col.col];
            }
          })
        );
      })
    );
  };

  render() {
    return (
      <div className="App">
        <header>
          <h1>Sudoku js</h1>
        </header>

        <SudokuBoard sudoku={this.state.sudoku} onChange={this.handleChange} />

        <button onClick={this.solveSudoku}>
          I'm Stupid Please Solve it for me
        </button>

        <footer>
          {/* <p>This app Proudly</p> */}
          <i className="fa fa-code"></i>
          <p>with</p>
          <i className="fa fa-heart-o"></i>
          <p>and</p>
          <i className="fa fa-coffee"></i>
          <p>by Youssef Rabei</p>

          {/* <p>
            &#1; with &#2; and &#3; by Youssef Rabei
          </p> */}
        </footer>
      </div>
    );
  }
}

export default App;
