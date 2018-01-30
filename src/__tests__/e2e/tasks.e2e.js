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

jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;

it('should test tasks functionality', async (done) => {
  // Open
  await init();

  // Add tasks
  await click('#plus-fab');
  await click('#done-fab');
  await type('.NewTaskDialog input', 'a cool task');
  await click('#end input');
  // await pressRightArrow(5);

  await pressEnter();
  await type('#estimated-time', 10);
  await wait(500);
  await click('#add-and-continue');
  await type('.NewTaskDialog input', 'another cool task');
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
  await wait(500);
  let numberOfTasks = await count('.Task');
  expect(numberOfTasks).toBe(2);
  await wait(500);

  // Delete task
  await click('.Task .delete');
  await wait(500);
  numberOfTasks = await count('.Task');
  expect(numberOfTasks).toBe(1);
  await wait(500);

  // Edit task
  await click('.Task .edit');
  await type('.EditTaskDialog input', 'an edited cool task');
  await click('#edit');
  await wait(500);
  numberOfTasks = await count('.Task');
  expect(numberOfTasks).toBe(1);
  await wait(500);

  // Mark task as done
  await click('.Task .mark-as-done');
  await wait(500);
  numberOfTasks = await count('.Task');
  expect(numberOfTasks).toBe(1);
  await wait(500);

  // Close
  await close();
  done();
});
