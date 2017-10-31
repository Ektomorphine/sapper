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
    console.log(this.bombsAroundCell);
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
          isHidden: false
        };
      }
    }
    for (let z = 0; z < 15; z++){
      gameBoardMatrix[this.random(0,9)][this.random(0,9)].isBomb = true;
    }
    return gameBoardMatrix;
  }

  public openCell(cell: GameBoardCellValue): void {
    cell.isHidden = true;
    if (cell.isBomb) {
      this.router.navigate(['game-over']);
    }
  }

  public countBombs() {
    this.bombsAroundCell = this.makeGameBoard();
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (i > 0 && i < 9 && j > 0 && j < 9){
          if (this.bombsAroundCell[i-1][j-1].isBomb){
           this.bombsAroundCell[i][j].numberOfBombsAround++
          };
          if (this.bombsAroundCell[i-1][j].isBomb) {
            this.bombsAroundCell[i][j].numberOfBombsAround++
          };
          if (this.bombsAroundCell[i-1][j+1].isBomb)
            {this.bombsAroundCell[i][j].numberOfBombsAround++
          };
          if (this.bombsAroundCell[i][j-1].isBomb) {
            this.bombsAroundCell[i][j].numberOfBombsAround++
          };
          if (this.bombsAroundCell[i][j+1].isBomb) {
            this.bombsAroundCell[i][j].numberOfBombsAround++
          };
          if (this.bombsAroundCell[i+1][j-1].isBomb){
            this.bombsAroundCell[i][j].numberOfBombsAround++
          };
          if (this.bombsAroundCell[i+1][j].isBomb) {
            this.bombsAroundCell[i][j].numberOfBombsAround++
          };
          if (this.bombsAroundCell[i+1][j+1].isBomb)
            {this.bombsAroundCell[i][j].numberOfBombsAround++
          };
        }

        if (i == 0 && j == 0){ // top left
          if (this.bombsAroundCell[i][j+1].isBomb){
           this.bombsAroundCell[i][j].numberOfBombsAround++
          }
          if (this.bombsAroundCell[i+1][j+1].isBomb) {
            this.bombsAroundCell[i][j].numberOfBombsAround++
          }
          if (this.bombsAroundCell[i+1][j].isBomb) {
            this.bombsAroundCell[i][j].numberOfBombsAround++
          }
        }

        if (i == 0 && j == 9){ // top right
          if (this.bombsAroundCell[i][j-1].isBomb) {
            this.bombsAroundCell[i][j].numberOfBombsAround++
          }
          if (this.bombsAroundCell[i+1][j-1].isBomb){
           this.bombsAroundCell[i][j].numberOfBombsAround++
          }
          if (this.bombsAroundCell[i+1][j].isBomb) {
            this.bombsAroundCell[i][j].numberOfBombsAround++
          }
        }

        if (i == 9 && j == 0){ //bottom left
          if (this.bombsAroundCell[i-1][j].isBomb) {
            this.bombsAroundCell[i][j].numberOfBombsAround++
          }
          if (this.bombsAroundCell[i-1][j+1].isBomb) {
            this.bombsAroundCell[i][j].numberOfBombsAround++
          }
          if (this.bombsAroundCell[i][j+1].isBomb) {
            this.bombsAroundCell[i][j].numberOfBombsAround++
          }
        }

        if (i == 9 && j == 9){ // bottom right
          if (this.bombsAroundCell[i-1][j].isBomb) {
            this.bombsAroundCell[i][j].numberOfBombsAround++
          }
          if (this.bombsAroundCell[i-1][j-1].isBomb) {
            this.bombsAroundCell[i][j].numberOfBombsAround++
          }
          if (this.bombsAroundCell[i][j-1].isBomb) {
            this.bombsAroundCell[i][j].numberOfBombsAround++
          }
        }
        if (i == 0 && j >= 1 && j != 9){ // top side
          if (this.bombsAroundCell[i][j-1].isBomb) {
            this.bombsAroundCell[i][j].numberOfBombsAround++
          }
          if (this.bombsAroundCell[i+1][j-1].isBomb) {
            this.bombsAroundCell[i][j].numberOfBombsAround++
          }
          if (this.bombsAroundCell[i+1][j].isBomb){
           this.bombsAroundCell[i][j].numberOfBombsAround++
          }
          if (this.bombsAroundCell[i+1][j+1].isBomb) {
            this.bombsAroundCell[i][j].numberOfBombsAround++
          }
          if (this.bombsAroundCell[i][j+1].isBomb){
           this.bombsAroundCell[i][j].numberOfBombsAround++
          }

        }
        if (i == 9 && j >= 1 && j != 9){ // bottom side
          if (this.bombsAroundCell[i][j-1].isBomb){
           this.bombsAroundCell[i][j].numberOfBombsAround++
          }
          if (this.bombsAroundCell[i-1][j-1].isBomb){
           this.bombsAroundCell[i][j].numberOfBombsAround++
          }
          if (this.bombsAroundCell[i-1][j].isBomb) {
            this.bombsAroundCell[i][j].numberOfBombsAround++
          }
          if (this.bombsAroundCell[i-1][j+1].isBomb) {
            this.bombsAroundCell[i][j].numberOfBombsAround++
          }
          if (this.bombsAroundCell[i][j+1].isBomb){
           this.bombsAroundCell[i][j].numberOfBombsAround++
          }
        }
        if (i > 0 && i != 9 && j == 0){ //left side
          if (this.bombsAroundCell[i-1][j].isBomb){
           this.bombsAroundCell[i][j].numberOfBombsAround++
          }
          if (this.bombsAroundCell[i-1][j+1].isBomb) {
            this.bombsAroundCell[i][j].numberOfBombsAround++
          }
          if (this.bombsAroundCell[i][j+1].isBomb){
           this.bombsAroundCell[i][j].numberOfBombsAround++
          }
          if (this.bombsAroundCell[i+1][j+1].isBomb) {
            this.bombsAroundCell[i][j].numberOfBombsAround++
          }
          if (this.bombsAroundCell[i+1][j].isBomb) {
            this.bombsAroundCell[i][j].numberOfBombsAround++
          }
        }
        if (i > 0 && i != 9 && j == 9){ // right side
          if (this.bombsAroundCell[i-1][j].isBomb) {
            this.bombsAroundCell[i][j].numberOfBombsAround++
          }
          if (this.bombsAroundCell[i-1][j-1].isBomb) {
            this.bombsAroundCell[i][j].numberOfBombsAround++
          }
          if (this.bombsAroundCell[i][j-1].isBomb) {
            this.bombsAroundCell[i][j].numberOfBombsAround++
          }
          if (this.bombsAroundCell[i+1][j-1].isBomb){
           this.bombsAroundCell[i][j].numberOfBombsAround++
          }
          if (this.bombsAroundCell[i+1][j].isBomb) {
            this.bombsAroundCell[i][j].numberOfBombsAround++
          }
        }
      }
    }
  }

  public random(min, max): number { // randomize func
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
