var Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Body = Matter.Body,
  Composite = Matter.Composite,
  Composites = Matter.Composites,
  Constraint = Matter.Constraint,
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse,
  Bodies = Matter.Bodies,
  Vertices = Matter.Vertices;

// create engine
var engine = Engine.create(),
  world = engine.world;

// create renderer
const elem = document.querySelector('#canvas');
var render = Render.create({
  element: elem,
  engine: engine,
  options: {
    width: 800,
    height: 600,
    showAngleIndicator: true,
    showCollisions: true,
    showVelocity: true,
    wireframes: false,
    background: '#fff',
    clearBackground: false,
  },
});

Render.run(render);

// create runner
var runner = Runner.create();
Runner.run(runner, engine);

// add bodies
var group = Body.nextGroup(true);

// Create concave vertices for each ropeA body
var concaveVerticesA = [
  Vertices.fromPath('0 0 25 0 25 10 10 20 0 20'), // Example shape 1
  Vertices.fromPath('0 0 30 0 20 20 10 20'), // Example shape 2
  Vertices.fromPath('0 0 40 0 40 10 20 20 0 10'), // Example shape 3
];

var ropeA = Composites.stack(100, 50, 10, 1, 10, 10, function (x, y, column) {
  var concaveVertices = concaveVerticesA[column % concaveVerticesA.length];

  return Bodies.fromVertices(x, y, concaveVertices, {
    collisionFilter: { group: group },
    render: {
      fillStyle: 'red', // 빨간색
    },
  });
});

Composites.chain(ropeA, 0.5, 0, -0.5, 0, {
  stiffness: 0.8,
  length: 2,
  render: { type: 'line' },
});
Composite.add(
  ropeA,
  Constraint.create({
    bodyB: ropeA.bodies[0],
    pointB: { x: -25, y: 0 },
    pointA: { x: ropeA.bodies[0].position.x, y: ropeA.bodies[0].position.y },
    stiffness: 0.5,
  })
);

group = Body.nextGroup(true);

var ropeB = Composites.stack(350, 50, 10, 1, 10, 10, function (x, y) {
  return Bodies.circle(x, y, 20, {
    collisionFilter: { group: group },
    render: {
      fillStyle: 'blue', // 파란색
    },
  });
});

Composites.chain(ropeB, 0.5, 0, -0.5, 0, {
  stiffness: 0.8,
  length: 2,
  render: { type: 'line' },
});
Composite.add(
  ropeB,
  Constraint.create({
    bodyB: ropeB.bodies[0],
    pointB: { x: -20, y: 0 },
    pointA: { x: ropeB.bodies[0].position.x, y: ropeB.bodies[0].position.y },
    stiffness: 0.5,
  })
);

group = Body.nextGroup(true);

var ropeC = Composites.stack(600, 50, 10, 1, 10, 10, function (x, y) {
  return Bodies.rectangle(x - 20, y, 50, 20, {
    collisionFilter: { group: group },
    chamfer: 5,
    render: {
      fillStyle: 'green', // 초록색
    },
  });
});

Composites.chain(ropeC, 0.3, 0, -0.3, 0, { stiffness: 1, length: 0 });
Composite.add(
  ropeC,
  Constraint.create({
    bodyB: ropeC.bodies[0],
    pointB: { x: -20, y: 0 },
    pointA: { x: ropeC.bodies[0].position.x, y: ropeC.bodies[0].position.y },
    stiffness: 0.5,
  })
);

Composite.add(world, [
  ropeA,
  ropeB,
  ropeC,
  Bodies.rectangle(400, 600, 1200, 50.5, { isStatic: true }),
]);

// add mouse control
var mouse = Mouse.create(render.canvas),
  mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false,
      },
    },
  });

Composite.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

// fit the render viewport to the scene
Render.lookAt(render, {
  min: { x: 0, y: 0 },
  max: { x: 700, y: 600 },
});
