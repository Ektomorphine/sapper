import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GameBoardCellValue } from './../../models/game-board-cell-value.model';

@Component({
  selector: 'sapper-page',
  templateUrl: './sapper.page.html',
  styleUrls: ['./sapper.page.scss']
})
export class SapperPage implements OnInit {

  public cells: GameBoardCellValue[][];
  private openedCells = 0;

  public bombs = 10;

  constructor(private _router: Router) {}

  ngOnInit() {
    this.makeGameBoard();
    this.countBombs();
  }

  public makeGameBoard(): GameBoardCellValue[][] {
    let gameBoardMatrix: GameBoardCellValue[][];
    gameBoardMatrix = new Array();
    for (let i = 0; i < 10; i++) {
      gameBoardMatrix[i] = [];
      for (let j = 0; j < 10; j++) {
        gameBoardMatrix[i][j] = {
          isBomb: false,
          numberOfBombsAround: 0,
          isOpen: false,
          x: i,
          y: j
        };
      }
    }
    for (let z = 0; z < this.bombs; z++) {
      gameBoardMatrix[this.random(0, 9)][this.random(0, 9)].isBomb = true;
    }
    return gameBoardMatrix;
  }

  public openCell(cell: GameBoardCellValue): void {
    cell.isOpen = true;
    if (cell.isBomb) {
      this._router.navigate(['game-over']);
    }
  }

  public checkVictory(): void {
    for (let i = 0; i <= 9; i++) {
      for (let j = 0; j <= 9; j++) {
        if (this.cells[i][j].isOpen) {
          this.openedCells++;
        }
      }
    }
    if (this.openedCells == 100 - this.bombs) {
      alert('you win!');
    }
    this.openedCells = 0;
  }

  public openEmptyCells(cell: GameBoardCellValue): void {
    let object = {
      i: cell.x,
      j: cell.y
    };
    let buffer = [];
    let counter = 0;
    buffer.push(object);
    if (cell.numberOfBombsAround !== 0 ) {
      return;
    }
    while (buffer.length) {
      for (let item of buffer) {
        if (item.j !== 0 &&
          this.cells[item.i][item.j - 1].numberOfBombsAround === 0 &&
          !this.cells[item.i][item.j - 1].isOpen &&
          this.cells[item.i][item.j - 1].isBomb === false) {
            this.cells[item.i][item.j - 1].isOpen = true;
            object = {
              i: this.cells[item.i][item.j - 1].x,
              j: this.cells[item.i][item.j - 1].y
            };
            buffer.push(object);
            counter++;
        }

        if (item.j !== 9 &&
          this.cells[item.i][item.j + 1].numberOfBombsAround === 0 &&
          !this.cells[item.i][item.j + 1].isOpen &&
          this.cells[item.i][item.j + 1].isBomb === false) {
            this.cells[item.i][item.j + 1].isOpen = true;
            object = {
             i: this.cells[item.i][item.j + 1].x,
             j: this.cells[item.i][item.j + 1].y
            };
            buffer.push(object);
            counter++;
        }

        if (item.i !== 0 &&
          this.cells[item.i - 1][item.j].numberOfBombsAround === 0 &&
          !this.cells[item.i - 1][item.j].isOpen &&
          this.cells[item.i - 1][item.j].isBomb === false) {
            this.cells[item.i - 1][item.j].isOpen = true;
            object = {
              i: this.cells[item.i - 1][item.j].x,
              j: this.cells[item.i - 1][item.j].y
            };
            buffer.push(object);
            counter++;
        }

        if (item.i !== 9
          && this.cells[item.i + 1][item.j].numberOfBombsAround === 0
          && !this.cells[item.i + 1][item.j].isOpen &&
          this.cells[item.i + 1][item.j].isBomb === false) {
          this.cells[item.i + 1][item.j].isOpen = true;
          object = {
            i: this.cells[item.i + 1][item.j].x,
            j: this.cells[item.i + 1][item.j].y
          };
          buffer.push(object);
          counter++;
        }

        if (item.j > 1 && !this.cells[item.i][item.j - 2].isBomb) {
          this.cells[item.i][item.j - 1].isOpen = true;
        }

        if (item.j < 8 && !this.cells[item.i][item.j + 2].isBomb) {
          this.cells[item.i][item.j + 1].isOpen = true;
        }

        if (item.i > 1 && !this.cells[item.i - 2][item.j].isBomb) {
          this.cells[item.i - 1][item.j].isOpen = true;
        }

        if (item.i < 8 && !this.cells[item.i + 2][item.j].isBomb) {
          this.cells[item.i + 1][item.j].isOpen = true;
        }

        if (item.i !== 0 &&
            item.j !== 9 &&
            !this.cells[item.i - 1][item.j + 1].isBomb &&
            this.cells[item.i - 1][item.j + 1].numberOfBombsAround > 0) {
              this.cells[item.i - 1][item.j + 1].isOpen = true;
        }

        if (item.i !== 9 &&
            item.j !== 0 &&
            !this.cells[item.i + 1][item.j - 1].isBomb &&
            this.cells[item.i + 1][item.j - 1].numberOfBombsAround > 0) {
              this.cells[item.i + 1][item.j - 1].isOpen = true;
        }

        if (item.i !== 0 &&
            item.j !== 0 &&
            !this.cells[item.i - 1][item.j - 1].isBomb &&
            this.cells[item.i - 1][item.j - 1].numberOfBombsAround > 0) {
              this.cells[item.i - 1][item.j - 1].isOpen = true;
        }

        if (item.i !== 9 &&
            item.j !== 9 &&
            !this.cells[item.i + 1][item.j + 1].isBomb &&
            this.cells[item.i + 1][item.j + 1].numberOfBombsAround > 0) {
              this.cells[item.i + 1][item.j + 1].isOpen = true;
        }
      }
      for (let x = 0; x <= counter; x++) {
        buffer.shift();
      }
    }
  }

  public countBombs() {
    this.cells = this.makeGameBoard();
     for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (i !== 0 && j !== 0 && this.cells[i - 1][j - 1].isBomb ) {
         this.cells[i][j].numberOfBombsAround++;
        }
        if (i !== 0 && this.cells[i - 1][j].isBomb ) {
          this.cells[i][j].numberOfBombsAround++;
        }
        if (i !== 0 && j !== 9 && this.cells[i - 1][j + 1].isBomb ) {
            this.cells[i][j].numberOfBombsAround++;
        }
        if (j !== 0 && this.cells[i][j - 1].isBomb ) {
          this.cells[i][j].numberOfBombsAround++;
        }
        if (j !== 9 && this.cells[i][j + 1].isBomb) {
          this.cells[i][j].numberOfBombsAround++;
        }
        if (i !== 9 && j !== 0 && this.cells[i + 1][j - 1].isBomb) {
          this.cells[i][j].numberOfBombsAround++;
        }
        if (i !== 9 && this.cells[i + 1][j].isBomb) {
          this.cells[i][j].numberOfBombsAround++;
        }
        if (i !== 9 && j !== 9 && this.cells[i + 1][j + 1].isBomb) {
          this.cells[i][j].numberOfBombsAround++;
        }
      }
    }
  }

  public random(min, max): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
