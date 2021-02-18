import {render} from 'react-dom';
import App from './App';
import "bootstrap/dist/css/bootstrap.css";
import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

render( 
<>
<ToastContainer/>
<App />

</>, document.getElementById('root')
);

