/* eslint-env mocha, jasmine */

import {
  createDriver,
  utilsFactory,
} from '../../lib/e2eUtils';

const driver = createDriver();
const {
  init,
  click,
  type,
  count,
  wait,
  pressEnter,
  pressRightArrow,
  close,
} = utilsFactory(driver);

jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;

it('should do something', async (done) => {
  // Open
  await init();

  // Add ideas
  await wait(1000);
  await click('#ideas');
  await click('.SpeedDial');
  await click('.SpeedDial + div + div');
  await type('.NewIdeaDialog input', 'a cool idea');
  await click('#add-and-continue');
  await type('.NewIdeaDialog input', 'another cool idea');
  await click('#add-and-continue');
  await type('.NewIdeaDialog input', 'even another cool idea');
  await click('#add-and-finish');
  let numberOfIdeas = await count('.Idea');
  expect(numberOfIdeas).toBe(3);
  await wait(500);

  // Delete idea
  await click('.Idea:first-of-type .delete');
  await wait(1100);
  numberOfIdeas = await count('.Idea');
  expect(numberOfIdeas).toBe(2);
  await wait(500);

  // Edit idea
  await click('.Idea:first-of-type .edit');
  await type('.EditIdeaDialog input', 'an edited cool idea');
  await click('#edit');
  await wait(500);
  numberOfIdeas = await count('.Idea');
  expect(numberOfIdeas).toBe(2);
  await wait(500);

  // Convert idea
  await click('.Idea:first-of-type .convert');
  await type('.ConvertIdeaDialog input', 'a cool task from a cool idea');
  await click('#end input');
  await pressRightArrow(5);
  await pressEnter();
  await type('#estimated-time', 10);
  await wait(500);
  await click('#add-and-continue');
  await type('.ConvertIdeaDialog input', 'another cool task from a cool idea');
  await click('#start input');
  await pressRightArrow(2);
  await pressEnter();
  await wait(500);
  await click('#end input');
  await pressRightArrow(4);
  await pressEnter();
  await type('#estimated-time', 20);
  await wait(500);
  await click('#add-and-finish');
  numberOfIdeas = await count('.Idea');
  expect(numberOfIdeas).toBe(1);
  await wait(500);
  await click('#tasks');
  const numberOfTasks = await count('.Task');
  expect(numberOfTasks).toBe(2);

  // Close
  await close();
  done();
});
