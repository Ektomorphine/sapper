import { Component, OnInit } from '@angular/core';

import { GameBoardCellValue } from './../../models/game-board-cell-value.model';

@Component({
  selector: 'sapper-page',
  templateUrl: './sapper.page.html',
  styleUrls: ['./sapper.page.scss']
})
export class SapperPage {

  ngOnInit() {
  }

  public makeGameBoard(): string[] {
    let gameBoardMatrix = new Array();
    for (let i = 0; i < 10; i++) {
      gameBoardMatrix[i] = [];
      for (let j = 0; j < 10; j++) {
        gameBoardMatrix[i][j] = {
          isBomb: false,
          numberOfBombsAround: ''
        };
      }
    }
    for (let z = 0; z < 15; z++){
      gameBoardMatrix[this.random(0,9)][this.random(0,9)].isBomb = true;
    }
    return gameBoardMatrix;
  }

  public random(min, max): number { // randomize func
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
