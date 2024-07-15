import React, { useState } from 'react';
import { IonAlert, IonButton, IonContent, IonInput, IonItem, IonPage, IonTitle } from '@ionic/react';
import './CreateDish.css';
import { createDish } from '../../services/api/dishService';

const CreateDish: React.FC = () => {

  const [alertSucces,setAlertSuccess] = useState<boolean>(false);
  const [alertOpen,setAlertOpen] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number | string>('');
  const [textSucces,setTextSucces] = useState<string>('');

  const handleDescriptionChange = (e: CustomEvent) => {
    setDescription(e.detail.value!);
  };

  const handlePriceChange = (e: CustomEvent) => {
    setPrice(e.detail.value!);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setAlertOpen(true);

    } catch (error) {
      console.error("Error creating dish:", error);
    }
  };

  const handleConfirm = async() =>{
    const priceNumber = parseFloat(price as string);
    
    try {
        
        if(priceNumber < 10 || description.length < 10)
        {
            setTextSucces("revisa los datos del plato");
        }else
        {
            const response = await createDish(description, priceNumber);
            setTextSucces("plato creado con exito!");
        }

        setAlertSuccess(true);
    } catch (error) {
        setAlertSuccess(false);
    }

    setDescription("");
    setPrice("");
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonTitle>
          <p style={{ textAlign: "center" }}>CREAR UN NUEVO PLATO</p>
          <hr className="line-divider" />
        </IonTitle>

        <IonAlert
          isOpen={alertOpen}
          header="deseas confirmar el nuevo plato?"
          buttons={[
            {
              text: "confirmar",
              cssClass: "custom-cancel-button",
              handler: () => {
                handleConfirm();
              },
            },
          ]}
          onDidDismiss={() => {
            setAlertOpen(false);
          }}
        ></IonAlert>

        <IonAlert
          isOpen={alertSucces}
          header={textSucces}
          onDidDismiss={() => {
            setAlertSuccess(false);
          }}
        ></IonAlert>

        <form className="form-dish" onSubmit={handleSubmit}>
          <IonInput
            label="Descripcion"
            labelPlacement="floating"
            fill="outline"
            placeholder="ejemplo: milanesa con pure..."
            value={description}
            onIonChange={handleDescriptionChange}
          />

          <IonInput
            label="Precio"
            labelPlacement="floating"
            fill="outline"
            placeholder="ejemplo: $3000"
            value={price}
            onIonChange={handlePriceChange}
            type="number"
          />

          <IonButton type="submit" color="danger">
            Confirmar
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default CreateDish;
