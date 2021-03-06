import React, { useEffect, useState } from 'react';

import { pros } from '../../../API/request';
import IAppointment from '../../../Interfaces/IPros';
import ServiceBook from '../../../Interfaces/IServiceBook';

type CardProps = {
  serviceBook: ServiceBook;
  setShowPros: React.Dispatch<React.SetStateAction<boolean>>;
  setProsId: React.Dispatch<React.SetStateAction<number>>;
};

function ServiceBookDetailsCard({ serviceBook, setShowPros, setProsId }: CardProps) {
  const [prosData, setProsData] = useState<IAppointment>();
  async function getPros() {
    const res = await pros.getOne(serviceBook.id_pros);
    setProsData(res);
  }

  useEffect(() => {
    getPros();
  }, []);

  return (
    <div className="grid grid-cols-7 pt-2 pb-2 hover:bg-background/30">
      <p>{serviceBook.immat}</p>
      <p>{new Date(serviceBook.date).toLocaleDateString()}</p>
      <p>{serviceBook.observations}</p>
      <p>{serviceBook.service}</p>
      <p>{serviceBook.kilometrage}</p>
      <p>{serviceBook.url_invoice}</p>
      <button
        onClick={() => {
          setProsId && setProsId(serviceBook.id_pros);
          setShowPros && setShowPros(true);
        }}
        className="underline hover:text-background">
        {prosData?.name}
      </button>
    </div>
  );
}

export default ServiceBookDetailsCard;
