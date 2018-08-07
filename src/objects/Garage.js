import {Group, Object3D, Mesh, BoxGeometry, MeshLambertMaterial} from  'three';

export default class Garage extends Group {
    constructor() {
        super();

        this.mesh = new Object3D();
        this.mesh.name = 'garage';
        this.innerBox = new Object3D();
        this.mesh.position.x = - innerWidth / 4 + 90;

        const pillarGeo = new BoxGeometry(4, 50, 4);
        const pillarMat = new MeshLambertMaterial({color: 0x777777});
        const pillar = new Mesh(pillarGeo, pillarMat);
        pillar.position.set(48, 25, -13);

        const backWallGeo = new BoxGeometry(50, 50, 4);
        const backWall = new Mesh(backWallGeo, pillarMat);
        backWall.position.set(25, 25, 13);
        
        const rightWallGeo = new BoxGeometry(4, 50, 25);
        this.rightWall = new Mesh(rightWallGeo, pillarMat);
        this.rightWall.position.y = 25;

        const frontWallMat = new MeshLambertMaterial({color: 0xADD8E6, opacity: .3, transparent: true});
        const frontWall = new Mesh(backWallGeo, frontWallMat);
        frontWall.position.set(25, 25, -13);
        
        const roofGeo = new BoxGeometry(60, 4, 34);
        const roofMat = new MeshLambertMaterial({color: 0x222222});
        const roof = new Mesh(roofGeo, roofMat);
        roof.position.y = 50;
        roof.position.x = 24;

        this.innerBox.add(pillar, backWall, frontWall, this.rightWall);
        this.mesh.add(pillar, roof, this.innerBox);
    }
}
