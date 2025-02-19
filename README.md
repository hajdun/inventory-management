# Nuxt Inventory Manager from Minimal Starter

Build a single-page inventory management module that maintains a list of items while synchronizing local state with “server” data in
near real time. The module must implement optimistic updates and resolve conflicts
when the local update and the server’s update differ.

View and manage inventory items.
Increase/decrease quantity.

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

Guaranteed conflict for edit at "4Runner"

## Requirements

### Data Model (YES)
Each inventory item should have at least:
```
○ id
○ name
○ image_url
○ quantity
○ lastUpdated timestamp
```
mock generated with https://mockaroo.com/

### Real-Time Synchronization (YES)

### Conflict resolution (YES)
○ Show visual indicators (e.g., a warning icon or color change) when a conflict
is detected. (YES)

### Provide controls to update the quantity of an item (YES)

Controls should allow for
direct updates as well as decreasing and increasing quantity by steps.

### Display a “last synchronized” timestamp in a human readable format. (YES)


## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Dockerfile

Source: [Dockerfile source](https://georgelitos.com/post/vuejsnuxt/)

Create image
```
docker build --tag 'inventory-manager' .
```

Run it
```
docker run -d -p 127.0.0.1:3000:3000 inventory-manager
```

Or use script (linux)

```
sudo chmod u+x not_stealing_your_credit_card.sh

./not_stealing_your_credit_card.sh
```

## Solution explanation

An actual real time application would not use a solution presented here (plain polling).
It would rather go with a websocket solution maybe with some message queues.

This seems to be a multiuser system while user management is not listed among the requirements.
There should also be multiple authorization levels (elaborating later).

The application needs more fine tuned solution on every level:
- a frontend with authentication
- a (separate) backend with authentication
- most probably a nice proxy for load balancing and maybe even performing some evaluations for the conflict resolution
- proper logging of all modification attempts
- regularly backed up real database with users and items
- "id" for each individual item

Some other requirements seem to be conflicting, like we want the freshest data and caching at the same time.
This most likely will cause bugs/issues. Further clarification is necessary.

Editing conflict resolution is a complex topic and needs more detailed requirements.
There are several open questions.
- Who could guarantee that ANY of the edits is valid? Are there accidental edits? Some kind of proof for the quantity changes would be greatly appreciated (item ids).
- Are there admin users whose edits are "more important"? (multiple authorization levels)
- What should happen in the rare case of entirely simultaneous edit / edits happening almost at the same time? 
- Are these physical items? Can we run out of them? How to handle this situation?
- Limiting users who can login OR limiting which user can edit which item quantity OR being able to "lock" quantities/items for given users may work.

I would draw a detailed decision table to cover every possible (conflict) scenario before actual development.



## Known issues

There is a "busy" error message I could not investigate

Would be nice to add filters

Would be nice to be able to edit/delete items

Add item is not added

It would be nice to add debouncing or throttling to quantity modification.

Storage issue
I am used to creating Node servers which [can actually store and retrieve data](https://github.com/hajdun/express_crud/blob/main/backend/server.js). 
I never used Nuxt before.
Nuxt throws away the array every now and then. I don't know why.
The requirements seemed to not allow the usage of express, so I stayed with the Nuxt one (which does not work)

Solution is not optimised well.
I am not a senior in Vue.
I can learn it really quickly if I get a chance though.
I can still create something more or less usable in a given timeframe.