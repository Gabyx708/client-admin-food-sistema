import { IonAvatar, IonCard, IonCardContent, IonContent, IonDatetime, IonDatetimeButton, IonModal, IonPage, IonButton, IonItem, IonLabel, IonSelect, IonSelectOption, IonInput, IonAlert } from "@ionic/react";
import { useEffect, useState } from "react";
import { DishResponse } from "../../types/dish/typeDishResponse";
import { getAllDishes } from "../../services/api/dishService";
import { DishesPage } from "../../types/dish/typeDishPage";
import { createMenu } from "../../services/api/menuService";
import { MenuRequest } from "../../types/menu/typeMenuRequest";
import './CreateMenu.css';

const CreateMenu: React.FC = () => {

  const [dishes, setDishes] = useState<DishResponse[]>([]);
  const [options, setOptions] = useState<Array<{ idDish: number; stock: number }>>([]);
  const [eatingDate, setEatingDate] = useState<string>('');
  const [closeDate, setCloseDate] = useState<string>('');
  const [visibleAlert,setVisibleAlert] = useState<boolean>(false);
  const [textAlert,setTextAlert] = useState<string>('');

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response: DishesPage = await getAllDishes(1, 200);
        setDishes(response.items);
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };

    fetchDishes();
  }, [visibleAlert,textAlert]);

  const handleAddOption = () => {
    setOptions([...options, { idDish: 0, stock: 0 }]);
  };

  const handleOptionChange = (index: number, idDish: number) => {
    const newOptions = [...options];
    newOptions[index].idDish = idDish;
    setOptions(newOptions);
  };

  const handleStockChange = (index: number, stock: number) => {
    const newOptions = [...options];
    newOptions[index].stock = stock;
    setOptions(newOptions);
  };

  const handleSubmit = async () => {
    const menuData: MenuRequest = {
      eatingDate,
      closeDate,
      options,
    };

    try {
      const response = await createMenu(menuData);
      setTextAlert('se creo un nuevo menu!!');
      setVisibleAlert(true);
      console.log('Menu created successfully:', response);
    } catch (error) {
      console.error("Error creating menu:", error);
      setTextAlert('error al crear el menu');
      setVisibleAlert(true);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonCard>
          <IonCardContent>

          <IonAlert
          isOpen={visibleAlert}
          header={textAlert}
          onDidDismiss={() => {
            setVisibleAlert(false);
          }}
        ></IonAlert>

            <form action="">
              <div>
                <p className="especial-label">¿Cuándo se come?</p>
                <IonDatetimeButton datetime="datetime1"></IonDatetimeButton>
                <IonModal keepContentsMounted={true}>
                  <IonDatetime id="datetime1" onIonChange={(e) => setEatingDate(e.detail.value! as string)}/>
                </IonModal>
              </div>

              <div>
                <p className="especial-label">¿Hasta cuándo se puede pedir?</p>
                <IonDatetimeButton datetime="datetime2"></IonDatetimeButton>
                <IonModal keepContentsMounted={true}>
                  <IonDatetime id="datetime2" onIonChange={(e) => setCloseDate(e.detail.value! as string)}/>
                </IonModal>
              </div>

              <div>
                <p className="especial-label">Opciones</p>
                <hr className="line-divider"/>
                {options.map((option, index) => (
                  <IonItem key={index}>
                    <IonSelect
                      class="custom-select"
                      value={option.idDish}
                      placeholder="Selecciona un plato"
                      onIonChange={(e) => handleOptionChange(index, parseInt(e.detail.value))}
                    >
                      {dishes.map((dish) => (
                        <IonSelectOption key={dish.id} value={dish.id}>
                          {`${dish.description} $${dish.price}`}
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                    <IonInput
                      className="stock"
                      type="number"
                      placeholder="Stock"
                      value={option.stock}
                      onIonChange={(e) => handleStockChange(index, parseInt(e.detail.value!))}
                    />
                  </IonItem>
                ))}
                <IonButton onClick={handleAddOption} color="danger">AGREGAR +</IonButton>
              </div>

              <IonButton onClick={handleSubmit} color="danger">Confirmar</IonButton>
            </form>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default CreateMenu;
