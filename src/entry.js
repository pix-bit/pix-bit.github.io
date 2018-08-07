import {WebGLRenderer, OrthographicCamera, Scene, Vector3} from 'three';
import {EffectComposer, RenderPass, ShaderPass, BleachBypassShader, VerticalBlurShader} from 'three-addons';

import SeedScene from './objects/Scene';

const {innerHeight, innerWidth} = window;


const scene = new Scene();
const camera = new OrthographicCamera(innerWidth / -2, innerWidth / 2, innerHeight / 2, innerHeight / - 2, -50, 50);
camera.zoom = 2;
const renderer = new WebGLRenderer({antialias: true});
const seedScene = new SeedScene();

// scene
scene.add(seedScene);

// camera
camera.position.set(0,1.5,-20);
camera.lookAt(new Vector3(0,0,0));

// renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x7ec0ee, 1);
renderer.shadowMap.enabled = true;

// composer
const composer = new EffectComposer(renderer);
composer.addPass( new RenderPass(scene, camera));

const bleachPass = new ShaderPass(BleachBypassShader);
bleachPass.renderToScreen = true;
bleachPass.enabled = false;
composer.addPass(bleachPass);

const blurPass = new ShaderPass(VerticalBlurShader);
blurPass.renderToScreen = true;
blurPass.enabled = false;
composer.addPass(blurPass);

// render loop
const onAnimationFrameHandler = (timeStamp) => {
  if (seedScene.playing && seedScene.checkForLose() || seedScene.lose) {
    bleachPass.enabled = true;
    composer.render();

    seedScene.playing = false;
    loseBlock.style.display = 'block';
  } else if (Math.abs(seedScene.speed) < 0.01 && seedScene.checkForWin()) {
    blurPass.enabled = true;
    composer.render();

    seedScene.speed = 0;
    seedScene.playing = false;
    winBlock.style.display = 'block';
  } else {
    renderer.render(scene, camera);
  }
  seedScene.update && seedScene.update(timeStamp);
  window.requestAnimationFrame(onAnimationFrameHandler);
};
window.requestAnimationFrame(onAnimationFrameHandler);

// resize
const windowResizeHandler = () => {
  const { innerHeight, innerWidth } = window;
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
};
windowResizeHandler();
window.addEventListener('resize', windowResizeHandler);

// dom
document.body.style.margin = 0;
document.body.style.overflow = 'hidden';
document.body.appendChild(renderer.domElement);

const overlayCss = `
  display: none;
  position: absolute;
  bottom: 45%;
  width: 100%;
  text-align: center;
  font-size: 36px;
  color: white;
`;

const winBlock = document.createElement('div');
winBlock.innerText = 'Congratulations, this game is yours!';
winBlock.style.cssText = overlayCss;
document.body.appendChild(winBlock);

const loseBlock = document.createElement('div');
loseBlock.innerText = 'Sorry but you are lose ;(';
loseBlock.style.cssText = overlayCss;
document.body.appendChild(loseBlock);


