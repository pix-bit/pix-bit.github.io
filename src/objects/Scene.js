import { Group, Box3 } from 'three';
import BasicLights from './Lights.js';
import Car from './Car';
import Earth from './Earth';
import Garage from './Garage';
import Lightbulb from './Lightbulb';

export default class SeedScene extends Group {
  constructor() {
    super();

    this.speed = 0;
    this.lose = false;
    this.playing = true;

    window.addEventListener('keydown', this.listenKeys.bind(this));

    this.car = new Car();
    const earth = new Earth();
    this.garage = new Garage();
    const lightbulb = new Lightbulb();
    const lights = new BasicLights();

    this.add(lights, this.car.mesh, earth.mesh, this.garage.mesh, lightbulb.mesh);
  }

  update() {
    this.car.go(this.speed);
  }

  checkForLose() {
    const carBox = new Box3().setFromObject(this.car.mesh);
    const rightWallBox = new Box3().setFromObject(this.garage.rightWall);

    if (carBox.intersectsBox(rightWallBox) || this.car.mesh.position.x > window.innerWidth / 4 + 22) {
      this.speed = 0;
      this.lose = true;
      return true;
    }
  }

  checkForWin() {
    const carBox = new Box3().setFromObject(this.car.mesh);
    const garageBox = new Box3().setFromObject(this.garage.innerBox);

    if (garageBox.containsBox(carBox)) {
      return true;
    }
  }

  listenKeys(event) {
    if (!this.playing) return;

    if (event.keyCode === 39) {
      this.speed += .1;

    } else if (event.keyCode === 37) {
      this.speed -= .1;
    }
  }
}
