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

it('should test settings functionality', async (done) => {
  // Open
  await init();

  // Add tasks
  await click('#plus-fab');
  await click('#done-fab');
  await type('.NewTaskDialog input', 'a cool task');
  await click('#end input');
  await pressRightArrow(5);
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
  let numberOfTasks = await count('.Task');
  expect(numberOfTasks).toBe(2);
  await wait(500);

  // Toggle not-yet tasks
  await click('#settings');
  await click('#not-yet-tasks input');

  // Count tasks
  await click('#tasks');
  numberOfTasks = await count('.Task');
  expect(numberOfTasks).toBe(1);

  // Close
  await close();
  done();
});
