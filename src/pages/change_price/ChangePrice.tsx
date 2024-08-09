import { IonAlert, IonButton, IonContent, IonInput, IonPage } from "@ionic/react";
import { useState } from "react";
import { updatePrices } from "../../services/api/dishService";

const ChangePrice: React.FC = () => {
  const [price, setPrice] = useState(0);
  const [isOpen,setOpen] = useState(false);
  const [msg,setMsg] = useState('fallo');


  const handleClickConfirm = async() =>
  {
        let response = await updatePrices(price);
        
        if(response.status == 200)
        {
            setMsg('exito! se cambiaron todos los precios,\nreinicia la aplicacion');
            setOpen(true);
            return;
        }

        if(response.status != 200)
        {
            setOpen(true);
            setMsg('ocurrio un problema');
            return;
        }
  };

  return (
    <IonPage>
      <IonContent>

      <IonAlert
          isOpen={isOpen}
          header={msg}
          onDidDismiss={() => {
            setOpen(false);
          }}
        ></IonAlert>
        
        <div style={{ textAlign: "center", padding: 10 }}>
          <h2>CAMBIAR PRECIOS</h2>
          <hr className="line-divider" />
        </div>

        <form action="post">

          <div style={{ padding: 20 }}>
          <IonInput
            label="PRECIO NUEVO $: "
            labelPlacement="floating"
            fill="outline"
            value={price}
            type="text"
            onIonChange={(e: any) => setPrice(e.target.value)}
          />
            </div>
          <div style={{ padding: 20 }}>
            <IonButton color="danger" onClick={handleClickConfirm}>
              CONFIRMAR
            </IonButton>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default ChangePrice;
