import BasicUsage from './examples/basicUsage';
import FullExample from './examples/fullExample';
import ValidationFormApi from './api/ValidationFormApi';

export default {
    example: {
        group:"Examples",
        path:"example",
        routes:[
            { pathname:'basic-usage', text:'Basic Usage', component: BasicUsage },
            { pathname:'full-example', text:'Full Example', component: FullExample },
            { pathname:'custom-validation-control', text:'Custom Validation Control'},
        ]
    },
    api: {
        group:"API",
        path:"api",
        routes:[
            { pathname:'validation-form', text:'ValidationForm', component: ValidationFormApi},
            { pathname:'base-form-control', text:"Shared API"},
            { pathname:'text-input', text:"TextInput"},
            { pathname:'text-input-group', text:"TextInputGroup"},
            { pathname:'radio-group', text:"RadioGroup"},
            { pathname:'check-box', text:"Checkbox"},
            { pathname:'select-group', text:"SelectGroup"},
            { pathname:'file-input', text:"FileInput"},
        ]
    }
}