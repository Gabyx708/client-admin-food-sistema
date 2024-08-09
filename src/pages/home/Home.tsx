import "./Home.css";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  useIonViewDidEnter,
  IonCardContent,
} from "@ionic/react";

import { BiSolidDish } from "react-icons/bi";
import { ImSearch } from "react-icons/im";
import { personCircle } from "ionicons/icons";
import { showTabBar } from "../../utils/tabBarVisibility";
import { useAppContext } from "../../context/AppContext";
import { BiSolidFoodMenu } from "react-icons/bi";
import { Link } from "react-router-dom";
import { HiUserAdd } from "react-icons/hi";
import { MdOutlineAttachMoney } from "react-icons/md";

const Home: React.FC = () => {

  const {actualSession} = useAppContext();
  const nickname = actualSession?.nickName ? actualSession?.nickName : '<default>';

  useIonViewDidEnter(() => {
    showTabBar(); //visible tabBar
  })

  return (
    <IonPage className="ion-page fullscreen">
      <IonHeader></IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense"></IonHeader>

        <div style={{ padding: 20, fontWeight: "bolder" }}>
          <h1>Saludos Administrador, {nickname}</h1>
        </div>

        <IonCard>
          <IonCardContent>
            <div className="main-wrapper">
              <BiSolidFoodMenu size={50} className="red-icon"/>
              <Link to="/menu">
              <h2>CREAR UN MENU</h2>
              </Link>
            </div>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardContent>
            <div className="main-wrapper">
              <ImSearch  size={50} className="red-icon"/>
              <Link to="/buscar">
              <h2>CONSULTAR UN MENU</h2>
              </Link>
            </div>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardContent>
            <div className="main-wrapper">
              <BiSolidDish size={50} className="red-icon"/>
              <Link to="/plato">
              <h2>CREAR UN PLATO</h2>
              </Link>
            </div>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardContent>
            <div className="main-wrapper">
              <HiUserAdd size={50} className="red-icon"/>
              <Link to="/user">
              <h2>AGREGAR UNA PERSONA</h2>
              </Link>
            </div>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardContent>
            <div className="main-wrapper">
              <MdOutlineAttachMoney size={50} className="red-icon"/>
              <Link to="/price">
              <h2>CAMBIAR PRECIOS</h2>
              </Link>
            </div>
          </IonCardContent>
        </IonCard>
        

      </IonContent>
    </IonPage>
  );
};

export default Home;
