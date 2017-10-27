import { Component, OnInit } from '@angular/core';

import { GameBoardCellValue } from './../../models/game-board-cell-value.model';

@Component({
  selector: 'sapper-page',
  templateUrl: './sapper.page.html',
  styleUrls: ['./sapper.page.scss']
})
export class SapperPage {

  public counter = 0;
  public arr: GameBoardCellValue[][];

  ngOnInit() {
    this.makeGameBoard();
    this.countBombs();
    console.log(this.arr);
  }

  public makeGameBoard(): GameBoardCellValue[][] {
    let gameBoardMatrix: GameBoardCellValue[][];
     gameBoardMatrix = new Array();
    for (let i = 0; i < 10; i++) {
      gameBoardMatrix[i] = [];
      for (let j = 0; j < 10; j++) {
        gameBoardMatrix[i][j] = {
          isBomb: false,
          numberOfBombsAround: 0
        };
      }
    }
    for (let z = 0; z < 15; z++){
      gameBoardMatrix[this.random(0,9)][this.random(0,9)].isBomb = true;
    }
    return gameBoardMatrix;
  }

  public countBombs() {
    this.arr = this.makeGameBoard();
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if ((i > 0 && i < 9 && j > 0 && j < 9)){
          if (this.arr[i-1][j-1].isBomb){
           this.arr[i][j].numberOfBombsAround++
          };
          if (this.arr[i-1][j].isBomb) {
            this.arr[i][j].numberOfBombsAround++
          };
          if (this.arr[i-1][j+1].isBomb)
            {this.arr[i][j].numberOfBombsAround++
          };
          if (this.arr[i][j-1].isBomb) {
            this.arr[i][j].numberOfBombsAround++
          };
          if (this.arr[i][j+1].isBomb) {
            this.arr[i][j].numberOfBombsAround++
          };
          if (this.arr[i+1][j-1].isBomb)
            {this.arr[i][j].numberOfBombsAround++
            };
          if (this.arr[i+1][j].isBomb) {
            this.arr[i][j].numberOfBombsAround++
          };
          if (this.arr[i+1][j+1].isBomb)
            {this.arr[i][j].numberOfBombsAround++
          };
        }

        if (i == 0 && j == 0){
          if (this.arr[i][j+1].isBomb) this.arr[i][j].numberOfBombsAround++
          if (this.arr[i+1][j+1].isBomb) this.arr[i][j].numberOfBombsAround++
          if (this.arr[i+1][j].isBomb) this.arr[i][j].numberOfBombsAround++
        }

        if (i == 0 && j == 9){
          if (this.arr[i][j-1].isBomb) this.arr[i][j].numberOfBombsAround++
          if (this.arr[i+1][j-1].isBomb) this.arr[i][j].numberOfBombsAround++
          if (this.arr[i+1][j].isBomb) this.arr[i][j].numberOfBombsAround++
        }

        if (i == 9 && j == 0){
          if (this.arr[i-1][j].isBomb) this.arr[i][j].numberOfBombsAround++
          if (this.arr[i-1][j+1].isBomb) this.arr[i][j].numberOfBombsAround++
          if (this.arr[i][j+1].isBomb) this.arr[i][j].numberOfBombsAround++
        }

        if (i == 9 && j == 9){
          if (this.arr[i-1][j].isBomb) this.arr[i][j].numberOfBombsAround++
          if (this.arr[i-1][j-1].isBomb) this.arr[i][j].numberOfBombsAround++
          if (this.arr[i][j-1].isBomb) this.arr[i][j].numberOfBombsAround++
        }
        if (i == 0 && j > 0){
          if (this.arr[i][j-1].isBomb) this.arr[i][j].numberOfBombsAround++
          if (this.arr[i+1][j-1].isBomb) this.arr[i][j].numberOfBombsAround++
          if (this.arr[i+1][j].isBomb) this.arr[i][j].numberOfBombsAround++
        }
        if (i == 9 && j > 0){
          if (this.arr[i][j-1].isBomb) this.arr[i][j].numberOfBombsAround++
          if (this.arr[i-1][j-1].isBomb) this.arr[i][j].numberOfBombsAround++
          if (this.arr[i-1][j].isBomb) this.arr[i][j].numberOfBombsAround++
        }
        if (i > 0 && j == 0){
          if (this.arr[i-1][j].isBomb) this.arr[i][j].numberOfBombsAround++
          if (this.arr[i-1][j+1].isBomb) this.arr[i][j].numberOfBombsAround++
          if (this.arr[i][j].isBomb) this.arr[i][j].numberOfBombsAround++
        }
        if (i > 0 && j == 9){
          if (this.arr[i][j-1].isBomb) this.arr[i][j].numberOfBombsAround++
        // if (i == 0 && j == 0) {
        //   break
        // } else if (this.arr[i-1][j-1].isBomb) {
        //   console.log('alok');
        //   this.arr[i][j].numberOfBombsAround++
        // };

        // if (i == 0) {
        //   break
        // } else if (this.arr[i-1][j].isBomb) {
        //    this.arr[i][j].numberOfBombsAround++
        // };

        // if (i == 0 || i == 9 || j == 0 || j == 9) {
        //   break
        // } else if (this.arr[i-1][j+1].isBomb) {
        //   this.arr[i][j].numberOfBombsAround++
        // };

        // if (i == 0 || i == 9 || j == 0 || j == 9) {
        //   break
        // } else if (this.arr[i][j-1].isBomb) {
        //   this.arr[i][j].numberOfBombsAround++
        // };

        // if (i == 0 || i == 9 || j == 0 || j == 9) {
        //   break
        // } else if (this.arr[i][j+1].isBomb) {
        //   this.arr[i][j].numberOfBombsAround++
        // };

        // if (i == 0 || i == 9 || j == 0 || j == 9) {
        //   break
        // } else if (this.arr[i+1][j-1].isBomb) {
        //   this.arr[i][j].numberOfBombsAround++
        // };

        // if (i == 0 || i == 9 || j == 0 || j == 9) {
        //   break
        // } else if (this.arr[i+1][j].isBomb) {
        //   this.arr[i][j].numberOfBombsAround++
        // };

        // if (i == 0 || i == 9 || j == 0 || j == 9) {
        //   break
        // } else if (this.arr[i+1][j+1].isBomb) {
        //   this.arr[i][j].numberOfBombsAround++
        // };
      }
    }
  }}

  public random(min, max): number { // randomize func
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
