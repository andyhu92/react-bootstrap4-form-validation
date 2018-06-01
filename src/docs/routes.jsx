import BasicUsage from './examples/basicUsage';
import ErrorMessage from './examples/errorMessage';
import FullExample from './examples/fullExample';
import ValidationFormApi from './api/ValidationFormApi';
import RadioGroupApi from './api/RadioGroupApi';

export default {
    example: {
        group:"Examples",
        path:"example",
        routes:[
            { pathname:'basic-usage', text:'Basic Usage', component: BasicUsage },
            { pathname:'error-message', text:'Error Message', component: ErrorMessage },
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
            { pathname:'radio-group', text:"RadioGroup", component: RadioGroupApi},
            { pathname:'check-box', text:"Checkbox"},
            { pathname:'select-group', text:"SelectGroup"},
            { pathname:'file-input', text:"FileInput"},
        ]
    }
}