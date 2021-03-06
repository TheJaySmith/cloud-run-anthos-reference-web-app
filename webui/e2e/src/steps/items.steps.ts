/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Then, Given } from 'cucumber';
import { expect } from 'chai';

import { ItemsPage } from '../pages/items.po';

const page = new ItemsPage();

Then('I should see Item named {string}', async (name) => {
  expect(await page.getItemTitle().getText()).equals(name);
});

Then('I should see Item description as {string}', async (description) => {
  expect(await page.getItemDescription().getText()).equals(description);
});

Given('There is an item named {string}', async (name) => {
  await page.navigateTo();
  const link = page.getLinkByName(name);
  if (!await link.isPresent()) {
    page.clickButton('Create');
    await page.getFormField('name').sendKeys(name);
    await page.getFormField('description').sendKeys(`test item ${name}`);
    await page.clickButton('Submit');
  }
});
