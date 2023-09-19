import { describe, expect, test } from "bun:test";
import { Player } from "./mario";

describe("use Super Mushroom", () => {
  test("as Small Mario", () => {
    const player = new Player();

    player.use("SuperMushroom");
    expect(player.state).toBe("SuperMario");
    expect(player.lifes).toBe(3);
  });

  test("as Super Mario", () => {
    const player = new Player();
    player.state = "SuperMario";

    player.use("SuperMushroom");
    expect(player.state).toBe("SuperMario");
    expect(player.lifes).toBe(4);
  });

  test("as Fire Mario", () => {
    const player = new Player();
    player.state = "FireMario";

    player.use("SuperMushroom");
    expect(player.state).toBe("FireMario");
    expect(player.lifes).toBe(4);
  });

  test("as Mini Mario", () => {
    const player = new Player();
    player.state = "MiniMario";

    player.use("SuperMushroom");
    expect(player.state).toBe("SuperMario");
    expect(player.lifes).toBe(3);
  });
});

describe("use Fire Flower", () => {
  test("as Small Mario", () => {
    const player = new Player();

    player.use("FireFlower");
    expect(player.state).toBe("FireMario");
    expect(player.lifes).toBe(3);
  });

  test("as Super Mario", () => {
    const player = new Player();
    player.state = "SuperMario";

    player.use("FireFlower");
    expect(player.state).toBe("FireMario");
    expect(player.lifes).toBe(3);
  });

  test("as Fire Mario", () => {
    const player = new Player();
    player.state = "FireMario";

    player.use("FireFlower");
    expect(player.state).toBe("FireMario");
    expect(player.lifes).toBe(3);
  });

  test("as Mini Mario", () => {
    const player = new Player();
    player.state = "MiniMario";

    player.use("FireFlower");
    expect(player.state).toBe("FireMario");
    expect(player.lifes).toBe(3);
  });
});

describe("use Mini Mushroom", () => {
  test("as Small Mario", () => {
    const player = new Player();

    player.use("MiniMushroom");
    expect(player.state).toBe("MiniMario");
    expect(player.lifes).toBe(3);
  });

  test("as Super Mario", () => {
    const player = new Player();
    player.state = "SuperMario";

    player.use("MiniMushroom");
    expect(player.state).toBe("MiniMario");
    expect(player.lifes).toBe(3);
  });

  test("as Fire Mario", () => {
    const player = new Player();
    player.state = "FireMario";

    player.use("MiniMushroom");
    expect(player.state).toBe("MiniMario");
    expect(player.lifes).toBe(3);
  });

  test("as Mini Mario", () => {
    const player = new Player();
    player.state = "MiniMario";

    player.use("MiniMushroom");
    expect(player.state).toBe("MiniMario");
    expect(player.lifes).toBe(3);
  });
});

describe("get hit", () => {
  test("as Small Mario", () => {
    const player = new Player();

    player.hit();
    expect(player.state).toBe("SmallMario");
    expect(player.lifes).toBe(2);
  });

  test("as Super Mario", () => {
    const player = new Player();
    player.state = "SuperMario";

    player.hit();
    expect(player.state).toBe("SmallMario");
    expect(player.lifes).toBe(3);
  });

  test("as Fire Mario", () => {
    const player = new Player();
    player.state = "FireMario";

    player.hit();
    expect(player.state).toBe("SmallMario");
    expect(player.lifes).toBe(3);
  });

  test("as Mini Mario", () => {
    const player = new Player();
    player.state = "MiniMario";

    player.hit();
    expect(player.state).toBe("SmallMario");
    expect(player.lifes).toBe(2);
  });
});

describe("Player", () => {
  test("starts as Small Mario", () => {
    const player = new Player();
    expect(player.state).toBe("SmallMario");
  });

  test("starts with 3 lives", () => {
    const player = new Player();
    expect(player.lifes).toBe(3);
  });
});
