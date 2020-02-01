import generator from "sudoku";

// Generates a sudoku with this structure
// { rows: [{index: 0, cols: [{ rows: 0, cols: 0, value: 1, readonly: true}, ...]}, ...]}

export const generateSudoku = () => {
  const fromUrl = extractUrlData();
  console.log("Got from url: ", fromUrl);
  // Generate an array of null and numbers [null, 4, null, null, 1, ...] from the Url if not make a new one
  const raw =  fromUrl ? fromUrl.raw : generator.makepuzzle();
  const rawSolution = generator.solvepuzzle(raw);

  // So we start to see 9s and not 0s
  const formatted = raw.map(e => (e !== null ? e + 1 : null));
  const formattedSolution = rawSolution.map(e => e + 1);

  const result = {
    raw,
    rows: [],
    solution: formattedSolution,
    startTime: new Date(),
    solvedTime: null,
    // challengerStartTime: fromUrl && fromUrl.startTime,
    // challengerSolvedTime: fromUrl && fromUrl.solvedTime
  };

  for (let i = 0; i < 9; i++) {
    const row = { cols: [], index: i };
    for (let j = 0; j < 9; j++) {
      const value = formatted[i * 9 + j];

      const col = {
        row: i,
        col: j,
        value,
        readonly: value !== null
      };
      row.cols.push(col);
    }
    result.rows.push(row);
  }

  return result;
};

// Check if the generator solution === my solution
export const checkSolution = sudoku => {
  const candidate = sudoku.rows
    .map(row => row.cols.map(col => col.value))
    .flat();

  for (let i = 0; i < candidate.length; i++) {
    if (candidate[i] === null || candidate[i] !== sudoku.solution[i]) {
      return false;
    }
  }
  return true;
};

export const shareUrl = (sudoku) => {
  const data = {
    raw: sudoku.raw,
    startTime: sudoku.startTime,
    solvedTime: sudoku.solvedTime
  }

  const query = btoa(JSON.stringify(data));

  return document.location.href.replace(/\?.+$/, "") + `?sudoku=${query}`;

};

export const extractUrlData = () => {
  const match = document.location.search.match(/sudoku=([^&]+)/);
  if (match) {
    return JSON.parse(atob(match[1]));
  }

  return null;
};