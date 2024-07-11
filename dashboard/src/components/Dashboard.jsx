
import "./Dashboard.css";
import Menu from "./Menu";
import Card from './Card';
import Footer from "./Footer"; 
import ContentWrap from "./content-wrap";




function Dashboard () {
return (

<div className="dashboard">

<Menu />
<ContentWrap />
<Card />
<Footer />

</div>

);

}


export default Dashboard;