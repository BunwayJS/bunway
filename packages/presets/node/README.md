# @bunway/preset-node

The Node preset for Bunway framework.

## Structure

my-bunway-app/ 
├── src/ 
│ ├── routes/web.ts ← All routes 
│ ├── controllers/ ← HTTP request handlers 
│ ├── middleware/ ← Request middleware 
│ ├── services/ ← Business logic 
│ └── bootstrap.ts ← App initialization 
│ ├── public/ 
│ └── index. ts ← Entry point 
│ ├── storage/ 
│ ├── logs/ 
│ └── cache/ 
│ ├── bunway.config.ts ← Configuration 
├── package. json 
├── tsconfig.json 
└── . env

## Why Node Preset?

- **Familiar** — Follows Node.js conventions
- **Flexible** — No enforced MVC structure
- **Scalable** — Works for APIs, microservices, monoliths
- **Simple** — Minimal boilerplate

## Usage

```bash
bunway create my-app
