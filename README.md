<!--
*** Thanks for checking out this README Template. If you have a suggestion that would
*** make this better, please fork the repo and create a pull request or simply open
*** an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![hire-badge](https://img.shields.io/badge/Consult%20/%20Hire%20Ikraam-Click%20to%20Contact-brightgreen)](mailto:consult.ikraam@gmail.com) [![Twitter Follow](https://img.shields.io/twitter/follow/GhoorIkraam?label=Follow%20Ikraam%20on%20Twitter&style=social)](https://twitter.com/GhoorIkraam)

<!-- PROJECT LOGO -->

<br />
<p align="center">
  <a href="git@github.com:ikraamg/ForestRPG.git">
    <p align="center"> <img src="./assets/sprites/logo.png" alt="ForestRPG" height="200"> </p>
  </a>

  <h3 align="center">A RPG Game developed in JavaScript with Phaser 3 library </h3>

  <p align="center">
    <a href="https://github.com/ikraamg/ForestRPG/issues">Report Bug</a>
    ·
    <a href="https://github.com/ikraamg/ForestRPG/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Potential Future Updates](#potential-future-updates)
  - [Authors](#authors)
  - [Show your support](#show-your-support)
  - [Acknowledgments](#acknowledgments)
  - [📝 License](#-license)

<!-- ABOUT THE PROJECT -->

## About The Project

In this project, a 2D RPG game in JavaScript was built with the help of Phaser library.

An external api service is used to store the player names and scores. Top 5 players are displayed in game leaderboard.

<!-- CONTROL'S -->

## How to play

The main character needs to kill enemies as quickly as possible with the least amount of arrows to open the exit door(6 minimum) and get a high score.

### Control's

- (←) left arrow key => Move left
- (→) right arrow key => Move right
- (↑) up arrow key => Mpve up
- (↓) down arrow key => Move down
- (Space) key => Attack enemy

<p align="center"> <img src="https://user-images.githubusercontent.com/34813339/93250228-ccb63300-f792-11ea-8c15-1abf99f364b7.png" alt="ForestRPG Game" width="700"> </p>

<!-- Live Link  -->

## Live Link

[Click here](http://ikraamghoor.com/ForestRPG/)

<!-- INSTALLATION -->

## Installation

To run 'ForestRPG' locally, clone the repository, navigate to it's directory.

#### Follow these commands step by step:-

```bash
git@github.com:ikraamg/ForestRPG.git
cd ForestRPG
git checkout game-feature
npm install
npm run start
```

Now go to [localhost:8000](http://localhost:8000) in your browser.

##### Test with

```bash
npm run test
```

<!-- BUILD WITH -->

## Built With

- HTML/CSS
- Phaser 3
- Webpack
- Eslint
- Stylelint
- Jest
- ES6
- NPM
- Github
- Github pages for deployment
- Leaderboard API service

<!-- Game Design -->

## Game Design

This game has 3 main assets that bring it to life:

1. The hero

<p align="center"> <img src="https://user-images.githubusercontent.com/34813339/93326758-9ec80180-f819-11ea-8901-40fe9f66c95e.png" alt="Hero" width="100">

1. The map assets:

<p align="center"> <img src="./assets/environment/tileset.png" alt="Map" width="300">

3. The Enemies (Moles and Treants):

<p align="center"> <img src="https://user-images.githubusercontent.com/34813339/93326875-ccad4600-f819-11ea-920c-793bb9618e98.png" alt="Enemies" width="100">
<p align="center"> <img src="https://user-images.githubusercontent.com/34813339/93326910-ddf65280-f819-11ea-801c-a386ceaec793.png" alt="Enemies" width="100">

<!-- game play -->

## Game Play

You are a hero in a Fantasy Forest World where nuclear waste has created made trees walk around and turned moles into large beasts. The Treants and Moles are preventing you from continuing on your jouney to find other humans. Once you have killed atleast 6 enemies a mountain door open so you can continue to find a cure for this chaos. The faster you get kills, the higher the chances of you finding a cure.

You (and your 3 lives) head to the forest, armed with a bow and arrows to kill the enemies as quickly as possible. Ammo costs points so try to use as little as possible.

Any contact with an enemy is deadly and you lose a life. Try to kill as many enemies as possible before exiting the area through the mountain door to get the highest score.

Don't forget to post your score to the global leaderboard!

<p align="center"> <img src="https://user-images.githubusercontent.com/34813339/93250526-3c2c2280-f793-11ea-9c66-a053e4e0a1c1.png" alt="ForestRPG Game" width="700"> </p>

# Potential Future Updates

- Add multiplayer functionality
- Add more levels
- Adding collectable objects like coins and upgrades
- Touch controls/Mobile Friendly
- User authentication

<!-- CONTACT -->

## Authors

👤 **Ikraam Ghoor**

- Github: [@ikraamg](https://github.com/ikraamg)
- Twitter: [@GhoorIkraam](https://twitter.com/GhoorIkraam)
- LinkedIn: [isghoor](https://linkedin.com/isghoor)
- Email: [consult.ikraam@gmail.com](mailto:consult.ikraam@gmail.com)

## Show your support

Give a ⭐️ if you like this project!

## Acknowledgments

For the amazing pixel art and other assets: [Luis Zuno](https://www.patreon.com/ansimuz)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/ikraamg/ForestRPG.svg?style=flat-square
[contributors-url]: https://github.com/ikraamg/ForestRPG/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/ikraamg/ForestRPG.svg?style=flat-square
[forks-url]: https://github.com/ikraamg/ForestRPG/network/members
[stars-shield]: https://img.shields.io/github/stars/ikraamg/ForestRPG.svg?style=flat-square
[stars-url]: https://github.com/ikraamg/ForestRPG/stargazers
[issues-shield]: https://img.shields.io/github/issues/ikraamg/ForestRPG.svg?style=flat-square
[issues-url]: https://github.com/ikraamg/ForestRPG/issues

## 📝 License

This project is [MIT](https://opensource.org/licenses/MIT) licensed.
