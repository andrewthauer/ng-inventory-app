import * as fs from 'fs';
import { Item } from '../src/app/items/models/item.model';
import * as R from 'ramda';
import * as randomWord from 'random-word';

const numOfItems = 100;

const randomNumber = () => Math.floor(Math.random() * 10);
const writeFile = (filename, data) =>
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
const createItem = (id: number): Item => ({
  id: id,
  name: randomWord(),
  description: 'this is a sample description',
  quantity: randomNumber(),
  minimumQuantity: 0,
});

// create random items
const ids = R.range(1, numOfItems);
const dbData = { items: R.map(createItem, ids) };
writeFile('./db.json', dbData);
