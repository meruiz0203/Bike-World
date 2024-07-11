import Bikes from "./Content/Bikes"; 
import Categories from './Content/Categoria';
import { Route, Switch } from 'react-router-dom';
import Users from './Content/Usuarios'
import CreateBike from './Content/CreateBike'; 
import EditBike from './Content/EditBike';

export default function ContentWrap() {
    return (
      <main
        className="content-wrap"
        style={{
          maxHeight: "calc(100vh - 6rem)",
        }}
      >
       <Switch>
        <Route path="/bicicletas"> 
        <Bikes />
        </Route> 
        <Route path='/categorias'>
          <Categories />
        </Route> 
        <Route path='/usuarios'>
          <Users />
        </Route>
        <Route path="/createBike">
           <CreateBike />
        </Route>
        <Route path="/editBike/:id" component={EditBike} />
        <Route path="*" >
          <p>404 - página no encontrada</p>
          </Route> 
      </Switch>
      </main>
    );
  }