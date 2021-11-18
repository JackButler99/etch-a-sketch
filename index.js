const sizeValue = document.getElementById('size-value')
const sizeSlider = document.getElementById('size-slider')
const colorPallete = document.getElementById('color-pallete')
const colorBtn = document.getElementById('color-btn')
const rainbowBtn = document.getElementById('rainbow-btn')
const eraserBtn = document.getElementById('eraser')
const clearBtn = document.getElementById('clear')
const grid = document.getElementById('grid')


const COLOR_DEFAULT = 'rgb(2, 2, 24)'
const MODE_DEFAULT = 'color'
const SIZE_DEFAULT = 32

let currentColor = COLOR_DEFAULT
let currentMode = MODE_DEFAULT
let currentSize= SIZE_DEFAULT

const setCurrentSize = (newSize)=>{
  currentSize = newSize
}


const setCurrentColor =(newColor)=>{
  currentColor = newColor
}

const setCurrentMode =(newMode)=>{
  button_on(newMode)
  currentMode = newMode
}


sizeSlider.onmousemove=(e)=>setSizeValue(e.target.value)
sizeSlider.onchange=(e)=>changeSize(e.target.value) 
colorPallete.onchange =(e)=>setCurrentColor(e.target.value)
colorBtn.onclick=()=> setCurrentMode('color')
rainbowBtn.onclick=()=> setCurrentMode('rainbow')
eraserBtn.onclick=()=> setCurrentMode('eraser')
clearBtn.onclick=()=> clearGrid()

const changeSize=(value)=>{
  setCurrentSize(value)
  setSizeValue(value)
  reloadGrid()
}

const setSizeValue=(value)=>{
  sizeValue.innerHTML = `Size: ${value}`
}

const reloadGrid=()=>{
  clearGrid()
  setGrid(currentSize)
}

const clearGrid=()=>{
  grid.innerHTML = ''
}

const setGrid=(size)=>{
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`
  
  for (let i=0; i < size * size; i++){
    const gridElement = document.createElement('div')
    gridElement.addEventListener('mouseover', changeColor)
    grid.appendChild(gridElement)
  }
}

const changeColor=(e)=>{
  if (currentMode === 'rainbow') {
    const randomR = Math.floor(Math.random() * 256)
    const randomG = Math.floor(Math.random() * 256)
    const randomB = Math.floor(Math.random() * 256)
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
  } else if (currentMode === 'color') {
    e.target.style.backgroundColor = currentColor
  } else if (currentMode === 'eraser') {
    e.target.style.backgroundColor = '#fff'
  }
}

const button_on=(newMode)=>{
  if (currentMode === 'rainbow') {
    rainbowBtn.classList.remove('active')
  } else if (currentMode === 'color') {
    colorBtn.classList.remove('active')
  } else if (currentMode === 'eraser') {
    eraserBtn.classList.remove('active')
  }

  if (newMode === 'rainbow') {
    rainbowBtn.classList.add('active')
  } else if (newMode === 'color') {
    colorBtn.classList.add('active')
  } else if (newMode === 'eraser') {
    eraserBtn.classList.add('active')
  }
}

window.onload = () => {
  setGrid(SIZE_DEFAULT)
  button_on(MODE_DEFAULT)
}