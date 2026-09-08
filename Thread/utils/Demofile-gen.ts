// import {faker} from "@faker-js/faker";
// import {Thread, User} from "../types/threads";

// export function createRandomFollower(): User {
//     const firstName = faker.person.firstName();
//     const lastName = faker.person.lastName(); 
//     const name = firstName + " " + lastName;  
//     return {
//         id: faker.string.uuid(),
//         name: name,
//         username: faker.internet.username({ firstName, lastName }),
//         avatar: faker.image.avatar(),
//         verified: faker.datatype.boolean(),
//         bio: faker.person.bio(),
//         link: faker.internet.url(),
//         folowers: new Array(Math.floor(Math.random() * 10)).fill(null).map(() => createRandomFollower()),
//         following: new Array(Math.floor(Math.random() * 10)).fill(null).map(() => createRandomFollower()),
      
//     }
// }


// export function createRandomUser(): User {
//     const firstName = faker.person.firstName();
//     const lastName = faker.person.lastName();
//     const name = firstName + " " + lastName;
//     return {
//         id: faker.string.uuid(),
//         name: `${firstName} ${lastName}`,
//         username: faker.internet.username({ firstName, lastName }),
//         avatar: faker.image.avatar(),
//         verified: faker.datatype.boolean(),
//         bio: faker.person.bio(),
//         link: faker.internet.url(),
//         folowers: new Array(Math.floor(Math.random() * 10)).fill(null).map(() => createRandomFollower()),
//         following: new Array(Math.floor(Math.random() * 10)).fill(null).map(() => createRandomFollower()),

//     };
// }

// export function createRandomThread(): Thread {
//   const author = createRandomUser();
//   const mentionUser = createRandomUser();

//   return {
//     id: faker.string.uuid(),
//     author,
//     content: faker.lorem.paragraph(),
//     image: Math.random() > 0.5 ? faker.image.url() : undefined,
//     replies: new Array(Math.floor(Math.random() * 10)).fill(null).map(() => ({
//       id: faker.string.uuid(),
//       author: createRandomUser(),
//       content: faker.lorem.sentence(),
//       likes: Math.floor(Math.random() * 1000),
//       createdAt: faker.date.recent().toISOString(),
//     })),
//     repliesCount: Math.floor(Math.random() * 100),
//     likesCount: Math.floor(Math.random() * 1000),
//     mentionUser: Math.random() > 0.5 ? mentionUser : undefined,
//     createdAt: faker.date.recent().toISOString(),
//   };
// }

// export function generateThreads(count: number): Thread[] {
//     return new Array(count).fill(null).map(() => createRandomThread()); 
// }

import { faker } from "@faker-js/faker";
import { Thread, User } from "../types/threads";

const MAX_DEPTH = 2;

export function createRandomFollower(depth = 0): User {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    id: faker.string.uuid(),
    name: `${firstName} ${lastName}`,
    username: faker.internet.username({ firstName, lastName }),
    avatar: faker.image.avatar(),
    verified: faker.datatype.boolean(),
    bio: faker.person.bio(),
    link: faker.internet.url(),

    followers:
      depth >= MAX_DEPTH
        ? []
        : Array.from(
            { length: Math.floor(Math.random() * 3) },
            () => createRandomFollower(depth + 1)
          ),

    following:
      depth >= MAX_DEPTH
        ? []
        : Array.from(
            { length: Math.floor(Math.random() * 3) },
            () => createRandomFollower(depth + 1)
          ),
  };
}

export function createRandomUser(): User {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    id: faker.string.uuid(),
    name: `${firstName} ${lastName}`,
    username: faker.internet.username({ firstName, lastName }),
    avatar: faker.image.avatar(),
    verified: faker.datatype.boolean(),
    bio: faker.person.bio(),
    link: faker.internet.url(),

    followers: Array.from(
      { length: Math.floor(Math.random() * 5) },
      () => createRandomFollower(1)
    ),

    following: Array.from(
      { length: Math.floor(Math.random() * 5) },
      () => createRandomFollower(1)
    ),
  };
}

export function createRandomThread(): Thread {
  const author = createRandomUser();
  const mentionUser = createRandomUser();

  return {
    id: faker.string.uuid(),
    author,
    content: faker.lorem.paragraph(),
    image: Math.random() > 0.5 ? faker.image.url() : undefined,

    replies: Array.from(
      { length: Math.floor(Math.random() * 10) },
      () => ({
        id: faker.string.uuid(),
        author: createRandomUser(),
        content: faker.lorem.sentence(),
        likes: Math.floor(Math.random() * 1000),
        createdAt: faker.date.recent().toISOString(),
      })
    ),

    repliesCount: Math.floor(Math.random() * 100),
    likesCount: Math.floor(Math.random() * 1000),
    mentionUser: Math.random() > 0.5 ? mentionUser : undefined,
    createdAt: faker.date.recent().toISOString(),
  };
}

export function generateThreads(count: number): Thread[] {
  return Array.from({ length: count }, () =>
    createRandomThread()
  );
}