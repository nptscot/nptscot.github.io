var cycleSlider = document.getElementById('slider-cycle');
var gradientlider = document.getElementById('slider-gradient');
var quietnessSlider = document.getElementById('slider-quietness');

//Define sliders
noUiSlider.create(cycleSlider, {
    start: [0, 5000],
    connect: true,
    range: {
        'min': [0, 10],
        '12.5%': [10, 10],
        '25%': [50, 10],
        '37.5%': [100, 10],
        '50%': [250, 10],
        '75%': [1000, 10],
        'max': [5000] // TODO: Check Max Value
    },
    pips: {
        mode: 'range',
        density: 3
    }
});

noUiSlider.create(gradientlider, {
    start: [0, 35],
    step: 2,
    connect: true,
    range: {
        'min': [0, 1],
        '10%': [1, 1],
        '30%': [3, 1],
        '50%': [5, 1],
        '70%': [7, 1],
        '80%': [10, 1],
        'max': [35]
    },
    pips: {
        mode: 'range',
        density: 10
    }
});

noUiSlider.create(quietnessSlider, {
    start: [0, 100],
    step: 10,
    connect: true,
    range: {
        'min': 0,
        'max': 100
    },
    pips: {
        mode: 'range',
        density: 10
    }
});

// Update map when sliders change
map.on('load', function() {
  quietnessSlider.noUiSlider.on('update', function(){
    switch_rnet()
  })
  gradientlider.noUiSlider.on('update', function(){
    switch_rnet()
  })
  cycleSlider.noUiSlider.on('update', function(){
    switch_rnet()
  })
});



