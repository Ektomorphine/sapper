export interface GameBoardCellValue {
  numberOfBombsAround: number;
  isBomb?: boolean;
  isOpen?: boolean;
  x: number;
  y: number;
}
