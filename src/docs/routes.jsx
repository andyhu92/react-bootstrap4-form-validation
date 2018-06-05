import BasicUsage from './examples/basicUsage';
import ErrorMessage from './examples/errorMessage';
import FullExample from './examples/fullExample';
import ValidationFormApi from './api/ValidationFormApi';
import TextInputApi from './api/TextInputApi';
import TextInputGroupApi from './api/TextInputGroupApi';
import RadioGroupApi from './api/RadioGroupApi';
import CheckBoxApi from './api/CheckBoxApi';
import SelectGroupApi from './api/SelectGroupApi';
import FileInputApi from './api/FileInputApi';

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
            { pathname:'text-input', text:"TextInput", component:TextInputApi},
            { pathname:'text-input-group', text:"TextInputGroup", component: TextInputGroupApi},
            { pathname:'radio-group', text:"RadioGroup", component: RadioGroupApi},
            { pathname:'check-box', text:"Checkbox", component: CheckBoxApi},
            { pathname:'select-group', text:"SelectGroup", component: SelectGroupApi},
            { pathname:'file-input', text:"FileInput", component:FileInputApi},
        ]
    }
}