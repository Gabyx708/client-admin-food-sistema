import { IonAlert, IonButton, IonContent, IonInput, IonPage } from "@ionic/react";
import { useState } from "react";
import { CreateUserRequest } from "../../types/user/typeForCreateUser";
import { createUser } from "../../services/api/userService";

const CreateUser: React.FC = () => {

  const[userId,setUserId] = useState('');
  const[name,setName] = useState('');
  const[lastName,setLastName] = useState('');
  const[date,setDate] = useState('');
  const[privilege,setPrivilege] = useState(1);

  const[isOpen,setOpen] = useState(true);
  const[textMsg,setText] = useState('<default>');

  const clearAllInputs = () =>
  {
    setUserId('');
    setName('');
    setLastName('');
    setDate('');
  }

  const handleClickConfirmUser = async()=>
  {
    console.table({userId,name,lastName,date,privilege});

    const userData: CreateUserRequest =
    {
      idUser : userId,
      name : name,
      lastName : lastName,
      birthDate : date,
      privilege : privilege
    };

     const response = await  createUser(userData);
    
     if(response.status == 201)
      {
        setOpen(true);
        setText('excelente! se creo un nuevo usuario exitosamente!');
        clearAllInputs();
      }else
      {
        setOpen(true);
        setText('Ups! ocurrio un problema');
      }

  };

  return (
    <IonPage>
      <IonContent>

      <IonAlert
          isOpen={isOpen}
          header={textMsg}
          onDidDismiss={() => {
            setOpen(false);
          }}
        ></IonAlert>
        
        <div style={{padding: 10,textAlign: 'center'}}>
        <h2>CREAR USUARIO</h2>
        <hr className="line-divider"/>
        </div>
        <form style={{padding: 10}}>

            <div style={{padding: 20}}>
            <IonInput
            label="DNI: "
            labelPlacement="floating"
            fill="outline"
            value={userId}
            type="text"
            onIonChange={(e: any) => setUserId(e.target.value)}
          />
            </div>

            <div style={{padding: 20}}>
            <IonInput
            label="NOMBRE: "
            labelPlacement="floating"
            fill="outline"
            value={name}
            type="text"
            onIonChange={(e: any) => setName(e.target.value)}
          />
          </div>

          <div style={{padding: 20}}>
            <IonInput
            label="APELLIDO: "
            labelPlacement="floating"
            fill="outline"
            value={lastName}
            type="text"
            onIonChange={(e: any) => setLastName(e.target.value)}
          />
          </div>

          <div style={{padding: 20}}>
            <IonInput
            label="FECHA NACIMIENTO: "
            labelPlacement="floating"
            fill="outline"
            value={date}
            type="date"
            onIonChange={(e: any) => setDate(e.target.value)}
          />
          </div>

          <div style={{padding: 20}}>
            <IonInput
            label="PRIVILEGIO: "
            labelPlacement="floating"
            fill="outline"
            value={privilege}
            type="number"
            onIonChange={(e: any) => setPrivilege(e.target.value)}
          />
        </div>

        <div style={{padding:20}}>
              <IonButton color='danger' onClick={handleClickConfirmUser}>CONFIRMAR</IonButton>
        </div>

        </form>
      </IonContent>
    </IonPage>
  );
};

export default CreateUser;
