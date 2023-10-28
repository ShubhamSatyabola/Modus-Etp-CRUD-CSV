
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './component/Home';
import Create from './component/create';
import Edit from './component/Edit';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/create",
    element: <Create />,
  },
  {
    path: "/edit/:id",
    element: <Edit />,
  },
]);

function App() {

  return (
      <RouterProvider router={router} />
    
  );
}

export default App
