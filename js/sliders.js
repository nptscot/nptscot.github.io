const sliders = {
    cycle:     document.getElementById('slider-cycle'),
    gradient:  document.getElementById('slider-gradient'),
    quietness: document.getElementById('slider-quietness')
};

//Define sliders
noUiSlider.create(sliders.cycle, {
    start: [0, 20000],
    connect: true,
    range: {
        'min': [1, 10],
        '12.5%': [10, 50],
        '25%': [50, 50],
        '37.5%': [100, 150],
        '50%': [250, 250],
        '65%': [500, 500],
        '80%': [1000, 1000],
        'max': [20000] // TODO: Check Max Value
    },
    pips: {
        mode: 'range',
        density: 3
    }
});

noUiSlider.create(sliders.gradient, {
    start: [0, 10],
    step: 2,
    connect: true,
    range: {
        'min': [0, 1],
        '10%': [1, 1],
        '30%': [3, 1],
        '50%': [5, 1],
        '70%': [7, 1],
        '90%': [9, 1],
        'max': [10]
    },
    pips: {
        mode: 'range',
        density: 10
    }
});

noUiSlider.create(sliders.quietness, {
    start: [0, 100],
    step: 10,
    connect: true,
    range: {
        'min': 0,
        'max': 100
    },
    pips: {
        mode: 'range',
        density: 10,
        format: {to: updatePips}
    }
});

function updatePips( value, type ){

    switch(value)   {
      case 0:
        var res = "Hostile"
        break;
      case 100:
        var res = "Quiet"
        break;
    }
    return res;
}

// Define handlers to proxy the result to hidden input fields, with value "<numStart>-<numFinish>"
Object.entries(sliders).forEach (([key, slider]) => {
    slider.noUiSlider.on ('update', function() {
        document.getElementById('rnet_slider-' + key).value = Number(slider.noUiSlider.get()[0]) + '-' + Number(slider.noUiSlider.get()[1]);
        document.getElementById('rnet_slider-' + key).dispatchEvent(new Event('change'));
    });
});

