const sliders = {
    cycle:     document.getElementById('slider-cycle'),
    gradient:  document.getElementById('slider-gradient'),
    quietness: document.getElementById('slider-quietness')
};

const sliderAttributes = {
    cycle: calculateSliderAttributes ('slider-cycle'),
    gradient: calculateSliderAttributes ('slider-gradient'),
    quietness: calculateSliderAttributes ('slider-quietness'),
};


// Function to determine the slider attributes based on a datalist accompanying the slider element
function calculateSliderAttributes (sliderId)
{
    // Start an object to hold range, min, max, density
    const sliderAttributes = {};
    
    // Identify the datalist
    const datalistElement = document.getElementById (sliderId + '-values');
    if (!datalistElement) {
        console.log ('ERROR in HTML: No <datalist> defined for slider ' + sliderId);
        return {};
    }
    
    // Loop through each datalist value, e.g. slider-cycle should be accompanied by <datalist id="slider-cycle-values">
    sliderAttributes.range = {};
    let increments;
    const sliderOptions = Array.from (datalistElement.options);
    sliderOptions.forEach ((option, index) => {
        
        // Determine the increment to the next; last item has no increment; use defined or calculated for others
        if (index == (sliderOptions.length - 1)) {  // Last
            increments = null;
        } else if (option.dataset.hasOwnProperty ('increments')) {  // Increments defined
            increments = parseInt (option.dataset.increments);
        } else {    // Increments is difference from current to next, e.g. 1 then 10 => 9
            increments = parseInt (sliderOptions[index + 1].value - option.value);
        }
        
        // Register result, e.g. {"12.5%": [1, 9], ...}
        sliderAttributes.range[option.dataset.position] = [parseInt (option.value), increments];    // E.g. [1, 9]
    });
    
    // Add min/max
    sliderAttributes.min = parseInt (sliderOptions[0].value);
    sliderAttributes.max = parseInt (sliderOptions[sliderOptions.length - 1].value);
    
    // Add density
    sliderAttributes.density = datalistElement.dataset.density;
    
    // Return the result
    //console.log ('Slider values for id ' + sliderId + ':', sliderAttributes);
    return sliderAttributes;
}




// Define sliders
noUiSlider.create(sliders.cycle, {
    start: [sliderAttributes.cycle.min, sliderAttributes.cycle.max],
    connect: true,
    range: sliderAttributes.cycle.range,
    pips: {
        mode: 'range',
        density: sliderAttributes.cycle.density
    }
});

noUiSlider.create(sliders.gradient, {
    start: [sliderAttributes.gradient.min, sliderAttributes.gradient.max],
    step: 2,
    connect: true,
    range: sliderAttributes.gradient.range,
    pips: {
        mode: 'range',
        density: sliderAttributes.gradient.density
    }
});

noUiSlider.create(sliders.quietness, {
    // #!# Top of range label could be changed to 100 (35 was previously considered), as is currently only implicit
    start: [sliderAttributes.quietness.min, sliderAttributes.quietness.max],
    connect: true,
    range: sliderAttributes.quietness.range,
    pips: {
        mode: 'range',
        density: sliderAttributes.quietness.density,
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

