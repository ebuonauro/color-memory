// GLOBAL DEPENDENCIES //
import './style.scss';

// Color Memory
import colorMemory from './components/color-memory/config/data.json';
import './components/color-memory/helpers/logic.js';
function componentColorMemory() {
  // Introduction
  document.querySelector('.color-memory__intro--heading').innerHTML = colorMemory.intro.heading;
  document.querySelector('.color-memory__intro--desc').innerHTML = colorMemory.intro.desc;
  document.querySelector('.color-memory__intro--cta').innerHTML = colorMemory.intro['cta-text'];

  // Game Phase 1
  document.querySelector('.color-memory__phase1--instructions').innerHTML = colorMemory.game['phase-1'].instructions;
  document.querySelector('.color-memory__phase1--easy').innerHTML = colorMemory.game['phase-1'].difficulty.easy;
  document.querySelector('.color-memory__phase1--normal').innerHTML = colorMemory.game['phase-1'].difficulty.normal;
  document.querySelector('.color-memory__phase1--hard').innerHTML = colorMemory.game['phase-1'].difficulty.hard;

  // Game Phase 2
  document.querySelector('.color-memory__phase2--instructions').innerHTML = colorMemory.game['phase-2'].instructions;

  // Game Phase 3
  document.querySelector('.color-memory__phase3--instructions').innerHTML = colorMemory.game['phase-3'].instructions;
}
componentColorMemory();