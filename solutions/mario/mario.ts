import { PowerUp, State } from "../../mario/types";

export class Player {
  state: State;
  lifes: number;
  constructor() {
    this.state = "SmallMario";
    this.lifes = 3;
  }

  use(powerup: PowerUp): void {
    type OneUp = 1;
    type Transition = [State, PowerUp, State, OneUp?];

    const transitions: Transition[] = [
      ["SmallMario", "SuperMushroom", "SuperMario"],
      ["SmallMario", "FireFlower", "FireMario"],
      ["SmallMario", "MiniMushroom", "MiniMario"],
      ["SuperMario", "SuperMushroom", "SuperMario", 1],
      ["SuperMario", "FireFlower", "FireMario"],
      ["SuperMario", "MiniMushroom", "MiniMario"],
      ["FireMario", "SuperMushroom", "FireMario", 1],
      ["FireMario", "MiniMushroom", "MiniMario"],
      ["MiniMario", "SuperMushroom", "SuperMario"],
      ["MiniMario", "FireFlower", "FireMario"],
    ];

    const transition = transitions.find(
      ([state, pu]) => state === this.state && pu === powerup,
    );
    if (!transition) return; // noop, log error ?
    const [, , newState, oneUp] = transition;
    this.state = newState;
    this.lifes += oneUp ?? 0;
  }

  hit(): void {
    type OneDown = -1;
    type Transition = [State, State, OneDown?];

    const transitions: Transition[] = [
      ["SmallMario", "SmallMario", -1],
      ["SuperMario", "SmallMario"],
      ["FireMario", "SmallMario"],
      ["MiniMario", "SmallMario", -1],
    ];

    const transition = transitions.find(([state]) => state === this.state);
    if (!transition) return; // noop, log error ?
    const [, newState, oneDown] = transition;
    this.state = newState;
    this.lifes += oneDown ?? 0;
  }
}
