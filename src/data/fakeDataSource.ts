import { faker } from "@faker-js/faker";

const getImage = () =>
  faker.image.urlLoremFlickr({ width: 300, category: "animals" });
const getType = (): keyof typeof faker.animal => {
  const animalTypes = Object.keys(faker.animal) as Array<
    keyof typeof faker.animal
  >;
  return faker.helpers.arrayElement(animalTypes);
};

function buildResultData(_: unknown, index: number) {
  const animalType = getType();
  return {
    type: animalType,
    id: index + 1,
    url: getUrl(),
    title: getTitle(animalType),
    description: getText(),
    image: getImage(),
  };
}

const getUrl = () => faker.internet.url();
const getText = () => faker.lorem.sentences();

const getTitle = (type: keyof typeof faker.animal) => {
  const animalValue = faker.animal[type];
  return typeof animalValue === "function"
    ? animalValue()
    : String(animalValue);
};

const data = [...new Array(100)].map(buildResultData);

export default data;
