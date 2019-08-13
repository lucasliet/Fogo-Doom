const vetorFirePixels = []
const fogoLargura = 10
const fogoAltura = 10

function start() {
    createFireDataStructure()
    createFireSource()
    //renderFire()

    setInterval(calculateFirePropagation, 1000)
}

function createFireDataStructure() {
    const totalPixelNumber = fogoLargura * fogoAltura

    for (let i = 0; i < totalPixelNumber; i++) {
        vetorFirePixels[i] = 0
    }
}

function calculateFirePropagation() {
    for (let column = 0; column < fogoLargura; column++){
        for(let row = 0; row < fogoAltura; row++){
            const pixelIndex = column + ( fogoLargura * row )
            updateFireIntensityPerPixel(pixelIndex)
        }
    }
    renderFire()
}

function updateFireIntensityPerPixel(currentPixelIndex){
    const belowPixelIndex = currentPixelIndex + fogoLargura

    if (belowPixelIndex >= fogoLargura * fogoLargura){
        return
    }

    const declinio = 1
    const belowPixelFireIntensity = vetorFirePixels[belowPixelIndex]
    const newFireIntensity = belowPixelFireIntensity - decay >= 0 ?
		belowPixelFireIntensity - decay : 0

    vetorFirePixels[currentPixelIndex] = newFireIntensity
}

function renderFire() {
    let html = '<table cellpadding=0 cellspacing=0>'
    
    for (let row = 0; row < fogoAltura; row++) {
        html += '<tr>'

        for (let column = 0; column < fogoLargura; column++) {
            const pixelIndex = column + ( fogoLargura * row )
            const fireIntensity = vetorFirePixels[pixelIndex]
            html += '<td>'
            html += `<div class="pixel-index">${pixelIndex}</div>`
            html += fireIntensity
            html += '</td>'
        }
        html += '</tr>'
    }
    html += '</table>'

    document.querySelector('#fireCanvas').innerHTML = html
}

function createFireSource() {
    for (let column = 0; column <= fogoLargura; column++) {
        const overflowPixelIndex = fogoLargura * fogoAltura
        const pixelIndex = (overflowPixelIndex - fogoLargura) + column
        
        vetorFirePixels[pixelIndex] = 36
    }
}

start()