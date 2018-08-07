import {Group, Mesh, Object3D, SphereGeometry, CylinderGeometry, MeshBasicMaterial, MeshLambertMaterial} from 'three';

export default class LightBulb extends Group {
    constructor() {
        super();

        const innerWidth = window.innerWidth;

        this.mesh = new Object3D();
        this.mesh.name = 'lightbulb';
        this.mesh.position.set(-innerWidth / 4 + 110, 42, 0);

        const bulbGeo = new SphereGeometry(3, 10, 10);
        const bulbMat = new MeshBasicMaterial({color: 0xFFFF00});
        const bulb = new Mesh(bulbGeo, bulbMat);

        const wireGeo = new CylinderGeometry(.5, .5, 5, 5);
        const wireMat = new MeshLambertMaterial({color: 0x000000});
        const wire = new Mesh(wireGeo, wireMat);
        wire.position.y = 4;

        this.mesh.add(bulb, wire);
    }
}
