# Contacts and Skills Application

## Description

This application is a contacts management system where each user can have a set of skills like Java, TypeScript, React.js, etc. The relationships between users and skills are modeled using the Drizzle ORM.

## Tech Stack

- **Fullstack Framework:** Remix.js
- **CSS Styling:** TailwindCSS
- **ORM Framework:** Drizzle ORM
- **Database:** BetterSQLite3

## Schema

The schema for this application is defined using Drizzle ORM and consists of three tables: `users`, `skills`, and `users_to_skills`.

- `users`: This table stores information about users. Each user has a unique `uuid`, `firstName`, `lastName`, and timestamps for when the user was `createdOn` and `updatedOn`. Users may also have a `linkedInProfile`, `avatarUrl`, and `notes`.

- `skills`: This table stores information about skills. Each skill has a unique `id` and `title`, and timestamps for when the skill was `createdOn` and `updatedOn`.

- `users_to_skills`: This table represents a many-to-many relationship between users and skills. Each entry in the `users_to_skills` table is associated with exactly one user and exactly one skill. This is a many-to-one relationship from `users_to_skills` to both `users` and `skills`.

## Installation

To install the necessary libraries, run the following command:

```bash
npm install
