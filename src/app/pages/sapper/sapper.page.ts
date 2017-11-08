import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GameBoardCellValue } from '../../models/game-board-cell-value.model';

@Component({
  selector: 'sapper-page',
  templateUrl: './sapper.page.html',
  styleUrls: ['./sapper.page.scss']
})
export class SapperPage implements OnInit {
  public cells: GameBoardCellValue[][] = [];
  private openedCells = 0;
  private bombs = 20;
  private _cols = 30
  private _rows = 30;

  constructor(private _router: Router) {}

  ngOnInit() {
    this.cells = this.makeGameBoard(this.bombs);
    this.countBombs();
    console.log(this.cells);
  }

  public makeGameBoard(bombs_count: number): GameBoardCellValue[][] {
    let bombsCoordsLength = 0;
    let cells = [];
    for (let i = 0; i < this._rows; i++) {
      cells[i] = [];
      for (let j = 0; j < this._cols; j++) {
        cells[i][j] = {
          isBomb: false,
          numberOfBombsAround: 0,
          isOpen: false,
          isFlag: false,
          x: i,
          y: j
        };
      }
    }
    while (bombsCoordsLength < bombs_count) {
      const x = this.random(0, this._rows);
      const y = this.random(0, this._cols);
      if (!cells[x][y].isBomb) {
        cells[x][y].isBomb = true;
        bombsCoordsLength++;
      }
    }
    return cells;
  }

  public openCell(cell: GameBoardCellValue): void { // work fine
    cell.isOpen = true;
    this.openEmptyCells(cell);
    this.checkVictory();
    if (cell.isBomb) {
      this.gameOver();
    }
  }

  public gameOver(): void { // work fine
    for (let i = 0; i < this._rows; i++) {
      for (let j = 0; j < this._cols; j++) {
        this.cells[i][j].isOpen = true;
      }
    }
    alert('Game over');
  }

  public restart(): void { //  ok
    this.cells = this.makeGameBoard(this.bombs);
    this.countBombs();
  }

  public toggleFlag(cell: GameBoardCellValue): void { // work fine
    cell.isFlag = !cell.isFlag;
  }

  public checkVictory(): void { // work fine
    for (let i = 0; i < this._rows; i++) {
      for (let j = 0; j < this._cols; j++) {
        if (this.cells[i][j].isOpen) {
          this.openedCells++;
        }
      }
    }
    if (this.openedCells === this._rows * this._cols - this.bombs) {
      alert('you win!');
    }
    this.openedCells = 0;
  }

  public openEmptyCells(cell: GameBoardCellValue) {
    // let object = {
    //   i: cell.x,
    //   j: cell.y
    // };
    // const buffer = [];
    // let counter = 0;
    // buffer.push(object);

    // if (cell.numberOfBombsAround !== 0) {
    //   return;
    // }
    // while(buffer.length) {

    // }
  }

  public scanAround(x,y: number): number {
    let count = 0;
    for (let n = -1; n <= 1; n++) {
      for (let m = -1; m <= 1; m++) {
        if ((x + n >= 0 && x + n < this._rows) &&
        (y + m >= 0 && y + m < this._cols)) {
          if (this.cells[x + n][y + m].isBomb) count++
        }
      }
    }
    return count;
  }

  public countBombs() {
    for (let i = 0; i < this._rows; i++) {
      for (let j = 0; j < this._cols; j++) {
        this.cells[i][j].numberOfBombsAround = this.scanAround(i,j);
      }
    }
  }

  public random(min, max): number { // work ok
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
