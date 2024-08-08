import { IonContent, IonInput, IonPage } from "@ionic/react";

const CreateUser: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <form>
            <IonInput
            label="DNI: "
            labelPlacement="floating"
            fill="outline"
            value={0}
            type="text"
          />

            <IonInput
            label="NOMBRE: "
            labelPlacement="floating"
            fill="outline"
            value={0}
            type="text"
          />

            <IonInput
            label="APELLIDO: "
            labelPlacement="floating"
            fill="outline"
            value={0}
            type="text"
          />

            <IonInput
            label="FECHA NACIMIENTO: "
            labelPlacement="floating"
            fill="outline"
            value={0}
            type="date"
          />

            <IonInput
            label="PRIVILEGIO: "
            labelPlacement="floating"
            fill="outline"
            value={0}
            type="number"
          />

        </form>
      </IonContent>
    </IonPage>
  );
};

export default CreateUser;
