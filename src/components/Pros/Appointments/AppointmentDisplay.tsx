import React, { useContext, useEffect, useState } from 'react';

import { users } from '../../../API/request';
import ProsContext from '../../../contexts/ProsContext';
import IAppointment from '../../../Interfaces/IAppointment';
import { glassMorphism } from '../../../variableTailwind';
import { button } from '../../../variableTailwind';

type Props = IAppointment;

const AppointmentDisplay: React.FC<Props> = (props) => {

  const [pastApp, setPastApp] = useState<boolean>(false);
  const { setShowModal, setModalCreateServiceBook, setAppointmentId, modalCreateServiceBook } = useContext(ProsContext);
  const [userName, setUserName] = useState<string>('');

  const handleSetModal = () => {
    setAppointmentId(props.id_appointment || 0);
    setShowModal(true);
  };

  const handleSetModalServiceBook = () => {   
    setAppointmentId(props.id_appointment || 0);
    setModalCreateServiceBook(true);
  };  

  async function getUser() {
    const user = await users.getOne(props.userId);
    setUserName(`${user.firstname} ${user.lastname}`);
  }

  // Date of the day
  const today: Date = new Date();

  useEffect(() => {
    if (new Date(props.date).toISOString() < new Date(today).toISOString()) {
      setPastApp(true)
    }
  }, [props])

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div
      className={`m-4 p-4 h-1/6 flex justify-around items-center rounded-lg ${glassMorphism}`}>
      <div className="flex justify-center w-1/4">
        <h2>
          {new Date(props.date).toLocaleDateString() +
            ' à ' +
            new Date(props.date).toLocaleTimeString().slice(0, 5)}
        </h2>
      </div>
      <div className="flex justify-center w-1/4">
        <p>{userName}</p>
      </div>
      <div className="flex justify-center w-1/4">
        <p>{props.comment.slice(0, 20) + '...'}</p>
      </div>
      <div className="flex flex-col justify-center items-center w-1/4">
        <button className={`${button} w-full`} onClick={() => handleSetModal()}>
          Détails
        </button>
       { pastApp && <button className={`${button} w-full`} onClick={() => handleSetModalServiceBook()}>
          Créer un entretien
        </button>}
      </div>
    </div>
  );
};

export default AppointmentDisplay;
