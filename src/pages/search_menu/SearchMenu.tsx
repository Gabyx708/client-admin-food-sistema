import { IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonContent, IonIcon, IonPage } from "@ionic/react";
import { useEffect, useState } from "react";
import { MenuResume } from "../../types/menu/typePageMenuResume";
import { getFuturesMenues, getMenuById } from "../../services/api/menuService";
import { getMondayFromDate } from "../../utils/getMondayFromDate";
import { useAppContext } from "../../context/AppContext";
import { useHistory } from "react-router";
import { calendarClearOutline } from "ionicons/icons";
import formatDate from "../../utils/formatDate";
import formatDateWithTime from "../../utils/formatDateWithHour";
import { getDayFromWeek } from "../../utils/getDayFromWeek";

const SearchMenu: React.FC = () => {

    const [menues, setMenues] = useState<MenuResume[]>();
    const actualDate = new Date();
  
    useEffect(() => {
      const fetchMenues = async () => {
        const response = await getFuturesMenues(getMondayFromDate(actualDate));
  
        let menues = response.sort(
          (a, b) =>
            new Date(a.eatingDate).getTime() - new Date(b.eatingDate).getTime()
        );
        console.log(menues);
        setMenues(menues);
      };
  
      fetchMenues();
    }, []);
    
  return (
    <IonPage>
      <IonContent fullscreen>
        <div style={{textAlign:"center",padding: 10}}>
          <h3>CONSULTANDO MENUES</h3>
          <hr className="line-divider" />
        </div>
        <section>
          {menues?.map((menu, index) => (
            <MenuFound menu={menu} key={index} />
          ))}
        </section>
      </IonContent>
    </IonPage>
  );
};

const MenuFound = ({ menu }: { menu: MenuResume }) => {
    
    const {actualMenu,setActualMenu} = useAppContext();
    const history = useHistory();

    const handleClick = async () =>{
            
        const response = await getMenuById(menu.idMenu);
        setActualMenu(response);
        history.push("/menu_detail");
    };

  return (
    <div onClick={()=>{handleClick()}} style={{padding: 2}}>
      <IonCard>
        <IonCardContent>
          <div>
            <section>
              <IonCardTitle>
                <IonIcon icon={calendarClearOutline} style={{marginRight:10}}/>
                {getDayFromWeek(new Date(menu.eatingDate)).toLowerCase()}{" "}
                {formatDate(menu.eatingDate)}
              </IonCardTitle>
              <hr  className="line-divider"/>
              <IonCardSubtitle>
                fecha de cierre: {formatDateWithTime(menu.closeDate)}
                <br></br>
                se cargo el:{formatDateWithTime(menu.uploadDate)}
              </IonCardSubtitle>
            </section>
          </div>
        </IonCardContent>
      </IonCard>
    </div>
  );
};


export default SearchMenu;
