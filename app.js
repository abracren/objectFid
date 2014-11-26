garua_partModel =

[
	{
        SectionName: "Slider",
        instance: [{
            inputs: [{
                    name: "name1",
                    type: "input"
                }, {
                    name: "name2",
                    type: "checkbox"
                }, {
                    name: "select",
                    type: "select",
                    options: [
                        ["opt", "optval"],
                        ["opt2", "optval2"]
                    ],
                },

            ]
        }, {
            inputs: [{
                    name: "name1",
                    type: "input"
                }, {
                    name: "name2",
                    type: "checkbox"
                }, {
                    name: "select",
                    type: "select",
                    options: [
                        ["opt", "optval"],
                        ["opt2", "optval2"]
                    ],
                },

            ]
        }],


    }, {
        SectionName: "Headings",
        instance: [{
            inputs: [{
                    name: "name1_h0",
                    type: "input"
                }, {
                    name: "name2_h0",
                    type: "checkbox"
                }, {
                    name: "select_h0",
                    type: "select",
                    options: [
                        ["opt", "optval"],
                        ["opt2", "optval2"]
                    ],
                },

            ]
        }, {
            inputs: [{
                    name: "name1_h1",
                    type: "input"
                }, {
                    name: "name2_h1",
                    type: "checkbox"
                }, {
                    name: "select_h1",
                    type: "select",
                    options: [
                        ["opt", "optval"],
                        ["opt2", "optval2"]
                    ],
                },

            ]
        }],


    },


];
garua_StandardFields = garua_partModel;
garua_templates =[{template: [] }];

function garua_renderFields() {
    $('.parts').html('');
    //garua_registerParts();
    garua_output = '';
    garua_partModel.forEach(function(part) {
        tempclass = '';

        part.instance.forEach(function(field, index) {
            tempclass = part.SectionName + '-' + index;
            //console.log(tempclass);
            garua_output += '<div id="' + tempclass + '">';
            garua_output += '<h4>' + part.SectionName + ' ' + index + '</h4>';

            field.inputs.forEach(function(input) {

                if (input.type == 'input') {
                    garua_output += '<label>' + input.name + '</label>';
                    garua_output += '<input id="' + tempclass + '-' + input.name + '"name="' + tempclass + '-' + input.name + '" /></br>';
                } else if (input.type == 'textarea') {
                    garua_output += '<label>' + input.name + '</label>';
                    garua_output += '<textarea rows="4" cols="50" id="' + tempclass + '-' + input.name + '"name="' + tempclass + '-' + input.name + '"></textarea></br>';
                } else if (input.type == 'checkbox') {
                    garua_output += '<label>' + input.name + '</label>';
                    garua_output += '<input type="checkbox" id="' + tempclass + '-' + input.name + '"name="' + tempclass + '-' + input.name + '" /></br>';
                } else if (input.type == 'select') {
                    // Use this to append options dynamically:
                    // var o = new Option("option text", "value");
                    // /// jquerify the DOM object 'o' so we can use the html method
                    // $(o).html("option text");
                    // $("#selectList").append(o);
                    //http://stackoverflow.com/questions/740195/adding-options-to-a-select-using-jquery-javascript
                    garua_output += '<label>' + input.name + '</label>';
                    garua_output += '<select id="' + tempclass + '-' + input.name + '"name="' + tempclass + '-' + input.name + '" >';
                    if (typeof input.options != 'undefined') {
                        input.options.forEach(function(t) {
                            garua_output += '<option value="' + t[0] + '">' + t[1] + '</option>';
                        });


                    }
                    garua_output += '</select></br>';


                }


            });
            garua_output += '<hr>';
            garua_output += '</div>';

        });//endoForeach inputs

    });//endoForeach parts

    $('.parts').append(garua_output);
} //end renderFields






$('.sendDown').click(function() {
    //var idd = $(this).parent().attr('id');
    //console.log(idd);
    //arr.push(idd);
    //console.log('bla');
    garua_sectionsModel = [];
    garua_tempVal = [];
    $('input[name="result"]').val('');
    getFieldsFromSection();

});

function getFieldsFromSection(sectionId) {
    garua_partModel.forEach(function(part) {
        tempclass = '';
        part.instance.forEach(function(field, index) {
            var indexxx = index;
            tempclass = part.SectionName + '-' + index;
            //console.log(tempclass);
            garua_output += '<div id="' + tempclass + '">';
            garua_output += '<h4>' + part.SectionName + ' ' + index + '</h4>';

            field.inputs.forEach(function(input) {

                if (input.type == 'input' || input.type == 'textarea') {
                    garua_tempVal.push($('#' + tempclass + '-' + input.name).val());
                } else if (input.type == 'checkbox') {
                    if ($('#' + tempclass + '-' + input.name).prop('checked') == true) {
                        garua_tempVal.push('True');
                    } else {
                        garua_tempVal.push('false');
                    }
                } else if (input.type == 'select') {
                    garua_tempVal.push($('#' + tempclass + '-' + input.name).val());
                }
                input['value'] = garua_tempVal[0];
                garua_tempVal = [];
            });
            garua_sectionsModel = garua_partModel;
            //console.log(garua_sectionsModel);
            garua_jsonString = JSON.stringify(garua_sectionsModel);
            $('input[name="result"]').val(garua_jsonString);
        });
    });

}




$('#button2').click(function() {
    garua_populateFieldsFromJson();
});

function garua_populateFieldsFromJson() {
    var jsonn = $.parseJSON($('input[name="result"]').val());
    //console.log(jsonn);
    garua_partModel.forEach(function(part) {
        tempclass = '';

        part.instance.forEach(function(field, index) {
            tempclass = part.SectionName + '-' + index;


            field.inputs.forEach(function(input) {
            	//console.log(input);
                $('#' + tempclass + '-' + input.name).val(input.value);
               	// if checkbox...
                if (input.value == 'True' && $('#' + tempclass + '-' + input.name).attr('type') == 'checkbox') {
                    $('#' + tempclass + '-' + input.name).prop('checked', true);
                }

            });
        });

    });
}


$('#button4').click(function() {
    //console.log('no');

    garua_duplicateSection('Slider');



});





function garua_duplicateSection(section) {
    garua_partModel.forEach(function(d, index) {
        console.log(d.SectionName);

        if (d.SectionName == section) {
            var indexx = index;
            //console.log('yes ' + index );
            //garua_partModel[0].instance.forEach(function(i){

            garua_partModel[indexx].instance.push(garua_partModel[indexx].instance[0]);
            //});



        } else {
            console.log('no ' + index);
        }
    })
    console.log(garua_partModel[1].instance);
    garua_renderFields();


}
$('#button5').click(function() {

    garua_jsonString = JSON.stringify(garua_partModel);
    $('input[name="result"]').val(garua_jsonString);

});

garua_renderFields()
function appendToTemplate(templateName){

	garua_templates.push({template:[templateName],parts:[garua_StandardFields]});
		
}
appendToTemplate('froant');
appendToTemplate('blog');
console.log(garua_templates);




