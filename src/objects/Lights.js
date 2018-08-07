import { Group, HemisphereLight, DirectionalLight } from 'three';

export default class BasicLights extends Group {
  constructor() {
    super();
    const innerWidth = window.innerWidth;

    const hemiLight = new HemisphereLight( 0xffffbb, 0x080820, 1.15 );


    const light = new DirectionalLight( 0xffffff, .3);
    light.position.set(-innerWidth / 4 + 110, 40, 0);

    light.shadow.camera.far = 100;
    light.shadow.camera.top = -10;
    light.shadow.camera.bottom = -100;

    light.castShadow = true;

    this.add(hemiLight, light);
  }
}
