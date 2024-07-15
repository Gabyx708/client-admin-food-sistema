import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonItem, IonLabel, IonList, IonPage } from "@ionic/react";
import { useEffect, useState } from "react"
import { useAppContext } from "../../context/AppContext";
import { getMenuWithOrders } from "../../services/api/menuService";
import formatDateWithTime from "../../utils/formatDateWithHour";
import formatCurrency from "../../utils/formatCurrency";
import { getOrderById } from "../../services/api/orderService";
import { useHistory } from "react-router";

const MenuDetail:React.FC = () =>
{
    const idMenu = useAppContext().actualMenu?.id;
    const [menu,setMenu] = useState<MenuResponse>();
    const {setOrderDetail} = useAppContext();
    const history = useHistory();

    useEffect(()=>{
        const fetchMenu = async()=>{
            let response = await getMenuWithOrders(idMenu!);
            setMenu(response);
        };

        fetchMenu();
    },[idMenu]);

    const handleClickOrders = async (idOrder:string) =>
    {   
        const order = await getOrderById(idOrder);
        setOrderDetail(order);

        history.push('/detail');
    }


    return (
      <IonPage>
        <IonContent>
        <section>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>ID: {menu?.data.id}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonCardSubtitle>informacion:</IonCardSubtitle>
              <hr className="line-divider" />
              <IonList inset={true}>
                <IonItem>
                  <IonLabel>
                    se come:{" "}
                    {formatDateWithTime(menu?.data.eatingDate as string)}
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    se cierra:{" "}
                    {formatDateWithTime(menu?.data.closeDate as string)}
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    se creo:{" "}
                    {formatDateWithTime(menu?.data.uploadDate as string)}
                  </IonLabel>
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardHeader>
              <IonCardTitle>cantidad ordenes</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonCardSubtitle>informacion:</IonCardSubtitle>
              <hr className="line-divider" />
              <IonList>
                <IonItem>
                  <IonLabel color="primary">en progreso: {menu?.data.inProgress}</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel color="danger">canceladas: {menu?.data.cancelledOrders}</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel color="success">completadas: {menu?.data.finishedOrders}</IonLabel>
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardHeader>
              <IonCardTitle>montos ($)</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonCardSubtitle>informacion:</IonCardSubtitle>
              <hr className="line-divider" />
              <IonList>
                <IonItem>
                  <IonLabel color="danger">total en ordenes: {formatCurrency(menu?.data.totalAllOrders!)}</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel color="success">pagadas: {formatCurrency(menu?.data.totalRevenue!)}</IonLabel>
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardHeader>
              <IonCardTitle>PEDIDOS</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonCardSubtitle>informacion:</IonCardSubtitle>
              <hr className="line-divider" />
              <IonList>
                {menu?.orders.map((ord,indx)=>(
                    <IonItem key={indx} onClick={()=>{handleClickOrders(ord.id)}}>
                    <IonLabel>{ord.username}</IonLabel>
                    <IonLabel color="danger">{ord.items[0].description}</IonLabel>
                  </IonItem>
                ))}
              </IonList>
            </IonCardContent>
          </IonCard>

        </section>
      </IonContent>
      </IonPage>
    );
}


export default MenuDetail;