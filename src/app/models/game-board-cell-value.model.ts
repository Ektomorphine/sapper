export interface GameBoardCellValue {
  numberOfBombsAround: number;
  isBomb?: boolean;
  isOpen?: boolean;
  isFlag: boolean;
  x: number;
  y: number;
}
