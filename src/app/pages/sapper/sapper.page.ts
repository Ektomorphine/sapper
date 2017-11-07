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
  private bombs = 15;

  constructor(private _router: Router) {}

  ngOnInit() {
    this.makeGameBoard();
    this.countBombs();
  }

  public makeGameBoard(): GameBoardCellValue[][] {
    let bombsCoordsLength = 0;
    this.cells = [];
    for (let i = 0; i < 10; i++) {
      this.cells[i] = [];
      for (let j = 0; j < 10; j++) {
        this.cells[i][j] = {
          isBomb: false,
          numberOfBombsAround: 0,
          isOpen: false,
          isFlag: false,
          x: i,
          y: j
        };
      }
    }
    while (bombsCoordsLength < this.bombs) {
      const x = this.random(0, 9);
      const y = this.random(0, 9);
      if (!this.cells[x][y].isBomb) {
        this.cells[x][y].isBomb = true;
        bombsCoordsLength++;
      }
    }
    return this.cells;
  }

  public openCell(cell: GameBoardCellValue): void {
    cell.isOpen = true;
    this.openEmptyCells(cell);
    this.checkVictory();
    if (cell.isBomb) {
      this.gameOver();
    }
  }

  public gameOver(): void {
    for (let i = 0; i <= 9; i++) {
      for (let j = 0; j <= 9; j++) {
        this.cells[i][j].isOpen = true;
      }
    }
    alert('Game over');
  }

  public restart(): void {
    this.makeGameBoard();
    this.countBombs();
  }

  public toggleFlag(cell: GameBoardCellValue): void {
    cell.isFlag = !cell.isFlag;
  }

  public checkVictory(): void {
    for (let i = 0; i <= 9; i++) {
      for (let j = 0; j <= 9; j++) {
        if (this.cells[i][j].isOpen) {
          this.openedCells++;
        }
      }
    }
    if (this.openedCells === 100 - this.bombs) {
      alert('you win!');
    }
    this.openedCells = 0;
  }

  public openEmptyCells(cell: GameBoardCellValue): void {
    let object = {
      i: cell.x,
      j: cell.y
    };
    const buffer = [];
    let counter = 0;
    buffer.push(object);
    if (cell.numberOfBombsAround !== 0) {
      return;
    }
    while (buffer.length) {
      for (const item of buffer) {
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

        if (item.i !== 9 &&
            this.cells[item.i + 1][item.j].numberOfBombsAround === 0 &&
            !this.cells[item.i + 1][item.j].isOpen &&
            this.cells[item.i + 1][item.j].isBomb === false) {
            this.cells[item.i + 1][item.j].isOpen = true;
            object = {
              i: this.cells[item.i + 1][item.j].x,
              j: this.cells[item.i + 1][item.j].y
            };
            buffer.push(object);
            counter++;
        }
        // to right
        if (item.j > 1 && !this.cells[item.i][item.j - 1].isBomb) {
          this.cells[item.i][item.j - 1].isOpen = true;
        }
        // to left
        if (item.j < 8 && !this.cells[item.i][item.j + 1].isBomb) {
          this.cells[item.i][item.j + 1].isOpen = true;
        }
        // to bottom
        if (item.i > 1 && !this.cells[item.i - 1][item.j].isBomb) {
          this.cells[item.i - 1][item.j].isOpen = true;
        }
        // to top
        if (item.i < 8 && !this.cells[item.i + 1][item.j].isBomb) {
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
   this.makeGameBoard();
     for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (i !== 0 && j !== 0 && this.cells[i - 1][j - 1].isBomb) {
         this.cells[i][j].numberOfBombsAround++;
        }
        if (i !== 0 && this.cells[i - 1][j].isBomb) {
          this.cells[i][j].numberOfBombsAround++;
        }
        if (i !== 0 && j !== 9 && this.cells[i - 1][j + 1].isBomb) {
            this.cells[i][j].numberOfBombsAround++;
        }
        if (j !== 0 && this.cells[i][j - 1].isBomb) {
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
