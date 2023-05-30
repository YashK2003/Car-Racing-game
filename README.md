# 3D Car Racing Game 

A simple 3-D car racing game built as part of computer graphics course using WebGL and Three.js with various features.
***
## Screenshot of the game
![racing](https://github.com/YashK2003/Car-Racing-game-/assets/102593613/63da7f6e-df43-4f95-9d5e-823ef826f452)

***
## Installation
```
npm install three
npm install webpack
sudo npm -g install servez

```
***
## Downloading the models
Download all the models required in a folder named `dist`.
Use the below link for the same-
`https://iiitaphyd-my.sharepoint.com/:f:/g/personal/yash_kawade_students_iiit_ac_in/Emll_ZALYqBKm6_Hf9R84loBFwlLgm51j2-1aLFVXpEHLQ?e=j1t1Gd`

***
## How To Run the game

run the command

```
npx webpack --config webpack.config.js
```
To start the server

```
servez .
```
***
## Controls and instructions
- `↑` or `W` to accelerate.
- `←` or `A` to move left.
- `↓` or `S` to apply brakes.
- `→` or `D` to move right.
- `C` to toggle between camera angles.
- Collect fuel cans to increase the fuel.
- Collision with car reduces your health.
- Moving outside the barricades also reduces your health.

***
## Features
- **3D World**: The world have a stadium and also has the audience in the stadium.

- **Cars**: There are three opponent cars in the game which move at random speeds.

- **Fuel**: There are fuel cans at various places on the track. Collision with the cans increases your fuel.

- **Map window**:  A small map view (top view) is also shown at the bottom left of the screen.

- **Camera angles**: Implemented camera angles player’s view and Third person’s view.

- **Display**: Displayed health bar, fuel bar, score and time on the top left of the screen.

***
## Built With

* WebGL
* Three.js
***

## Happy Car racing !! 😎 
