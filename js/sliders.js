

// Create the sliders
const divs = document.querySelectorAll ('div.slider-styled').forEach (div => {
    
    // Calculate the attributes based on an associated <datalist>
    const attributes = sliderAttributes (div.id);
    
    // Create the slider
    noUiSlider.create (div, {
        start: [attributes.min, attributes.max],
        connect: true,
        range: attributes.range,
        pips: {
            mode: 'range',
            density: attributes.density,
            format: attributes.format
        }
    });
    
    // Define handler to proxy the result to hidden input fields, with value "<numStart>-<numFinish>"
    const slider = div.id.replace ('slider-', '');
    div.noUiSlider.on ('update', function() {
        document.getElementById('rnet_slider-' + slider).value = Number(div.noUiSlider.get()[0]) + '-' + Number(div.noUiSlider.get()[1]);
        document.getElementById('rnet_slider-' + slider).dispatchEvent(new Event('change'));
    });
});


// Function to determine the slider attributes based on a datalist accompanying the slider element
function sliderAttributes (sliderId)
{
    // Start an object to hold range, min, max, density, format
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
    sliderAttributes.density = parseInt (datalistElement.dataset.density);
    
    // Add format labels
    const labels = {};
    sliderOptions.forEach ((option, index) => {
        if (option.dataset.hasOwnProperty ('label')) {
            labels[option.value] = option.dataset.label;
        }
    });
    if (Object.keys (labels).length) {
        sliderAttributes.format = {
            to: function (value) {
                return labels[value];
            }
        };
    } else {
        sliderAttributes.format = null;
    }
    
    // Return the result
    //console.log ('Slider values for id ' + sliderId + ':', sliderAttributes);
    return sliderAttributes;
}

