'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'twoPluses' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING_ARRAY grid as parameter.
 */

class Cell {
  constructor(i, j, radius, area) {
    this.i = i;
    this.j = j;
    this.radius = radius;
    this.area = area;
  }
}

class CellList {
  constructor(arr) {
    this.arr = arr;
  }

  get theTwo() {
    let two = [];

    for (let i = 0; i < this.arr.length - 1; i++)
      for (let j = i + 1; j < this.arr.length; j++) {
        if (two.length === 0)
          two.push(this.arr[i]);
        else if (two.length === 1) {
          if (!intersect(this.arr[i], this.arr[j]))
            two.push(this.arr[j]);
        } else
          if (!intersect(this.arr[i], this.arr[j]))
            if (this.arr[i].area * this.arr[j].area > two[0].area * two[1].area) {
              two[0] = this.arr[i];
              two[1] = this.arr[j];
            }
      }

    return new CellList(two);
  }

  get area() {
    return this.arr[0].area * this.arr[1].area;
  }
}

function twoPluses(grid) {
  return new CellList(grid
    .map((r, i) => r.split('')
      .map((_, j) => cross(grid, i, j))
      .flat()
      .filter(c => grid[c.i][c.j] === 'G')
    )
    .flat())
    .theTwo
    .area;
}

function intersect(c1, c2) {
  let x1 = c2.i === c1.i + Math.min(c1.radius - 1, Math.abs(c1.i - c2.i)) * Math.sign(c2.i - c1.i);
  let y2 = c1.j === c2.j + Math.min(c2.radius - 1, Math.abs(c1.j - c2.j)) * Math.sign(c1.j - c2.j);
  let x2 = c1.i === c2.i + Math.min(c2.radius - 1, Math.abs(c2.i - c1.i)) * Math.sign(c1.i - c2.i);
  let y1 = c2.j === c1.j + Math.min(c1.radius - 1, Math.abs(c2.j - c1.j)) * Math.sign(c2.j - c1.j);
  let s1 = c1.i === c2.i && Math.abs(c2.i - c1.i) < (c2.radius + c1.radius - 2);
  let s2 = c1.j === c2.j && Math.abs(c2.j - c1.j) < (c2.radius + c1.radius - 2);
  return (x1 && y2) || (x2 && y1) || s1 || s2;
}

function cross(g, i, j) {
  let s = [i, i, j, j];
  while (s[0] >= 0 && s[1] < g.length && s[2] >= 0 && s[3] < g[0].length && g[s[0]][j] === 'G' && g[s[1]][j] === 'G' && g[i][s[2]] === 'G' && g[i][s[3]] === 'G')
    s = s.map((e, id) => e + (id % 2 === 0 ? -1 : 1));
  var radius = Math.min(Math.min(i - s[0], s[1] - i), Math.min(j - s[2], s[3] - j));
  var crs = [{ i, j, radius, area: (radius - 1) * 4 + 1 }];
  if (radius > 1)
    for (let k = 1; k < radius; k++)
      crs.push(new Cell(i, j, radius - k, (radius - k - 1) * 4 + 1));
  return crs;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const m = parseInt(firstMultipleInput[1], 10);

    let grid = [];

    for (let i = 0; i < n; i++) {
        const gridItem = readLine();
        grid.push(gridItem);
    }

    const result = twoPluses(grid);

    ws.write(result + '\n');

    ws.end();
}
