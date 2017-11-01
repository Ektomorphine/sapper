import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { GameBoardCellValue } from './../../models/game-board-cell-value.model';

@Component({
  selector: 'sapper-page',
  templateUrl: './sapper.page.html',
  styleUrls: ['./sapper.page.scss']
})
export class SapperPage {

  public bombsAroundCell: GameBoardCellValue[][];

  constructor(private router: Router) {}

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
          Hidden: false,
          x: i,
          y: j
        };
      }
    }
    for (let z = 0; z < 5; z++){
      gameBoardMatrix[this.random(0,9)][this.random(0,9)].isBomb = true;
    }
    return gameBoardMatrix;
  }

  public openCell(cell: GameBoardCellValue): void {
    cell.Hidden = true;
    if (cell.isBomb) {
      this.router.navigate(['game-over']);
    }
  }

  public openEmptyCells(cell: GameBoardCellValue) {
    let object = {
      i: cell.x,
      j: cell.y
    };
    let buffer = [];
    let counter = 0;
    buffer.push(object);
    if (cell.numberOfBombsAround != 0 ) return;
    while (buffer.length) {
      for (let item of buffer) {
        if (item.j != 0
          && this.bombsAroundCell[item.i][item.j-1].numberOfBombsAround == 0
          && !this.bombsAroundCell[item.i][item.j-1].Hidden &&
          this.bombsAroundCell[item.i][item.j-1].isBomb == false) { // left
          this.bombsAroundCell[item.i][item.j-1].Hidden = true;
          object = {
            i: this.bombsAroundCell[item.i][item.j - 1].x,
            j: this.bombsAroundCell[item.i][item.j - 1].y
          }
          buffer.push(object);
          counter++;
        }

        if (item.j != 9 && this.bombsAroundCell[item.i][item.j+1].numberOfBombsAround == 0
            && !this.bombsAroundCell[item.i][item.j+1].Hidden &&
          this.bombsAroundCell[item.i][item.j+1].isBomb == false) { // right
          this.bombsAroundCell[item.i][item.j+1].Hidden = true;
          object = {
            i: this.bombsAroundCell[item.i][item.j + 1].x,
            j: this.bombsAroundCell[item.i][item.j + 1].y
          }
          buffer.push(object);
          counter++;
        }

        if (item.i != 0
          && this.bombsAroundCell[item.i-1][item.j].numberOfBombsAround == 0
          && !this.bombsAroundCell[item.i-1][item.j].Hidden &&
          this.bombsAroundCell[item.i-1][item.j].isBomb == false) { // left
          this.bombsAroundCell[item.i-1][item.j].Hidden = true;
          object = {
            i: this.bombsAroundCell[item.i-1][item.j].x,
            j: this.bombsAroundCell[item.i-1][item.j].y
          }
          buffer.push(object);
          counter++;
        }

        if (item.i != 9
          && this.bombsAroundCell[item.i+1][item.j].numberOfBombsAround == 0
          && !this.bombsAroundCell[item.i+1][item.j].Hidden &&
          this.bombsAroundCell[item.i+1][item.j].isBomb == false) { // left
          this.bombsAroundCell[item.i+1][item.j].Hidden = true;
          object = {
            i: this.bombsAroundCell[item.i+1][item.j].x,
            j: this.bombsAroundCell[item.i+1][item.j].y
          }
          buffer.push(object);
          counter++;
        }
      } // for of end
      for (let x = 0; x <= counter; x++){
        buffer.shift();
      }

    }

  }

  public countBombs() {
    this.bombsAroundCell = this.makeGameBoard();
     for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (i != 0 && j != 0 && this.bombsAroundCell[i - 1][j-1].isBomb ) {
         this.bombsAroundCell[i][j].numberOfBombsAround++
        };
        if (i != 0 && this.bombsAroundCell[i-1][j].isBomb ) {
          this.bombsAroundCell[i][j].numberOfBombsAround++
        };
        if (i != 0 && j != 9 && this.bombsAroundCell[i-1][j+1].isBomb ) {
            this.bombsAroundCell[i][j].numberOfBombsAround++
        };
        if (j != 0 && this.bombsAroundCell[i][j-1].isBomb ) {
          this.bombsAroundCell[i][j].numberOfBombsAround++
        };
        if (j != 9 && this.bombsAroundCell[i][j+1].isBomb) {
          this.bombsAroundCell[i][j].numberOfBombsAround++
        };
        if (i != 9 && j != 0 && this.bombsAroundCell[i+1][j-1].isBomb){
          this.bombsAroundCell[i][j].numberOfBombsAround++
        };
        if (i != 9 && this.bombsAroundCell[i+1][j].isBomb) {
          this.bombsAroundCell[i][j].numberOfBombsAround++
        };
        if (i != 9 && j != 9 && this.bombsAroundCell[i+1][j+1].isBomb)
          {this.bombsAroundCell[i][j].numberOfBombsAround++
        };
      }
    }
  }

  public random(min, max): number { // randomize func
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
