import {BrowserRouter} from "react-router-dom";

export const withRouter = component => () => (
    <BrowserRouter basename={'/'}>
        {component()}
    </BrowserRouter>
);
