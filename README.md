# Forest RPG

A 2D fantasy forest RPG built with **Phaser 3** and modern Webpack tooling.

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

<p align="center">
  <img src="./assets/sprites/logo.png" alt="Forest RPG" height="200">
</p>

## About

You are a hero in a fantasy forest warped by nuclear waste. Treants and giant moles block your path. Defeat at least **6** enemies to open the mountain door, then escape with the highest score you can.

Scores are stored in **localStorage** on your device (the old remote leaderboard API is no longer used).

## How to play

Kill enemies quickly with as few arrows as possible, then exit through the mountain door.

### Controls

| Key | Action |
| --- | --- |
| ← → ↑ ↓ | Move |
| Space | Shoot |
| Enter | Confirm / continue |
| M | Toggle mute (menu) |
| L | Local leaderboard (menu) |
| C | Credits (menu) |

## Installation

```bash
git clone https://github.com/ikraamg/ForestRPG.git
cd ForestRPG
npm install
npm start
```

Open [http://localhost:8000](http://localhost:8000).

### Scripts

| Command | Description |
| --- | --- |
| `npm start` | Dev server with hot reload |
| `npm run build` | Production build into `build/` |
| `npm test` | Jest unit tests |
| `npm run lint` | ESLint |

## Built with

- Phaser 3
- Webpack 5
- Babel
- Jest
- ESLint

## Game design

Pixel art and environment assets by [Luis Zuno (Ansimuz)](https://www.patreon.com/ansimuz). Music by Pascal Belisle.

## Authors

**Ikraam Ghoor**

- GitHub: [@ikraamg](https://github.com/ikraamg)
- Twitter: [@GhoorIkraam](https://twitter.com/GhoorIkraam)
- Email: [consult.ikraam@gmail.com](mailto:consult.ikraam@gmail.com)

## License

MIT

[contributors-shield]: https://img.shields.io/github/contributors/ikraamg/ForestRPG.svg?style=flat-square
[contributors-url]: https://github.com/ikraamg/ForestRPG/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/ikraamg/ForestRPG.svg?style=flat-square
[forks-url]: https://github.com/ikraamg/ForestRPG/network/members
[stars-shield]: https://img.shields.io/github/stars/ikraamg/ForestRPG.svg?style=flat-square
[stars-url]: https://github.com/ikraamg/ForestRPG/stargazers
[issues-shield]: https://img.shields.io/github/issues/ikraamg/ForestRPG.svg?style=flat-square
[issues-url]: https://github.com/ikraamg/ForestRPG/issues
