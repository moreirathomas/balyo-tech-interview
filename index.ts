import { PowerUp, State } from "./state";

export class Player {
  state: State;
  lifes: number;
  constructor() {
    this.state = "SmallMario";
    this.lifes = 3;
  }

  use(powerup: PowerUp): void {}

  hit(): void {}
}
