import {Object3D, Group, Mesh, BoxGeometry, MeshLambertMaterial} from 'three';

export default class Earth extends Group {
    constructor() {
        super();

        const {innerWidth, innerHeight} = window;

        this. mesh = new Object3D();
        this.mesh.name = 'earth';

        const grassGeo = new BoxGeometry(innerWidth, 5, 30);
        const grassMat = new MeshLambertMaterial({color: 0x009900});
        const grass = new Mesh(grassGeo, grassMat);
        grass.receiveShadow = true;
        grass.position.y = -2.5;

        const primingGeo = new BoxGeometry(innerWidth, innerHeight, 25);
        const primingMat = new MeshLambertMaterial({color: 0x8B4513});
        const priming = new Mesh(primingGeo, primingMat);
        priming.position.y = - 5 - innerHeight / 2;

        this.mesh.add(grass, priming);
    }
}
