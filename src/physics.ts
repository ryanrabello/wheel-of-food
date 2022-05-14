import {Bodies, Body, Composite, Constraint, Engine, Mouse, MouseConstraint, Runner} from "matter-js";

const size = {
  width: document.documentElement.clientWidth,
  height: document.documentElement.clientHeight,
};


export function setupMatterjs() {
  // create engine
  const engine = Engine.create(),
    world = engine.world;

  // Remove gravity
  engine.world.gravity.scale = 0;

  // create runner
  const runner = Runner.create();
  Runner.run(runner, engine);

  // Create wheel
  const center = {x: size.width / 2, y: size.height / 2};
  const radius = Math.min(size.width, size.height) * 0.4;

  // Add pegs
  const pegs = [];
  const pegCount = 14;
  for (let i = 0; i < pegCount; i++) {
    const percent = i / pegCount;
    const angle = Math.PI * 2 * percent;
    const r = radius - 10;
    const x = Math.cos(angle) * r + center.x;
    const y = Math.sin(angle) * r + center.y;

    const peg = Bodies.polygon(x, y, 1, 20, {friction: 0});
    pegs.push(peg);
  }

  // Peg Paddler
  const rectWidth = 12;
  const rectHeight = 120;
  const paddleCenter = {
    x: center.x,
    y: center.y - radius - rectHeight / 2 + 30,
  };
  const paddler = Bodies.rectangle(
    paddleCenter.x,
    paddleCenter.y,
    rectWidth,
    rectHeight,
    {
      collisionFilter: {
        category: 1,
      },
      friction: 0,
    }
  );

  const topMiddlePaddle = {
    x: paddleCenter.x,
    y: paddleCenter.y - rectHeight / 2,
  };
  const paddlerAxle = Constraint.create({
    pointA: topMiddlePaddle,
    bodyB: paddler,
    pointB: {
      x: 0,
      y: -rectHeight / 2,
    },
    // length: 1,
    stiffness: 1,
    render: {
      visible: true,
    },
  });

  const springOffset = 100;
  const paddleSpringOptions = {
    stiffness: 0.02,
    // damping: .05,
    render: {
      visible: false,
    },
  };
  const paddleSpring1 = Constraint.create({
    pointA: {
      x: paddleCenter.x - springOffset,
      y: paddleCenter.y + rectHeight / 2,
    },
    bodyB: paddler,
    pointB: {
      x: 0,
      y: rectHeight / 2,
    },
    ...paddleSpringOptions,
  });

  const paddleSpring2 = Constraint.create({
    pointA: {
      x: paddleCenter.x + springOffset,
      y: paddleCenter.y + rectHeight / 2,
    },
    bodyB: paddler,
    pointB: {
      x: 0,
      y: rectHeight / 2,
    },
    ...paddleSpringOptions,
  });

  Composite.add(world, [paddler, paddlerAxle, paddleSpring1, paddleSpring2]);

  // TODO: Make the physics look cooler
  // Add the fly wheel and pegs
  const flyWheel = Bodies.polygon(center.x, center.y, 1, radius - 40, {
    mass: 100,
  });
  const wheelBody = Body.create({
    parts: [flyWheel, ...pegs],
  });

  // wheel axel is in center
  const constraint = Constraint.create({
    pointA: center,
    bodyB: wheelBody,
    length: 0,
    stiffness: 1,
    render: {
      visible: true,
    },
  });

  Composite.add(world, [wheelBody, constraint]);

  // add mouse control
  const mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        // allow bodies on mouse to rotate
        angularStiffness: 0,
        stiffness: 0.1,
        render: {
          visible: true,
        },
      },
    });

  Composite.add(world, mouseConstraint);
}
