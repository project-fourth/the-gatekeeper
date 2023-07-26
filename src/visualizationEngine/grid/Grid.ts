import { stroke } from "@/colors";
import { Graphics } from "pixi.js";
import { UnifiedState, adaptEffect, adaptState, unify } from "promethium-js";

export type GridOptions = {
  x: number;
  y: number;
  gridWidth: number;
  gridHeight: number;
  gridGap: number;
};

export default class Grid extends Graphics {
  gridWidth: UnifiedState<number>;
  gridHeight: UnifiedState<number>;
  gridGap: number;

  constructor(options: GridOptions) {
    super();
    this.x = options.x;
    this.y = options.y;
    this.gridWidth = unify(adaptState(options.gridWidth));
    this.gridHeight = unify(adaptState(options.gridHeight));
    this.gridGap = options.gridGap;
  }

  init() {
    this.buildGrid();
  }

  buildGrid() {
    adaptEffect(() => {
      this.clear();
      this.beginFill(stroke["primary-dark"]);
      this.alpha = 0.5;
      const xDivs = Math.round(this.gridWidth() / this.gridGap);
      const yDivs = Math.round(this.gridHeight() / this.gridGap);
      for (let i = 0; i < xDivs; i++) {
        for (let j = 0; j < yDivs; j++) {
          this.drawCircle(i * this.gridGap, j * this.gridGap, 0.5);
        }
      }
    });
  }

  resize(width: number, height: number) {
    if (width) this.gridWidth(width);
    if (height) this.gridHeight(height);
  }
}
