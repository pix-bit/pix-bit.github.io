import {Group, Object3D, BoxGeometry, CylinderGeometry, MeshLambertMaterial, Mesh} from 'three';

export default class Car extends Group {
    constructor() {
        super();

        const innerWidth = window.innerWidth;

        this.mesh = new Object3D();
        this.mesh.name = 'car';
        this.body = new Object3D();
        this.body.name = 'body';
        this.mesh.position.y = 8;
        this.mesh.position.x = innerWidth / 4 - 45;
        this.wheelRadius = 4;
        this.tilt = 0;
        this.maxTilt = .1;


        // car basis
        const basisGeo = new BoxGeometry(45, 10, 10);
        basisGeo.vertices[0].x = 20;
        basisGeo.vertices[1].x = 20;
        const basisMat = new MeshLambertMaterial({color: 0x1E90FF});
        const basis = new Mesh(basisGeo, basisMat);
        basis.castShadow = true;

        // car head
        const headGeo = new BoxGeometry(30, 5, 10, 1, 1, 1);
        headGeo.vertices[0].y = 3.5;
        headGeo.vertices[1].y = 3.5;
        headGeo.vertices[3].x = 19;
        headGeo.vertices[2].x = 19;
        headGeo.vertices[4].x = -10;
        headGeo.vertices[5].x = -10;
        const head = new Mesh(headGeo, basisMat);
        head.position.y = 7.5;
        head.position.x = 1;
        head.castShadow = true;

        // head lamps
        const headlamps = new Object3D();
        const leftHeadlampGeo = new BoxGeometry(2, 2, 2);
        leftHeadlampGeo.vertices[2].x = 0;
        leftHeadlampGeo.vertices[3].x = 0;
        const leftHeadlampMat = new MeshLambertMaterial({color: 0xffffff});
        const leftHeadlamp = new Mesh(leftHeadlampGeo, leftHeadlampMat);
        leftHeadlamp.castShadow = true;
        const rightHeadlamp = leftHeadlamp.clone();
        rightHeadlamp.position.z = 8.1;
        

        headlamps.add(leftHeadlamp, rightHeadlamp);
        headlamps.position.set(-22,4.1,-4.1);

        // wheels
        const wheels = new Object3D();
        const wheel = new Object3D();

        const tireGeo = new CylinderGeometry(this.wheelRadius, this.wheelRadius, .5, 20, 5);
        const tireMat = new MeshLambertMaterial({color: 0x000000});
        const tire = new Mesh(tireGeo, tireMat);

        const diskGeo = new CylinderGeometry(this.wheelRadius - .5, this.wheelRadius - 1, .5, 8, 1);
        const diskMat = new MeshLambertMaterial({color: 0xffffff});
        const disk = new Mesh(diskGeo, diskMat);
        disk.position.y = -.5;

        wheel.add(tire, disk);

        const frWheel = wheel.clone();
        frWheel.rotateX(Math.PI / 2);
        frWheel.position.set(0, 0, -5.1);

        const flWheel = wheel.clone();
        flWheel.rotateX(-Math.PI / 2);
        flWheel.position.set(0, 0, 5.1);

        const brWheel = wheel.clone();
        brWheel.rotateX(Math.PI / 2);
        brWheel.position.set(30, 0, -5.1);

        const blWheel = wheel.clone();
        blWheel.rotateX(-Math.PI / 2);
        blWheel.position.set(30, 0, 5.1);

        wheels.add(flWheel, frWheel, brWheel, blWheel);
        wheels.position.y = -4;
        wheels.position.x = -15;

        this.body.add(basis, head, headlamps);
        this.mesh.add(this.body, wheels);
    }

    go(speed) {
        if (speed !== 0) {
            this.tilt = Math.abs(speed / 10) > this.maxTilt ? this.maxTilt * Math.sign(speed) : speed / 10;
            this.body.rotation.z = - this.tilt;
            this.mesh.position.x -= speed;
        
            this.mesh.children[1].children.forEach(wheel => {
                const angle = (speed / this.wheelRadius);
                wheel.rotateY(angle);
            })
        }
    }
}
