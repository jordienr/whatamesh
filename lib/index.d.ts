declare class MiniGl {
  constructor(
    canvas: HTMLCanvasElement,
    width: number,
    height: number,
    debug?: boolean
  );
  setSize(width: number, height: number): void;
  setOrthographicCamera(
    left?: number,
    right?: number,
    top?: number,
    bottom?: number,
    near?: number,
    far?: number
  ): void;
  render(): void;
}

declare class Gradient {
  constructor(selector: string);
  pause(): void;
  play(): void;
  toggleColor(index: number): void;
  showGradientLegend(): void;
  hideGradientLegend(): void;
}

export { Gradient };
