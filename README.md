# Introduction

What are you building?

- We are building an app with a tailored database of places that suit digital nomads' needs.

Why are you building it?

- Digital nomads often struggle to find flexible workspaces without long memberships and those open at unconventional hours. This app will help simplify their search for a place to work.

## Getting Started

First, you'll need a few environmental variables to run it locally.

Just ask us.

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

Alternatively, view our deployed app here [on Vercel Platform](https://desk-mooovements-1b004ndx5-elenas-projects-f436e785.vercel.app/).

# Project scope

We are not building an exhaustive list of places to work at.

Expect to find some hidden gems here, and please do contribute to the site with your favourite places to work!

# Project plan

Key components of the app:
- Viewing places
- Adding to wishlist
- Contributing (adding new places)

Our MVP lists a few nice places handpicked by James

The user research helped us refined the amenity filter options. 

# Requirement analysis

We have a very intuitive design, and have worked on making the site accessible for all.

There's no legal or regulatory requirements that we are aware of.

# Did your team work effectively?

The four of us have different strengths, and all get to work on areas that we're not the most confident with. 

We found that stand-up meetings and pair progamming sessions helped us work efficiently. 

# Project outcomes

During the second sprint, we decided to move the map-related content into stretch goals. 
These features will make the user experience better but we focused on most essential functions. 

Was the project a success?
- Yes

# Planning

What roles did your team take 
- Shaughn Scrum Facilitator, Yuqing UI/UX, James QA, Elena DevOps
- Within our organization scum facilitation means mostly leading stand ups and organizing planning the project was not strictly guided since we spent time planning together before the start
- UI/UX meant making sure the layout and way that you moved around the web site was handled in keeping with our intended user experience and prototype
- QA meant designing tests for the routes and key functions in our project
- Dev Ops was getting deployment to work and making sure all code would work on deployment

How did you plan a user experience?
- Here's our [figma design](https://www.figma.com/file/NZccojtf3RhwXvdxG5C9FQ/Moooooooo?type=design&node-id=1%3A24&mode=design&t=GJhzZSfMuFg0gEDv-1)

Our Database

<img width="676" alt="image" src="https://github.com/fac28/desk-mooovements/assets/44486576/fa9cefac-6b15-471a-8241-72c39a1c7474">

  
<!--- What technical decisions did you make?
Server-render vs client-render vs both
Relational or non-relational or no DB
Self-hosted or platform-as-a-service
Frontend first vs DB first
Did you create a technical specification?
Review methods of software design with reference to functional/technical specifications and apply a justified approach to software development (K11, S11, S12)-->

Implementation/Build
How did you ensure your code was good?
- We wrote tests and acted on the feedbacks we got from code reviews

What interesting technical problems did you have to solve?
- separating server and client side components
- cookies

Did writing automated tests catch any bugs?
- I never actually set the tests up to run on git hooks or before deployment.
- We only had e2e tests which relied on the page layout. Page layout was fairly transient throuhout the project.

What problems did you encounter during deployment?
- Fly didn't work;
- and we used Vercel because it's built for NexJS app.

Our codes are nicely structured and easy to read. It's easy for someone to make changes to the codebase, and a new person can quickly be onboarded to contribute.
