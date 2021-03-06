import React, { SetStateAction, useEffect, useState } from 'react';

import { pros } from '../../../API/request';
import email from '../../../assets/minimalist_logos/email.svg';
import garageLogo from '../../../assets/minimalist_logos/garage.svg';
import phone from '../../../assets/minimalist_logos/phone.svg';
import IPros from '../../../Interfaces/IPros';
import { button } from '../../../variableTailwind';

interface AppointmentRequestProps {
  garageId: number;
  showAppointmentRequest: boolean;
  setShowAppointmentRequest: React.Dispatch<SetStateAction<boolean>>;
}

const AppointmentRequestModal: React.FC<AppointmentRequestProps> = ({
  garageId,
  showAppointmentRequest,
  setShowAppointmentRequest,
}) => {
  const [garageInfos, setGarageInfos] = useState<IPros>();

  async function getGarageDetails() {
    if (garageId) {
      const res = await pros.getOne(garageId);
      setGarageInfos(res);
    }
  }

  useEffect(() => {
    getGarageDetails();
  }, [garageId]);

  return (
    <div>
      {garageInfos && showAppointmentRequest && (
        <div className={`w-full rounded-lg p-8`}>
          <div
            className={`w-full rounded-lg flex flex-col items-center justify-around bg-background/30 p-4`}>
            <p className="mb-4">
              Afin de prendre rendez-vous merci de contacter directement le garage via les
              coordonnées ci-dessous :
            </p>
            <div className="flex items-center justify-center w-full mb-6">
              <div>
                <img className="w-20 mr-4" src={garageLogo} alt="logo_user" />
              </div>
              <div className="flex flex-col">
                <p className="text-2xl ">{garageInfos.name}</p>
              </div>
            </div>
            <div className="flex flex-col items-start justify-center w-full ml-20">
              <div className="flex items-center justify-start">
                <img className="w-8 mr-2" src={email} alt="email" />
                <p> : {garageInfos.email}</p>
              </div>
              <div className="flex items-center justify-start">
                <img className="w-8 mr-2" src={phone} alt="phone" />
                <p> : {garageInfos.phone}</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowAppointmentRequest && setShowAppointmentRequest(false)}
            className={`${button} mt-16`}>
            Fermer
          </button>
        </div>
      )}
    </div>
  );
};

export default AppointmentRequestModal;
